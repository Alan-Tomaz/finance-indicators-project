import { LANGUAGE } from "../constants/config.js";
import type { StockIndicatorsCreateInput } from "../generated/prisma/models.js";
import type { ITicker } from "../models/financial.js";

export const filterStockValues = (
  yahooFinanceIndicators: StockIndicatorsCreateInput,
  scratchFromSiteIndicators: StockIndicatorsCreateInput,
  ticker: ITicker,
): StockIndicatorsCreateInput => {
  const stockIndicators: StockIndicatorsCreateInput = {
    date: yahooFinanceIndicators.date ?? scratchFromSiteIndicators.date ?? null,
    ticker:
      yahooFinanceIndicators.ticker ?? scratchFromSiteIndicators.ticker ?? null,
    assetType:
      yahooFinanceIndicators.assetType ??
      scratchFromSiteIndicators.assetType ??
      null,
    name: yahooFinanceIndicators.name ?? scratchFromSiteIndicators.name ?? null,
    sector:
      yahooFinanceIndicators.sector ?? scratchFromSiteIndicators.sector ?? null,
    price:
      yahooFinanceIndicators.price ?? scratchFromSiteIndicators.price ?? null,
    pe: yahooFinanceIndicators.pe ?? scratchFromSiteIndicators.pe ?? null,
    pbv: yahooFinanceIndicators.pbv ?? scratchFromSiteIndicators.pbv ?? null,
    dy: yahooFinanceIndicators.dy ?? scratchFromSiteIndicators.dy ?? null,
    roe: yahooFinanceIndicators.roe ?? scratchFromSiteIndicators.roe ?? null,
    profitMargin:
      yahooFinanceIndicators.profitMargin ??
      scratchFromSiteIndicators.profitMargin ??
      null,
    evEbit:
      yahooFinanceIndicators.evEbit ?? scratchFromSiteIndicators.evEbit ?? null,
    roic: yahooFinanceIndicators.roic ?? scratchFromSiteIndicators.roic ?? null,
    cagrProfit: {
      create: {
        value:
          scratchFromSiteIndicators.cagrProfit?.create?.value ??
          yahooFinanceIndicators.cagrProfit?.create?.value ??
          null,
        periodYears:
          scratchFromSiteIndicators.cagrProfit?.create?.periodYears ??
          yahooFinanceIndicators.cagrProfit?.create?.periodYears ??
          null,
      },
    },

    cagrRevenue: {
      create: {
        value:
          scratchFromSiteIndicators.cagrRevenue?.create?.value ??
          yahooFinanceIndicators.cagrRevenue?.create?.value ??
          null,
        periodYears:
          scratchFromSiteIndicators.cagrRevenue?.create?.periodYears ??
          yahooFinanceIndicators.cagrRevenue?.create?.periodYears ??
          null,
      },
    },
    liquidity:
      yahooFinanceIndicators.liquidity ??
      scratchFromSiteIndicators.liquidity ??
      null,
    grossDebtNetWorth:
      yahooFinanceIndicators.grossDebtNetWorth ??
      scratchFromSiteIndicators.grossDebtNetWorth ??
      null,
    netDebtDivideByEBITDA:
      yahooFinanceIndicators.netDebtDivideByEBITDA ??
      scratchFromSiteIndicators.netDebtDivideByEBITDA ??
      null,
  };

  if (scratchFromSiteIndicators.cagrProfit?.create?.value != null) {
    stockIndicators.cagrProfit!.create!.value =
      scratchFromSiteIndicators.cagrProfit?.create?.value;
    stockIndicators.cagrProfit!.create!.periodYears =
      scratchFromSiteIndicators.cagrProfit?.create?.periodYears;
  } else if (yahooFinanceIndicators.cagrProfit?.create?.value != null) {
    stockIndicators.cagrProfit!.create!.periodYears =
      yahooFinanceIndicators.cagrProfit?.create?.periodYears;
    stockIndicators.cagrProfit!.create!.value =
      yahooFinanceIndicators.cagrProfit?.create?.value;
  } else {
    stockIndicators.cagrProfit!.create!.value = null;
    stockIndicators.cagrProfit!.create!.periodYears = null;
  }

  if (scratchFromSiteIndicators.cagrRevenue?.create?.value != null) {
    stockIndicators.cagrRevenue!.create!.value =
      scratchFromSiteIndicators.cagrRevenue?.create?.value;
    stockIndicators.cagrRevenue!.create!.periodYears =
      scratchFromSiteIndicators.cagrRevenue?.create?.periodYears;
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
      scratchFromSiteIndicators.assetType ??
      yahooFinanceIndicators.assetType ??
      null;
    stockIndicators.name =
      scratchFromSiteIndicators.name ?? yahooFinanceIndicators.name ?? null;
    stockIndicators.ticker =
      scratchFromSiteIndicators.ticker ?? yahooFinanceIndicators.ticker ?? null;
    stockIndicators.date =
      scratchFromSiteIndicators.date ?? yahooFinanceIndicators.date ?? null;
    stockIndicators.sector =
      scratchFromSiteIndicators.sector ?? yahooFinanceIndicators.sector ?? null;
    stockIndicators.price =
      scratchFromSiteIndicators.price ?? yahooFinanceIndicators.price ?? null;
    stockIndicators.pe =
      scratchFromSiteIndicators.pe ?? yahooFinanceIndicators.pe ?? null;
    stockIndicators.pbv =
      scratchFromSiteIndicators.pbv ?? yahooFinanceIndicators.pbv ?? null;
    stockIndicators.dy =
      scratchFromSiteIndicators.dy ?? yahooFinanceIndicators.dy ?? null;
    stockIndicators.roe =
      scratchFromSiteIndicators.roe ?? yahooFinanceIndicators.roe ?? null;
    stockIndicators.profitMargin =
      scratchFromSiteIndicators.profitMargin ??
      yahooFinanceIndicators.profitMargin ??
      null;
    stockIndicators.evEbit =
      scratchFromSiteIndicators.evEbit ?? yahooFinanceIndicators.evEbit ?? null;
    stockIndicators.roic =
      scratchFromSiteIndicators.roic ?? yahooFinanceIndicators.roic ?? null;
    stockIndicators.liquidity =
      scratchFromSiteIndicators.liquidity ??
      yahooFinanceIndicators.liquidity ??
      null;
    stockIndicators.grossDebtNetWorth =
      scratchFromSiteIndicators.grossDebtNetWorth ??
      yahooFinanceIndicators.grossDebtNetWorth ??
      null;
    stockIndicators.netDebtDivideByEBITDA =
      scratchFromSiteIndicators.netDebtDivideByEBITDA ??
      yahooFinanceIndicators.netDebtDivideByEBITDA ??
      null;
    stockIndicators.cagrProfit = {
      create: {
        value:
          scratchFromSiteIndicators.cagrProfit?.create?.value ??
          yahooFinanceIndicators.cagrProfit?.create?.value ??
          null,
        periodYears:
          scratchFromSiteIndicators.cagrProfit?.create?.periodYears ??
          yahooFinanceIndicators.cagrProfit?.create?.periodYears ??
          null,
      },
    };
    stockIndicators.cagrRevenue = {
      create: {
        value:
          scratchFromSiteIndicators.cagrRevenue?.create?.value ??
          yahooFinanceIndicators.cagrRevenue?.create?.value ??
          null,
        periodYears:
          scratchFromSiteIndicators.cagrRevenue?.create?.periodYears ??
          yahooFinanceIndicators.cagrRevenue?.create?.periodYears ??
          null,
      },
    };

    if (scratchFromSiteIndicators.cagrProfit?.create?.value != null) {
      stockIndicators.cagrProfit!.create!.value =
        scratchFromSiteIndicators.cagrProfit?.create?.value;
      stockIndicators.cagrProfit!.create!.periodYears =
        scratchFromSiteIndicators.cagrProfit?.create?.periodYears;
    } else if (yahooFinanceIndicators.cagrProfit?.create?.value != null) {
      stockIndicators.cagrProfit!.create!.periodYears =
        yahooFinanceIndicators.cagrProfit?.create?.periodYears;
      stockIndicators.cagrProfit!.create!.value =
        yahooFinanceIndicators.cagrProfit?.create?.value;
    } else {
      stockIndicators.cagrProfit!.create!.value = null;
      stockIndicators.cagrProfit!.create!.periodYears = null;
    }

    if (scratchFromSiteIndicators.cagrRevenue?.create?.value != null) {
      stockIndicators.cagrRevenue!.create!.value =
        scratchFromSiteIndicators.cagrRevenue?.create?.value;
      stockIndicators.cagrRevenue!.create!.periodYears =
        scratchFromSiteIndicators.cagrRevenue?.create?.periodYears;
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
