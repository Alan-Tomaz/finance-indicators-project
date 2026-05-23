import { LANGUAGE } from "../../constants/config.js";
import type { StockIndicatorsCreateInput } from "../../generated/prisma/models.js";
import type { ITicker } from "../../models/financial.js";
import { formatDate } from "../../utils/formatDate.js";

export const mockScratchStockData: StockIndicatorsCreateInput = {
  date: formatDate(new Date(), LANGUAGE),
  ticker: "CMIG4",
  assetType: "AÇÃO",
  name: "CIA ENERGETICA DE MINAS GERAIS - CEMIG",
  sector: "Utilidade Pública: Energia Elétrica",
  price: 11.22,
  pe: 6.64,
  pbv: 1.11,
  dy: 11.31,
  roe: 16.75,
  profitMargin: 11.15,
  evEbit: 8.21,
  roic: 12.58,
  netDebtDivideByEBITDA: 5.83,
  cagrProfit: {
    create: {
      value: 11.13,
      periodYears: 5,
    },
  },
  cagrRevenue: {
    create: {
      periodYears: 5,
      value: 11.05,
    },
  },
  liquidity: 160690112.5,
  grossDebtNetWorth: 0.678855758378031,
};

export const mockTicketStockForScratchFuntion: ITicker = {
  assetType: "AÇÃO",
  exchange: "BVMF",
  ticker: "CMIG4",
};
