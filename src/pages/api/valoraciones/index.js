import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostValoracion(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handlePostValoracion = async (req, res) => {
  const { texto, puntuacion, usuarioId, pistaId } = req.body;

  const dueñoPista = await prisma.pista.findUnique({
    where: {
      id: pistaId,
    },

    select: {
      usuarioId: true,
      nombre: true,
    },
  });

  const valoracion = await prisma.valoracion.create({
    data: {
      texto: texto,
      puntuacion: puntuacion,
      usuarioId: usuarioId,
      pistaId: pistaId,
    },

    include: {
      usuario: true,
    },
  });

  // CREA UN REGISTRO PARA EL CREADOR DE LA PISTA
  const registro = await prisma.registro.create({
    data: {
      fecha: new Date(),
      accion: `El usuario ${valoracion.usuario.name} ha publicado una reseña en la pista ${dueñoPista.nombre}`,
      descripcion: `${valoracion.usuario.name} ha publicado una reseña en la pista ${dueñoPista.nombre}`,
      usuarioId: dueñoPista.usuarioId,
    },
  });

  res.json(valoracion);
};
