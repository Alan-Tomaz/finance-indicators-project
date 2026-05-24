import { describe, it } from "node:test";
import { LANGUAGE } from "../../constants/config.js";
import assert from "node:assert";
import { calculateFIIIndicators } from "../../services/scrapFIIData.js";
import {
  mockCheerioFiiHtml,
  mockScrapFiiData,
  mockTicketFii,
} from "../__fixtures__/scrapFIIData.js";

describe("calculateIndicatorsFii units", () => {
  it("should calculate indicators correctly", () => {
    const result = calculateFIIIndicators(mockCheerioFiiHtml, mockTicketFii);

    assert.deepStrictEqual(result, mockScrapFiiData);
  });

  it("should treat undefined values", () => {
    const unmatchedHtml = mockCheerioFiiHtml.replace(
      /var dataLayer_content = ({.*?});/s,
      "",
    );

    assert.throws(
      () => calculateFIIIndicators(unmatchedHtml, mockTicketFii),

      {
        name: "Error",
        message: "Could not find dataLayer_content in the HTML.",
      },
    );
  });
});
