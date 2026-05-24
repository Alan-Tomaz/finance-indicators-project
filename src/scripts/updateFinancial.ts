import {
  FII_SINONIMOUS,
  SPREAD_SHEET_ID,
  SPREAD_SHEET_RANGES,
  STOCK_SINONIMOUS,
} from "../constants/config.js";
import type { StockIndicatorsCreateInput } from "../generated/prisma/models.js";
import { scrapFIIData } from "../services/scrapFIIData.js";
import { scrapStockData } from "../services/scrapStockData.js";
import { getSpreadsheetTickets } from "../services/spreadsheet.js";
import { sendDataToSupabase } from "../services/supabase.js";
import { fetchTicketInfoFromYahooFinance } from "../services/yahooFinance.js";
import { filterStockValues } from "../utils/stock.js";

/**
 * This function is responsible for updating the financial data of the tickets listed in the spreadsheet and save in the supabase db.
 */
export const updateFinancial = async () => {
  try {
    if (!SPREAD_SHEET_RANGES || !SPREAD_SHEET_ID) {
      throw new Error("Spreadsheet ranges or ID not defined");
    }
    // TICKETS FROM SPREADSHEET
    const tickets = await getSpreadsheetTickets(
      SPREAD_SHEET_RANGES,
      SPREAD_SHEET_ID,
    );

    console.log("List of tickets to be fetched", tickets);
    const ticketsInfo = [];
    // GET TICKET INFO FROM YAHOO FINANCE
    for (const ticket of tickets) {
      let ticketInfo: any = {};
      // ASSET TYPE EXPECTED = STOCK_SINONIMOUS
      if (STOCK_SINONIMOUS.includes(ticket.assetType)) {
        // Fetch stock data from yahoo finance
        const stockIndicatorsFromYahooFinance =
          await fetchTicketInfoFromYahooFinance(ticket);
        // Fetch stock data from scrap site
        const stockIndicatorsFromScrapSite = await scrapStockData(ticket);
        // fetch data from both sources to compare and filter values, if some value is undefined or null, return null.
        const finalStockIndicators: StockIndicatorsCreateInput =
          filterStockValues(
            stockIndicatorsFromYahooFinance,
            stockIndicatorsFromScrapSite,
            ticket,
          );

        ticketInfo = finalStockIndicators;
      }
      // ASSET TYPE EXPECTED = "FII"
      if (FII_SINONIMOUS.includes(ticket.assetType)) {
        ticketInfo = await scrapFIIData(ticket);
      }
      if (ticketInfo.hasOwnProperty("assetType")) {
        ticketsInfo.push(ticketInfo);
      }
    }

    await sendDataToSupabase(ticketsInfo);

    console.log("Financial data updated successfully.", ticketsInfo);
  } catch (error) {
    console.error("Error updating financial data: ", error);
  }
};
