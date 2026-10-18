import path from "path";
import { LANGUAGE } from "../../constants/config.js";
import type { StockIndicatorsCreateInput } from "../../generated/prisma/models.js";
import type { ITicker } from "../../models/financial.js";
import { formatDate } from "../../utils/formatDate.js";
import fs from "fs";

const __dirname = import.meta.dirname;
const htmlPath = path.join(__dirname, "mockCheerioStockHtml.txt");
const altHtmlPath = path.join(__dirname, "mockCheerioStockAltData.txt");
export const mockCheerioStockHtml = fs.readFileSync(htmlPath, "utf-8");
export const mockCheerioStockAltHtml = fs.readFileSync(altHtmlPath, "utf-8");

export const mockScrapStockData: StockIndicatorsCreateInput = {
  assetType: "AÇÃO",
  ticker: "CMIG4",
  date: formatDate(new Date(), LANGUAGE),
  name: "Companhia Energética de Minas Gerais",
  sector: "Utilidade Pública: Energia Elétrica",
  price: 11.83,
  pe: 7.37,
  dy: 9.63,
  pbv: 1.16,
  roe: 15.75,
  profitMargin: 10.51,
  roic: 12.22,
  evEbit: 8.55,
  netDebtDivideByEBITDA: 2.27,
  grossDebtNetWorth: 0.77,
  liquidity: 207133,
  cagrProfit: { create: { value: 11.13, periodYears: 5 } },
  cagrRevenue: { create: { value: 11.33, periodYears: 5 } },
};

export const mockTicketStockForScrapFuntion: ITicker = {
  assetType: "AÇÃO",
  exchange: "BVMF",
  ticker: "CMIG4",
};

export const mockScrapStockUsData = {
  assetType: "STOCK",
  ticker: "AAPL",
  date: formatDate(new Date(), LANGUAGE),
  name: "Apple Inc",
  sector: "Technology: Communications Equipment",
  price: 344.79,
  pe: 37.96,
  dy: 0.32,
  pbv: 45.52,
  roe: 119.91,
  profitMargin: 27.2252,
  roic: 37.68,
  evEbit: 27.44,
  netDebtDivideByEBITDA: 0.23,
  grossDebtNetWorth: 0.66,
  liquidity: 18602319.67,
  cagrProfit: { create: { value: 4.29, periodYears: 5 } },
  cagrRevenue: { create: { value: 5.1, periodYears: 5 } },
};
