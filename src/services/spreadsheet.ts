import { google } from "googleapis";
import { googleAuth } from "../constants/config.js";

/**
 * Fetches information from a Google Spreadsheet based on the provided range and spreadsheet ID. Can be used to fetch data from your financial assets.
 * @param {string[]} range - An array of strings representing the ranges to fetch from the spreadsheet. Ex: ["Sheet1!A1:B2", "Sheet2!C3:D4"]
 * @param {string} spreadsheetId - The ID of the Google Spreadsheet to fetch data from. Encountered in the URL of the spreadsheet. Ex: "1aBcD2eFgHiJkLmNoPqRsTuVwXyZ1234567890"
 * @return {[{ range: string; majorDimension: string; values: string[][] }]} An array of objects containing the range, major dimension, and values fetched from the fields matched from the spreadsheet.
 */
export const getSpreadsheetInfo = async (
  range: string[],
  spreadsheetId: string,
) => {
  try {
    const sheets = google.sheets({
      version: "v4",
      auth: googleAuth,
    });

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: range,
    });

    return response.data.valueRanges;
  } catch (error) {
    console.log("Error in getSpreadsheetInfo: " + error);
    throw new Error("Error in getSpreadsheetInfo: " + error);
  }
};
