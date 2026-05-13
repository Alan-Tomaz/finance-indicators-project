import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { spreadsheetId, spreadsheetRanges } from "./constants/config.js";

import { getSpreadsheetInfo } from "./services/spreadsheet.js";
import YahooFinance from "yahoo-finance2";

console.log("============ Script Iniciado ============");

const yahooFinance = new YahooFinance();

const tickets = [];

const values = await getSpreadsheetInfo(spreadsheetRanges!, spreadsheetId!);
for (const value of values!) {
  for (const value1 of value!.values!) {
    tickets.push(value1[0]);
  }
}

console.log("Tickets: ", tickets);

const quote = await yahooFinance.quoteSummary("AAPL", {
  modules: [
    "assetProfile",
    "balanceSheetHistory",
    "balanceSheetHistoryQuarterly",
    "calendarEvents",
    "cashflowStatementHistory",
    "cashflowStatementHistoryQuarterly",
    "defaultKeyStatistics",
    "earnings",
    "earningsTrend",
    "financialData",
    "fundOwnership",
    "fundPerformance",
    "fundProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
    "indexTrend",
    "industryTrend",
    "insiderHolders",
    "insiderTransactions",
    "institutionOwnership",
    "majorDirectHolders",
    "majorHoldersBreakdown",
    "netSharePurchaseActivity",
    "price",
    "quoteType",
    "recommendationTrend",
    "secFilings",
    "sectorTrend",
    "summaryDetail",
    "summaryProfile",
    "topHoldings",
    "upgradeDowngradeHistory",
  ],
});

console.log(quote);

console.log("============ Script Finalizado ============");
