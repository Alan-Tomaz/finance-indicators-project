import { describe, it } from "node:test";
import { fetchTicketInfoFromYahooFinance } from "../../services/yahooFinance.js";
import { mockTicketStock } from "../__fixtures__/yahooFinance.js";
import assert from "node:assert";

describe("collectStockDataFromYahooFinance integration", () => {
  it("should return the indicators from a stock ticker", async () => {
    const result = await fetchTicketInfoFromYahooFinance(mockTicketStock);

    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.date, "string");
    assert.strictEqual(typeof result.pbv, "number");
    assert.strictEqual(typeof result.pe, "number");
    assert.strictEqual(typeof result.cagrProfit?.create?.value, "number");
    assert.strictEqual(typeof result.cagrProfit?.create?.periodYears, "number");
    assert.strictEqual(
      typeof result.cagrRevenue?.create?.periodYears,
      "number",
    );
    assert.strictEqual(typeof result.cagrRevenue?.create?.value, "number");
    assert.strictEqual(typeof result.dy, "number");
    assert.strictEqual(typeof result.evEbit, "number");
    assert.strictEqual(typeof result.grossDebtNetWorth, "number");
    assert.strictEqual(typeof result.netDebtDivideByEBITDA, "number");
    assert.strictEqual(typeof result.liquidity, "number");
    assert.strictEqual(typeof result.profitMargin, "number");
    assert.strictEqual(typeof result.roe, "number");
    assert.strictEqual(typeof result.roic, "number");
    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.ticker, "string");
    assert.strictEqual(typeof result.assetType, "string");
    assert.strictEqual(typeof result.name, "string");
    assert.strictEqual(typeof result.sector, "string");
  });
});
