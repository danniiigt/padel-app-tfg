import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostRegistro(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handlePostRegistro = async (req, res) => {
  const { usuarioId, leido = false } = req.body;

  const registros = await prisma.registro.findMany({
    where: {
      usuarioId: usuarioId,
      leido: leido,
    },
    orderBy: {
      fecha: "desc",
    },
  });

  res.json(registros);
};
