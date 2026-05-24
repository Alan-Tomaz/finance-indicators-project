import { LANGUAGE } from "../constants/config.js";
import type { StockIndicatorsCreateInput } from "../generated/prisma/models.js";
import type { ITicker } from "../models/financial.js";

export const filterStockValues = (
  yahooFinanceIndicators: StockIndicatorsCreateInput,
  scrapFromSiteIndicators: StockIndicatorsCreateInput,
  ticker: ITicker,
): StockIndicatorsCreateInput => {
  const stockIndicators: StockIndicatorsCreateInput = {
    date: yahooFinanceIndicators.date ?? scrapFromSiteIndicators.date ?? null,
    ticker:
      yahooFinanceIndicators.ticker ?? scrapFromSiteIndicators.ticker ?? null,
    assetType:
      yahooFinanceIndicators.assetType ??
      scrapFromSiteIndicators.assetType ??
      null,
    name: yahooFinanceIndicators.name ?? scrapFromSiteIndicators.name ?? null,
    sector:
      yahooFinanceIndicators.sector ?? scrapFromSiteIndicators.sector ?? null,
    price:
      yahooFinanceIndicators.price ?? scrapFromSiteIndicators.price ?? null,
    pe: yahooFinanceIndicators.pe ?? scrapFromSiteIndicators.pe ?? null,
    pbv: yahooFinanceIndicators.pbv ?? scrapFromSiteIndicators.pbv ?? null,
    dy: yahooFinanceIndicators.dy ?? scrapFromSiteIndicators.dy ?? null,
    roe: yahooFinanceIndicators.roe ?? scrapFromSiteIndicators.roe ?? null,
    profitMargin:
      yahooFinanceIndicators.profitMargin ??
      scrapFromSiteIndicators.profitMargin ??
      null,
    evEbit:
      yahooFinanceIndicators.evEbit ?? scrapFromSiteIndicators.evEbit ?? null,
    roic: yahooFinanceIndicators.roic ?? scrapFromSiteIndicators.roic ?? null,
    cagrProfit: {
      create: {
        value:
          scrapFromSiteIndicators.cagrProfit?.create?.value ??
          yahooFinanceIndicators.cagrProfit?.create?.value ??
          null,
        periodYears:
          scrapFromSiteIndicators.cagrProfit?.create?.periodYears ??
          yahooFinanceIndicators.cagrProfit?.create?.periodYears ??
          null,
      },
    },

    cagrRevenue: {
      create: {
        value:
          scrapFromSiteIndicators.cagrRevenue?.create?.value ??
          yahooFinanceIndicators.cagrRevenue?.create?.value ??
          null,
        periodYears:
          scrapFromSiteIndicators.cagrRevenue?.create?.periodYears ??
          yahooFinanceIndicators.cagrRevenue?.create?.periodYears ??
          null,
      },
    },
    liquidity:
      yahooFinanceIndicators.liquidity ??
      scrapFromSiteIndicators.liquidity ??
      null,
    grossDebtNetWorth:
      yahooFinanceIndicators.grossDebtNetWorth ??
      scrapFromSiteIndicators.grossDebtNetWorth ??
      null,
    netDebtDivideByEBITDA:
      yahooFinanceIndicators.netDebtDivideByEBITDA ??
      scrapFromSiteIndicators.netDebtDivideByEBITDA ??
      null,
  };

  if (scrapFromSiteIndicators.cagrProfit?.create?.value != null) {
    stockIndicators.cagrProfit!.create!.value =
      scrapFromSiteIndicators.cagrProfit?.create?.value;
    stockIndicators.cagrProfit!.create!.periodYears =
      scrapFromSiteIndicators.cagrProfit?.create?.periodYears;
  } else if (yahooFinanceIndicators.cagrProfit?.create?.value != null) {
    stockIndicators.cagrProfit!.create!.periodYears =
      yahooFinanceIndicators.cagrProfit?.create?.periodYears;
    stockIndicators.cagrProfit!.create!.value =
      yahooFinanceIndicators.cagrProfit?.create?.value;
  } else {
    stockIndicators.cagrProfit!.create!.value = null;
    stockIndicators.cagrProfit!.create!.periodYears = null;
  }

  if (scrapFromSiteIndicators.cagrRevenue?.create?.value != null) {
    stockIndicators.cagrRevenue!.create!.value =
      scrapFromSiteIndicators.cagrRevenue?.create?.value;
    stockIndicators.cagrRevenue!.create!.periodYears =
      scrapFromSiteIndicators.cagrRevenue?.create?.periodYears;
  } else if (yahooFinanceIndicators.cagrRevenue?.create?.value != null) {
    stockIndicators.cagrRevenue!.create!.value =
      yahooFinanceIndicators.cagrRevenue?.create?.value;
    stockIndicators.cagrRevenue!.create!.periodYears =
      yahooFinanceIndicators.cagrRevenue?.create?.periodYears;
  } else {
    stockIndicators.cagrRevenue!.create!.value = null;
    stockIndicators.cagrRevenue!.create!.periodYears = null;
  }

  if (ticker.exchange === "BVMF") {
    stockIndicators.assetType =
      scrapFromSiteIndicators.assetType ??
      yahooFinanceIndicators.assetType ??
      null;
    stockIndicators.name =
      scrapFromSiteIndicators.name ?? yahooFinanceIndicators.name ?? null;
    stockIndicators.ticker =
      scrapFromSiteIndicators.ticker ?? yahooFinanceIndicators.ticker ?? null;
    stockIndicators.date =
      scrapFromSiteIndicators.date ?? yahooFinanceIndicators.date ?? null;
    stockIndicators.sector =
      scrapFromSiteIndicators.sector ?? yahooFinanceIndicators.sector ?? null;
    stockIndicators.price =
      scrapFromSiteIndicators.price ?? yahooFinanceIndicators.price ?? null;
    stockIndicators.pe =
      scrapFromSiteIndicators.pe ?? yahooFinanceIndicators.pe ?? null;
    stockIndicators.pbv =
      scrapFromSiteIndicators.pbv ?? yahooFinanceIndicators.pbv ?? null;
    stockIndicators.dy =
      scrapFromSiteIndicators.dy ?? yahooFinanceIndicators.dy ?? null;
    stockIndicators.roe =
      scrapFromSiteIndicators.roe ?? yahooFinanceIndicators.roe ?? null;
    stockIndicators.profitMargin =
      scrapFromSiteIndicators.profitMargin ??
      yahooFinanceIndicators.profitMargin ??
      null;
    stockIndicators.evEbit =
      scrapFromSiteIndicators.evEbit ?? yahooFinanceIndicators.evEbit ?? null;
    stockIndicators.roic =
      scrapFromSiteIndicators.roic ?? yahooFinanceIndicators.roic ?? null;
    stockIndicators.liquidity =
      scrapFromSiteIndicators.liquidity ??
      yahooFinanceIndicators.liquidity ??
      null;
    stockIndicators.grossDebtNetWorth =
      scrapFromSiteIndicators.grossDebtNetWorth ??
      yahooFinanceIndicators.grossDebtNetWorth ??
      null;
    stockIndicators.netDebtDivideByEBITDA =
      scrapFromSiteIndicators.netDebtDivideByEBITDA ??
      yahooFinanceIndicators.netDebtDivideByEBITDA ??
      null;
    stockIndicators.cagrProfit = {
      create: {
        value:
          scrapFromSiteIndicators.cagrProfit?.create?.value ??
          yahooFinanceIndicators.cagrProfit?.create?.value ??
          null,
        periodYears:
          scrapFromSiteIndicators.cagrProfit?.create?.periodYears ??
          yahooFinanceIndicators.cagrProfit?.create?.periodYears ??
          null,
      },
    };
    stockIndicators.cagrRevenue = {
      create: {
        value:
          scrapFromSiteIndicators.cagrRevenue?.create?.value ??
          yahooFinanceIndicators.cagrRevenue?.create?.value ??
          null,
        periodYears:
          scrapFromSiteIndicators.cagrRevenue?.create?.periodYears ??
          yahooFinanceIndicators.cagrRevenue?.create?.periodYears ??
          null,
      },
    };

    if (scrapFromSiteIndicators.cagrProfit?.create?.value != null) {
      stockIndicators.cagrProfit!.create!.value =
        scrapFromSiteIndicators.cagrProfit?.create?.value;
      stockIndicators.cagrProfit!.create!.periodYears =
        scrapFromSiteIndicators.cagrProfit?.create?.periodYears;
    } else if (yahooFinanceIndicators.cagrProfit?.create?.value != null) {
      stockIndicators.cagrProfit!.create!.periodYears =
        yahooFinanceIndicators.cagrProfit?.create?.periodYears;
      stockIndicators.cagrProfit!.create!.value =
        yahooFinanceIndicators.cagrProfit?.create?.value;
    } else {
      stockIndicators.cagrProfit!.create!.value = null;
      stockIndicators.cagrProfit!.create!.periodYears = null;
    }

    if (scrapFromSiteIndicators.cagrRevenue?.create?.value != null) {
      stockIndicators.cagrRevenue!.create!.value =
        scrapFromSiteIndicators.cagrRevenue?.create?.value;
      stockIndicators.cagrRevenue!.create!.periodYears =
        scrapFromSiteIndicators.cagrRevenue?.create?.periodYears;
    } else if (yahooFinanceIndicators.cagrRevenue?.create?.value != null) {
      stockIndicators.cagrRevenue!.create!.value =
        yahooFinanceIndicators.cagrRevenue?.create?.value;
      stockIndicators.cagrRevenue!.create!.periodYears =
        yahooFinanceIndicators.cagrRevenue?.create?.periodYears;
    } else {
      stockIndicators.cagrRevenue!.create!.value = null;
      stockIndicators.cagrRevenue!.create!.periodYears = null;
    }
  }

  return stockIndicators;
};
