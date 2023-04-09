/*
  Warnings:

  - You are about to drop the column `ubicacion` on the `Pista` table. All the data in the column will be lost.
  - Added the required column `ubicacionLatitud` to the `Pista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacionLongitud` to the `Pista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pista" DROP COLUMN "ubicacion",
ADD COLUMN     "ubicacionLatitud" TEXT NOT NULL,
ADD COLUMN     "ubicacionLongitud" TEXT NOT NULL;
