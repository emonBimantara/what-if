/*
  Warnings:

  - Added the required column `burdenLevel` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `burdenRatio` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanAmount` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyPayment` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainingCashFlow` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInterest` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPayment` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "burdenLevel" TEXT NOT NULL,
ADD COLUMN     "burdenRatio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loanAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monthlyPayment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "remainingCashFlow" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalInterest" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPayment" DOUBLE PRECISION NOT NULL;
