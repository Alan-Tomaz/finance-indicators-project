import type { ITicker } from "../models/financial.js";
import { saveTextInFile } from "../utils/saveTextInFile.js";
import { LANGUAGE, NODE_ENV } from "../constants/config.js";
import { formatDate } from "../utils/formatDate.js";
import type { Prisma } from "../generated/prisma/client.js";
import { scrapDataFromSite } from "./scrapData.js";
import { parseToNumber } from "../utils/normalizes.js";
import * as cheerio from "cheerio";

/*
 * Fetches data from the site Investidor10 for a given ticket for a stock and calculates financial indicators based on the fetched data.
 * @param {ITicker} ticker The stocker ticker symbol to fetch data
 * @returns {Prisma.StockIndicatorsCreateInput} - An object containing calculated financial indicators
 */
export const scrapStockData = async (ticker: ITicker) => {
  try {
    //filers for the statusinvest site
    /* const filters = {
      isEua: ticker.exchange != "BVMF",
      assetType:
        ticker.assetType === "STOCK"
          ? "acoes"
          : ticker.assetType === "AÇÃO"
            ? "acoes"
            : ticker.assetType.includes("ETF")
              ? "etfs"
              : "",
    }; */

    const filters = {
      assetType:
        ticker.assetType === "STOCK"
          ? "stocks"
          : ticker.assetType === "AÇÃO"
            ? "acoes"
            : ticker.assetType === "ETF BR"
              ? "etfs"
              : ticker.assetType === "ETF US"
                ? "etfs-global"
                : "",
    };

    const url = `https://investidor10.com.br/${filters.assetType}/${ticker.ticker}`;

    const $ = await scrapDataFromSite(url);

    const html = $.html();
    //
    /*     if (NODE_ENV === "dev") {
      saveTextInFile(html);
    } */

    const stockIndicators: Prisma.StockIndicatorsCreateInput =
      calculateStockIndicatorsFromScrap(html, ticker);

    console.log(
      `Info for ticket ${ticker.ticker} fetched successfully from Investidor10.`,
    );
    return stockIndicators;
  } catch (error) {
    throw new Error(
      `Error fetching ticket ${ticker.ticker} from Investidor10 (Site): ${error}`,
    );
  }
};

