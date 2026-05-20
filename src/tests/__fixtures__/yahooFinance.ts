import type { ITicker } from "../../models/financial.js";

// YAHOO FINANCE MOCKS
export const mockQuote = {
  summaryDetail: {
    trailingPE: 10,
    dividendYield: 0.08,
    averageVolume: 456465,
  },
  summaryProfile: {
    industry: "Energy",
    sector: "Utilities",
  },
  defaultKeyStatistics: {
    priceToBook: 1.5,
    enterpriseValue: 345465,
  },
  financialData: {
    returnOnEquity: 0.15,
    profitMargins: 0.2845,
  },
  price: {
    shortName: "CMIG4",
    longName: "CMIG4",
    regularMarketPrice: 100,
  },
};

export const mockQuoteUndefined = {
  summaryDetail: {},
  summaryProfile: {},
  defaultKeyStatistics: {},
  financialData: {},
  price: {},
};

export const mockFundamentals = [
  {
    date: "2020-01-01",
    netIncome: 1000,
    totalRevenue: 5000,
    EBIT: 2000,
    investedCapital: 10000,
    taxRateForCalcs: 0.3,
    totalDebt: 5000,
    EBITDA: 4565,
    netDebt: 45645,
    stockholdersEquity: 10000,
    periodType: "12M",
  },
  {
    date: "2023-01-01",
    netIncome: 2000,
    totalRevenue: 10000,
    EBIT: 4000,
    EBITDA: 3456,
    investedCapital: 15000,
    taxRateForCalcs: 0.3,
    netDebt: 45345,
    totalDebt: 6000,
    stockholdersEquity: 12000,
    periodType: "12M",
  },
];

export const mockFundamentalsUndefined = [{}, {}];

export const mockTicket: ITicker = {
  assetType: "STOCK",
  exchange: "BVMF",
  ticker: "CMIG4",
};
