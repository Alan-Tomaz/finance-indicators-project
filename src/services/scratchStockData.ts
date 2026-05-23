import type { ITicker } from "../models/financial.js";
import { saveTextInFile } from "../utils/saveTextInFile.js";
import { LANGUAGE, NODE_ENV } from "../constants/config.js";
import { formatDate } from "../utils/formatDate.js";
import type { Prisma } from "../generated/prisma/client.js";
import { scratchDataFromSite } from "./scratchData.js";

/**
 * Fetches data from the site StatusInvest for a given ticket for a stock and calculates financial indicators based on the fetched data.
 * @param {ITicker} ticker The stocker ticker symbol to fetch data
 * @returns {Prisma.StockIndicatorsCreateInput} - An object containing calculated financial indicators
 */
export const scratchStockData = async (ticker: ITicker) => {
  try {
    const filters = {
      isEua: ticker.exchange != "BVMF",
      assetType:
        ticker.assetType === "STOCK"
          ? "acoes"
          : ticker.assetType === "AÇÃO"
            ? "acoes"
            : ticker.assetType.includes("ETF")
              ? "etf"
              : "",
    };

    const url = `https://https://statusinvest.com.br/${filters.isEua ? "eua" : ""}/${filters.assetType}`;

    const $ = await scratchDataFromSite(url);

    const html = $.html();

    if (NODE_ENV === "dev") {
      saveTextInFile(html);
    }

    const stockIndicators: Prisma.StockIndicatorsCreateInput =
      calculateStockIndicatorsFromScratch($, html, ticker);

    console.log(
      `Info for ticket ${ticker.ticker} fetched successfully StatusInvest.`,
    );
    return stockIndicators;
  } catch (error) {
    throw new Error(
      `Error fetching ticket ${ticker.ticker} from StatusInvest (Site): ${error}`,
    );
  }
};

