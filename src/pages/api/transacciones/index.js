import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostTransaccion(req, res);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

const handlePostTransaccion = async (req, res) => {
  const { tipo } = req.body;

  switch (tipo) {
    case "Depósito":
      handleDeposito(req, res);
      break;

    case "Retiro":
      handleRetiro(req, res);
      break;

    default:
      res.status(405).end(`Porfavor especifique el tipo de transacción`);
      break;
  }
};

const handleDeposito = async (req, res) => {
  const { amount, tipo, usuarioId, paypalId, reservaId } = req.body;

  try {
    await prisma.transaccion.create({
      data: {
        fecha: new Date(),
        amount: amount,
        tipo: tipo,
        usuarioId: usuarioId,
        paypalId: paypalId,
        reservaId: reservaId,
        estado: "Completada",
      },
    });

    const usuario = await prisma.user.findUnique({
      where: {
        id: usuarioId,
      },
    });

    await prisma.user.update({
      where: {
        id: usuarioId,
      },
      data: {
        saldo: Number(usuario.saldo) + Number(amount),
      },
    });

    await prisma.registro.create({
      data: {
        fecha: new Date(),
        accion: `Depósito de ${amount}€ a través de PayPal`,
        descripcion: `Depósito de ${amount}€ a través de PaypPal con el id ${paypalId}. Estado: Completada`,
        usuarioId: usuarioId,
      },
    });

    return res
      .status(200)
      .json({ message: "Depósito realizado correctamente" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Algo ha ido mal. Intenta de nuevo más tarde" });
  }
};

const handleRetiro = async (req, res) => {
  const { amount, tipo, usuarioId, estado } = req.body;

  try {
    await prisma.transaccion.create({
      data: {
        fecha: new Date(),
        amount: amount,
        tipo: tipo,
        usuarioId: usuarioId,
        estado: estado,
      },
    });

    const usuario = await prisma.user.findUnique({
      where: {
        id: usuarioId,
      },
    });

    await prisma.user.update({
      where: {
        id: usuarioId,
      },
      data: {
        saldo: Number(usuario.saldo) - Number(amount),
      },
    });

    await prisma.registro.create({
      data: {
        fecha: new Date(),
        accion: `Solicitud de retiro de ${amount}€ a través de PayPal`,
        descripcion: `Solicitud de retiro de ${amount}€ a través de PayPal. Estado: ${estado}`,
        usuarioId: usuarioId,
      },
    });

    res
      .status(200)
      .json({ message: "Se ha solicitado el retiro correctamente." });
    // TODO: MANDAR UN CORREO AL SUPERADMIN PARA QUE APRUEBE EL RETIRO
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Algo ha ido mal. Intenta de nuevo más tarde" });
  }
};
