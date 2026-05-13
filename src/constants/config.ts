import { googleAuthentication } from "../config/config.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * CONSTANTS
 * @var {google.auth.GoogleAuth} googleAuth - An Authenticated GoogleAuth instance that can be used to access Google APIs.
 * @var {string} spreadsheetId - The ID of the Google Spreadsheet to fetch data from. Encountered in the URL of the spreadsheet. Ex: "1aBcD2eFgHiJkLmNoPqRsTuVwXyZ1234567890"
 * @var {string[]} spreadsheetRanges - An array of ranges to fetch data from the spreadsheet. Each range should be in the format "SheetName!Range,SheetName!Range". They will be converted in the apropriate array format.
 */
export const googleAuth = await googleAuthentication();
export const spreadsheetId = process.env.SPREADSHEET_ID;
export const spreadsheetRanges = process.env.SPREADSHEET_RANGES?.split(",");
