import assert from "node:assert";
import { describe, it } from "node:test";
import { scrapDataFromSite } from "../../services/scrapData.js";

describe("scrapDataFromSite integration", () => {
  it("should return data from the site", async () => {
    const result = await scrapDataFromSite(
      "https://investidor10.com.br/stocks/aapl/",
    );

    assert.strictEqual(typeof result, "function");
    const html = result.html();
    assert.strictEqual(typeof html, "string");
  });
});
