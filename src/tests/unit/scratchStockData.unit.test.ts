import { describe, it } from "node:test";
import assert from "node:assert";
import { mockCheerioStockHtml } from "../__fixtures__/cheerioFetchedHtml.js";
import { calculateStockIndicatorsFromScratch } from "../../services/scratchStockData.js";
import {
  mockScratchStockData,
  mockTicketStockForScratchFuntion,
} from "../__fixtures__/scratchStockData.js";

describe("calculateIndicatorsScratchedStock units", () => {
  it("should calculate indicators correctly", () => {
    const result = calculateStockIndicatorsFromScratch(
      mockCheerioStockHtml,
      mockTicketStockForScratchFuntion,
    );

    assert.deepStrictEqual(result, mockScratchStockData);
  });
});
