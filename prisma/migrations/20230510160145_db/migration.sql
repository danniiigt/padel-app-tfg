-- AlterTable
ALTER TABLE "Transaccion" ALTER COLUMN "paypalId" DROP NOT NULL,
ALTER COLUMN "estado" SET DEFAULT 'Pendiente';
