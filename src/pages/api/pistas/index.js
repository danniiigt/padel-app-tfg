import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostPista(req, res);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

const handlePostPista = async (req, res) => {
  const {
    nombre,
    descripcion,
    imagen,
    ubicacionLatitud,
    ubicacionLongitud,
    telefono,
    usuarioId,
    eventos,
    horarioApertura,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !imagen ||
    !ubicacionLatitud ||
    !ubicacionLongitud ||
    !telefono ||
    !usuarioId ||
    !eventos
  ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const pista = await prisma.pista.create({
      data: {
        nombre,
        descripcion,
        imagen,
        ubicacionLatitud,
        ubicacionLongitud,
        telefono,
        usuarioId,
        horarioApertura,
      },
    });

    eventos.forEach(async (evento) => {
      await prisma.evento.create({
        data: {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          precio: evento.precio,
          descripcion: evento.descripcion,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          pista: {
            connect: {
              id: pista.id,
            },
          },
        },
      });
    });

    await prisma.registro.create({
      data: {
        usuarioId,
        fecha: new Date(),
        accion: `Se ha creado la pista ${nombre}}`,
        descripcion: `Se ha creado la pista ${nombre} con el id ${pista.id} y el usuarioId ${usuarioId}`,
      },
    });

    res.status(200).json({
      message: "¡Pista creada correctamente!",
      pista,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
