import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "PUT":
      handlePutTransaccion(req, res);
      break;

    default:
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
}

const handlePutTransaccion = async (req, res) => {
  const { id } = req.query;
  const { estado, paypalId } = req.body;

  // INCLUYE EL nombre de usuario de la transaccion
  const result = await prisma.transaccion.update({
    where: { id: id },
    data: {
      estado: estado,
      paypalId: paypalId,
    },

    include: {
      usuario: {
        select: {
          name: true,
          email: true,
          paypalId: true,
        },
      },
    },
  });

  if (estado.toLowerCase() === "cancelada") {
    // DEVUELVE EL SALDO AL USUARIO
    const usuario = await prisma.user.findUnique({
      where: { id: result.usuarioId },
    });

    const saldo = Number(usuario.saldo) + Number(result.amount);

    await prisma.user.update({
      where: { id: result.usuarioId },
      data: {
        saldo: saldo,
      },
    });

    // CREA EL REGISTRO
    await prisma.registro.create({
      data: {
        fecha: new Date(),
        accion: `Retiro denegado - Se ha devuelto el saldo (${result.amount}€) a tu cuenta`,
        descripcion: `Retiro denegado - Se ha devuelto el saldo (${result.amount}) a tu cuenta`,
        usuarioId: result.usuarioId,
      },
    });
  } else if (estado.toLowerCase() === "completada") {
    await prisma.registro.create({
      data: {
        fecha: new Date(),
        accion: `Se ha aprobado tu retiro de ${result.amount}€`,
        descripcion: `Se ha aprobado tu retiro de ${result.amount}€ a tu cuenta de PayPal ${result.paypalId}`,
        usuarioId: result.usuarioId,
      },
    });
  }

  res.json(result);
};
