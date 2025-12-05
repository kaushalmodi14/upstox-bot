import dotenv from "dotenv";
dotenv.config(".env");

import fs from "fs";
import { API } from "./utils/request.js";
import * as OChain from "./utils/optionchain.js";
import { writeToExcel, formatAndWriteToExcel } from "./utils/xsl.js";
import { getDateParts } from "./utils/date.js";

const params = {
    instrument_key: "NSE_INDEX|Nifty 50",
    expiry_date: "2025-12-09"
};

const data = {};

const saveData = (newData) => {
    const key = getDateParts().dateString;
    if (fs.existsSync(`data/${key}_options.json`)) {
    const existingData = fs.readFileSync(`data/${key}_options.json`, "utf-8");
    if (existingData) {
        data[key] = JSON.parse(existingData);
        console.log("data exists")
    }}
    if (!data[key]) data[key] = [];
    data[key].push(newData);

    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync(`data/${key}_options.json`, JSON.stringify(data[key], null, 2));
};

const updateExcelFile = async (key) => {
    try {
        const storedData = fs.readFileSync(`data/${key}_options.json`, "utf-8");
        const parsedData = JSON.parse(storedData);

        await formatAndWriteToExcel(parsedData, `${key}_options.xlsx`);
    } catch (e) {
        console.log(e);
    }
};

export const startFetching = async (expiryDate) => {
    try {
        if (expiryDate) params.expiry_date = expiryDate;

        const response = await API.get("option/chain", params);
        console.log(JSON.stringify(response.data.data));

        const finalData = OChain.getCombinedData(response.data.data);

        saveData(finalData);

        // Optionally auto-update Excel:
        // updateExcelFile(getDateParts().dateString);

    } catch (e) {
        console.log("Error:", e);
    }
};
// startFetching();
