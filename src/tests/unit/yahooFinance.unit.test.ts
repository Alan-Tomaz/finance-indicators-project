import { describe, it } from "node:test";
import { LANGUAGE } from "../../constants/config.js";
import {
  calcCagrYahooFinance,
  calcIndicatorsFromYahooFinance,
  calculateROICYahooFinance,
} from "../../services/yahooFinance.js";
import { formatDate } from "../../utils/formatDate.js";
import {
  mockFundamentals,
  mockFundamentalsUndefined,
  mockQuote,
  mockQuoteUndefined,
  mockTicketStockForYahooFinance,
  mockYahooFinanceFunctionResponse,
  mockYahooFinanceFunctionResponseNull,
} from "../__fixtures__/yahooFinance.js";
import assert from "node:assert";

describe("collectStockDataFromYahooFinance units", () => {
  it("should calculate debt to equity correctly", () => {
    const result = calcIndicatorsFromYahooFinance(
      mockQuote,
      mockFundamentals,
      mockTicketStockForYahooFinance,
    );

    assert.deepStrictEqual(result, mockYahooFinanceFunctionResponse);
  });

  it("should treat undefined values", () => {
    const result = calcIndicatorsFromYahooFinance(
      mockQuoteUndefined,
      mockFundamentalsUndefined,
      mockTicketStockForYahooFinance,
    );

    assert.deepStrictEqual(result, mockYahooFinanceFunctionResponseNull);
  });

  it("should return empty object if quote is missing", () => {
    const result = calcIndicatorsFromYahooFinance(
      null,
      [],
      mockTicketStockForYahooFinance,
    );

    assert.deepStrictEqual(result, {});
  });

  it("should return empty object when fundamentals are empty", () => {
    const result = calcIndicatorsFromYahooFinance(
      mockQuote,
      [],
      mockTicketStockForYahooFinance,
    );

    assert.deepStrictEqual(result, {});
  });

  it("should return null when investedCapital is zero", () => {
    const result = calculateROICYahooFinance({
      EBIT: 1000,
      taxRateForCalcs: 0.3,
      investedCapital: 0,
    });

    assert.strictEqual(result, null);
  });
});
