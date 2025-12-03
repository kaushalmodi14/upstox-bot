const getDateParts = require("./utils/date").getDateParts;
const fs = require("fs");
const { formatAndWriteToExcel } = require("./utils/xsl");
const updateExcelFile = async (key) => {
    key = key || getDateParts().dateString;
    try {
        const storedData = fs.readFileSync(`data/${key}_options.json`, "utf-8");
        const parsedData = JSON.parse(storedData);

        await formatAndWriteToExcel(parsedData, `${key}_options.xlsx`);
    } catch (e) {
        console.log(e);
    }
};

updateExcelFile();