-- AlterTable
ALTER TABLE "User" ADD COLUMN     "businessName" TEXT;

-- CreateTable
CREATE TABLE "Registro" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "accion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
