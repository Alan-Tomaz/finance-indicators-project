/* import assert from "node:assert";
import { describe, it } from "node:test";
import { scratchStockData } from "../../services/scratchStockData.js";
import { mockTicketStockForScratchFuntion } from "../__fixtures__/scratchStockData.js";

describe("collectStockDataFromScratchSite integration", () => {
  it("should return the indicators from a stock ticker", async () => {
    const result = await scratchStockData(mockTicketStockForScratchFuntion);

    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.cagrProfit?.create?.value, "number");
    assert.strictEqual(typeof result.cagrProfit?.create?.periodYears, "number");
    assert.strictEqual(typeof result.cagrRevenue?.create?.value, "number");
    assert.strictEqual(
      typeof result.cagrRevenue?.create?.periodYears,
      "number",
    );
    assert.strictEqual(typeof result.evEbit, "number");
    assert.strictEqual(typeof result.grossDebtNetWorth, "number");
    assert.strictEqual(typeof result.netDebtDivideByEBITDA, "number");
    assert.strictEqual(typeof result.pe, "number");
    assert.strictEqual(typeof result.pbv, "number");
    assert.strictEqual(typeof result.profitMargin, "number");
    assert.strictEqual(typeof result.roe, "number");
    assert.strictEqual(typeof result.roic, "number");
    assert.strictEqual(typeof result.sector, "string");
    assert.strictEqual(typeof result.dy, "number");
    assert.strictEqual(typeof result.liquidity, "number");
    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.ticker, "string");
    assert.strictEqual(typeof result.assetType, "string");
    assert.strictEqual(typeof result.date, "string");
    assert.strictEqual(typeof result.name, "string");
  });
});
 */
