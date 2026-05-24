import assert from "node:assert";
import { describe, it } from "node:test";
import { scrapFIIData } from "../../services/scrapFIIData.js";
import { mockTicketFii } from "../__fixtures__/scrapFIIData.js";

describe("collectFiiDataFromScrapSite integration", () => {
  it("should return the indicators from a fii ticker", async () => {
    const result = await scrapFIIData(mockTicketFii);

    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.rentability?.create?.value, "number");
    assert.strictEqual(
      typeof result.rentability?.create?.periodYears,
      "number",
    );
    assert.strictEqual(typeof result.dy, "number");
    assert.strictEqual(typeof result.lastDividend, "number");
    assert.strictEqual(typeof result.pvp, "number");
    assert.strictEqual(typeof result.quotaHolders, "number");
    assert.strictEqual(typeof result.vpc, "number");
    assert.strictEqual(typeof result.assetsNumber, "number");
    assert.strictEqual(typeof result.liquidity, "number");
    assert.strictEqual(typeof result.price, "number");
    assert.strictEqual(typeof result.ticker, "string");
    assert.strictEqual(typeof result.assetType, "string");
    assert.strictEqual(typeof result.date, "string");
    assert.strictEqual(typeof result.name, "string");
    assert.strictEqual(typeof result.fiiType, "string");
  });
});