// CALC ALL FINANCIAL INDICATORS
// Return values as null if undefined or null
export const calculateStockIndicatorsFromScrap = (
  html: any,
  ticket: ITicker,
): Prisma.StockIndicatorsCreateInput => {
  const match = html.match(/var mainTicker = ({.*?});/s);
  let varData;
  if (match && match.length >= 2) {
    varData = JSON.parse(match[1]);
  }

  const $ = cheerio.load(html);

  if (!$) {
    console.error("Failed to load HTML content.");
    return {} as Prisma.StockIndicatorsCreateInput;
  }

  // name
  const newName = $("h2.name-company").text().trim();
  let name = newName || ticket.ticker;

  // price
  let price = parseToNumber($("div._card.cotacao span.value").text().trim());

  // sector
  let sector;
  let newSector: any;
  let subSector: any;
  let industry: any;
  // liquidity
  let liquidity;
  $(".cell").each((_: any, element: any) => {
    const title = $(element).find(".title").text().trim();
    const value = $(element).find(".value").text().trim();

    // sector
    if (/(?<!Sub)Setor/gi.test(title)) {
      newSector = value;
    }

    if (/Segmento/gi.test(title)) {
      subSector = value;
    }

    if (/Indústria/gi.test(title)) {
      industry = value;
    }

    // liquidity
    if (!isNaN(parseToNumber(value))) {
      liquidity = parseToNumber(value);
    }
  });
  // sector
  if (newSector && subSector) {
    sector = `${newSector}: ${subSector || industry}`;
  }

  $(".cell").each((_: any, element: any) => {
    const title = $(element).find(".title").text().trim();
    const value = $(element).find(".value .detail-value").text().trim();
    // liquidity
    if (/Liquidez Média Diária/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        liquidity = parseToNumber(value);
      }
    }
  });

  // grossDebtNetWorth
  let debtToEquityPercent;
  // DY
  let dy;
  // PE
  let pe;
  // P/BV
  let pbv;
  // ROE
  let roe;
  // CAGR PROFIT
  let cagrProfit;
  const yearsCagrProfit = 5;
  // CAGR REVENUE
  let cagrRevenue;
  const yearsCagrRevenue = 5;
  // PROFIT MARGIN
  let profitMargin;
  // ROIC
  let roic;
  // ev/ebit
  let evEbit;
  // netDebtEbitda
  let netDebtEbitda;
  $(".cell").each((_: any, element: any) => {
    const title = $(element).find("span").text().trim();
    const titleh3 = $(element).find("h3").text().trim();
    const value = $(element).find("div.value span").text().trim();

    // D.Y
    if (/Dividend Yield/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        dy = parseToNumber(value);
      }
    }
    // pe
    if (/P\/L/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        pe = parseToNumber(value);
      }
    }

    // pbv
    if (/P\/VP/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        pbv = parseToNumber(value);
      }
    }

    // roe
    if (/ROE/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        roe = parseToNumber(value);
      }
    }

    // ev/ebit
    if (/EV\/EBIT/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        evEbit = parseToNumber(value);
      }
    }

    // roe
    if (/ROIC/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        roic = parseToNumber(value);
      }
    }

    // cagr profit
    if (
      /CAGR Receitas 5 anos/gi.test(title) ||
      /CAGR Receitas 5 anos/gi.test(titleh3)
    ) {
      if (!isNaN(parseToNumber(value))) {
        cagrProfit = parseToNumber(value);
      }
    }

    // cagr revenue
    if (
      /CAGR Lucros 5 anos/gi.test(title) ||
      /CAGR Lucros 5 anos/gi.test(titleh3)
    ) {
      if (!isNaN(parseToNumber(value))) {
        cagrRevenue = parseToNumber(value);
      }
    }

    // profit margin
    if (/Margem Líquida/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        profitMargin = parseToNumber(value);
      }
    }

    // netDebtEbitda
    if (/Dívida Líquida \/ Ebitda/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        netDebtEbitda = parseToNumber(value);
      }
    }

    if (/Dívida Bruta \/ Patrimônio/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        debtToEquityPercent = parseToNumber(value);
      }
    }
  });

  if (varData) {
    if (varData?.bdr?.daily_liquidity) {
      liquidity = varData.bdr.daily_liquidity;
    }

    if (varData?.company_name) {
      name = varData.company_name;
    }

    if (
      varData?.industry?.english_name &&
      varData?.industry?.sector?.english_name
    ) {
      sector = `${varData.industry.sector.english_name}: ${varData.industry.english_name}`;
    }

    if (
      varData?.industry?.english_name &&
      varData?.industry?.sector?.english_name
    ) {
      sector = `${varData.industry.sector.english_name}: ${varData.industry.english_name}`;
    }

    if (
      varData?.quotations &&
      varData.quotations.length > 0 &&
      varData.quotations[varData.quotations.length - 1]?.price
    ) {
      price = varData.quotations[varData.quotations.length - 1].price;
    }

    if (
      varData?.balances &&
      varData.balances.length > 0 &&
      varData.balances[0]?.roe
    ) {
      roe = parseToNumber(varData.balances[0].roe);
    }

    if (
      varData?.balances &&
      varData.balances.length > 0 &&
      varData.balances[0]?.dy
    ) {
      dy = parseToNumber(varData.balances[0].dy);
    }

    if (
      varData?.balances &&
      varData.balances.length > 0 &&
      varData.balances[0]?.roic
    ) {
      roic = parseToNumber(varData.balances[0].roic);
    }

    if (
      varData?.balances &&
      varData.balances.length > 0 &&
      varData.balances[0]?.pl
    ) {
      pe = parseToNumber(varData.balances[0].pl);
    }

    if (
      varData?.balances &&
      varData.balances.length > 0 &&
      varData.balances[0]?.pvp
    ) {
      pbv = parseToNumber(varData.balances[0].pvp);
    }

    if (varData?.balances?.[0]?.api_info?.valuation_ratios?.ev_ebit) {
      evEbit = varData.balances[0].api_info.valuation_ratios.ev_ebit;
    }

    if (varData?.balances?.[0]?.api_info?.income_statement?.net_margin) {
      profitMargin = varData.balances[0].api_info.income_statement.net_margin;
    }
  }

  // ===== STOCK INDICATORS =====
  const ticketInfo: Prisma.StockIndicatorsCreateInput = {
    assetType: ticket.assetType,
    ticker: ticket.ticker,
    // FORMAT DATE IN DD/MM/YYYY FORMAT
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

// Example in the statusinvest site: https://statusinvest.com.br/acoes/b3sa3
/* export const calculateStockIndicatorsFromScrap = (
  html: any,
  ticket: ITicker,
): Prisma.StockIndicatorsCreateInput => {
  const $ = cheerio.load(html);

  if (!$) {
    console.error("Quote or fundamentalsTimeSeries data is missing.");
    return {} as Prisma.StockIndicatorsCreateInput;
  }

  // name
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
  // sector
  if (newSector && subSector) {
    sector = `${newSector}: ${subSector}`;
  }

  if (englishSector && englishSubSector && ticket.exchange != "BVMF") {
    sector = `${englishSector}: ${englishSubSector}`;
  }
  // liquidity
  let liquidity;

  $("div").each((_: any, element: any) => {
    const text = $(element).text();
    const value = $(element).find("strong.value").first().text().trim();

    if (
      /Liquidez média diária/gi.test(text) ||
      /Liq. méd. diária/gi.test(text)
    ) {
      if (!isNaN(parseToNumber(value))) {
        liquidity = parseToNumber(value);
      }
    }
  });
  // price
  let price;
  // grossDebtNetWorth
  let debtToEquityPercent;
  $(".info").each((_: any, element: any) => {
    const title = $(element).find("h3.title").text().trim();
    const value = $(element).find("strong.value").text().trim();
    // price
    if (/Valor atual/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        price = parseToNumber(value);
      }
    }

    // grossDebtNetWorth
    if (/Patrimônio líquido/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        netWorth = parseToNumber(value);
      }
    }

    if (/Dívida bruta/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        grossDebt = parseToNumber(value);
      }
    }
  });
  //grossDebtNetWorth
  if (netWorth && grossDebt) {
    debtToEquityPercent = grossDebt / netWorth;
  }

  // DY
  let dy;
  // PE
  let pe;
  // P/BV
  let pbv;
  // ROE
  let roe;
  // CAGR PROFIT
  let cagrProfit;
  const yearsCagrProfit = 5;
  // CAGR REVENUE
  let cagrRevenue;
  const yearsCagrRevenue = 5;
  // PROFIT MARGIN
  let profitMargin;
  // ROIC
  let roic;
  // ev/ebit
  let evEbit;
  // netDebtEbitda
  let netDebtEbitda;
  $(".item").each((_: any, element: any) => {
    const title = $(element).find("h3.title").text().trim();
    const value = $(element).find("strong.value").text().trim();

    // D.Y
    if (/D\.Y/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        dy = parseToNumber(value);
      }
    }
    // pe
    if (/P\/L/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        pe = parseToNumber(value);
      }
    }

    // pbv
    if (/P\/VP/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        pbv = parseToNumber(value);
      }
    }

    // roe
    if (/ROE/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        roe = parseToNumber(value);
      }
    }

    // ev/ebit
    if (/EV\/EBIT/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        evEbit = parseToNumber(value);
      }
    }

    // roe
    if (/ROIC/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        roic = parseToNumber(value);
      }
    }

    // cagr profit
    if (/CAGR Receitas 5 anos/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        cagrProfit = parseToNumber(value);
      }
    }

    // cagr revenue
    if (/CAGR Lucros 5 anos/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        cagrRevenue = parseToNumber(value);
      }
    }

    // profit margin
    if (/M\. Líquida/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        profitMargin = parseToNumber(value);
      }
    }

    // netDebtEbitda
    if (/Dív\. líquida\/EBITDA/gi.test(title)) {
      if (!isNaN(parseToNumber(value))) {
        netDebtEbitda = parseToNumber(value);
      }
    }
  });

  // ===== STOCK INDICATORS =====
  const ticketInfo: Prisma.StockIndicatorsCreateInput = {
    assetType: ticket.assetType,
    ticker: ticket.ticker,
    // FORMAT DATE IN DD/MM/YYYY FORMAT
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
 */
