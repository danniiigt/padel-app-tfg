-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "ocupada" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Pista" ADD COLUMN     "horarioApertura" TEXT NOT NULL DEFAULT '00:00';
