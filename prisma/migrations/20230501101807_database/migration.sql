/*
  Warnings:

  - Added the required column `pistaId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "pistaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaccion" ADD COLUMN     "reservaId" TEXT;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_pistaId_fkey" FOREIGN KEY ("pistaId") REFERENCES "Pista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE SET NULL ON UPDATE CASCADE;
