import type { ITicker } from "../models/financial.js";
import { saveTextInFile } from "../utils/saveTextInFile.js";
import { LANGUAGE, NODE_ENV } from "../constants/config.js";
import { formatDate } from "../utils/formatDate.js";
import type { Prisma } from "../generated/prisma/client.js";
import { scratchDataFromSite } from "./scratchData.js";
import { parseBrazilianNumber } from "../utils/normalizes.js";
import * as cheerio from "cheerio";

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
              ? "etfs"
              : "",
    };

    const url = `https://statusinvest.com.br/${filters.assetType}/${filters.isEua ? "eua/" : ""}${ticker.ticker}`;

    const $ = await scratchDataFromSite(url);

    const html = $.html();
    /* 
    if (NODE_ENV === "dev") {
      saveTextInFile(html);
    } */

    const stockIndicators: Prisma.StockIndicatorsCreateInput =
      calculateStockIndicatorsFromScratch(html, ticker);

    console.log(
      `Info for ticket ${ticker.ticker} fetched successfully from StatusInvest.`,
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
  html: any,
  ticket: ITicker,
): Prisma.StockIndicatorsCreateInput => {
  const $ = cheerio.load(html);

  if (!$) {
    console.error("Quote or fundamentalsTimeSeries data is missing.");
    return {} as Prisma.StockIndicatorsCreateInput;
  }

  /* name */
  const newName = $(".d-block.fw-600.text-main-green-dark").text().trim();
  const name = newName || ticket.ticker;

  // sector
  let sector;
  let newSector: any;
  let subSector: any;
  let englishSector: any;
  let englishSubSector: any;
  let netWorth: any;
  let grossDebt: any;
  $(".info").each((_: any, element: any) => {
    const title = $(element).find("span.sub-value").text().trim();
    const value = $(element).find("strong.value").text().trim();

    // sector
    if (/(?<!Sub)Setor de Atuação/gi.test(title)) {
      newSector = value;
    }

    if (/Subsetor de Atuação/gi.test(title)) {
      subSector = value;
    }

    if (/SETOR/gi.test(title)) {
      englishSector = value;
    }

    if (/INDÚSTRIA/gi.test(title)) {
      englishSubSector = value;
    }
  });
  /* sector */
  if (newSector && subSector) {
    sector = `${newSector}: ${subSector}`;
  }

  if (englishSector && englishSubSector && ticket.exchange != "BVMF") {
    sector = `${englishSector}: ${englishSubSector}`;
  }
  /* liquidity */
  let liquidity;

  $("div").each((_: any, element: any) => {
    const text = $(element).text();
    const value = $(element).find("strong.value").first().text().trim();

    if (
      /Liquidez média diária/gi.test(text) ||
      /Liq. méd. diária/gi.test(text)
    ) {
      if (!isNaN(parseBrazilianNumber(value))) {
        liquidity = parseBrazilianNumber(value);
      }
    }
  });
  /* price */
  let price;
  /* grossDebtNetWorth */
  let debtToEquityPercent;
  $(".info").each((_: any, element: any) => {
    const title = $(element).find("h3.title").text().trim();
    const value = $(element).find("strong.value").text().trim();
    // price
    if (/Valor atual/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        price = parseBrazilianNumber(value);
      }
    }

    // grossDebtNetWorth
    if (/Patrimônio líquido/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        netWorth = parseBrazilianNumber(value);
      }
    }

    if (/Dívida bruta/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        grossDebt = parseBrazilianNumber(value);
      }
    }
  });
  /* grossDebtNetWorth */
  if (netWorth && grossDebt) {
    debtToEquityPercent = grossDebt / netWorth;
  }

  /* DY */
  let dy;
  /* PE */
  let pe;
  /* P/BV */
  let pbv;
  /* ROE */
  let roe;
  /* CAGR PROFIT */
  let cagrProfit;
  const yearsCagrProfit = 5;
  /* CAGR REVENUE */
  let cagrRevenue;
  const yearsCagrRevenue = 5;
  /* PROFIT MARGIN */
  let profitMargin;
  /* ROIC */
  let roic;
  /* ev/ebit */
  let evEbit;
  /* netDebtEbitda  */
  let netDebtEbitda;
  $(".item").each((_: any, element: any) => {
    const title = $(element).find("h3.title").text().trim();
    const value = $(element).find("strong.value").text().trim();

    // D.Y
    if (/D\.Y/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        dy = parseBrazilianNumber(value);
      }
    }
    // pe
    if (/P\/L/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        pe = parseBrazilianNumber(value);
      }
    }

    // pbv
    if (/P\/VP/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        pbv = parseBrazilianNumber(value);
      }
    }

    // roe
    if (/ROE/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        roe = parseBrazilianNumber(value);
      }
    }

    // ev/ebit
    if (/EV\/EBIT/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        evEbit = parseBrazilianNumber(value);
      }
    }

    // roe
    if (/ROIC/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        roic = parseBrazilianNumber(value);
      }
    }

    // cagr profit
    if (/CAGR Receitas 5 anos/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        cagrProfit = parseBrazilianNumber(value);
      }
    }

    // cagr revenue
    if (/CAGR Lucros 5 anos/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        cagrRevenue = parseBrazilianNumber(value);
      }
    }

    // profit margin
    if (/M\. Líquida/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        profitMargin = parseBrazilianNumber(value);
      }
    }

    // netDebtEbitda
    if (/Dív\. líquida\/EBITDA/gi.test(title)) {
      if (!isNaN(parseBrazilianNumber(value))) {
        netDebtEbitda = parseBrazilianNumber(value);
      }
    }
  });

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
