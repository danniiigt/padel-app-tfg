/*
  Warnings:

  - You are about to drop the column `imagen` on the `Pista` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pista" DROP COLUMN "imagen",
ADD COLUMN     "imagenes" TEXT[];