// CALC ALL FINANCIAL INDICATORS
// Return values as null if undefined or null
export const calculateStockIndicatorsFromScratch = (
  pageObj: any,
  html: any,
  ticket: ITicker,
): Prisma.StockIndicatorsCreateInput => {
  if (!pageObj) {
    console.error("Quote or fundamentalsTimeSeries data is missing.");
    return {} as Prisma.StockIndicatorsCreateInput;
  }

  /* name */

  const name = pageObj(".$('.d-block.fw-600.text-main-green-dark')")
    .text()
    .trim();
  /* industry */
  let sector;
  if (
    quote.summaryProfile.sector != undefined ||
    quote.summaryProfile.sector != null ||
    quote.summaryProfile.industry != undefined ||
    quote.summaryProfile.industry != null
  ) {
    sector = `${quote.summaryProfile.sector}: ${quote.summaryProfile.industry}`;
  }
  /* price */
  const price = quote.price.regularMarketPrice;
  /* PE */
  const pe = quote.summaryDetail.trailingPE;
  /* DY */
  let dy;
  if (
    quote.summaryDetail.dividendYield != undefined &&
    quote.summaryDetail.dividendYield != null
  ) {
    dy = toPercent(quote.summaryDetail.dividendYield);
  }
  /* P/BV */
  const pbv = quote.defaultKeyStatistics.priceToBook;
  /* ROE */
  let roe;
  if (
    quote.financialData.returnOnEquity != undefined &&
    quote.financialData.returnOnEquity != null
  ) {
    roe = toPercent(quote.financialData.returnOnEquity);
  }
  /* CAGR PROFIT */
  let cagrProfit;
  let yearsCagrProfit;

  const firstCagrProfit = calcCagrYahooFinance(
    fundamentalsTimeSeries,
    "netIncome",
  )[0];
  const lastCagrProfit = calcCagrYahooFinance(
    fundamentalsTimeSeries,
    "netIncome",
  )[calcCagrYahooFinance(fundamentalsTimeSeries, "netIncome").length - 1];

  if (
    firstCagrProfit != undefined &&
    firstCagrProfit != null &&
    lastCagrProfit != undefined &&
    lastCagrProfit != null
  ) {
    yearsCagrProfit =
      new Date(lastCagrProfit.date).getFullYear() -
      new Date(firstCagrProfit.date).getFullYear();

    cagrProfit =
      ((lastCagrProfit.netIncome / firstCagrProfit.netIncome) **
        (1 / yearsCagrProfit) -
        1) *
      100;
  }
  /* CAGR REVENUE */
  let cagrRevenue;
  let yearsCagrRevenue;

  const firstCagrRevenue = calcCagrYahooFinance(
    fundamentalsTimeSeries,
    "totalRevenue",
  )[0];
  const lastCagrRevenue = calcCagrYahooFinance(
    fundamentalsTimeSeries,
    "totalRevenue",
  )[calcCagrYahooFinance(fundamentalsTimeSeries, "totalRevenue").length - 1];

  if (
    firstCagrRevenue != undefined &&
    firstCagrRevenue != null &&
    lastCagrRevenue != undefined &&
    lastCagrRevenue != null
  ) {
    yearsCagrRevenue =
      new Date(lastCagrRevenue.date).getFullYear() -
      new Date(firstCagrRevenue.date).getFullYear();

    cagrRevenue =
      ((lastCagrRevenue.totalRevenue / firstCagrRevenue.totalRevenue) **
        (1 / yearsCagrRevenue) -
        1) *
      100;
  }
  /* PROFIT MARGIN */
  let profitMargin;
  if (
    quote.financialData.profitMargins != undefined &&
    quote.financialData.profitMargins != null
  ) {
    profitMargin = toPercent(quote.financialData.profitMargins);
  }
  /* ROIC */
  const roic = calculateROICYahooFinance(
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1],
  );
  /* liquidity */
  const liquidity = quote.summaryDetail.averageVolume;
  /* ev/ebit */
  let evEbit;
  if (
    quote.defaultKeyStatistics.enterpriseValue != undefined &&
    quote.defaultKeyStatistics.enterpriseValue != null &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBIT !=
      undefined &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBIT != null
  ) {
    evEbit =
      quote.defaultKeyStatistics.enterpriseValue /
      fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBIT;
  }
  /* netDebtEbitda  */
  let netDebtEbitda;
  if (
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].netDebt !=
      undefined &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].netDebt != null &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBITDA !=
      undefined &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBITDA != null
  ) {
    netDebtEbitda =
      fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].netDebt /
      fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].EBITDA;
  }
  /* grossDebtNetWorth */
  let debtToEquityPercent;
  if (
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].totalDebt !=
      undefined &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].totalDebt !=
      null &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1]
      .stockholdersEquity != undefined &&
    fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1]
      .stockholdersEquity != null
  ) {
    debtToEquityPercent =
      fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1].totalDebt /
      fundamentalsTimeSeries[fundamentalsTimeSeries.length - 1]
        .stockholdersEquity;
  }
  /* ===== STOCK INDICATORS ===== */
  const ticketInfo: Prisma.StockIndicatorsCreateInput = {
    assetType: ticket.assetType,
    ticker: ticket.ticker,
    /* FORMAT DATE IN DD/MM/YYYY FORMAT */
    date: formatDate(new Date(), LANGUAGE),
    name,
    sector: sector ?? null,
    price: price ?? null,
    pe: pe ?? null,
    dy: dy ?? null,
    pbv: pbv ?? null,
    roe: roe ?? null,
    profitMargin: profitMargin ?? null,
    roic: roic ?? null,
    evEbit: evEbit ?? null,
    netDebtDivideByEBITDA: netDebtEbitda ?? null,
    grossDebtNetWorth: debtToEquityPercent ?? null,
    liquidity: liquidity ?? null,
    cagrProfit: {
      create: {
        value: cagrProfit ?? null,
        periodYears: yearsCagrProfit ?? null,
      },
    },
    cagrRevenue: {
      create: {
        value: cagrRevenue ?? null,
        periodYears: yearsCagrRevenue ?? null,
      },
    },
  };
  return ticketInfo;
};
