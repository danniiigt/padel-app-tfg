/*
  Warnings:

  - You are about to drop the column `paypalid` on the `Transaccion` table. All the data in the column will be lost.
  - Added the required column `paypalId` to the `Transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaccion" DROP COLUMN "paypalid",
ADD COLUMN     "paypalId" TEXT NOT NULL;
