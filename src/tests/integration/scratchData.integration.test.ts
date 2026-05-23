import assert from "node:assert";
import { describe, it } from "node:test";
import { scratchDataFromSite } from "../../services/scratchData.js";

describe("scratchDataFromSite integration", () => {
  it("should return data from the site", async () => {
    const result = await scratchDataFromSite("https://google.com");

    assert.strictEqual(typeof result, "function");
    const html = result.html();
    assert.strictEqual(typeof html, "string");
  });
});
