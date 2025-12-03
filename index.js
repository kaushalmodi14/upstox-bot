const dotenv = require('dotenv');
dotenv.config('.env');
const fs = require('fs');
const API = require('./utils/request').API;
const OChain = require('./utils/optionchain');
const { writeToExcel, formatAndWriteToExcel } = require('./utils/xsl');
getDateParts = require('./utils/date').getDateParts;
const url = 'https://api.upstox.com/v2/option/chain';
const params = {
    instrument_key: 'NSE_INDEX|Nifty 50',
    expiry_date: '2025-12-02'
};
const data = {
}
/*
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3WEJUOVAiLCJqdGkiOiI2OTI1M2I4Y2QwMjhiZDU2YjY1MWMwZDYiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6ZmFsc2UsImlhdCI6MTc2NDA0Nzc1NiwiaXNzIjoidWRhcGktZ2F0ZXdheS1zZXJ2aWNlIiwiZXhwIjoxNzY0MTA4MDAwfQ.VlhjKKQPEG0RLJUYjWmyhmSNTzAiArgIHf49gTyDjXM'
};

axios.get(url, { params, headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */

    const saveData = (newData) => {
        const key = getDateParts().dateString;
        if (!data[key]) data[key] = [];
        data[key].push(newData);
        fs.writeFileSync(`data/${key}_options.json`, JSON.stringify(data[key], null, 2));
    }

    const updateExcelFile = async (key) => {
        try {
        const storedData = fs.readFileSync(`data/${key}_options.json`, 'utf-8');
        const parsedData = JSON.parse(storedData);
        await formatAndWriteToExcel(parsedData, `${key}_options.xlsx`);
        } catch (e) {
            console.log(e);
        }
    }


        const fecthOptionChain = API.get(`option/chain`, params);
           fecthOptionChain.then((response) => {
    console.log(JSON.stringify(response.data.data));
    const finalData = OChain.getCombinedData(response.data.data);   // your processed data
saveData(finalData);
updateExcelFile(getDateParts().dateString);
}).catch((e) => console.log(e))


   
