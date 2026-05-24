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
  price: 11.22,
  pe: 6.64,
  dy: 11.28,
  pbv: 1.11,
  roe: 16.75,
  profitMargin: 11.15,
  roic: 12.39,
  evEbit: 8.21,
  netDebtDivideByEBITDA: 2.16,
  grossDebtNetWorth: 0.68,
  liquidity: 181923,
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
  price: 308.82,
  pe: 35.65,
  dy: 0.35,
  pbv: 41.04,
  roe: 115.1,
  profitMargin: 26.603,
  roic: 38.39,
  evEbit: 25.37,
  netDebtDivideByEBITDA: null,
  grossDebtNetWorth: null,
  liquidity: 18602319.67,
  cagrProfit: { create: { value: 3.6, periodYears: 5 } },
  cagrRevenue: { create: { value: 4.04, periodYears: 5 } },
};
