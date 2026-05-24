import { describe, it } from "node:test";
import assert from "node:assert";
import { calculateStockIndicatorsFromScrap } from "../../services/scrapStockData.js";
import {
  mockCheerioStockAltHtml,
  mockCheerioStockHtml,
  mockScrapStockData,
  mockScrapStockUsData,
  mockTicketStockForScrapFuntion,
} from "../__fixtures__/scrapStockData.js";
import * as cheerio from "cheerio";
import { mockTicketStockForYahooFinance } from "../__fixtures__/yahooFinance.js";

describe("calculateIndicatorsScrapStock units", () => {
  it("should calculate indicators correctly", () => {
    const result = calculateStockIndicatorsFromScrap(
      mockCheerioStockHtml,
      mockTicketStockForScrapFuntion,
    );

    assert.deepStrictEqual(result, mockScrapStockData);
  });

  it("should calculate indicators correctly for us stocks", () => {
    const result = calculateStockIndicatorsFromScrap(
      mockCheerioStockAltHtml,
      mockTicketStockForYahooFinance,
    );
    assert.deepStrictEqual(result, mockScrapStockUsData);
  });
});
