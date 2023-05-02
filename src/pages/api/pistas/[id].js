import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      handleDeletePista(req, res);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

const handleDeletePista = async (req, res) => {
  const { id } = req.query;
  const idPista = id.split("-")[0];
  const idUsuario = id.split("-")[1];

  if (!id) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // SET THE FIELD ACTIVA TO FALSE
    const pista = await prisma.pista.update({
      where: {
        id: idPista,
      },
      data: {
        activa: false,
      },
    });

    await prisma.registro.create({
      data: {
        fecha: new Date(),
        accion: `Se ha eliminado la pista ${pista.nombre}`,
        descripcion: `Se ha eliminado la pista ${pista.nombre} con el id ${pista.id} y el usuarioId ${idUsuario}`,

        usuario: {
          connect: {
            id: idUsuario,
          },
        },
      },
    });

    res.status(200).json({
      message: "¡Pista eliminada correctamente!",
      pista,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
