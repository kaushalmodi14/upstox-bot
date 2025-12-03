import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

/**
 * Writes the processed option chain data into an Excel (.xlsx) file.
 */
export const writeToExcel = (data, filename = "options.xlsx") => {
    if (!Array.isArray(data) || data.length === 0) return;

    const allKeys = Object.keys(data[0]);

    // Build rows: each row = { Key, col1, col2, col3, ... }
    const rows = allKeys.map(key => {
        const row = { Key: key };

        data.forEach((obj, index) => {
            row[`T${index + 1}`] = obj[key] ?? "";
        });

        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Options");

    XLSX.writeFile(workbook, filename);
};


export const formatAndWriteToExcel = async (data, filename = "options.xlsx") => {
    if (!Array.isArray(data) || data.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Options");

    const keys = Object.keys(data[0]);

    // Build rows
    const rows = keys.map(key => {
        return [key, ...data.map(obj => obj[key] ?? "")];
    });

    // Add rows
    sheet.addRows(rows);

    // Style formatting
    sheet.columns.forEach(col => {
        col.alignment = { horizontal: "center", vertical: "middle" };
        // auto width
        let maxLen = 10;
        col.eachCell(cell => {
            maxLen = Math.max(maxLen, String(cell.value).length + 2);
        });
        col.width = maxLen;
    });

    // Bold the first column
    sheet.getColumn(1).eachCell(cell => {
        cell.font = { bold: true };
    });

    // Save file
    await workbook.xlsx.writeFile(filename);
};


