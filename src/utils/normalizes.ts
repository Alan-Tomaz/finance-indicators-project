import type { ITicker } from "../models/financial.js";

/**
 * Normalizes the dy value
 * @param {number} dy the dy value
 * @returns {number} the dy value normalized
 */
export const normalizeDy = (dy: number): number => {
  return dy > 1 ? dy : dy * 100;
};

/**
 * Normalizes ticker to correct check
 * @param {string} ticker the ticker to be normalized
 * @param {string} exchange exchange of the ticke
 * @returns {string} the ticker normalized
 */
export function normalizeTickerForYahooFinance(ticker: ITicker): string {
  switch (ticker.exchange) {
    case "BVMF":
      return `${ticker.ticker}.SA`;

    case "NASDAQ":
      return ticker.ticker;

    case "NYSE":
      return ticker.ticker;

    case "CRYPTO":
      switch (ticker.ticker) {
        case "BITCOIN":
          return "BTC-USD";
        case "ETHEREUM":
          return "ETH-USD";
        default:
          return ticker.ticker;
      }

    default:
      return ticker.ticker;
  }
}

export function toPercent(value: number) {
  return Number((value * 100).toFixed(2));
}

export function parseToNumber(value: string): number {
  let normalized = value
    // Remove símbolos de moeda e percentual
    .replace("%", "")
    .replace("-", "")
    .replace("R$", "")
    .replace("US$", "")
    .trim();

  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (normalized.includes(".")) {
    const parts = normalized.split(".");
    if (parts.length > 2) {
      normalized = parts.slice(0, -1).join("") + "." + parts[parts.length - 1];
    }
    normalized = normalized.replace(",", "");
  }

  if (normalized === "") {
    return NaN;
  }

  const numberFiltered = Number(normalized);

  return numberFiltered;
}
