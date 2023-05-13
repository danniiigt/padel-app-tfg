import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "PUT":
      handlePutRegistro(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handlePutRegistro = async (req, res) => {
  const { id } = req.query;
  const { leido } = req.body;

  const registro = await prisma.registro.update({
    where: {
      id: id,
    },
    data: {
      leido: leido,
    },
  });

  res.json(registro);
};
