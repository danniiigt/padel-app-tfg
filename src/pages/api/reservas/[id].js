import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      handleDeleteReserva(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handleDeleteReserva = async (req, res) => {
  const { id } = req.query;

  const transaccion = await prisma.transaccion.deleteMany({
    where: {
      reservaId: id,
    },
  });

  const reserva = await prisma.reserva.delete({
    where: { id: id },
  });

  const evento = await prisma.evento.update({
    where: { id: reserva.eventoId },
    data: {
      ocupada: false,
      nombre: "Libre",
    },
  });

  // DEVUELVE EL SALDO
  const usuarioCliente = await prisma.user.findUnique({
    where: {
      id: reserva.usuarioId,
    },
  });

  const saldo = Number(usuarioCliente.saldo) + Number(evento.precio);
  const usuario = await prisma.user.update({
    where: { id: reserva.usuarioId },
    data: {
      saldo: saldo,
    },
  });

  const pistaUsuarioCreador = await prisma.pista.findUnique({
    where: {
      id: reserva.pistaId,
    },

    include: {
      usuario: {
        select: {
          id: true,
        },
      },
    },
  });

  const usuarioCreador = await prisma.user.findUnique({
    where: {
      id: pistaUsuarioCreador.usuario.id,
    },
  });

  // DEVUELVE EL SALDO AL USUARIO CREADOR DE LA PISTA
  const saldoCreador = Number(usuarioCreador.saldo) - Number(evento.precio);
  const usuarioCreadorUpdate = await prisma.user.update({
    where: { id: usuarioCreador.id },
    data: {
      saldo: saldoCreador,
    },
  });

  res.json(reserva);
};
