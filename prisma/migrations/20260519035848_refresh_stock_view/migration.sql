-- This is an empty migration.
DROP VIEW IF EXISTS latest_stock_indicators;

CREATE VIEW latest_stock_indicators AS
SELECT DISTINCT ON (s.ticker)
  s.*,

  cp.value  AS profit_cagr_value,
  cp."periodYears" AS profit_cagr_period,

  cr.value  AS revenue_cagr_value,
  cr."periodYears" AS revenue_cagr_period

FROM "StockIndicators" s

LEFT JOIN "StockCagr" cp
  ON s."stockProfitCagrId" = cp.id

LEFT JOIN "StockCagr" cr
  ON s."stockRevenueCagrId" = cr.id

ORDER BY s.ticker, s."createdAt" DESC;