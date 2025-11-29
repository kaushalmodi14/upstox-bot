const axios = require('axios');
const API = require('./utils/request').API;
const getATMPrice = require('./utils/optionchain').getATMPrice;

const url = 'https://api.upstox.com/v2/option/chain';
const params = {
    instrument_key: 'NSE_INDEX|Nifty 50',
    expiry_date: '2025-12-02'
};
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
   const data = API.get(`option/chain`, params);
   data.then((response) => console.log(getATMPrice(response.data.data))).catch((e) => console.log(e))
