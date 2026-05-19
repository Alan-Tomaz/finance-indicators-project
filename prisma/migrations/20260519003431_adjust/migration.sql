/*
  Warnings:

  - You are about to drop the column `period` on the `StockCagr` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockCagr" DROP COLUMN "period",
ADD COLUMN     "periodYears" INTEGER;
