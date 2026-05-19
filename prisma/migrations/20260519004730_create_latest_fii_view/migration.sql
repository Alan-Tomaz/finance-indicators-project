-- CreateIndex
CREATE INDEX "FiiIndicators_ticker_createdAt_idx" ON "FiiIndicators"("ticker", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "StockIndicators_ticker_createdAt_idx" ON "StockIndicators"("ticker", "createdAt" DESC);

CREATE VIEW latest_fii_indicators AS
SELECT DISTINCT ON (f.ticker)

  f.*,

  r.value AS rentability_value,
  r."periodYears" AS rentability_period

FROM "FiiIndicators" f

LEFT JOIN "FiiRentability" r
  ON f."fiiRentabilityId" = r.id

ORDER BY f.ticker, f."createdAt" DESC;