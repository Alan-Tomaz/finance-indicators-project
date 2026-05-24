import { describe, it } from "node:test";
import assert from "node:assert";
import { calculateStockIndicatorsFromScratch } from "../../services/scratchStockData.js";
import {
  mockCheerioStockAltHtml,
  mockCheerioStockHtml,
  mockScratchStockData,
  mockScratchStockUsData,
  mockTicketStockForScratchFuntion,
} from "../__fixtures__/scratchStockData.js";
import * as cheerio from "cheerio";
import { mockTicketStockForYahooFinance } from "../__fixtures__/yahooFinance.js";

describe("calculateIndicatorsScratchedStock units", () => {
  it("should calculate indicators correctly", () => {
    const result = calculateStockIndicatorsFromScratch(
      mockCheerioStockHtml,
      mockTicketStockForScratchFuntion,
    );

    assert.deepStrictEqual(result, mockScratchStockData);
  });

  it("should calculate indicators correctly for us stocks", () => {
    const result = calculateStockIndicatorsFromScratch(
      mockCheerioStockAltHtml,
      mockTicketStockForYahooFinance,
    );
    assert.deepStrictEqual(result, mockScratchStockUsData);
  });
});
