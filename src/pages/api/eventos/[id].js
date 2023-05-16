import prisma from "../../../../lib/prisma";
import { sendMail } from "../../../../utils/sendMail";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  switch (req.method) {
    case "PUT":
      handlePutEvento(req, res);
      break;

    default:
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
}

const handlePutEvento = async (req, res) => {
  const { id } = req.query;
  const { idUsuario, idPista } = req.body;

  const dueñoPista = await prisma.pista.findUnique({
    where: {
      id: idPista,
    },

    include: {
      usuario: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const pista = await prisma.pista.findUnique({
    where: {
      id: idPista,
    },
  });

  const reserva = await prisma.reserva.create({
    data: {
      fecha: new Date(),
      fechaModificacion: new Date(),
      activa: true,
      usuarioId: idUsuario,
      eventoId: id,
      pistaId: idPista,
    },

    include: {
      usuario: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const evento = await prisma.evento.update({
    where: {
      id: id,
    },

    data: {
      ocupada: true,
      nombre: "Ocupada",
      reserva: {
        connect: {
          id: reserva.id,
        },
      },
    },
  });

  // RESTA EL SALDO AL USUARIO
  const usuario = await prisma.user.update({
    where: {
      id: idUsuario,
    },
    data: {
      saldo: {
        decrement: evento.precio,
      },
    },
  });

  // SUMA EL SALDO AL DUEÑO DE LA PISTA
  const usuarioDueño = await prisma.user.update({
    where: {
      id: dueñoPista.usuario.id,
    },
    data: {
      saldo: {
        increment: evento.precio,
      },
    },
  });

  // CREA LAS TRANSACCIONES PARA AMBOS USUARIOS
  const transaccionCliente = await prisma.transaccion.create({
    data: {
      fecha: new Date(),
      amount: evento.precio,
      tipo: "Reserva de pista",
      estado: "Completada",
      usuarioId: idUsuario,
      reservaId: reserva.id,
    },
  });

  const transaccionDueño = await prisma.transaccion.create({
    data: {
      fecha: new Date(),
      amount: evento.precio,
      tipo: "Pago de reserva",
      estado: "Completada",
      usuarioId: dueñoPista.usuario.id,
      reservaId: reserva.id,
    },
  });

  // ENVIA LOS CORREOS
  const resultadoCorreoCliente = await sendMail(
    usuario.email,
    "Reserva de Pista",
    "Reserva de Pista",

    //TEXTO PLANO DANDO LAS GRACIAS
    `¡Gracias por tu reserva en ${
      pista.nombre
    }!<br />La fecha de la reserva es ${new Date(
      evento.fechaInicio
    ).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    })}<br />El código secreto es: ${uuidv4()}<br />¡Alli te esperamos!`,
    reserva.usuario.name
  );

  const resultadoCorreoDueño = await sendMail(
    dueñoPista.usuario.email,
    "Reserva de Pista",
    "Reserva de Pista",

    `El usuario ${reserva.usuario.name} ha reservado tu pista ${
      pista.nombre
    } para la fecha ${new Date(evento.fechaInicio).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    })}`,
    dueñoPista.usuario.name
  );

  // CREA UN REGISTRO PARA EL USUARIO DUEÑO
  await prisma.registro.create({
    data: {
      fecha: new Date(),
      accion: `${reserva.usuario.name} ha hecho una reserva en ${pista.nombre}`,
      descripcion: `El usuario ${
        reserva.usuario.name
      } ha hecho una reserva en ${pista.nombre} para la fecha ${new Date(
        evento.fechaInicio
      ).toLocaleString("es-ES", {
        dateStyle: "short",
        timeStyle: "short",
      })}`,
      usuarioId: dueñoPista.usuario.id,
    },
  });

  res.json({ reserva, evento, usuario });
};
