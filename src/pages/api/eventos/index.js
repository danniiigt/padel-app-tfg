import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostEvento(req, res);
      break;

    default:
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
}

const handlePostEvento = async (req, res) => {
  const { eventosArray } = req.body;

  const eventos = await Promise.all(
    eventosArray.map(async (evento) => {
      const eventoGuardado = await prisma.evento.create({
        data: {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          precio: evento.precio,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          pistaId: evento.pistaId,
        },
      });
      return eventoGuardado;
    })
  );

  res.json(eventos);
};
