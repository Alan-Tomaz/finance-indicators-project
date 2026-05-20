import { prisma } from "../../db/client.js";

describe("stockIndicators integration", () => {
  beforeAll(async () => {
    await prisma.stockIndicators.deleteMany();
    await prisma.stockCagr.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create stock with cagr relation", async () => {
    const stock = await prisma.stockIndicators.create({
      data: {
        ticker: "CMIG4",
        assetType: "STOCK",
        date: "2026-05-19",
        price: 10,

        cagrProfit: {
          create: {
            value: 15,
            periodYears: 3,
          },
        },
      },

      include: {
        cagrProfit: true,
      },
    });

    expect(stock.cagrProfit).not.toBeNull();

    expect(stock.cagrProfit?.value).toBe("15");
  });
});
