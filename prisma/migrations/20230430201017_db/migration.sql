-- AlterTable
ALTER TABLE "User" ADD COLUMN     "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Valoracion" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "pistaId" TEXT NOT NULL,

    CONSTRAINT "Valoracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaccion" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "paypalid" TEXT NOT NULL,

    CONSTRAINT "Transaccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_pistaId_fkey" FOREIGN KEY ("pistaId") REFERENCES "Pista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
