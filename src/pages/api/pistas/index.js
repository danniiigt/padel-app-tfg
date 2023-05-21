import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostPista(req, res);
      break;

    case "PUT":
      handlePutPista(req, res);
      break;

    case "DELETE":
      handleDeletePista(req, res);
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
    imagenes,
    ubicacionLatitud,
    ubicacionLongitud,
    telefono,
    usuarioId,
    // eventos,
    horarioApertura,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !imagenes ||
    !ubicacionLatitud ||
    !ubicacionLongitud ||
    !telefono ||
    !usuarioId
    // !eventos
  ) {
    res.status(400).json({ error: "Faltan campos por añadir" });
    return;
  }

  try {
    const pista = await prisma.pista.create({
      data: {
        nombre,
        descripcion,
        imagenes,
        ubicacionLatitud,
        ubicacionLongitud,
        telefono,
        usuarioId,
        horarioApertura,
      },
    });

    // eventos.forEach(async (evento) => {
    //   await prisma.evento.create({
    //     data: {
    //       nombre: evento.nombre,
    //       descripcion: evento.descripcion,
    //       precio: evento.precio,
    //       descripcion: evento.descripcion,
    //       fechaInicio: evento.fechaInicio,
    //       fechaFin: evento.fechaFin,
    //       pista: {
    //         connect: {
    //           id: pista.id,
    //         },
    //       },
    //     },
    //   });
    // });

    await prisma.registro.create({
      data: {
        usuarioId,
        fecha: new Date(),
        accion: `Se ha creado la pista ${nombre}`,
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

const handlePutPista = async (req, res) => {
  const {
    pistaId,
    imagen,
    imageUrl,
    tipo,
    nombre,
    telefono,
    ubicacionLatitud,
    ubicacionLongitud,
    horarioApertura,
  } = req.body;

  if (tipo == "EliminarImagen") {
    if (imageUrl && pistaId) {
      try {
        const { imagenes } = await prisma.pista.findUnique({
          where: {
            id: pistaId,
          },
          select: {
            imagenes: true,
          },
        });

        const pista = await prisma.pista.update({
          where: {
            id: pistaId,
          },
          data: {
            imagenes: {
              set: imagenes.filter((img) => img !== imageUrl),
            },
          },
        });

        await prisma.registro.create({
          data: {
            usuarioId: pista.usuarioId,
            fecha: new Date(),
            accion: `Se ha eliminado una imagen a la pista ${pista.nombre}`,
            descripcion: `Se ha eliminado una imagen a la pista ${pista.nombre} con el id ${pista.id} y el usuarioId ${pista.usuarioId}`,
          },
        });

        return res.status(200).json({
          message: "¡Imagen eliminada correctamente!",
          pista,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } else if (tipo == "AñadirImagen") {
    if (!pistaId || !imagen) {
      res.status(400).json({ error: "Faltan campos por añadir" });
      return;
    }

    try {
      const pista = await prisma.pista.update({
        where: {
          id: pistaId,
        },
        data: {
          imagenes: {
            push: imagen,
          },
        },
      });

      await prisma.registro.create({
        data: {
          usuarioId: pista.usuarioId,
          fecha: new Date(),
          accion: `Se ha añadido una imagen a la pista ${pista.nombre}`,
          descripcion: `Se ha añadido una imagen a la pista ${pista.nombre} con el id ${pista.id} y el usuarioId ${pista.usuarioId}`,
        },
      });

      res.status(200).json({
        message: "¡Imagen añadida correctamente!",
        pista,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor. Prueba más tarde" });
    }
  } else if (tipo == "ActualizarInformacion") {
    if (
      !pistaId ||
      !nombre ||
      !telefono ||
      !ubicacionLatitud ||
      !ubicacionLongitud ||
      !horarioApertura
    ) {
      res.status(400).json({ error: "Faltan campos por añadir" });
      return;
    }

    try {
      const pista = await prisma.pista.update({
        where: {
          id: pistaId,
        },
        data: {
          nombre,
          telefono,
          ubicacionLatitud,
          ubicacionLongitud,
          horarioApertura,
        },
      });

      await prisma.registro.create({
        data: {
          usuarioId: pista.usuarioId,
          fecha: new Date(),
          accion: `Se ha actualizado la información de la pista ${pista.nombre}`,
          descripcion: `Se ha actualizado la información de la pista ${pista.nombre} con el id ${pista.id} y el usuarioId ${pista.usuarioId}`,
        },
      });

      res.status(200).json({
        message: "¡Información actualizada correctamente!",
        pista,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor. Prueba más tarde" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos por añadir" });
  }
};
