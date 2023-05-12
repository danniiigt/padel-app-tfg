import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "PUT":
      handleActualizarUsuario(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handleActualizarUsuario = async (req, res) => {
  const { id, name, businessName, paypalId } = req.body;

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      businessName: businessName,
      paypalId: paypalId,
    },
  });

  if (!user) return res.status(404).end(`El usuario con id ${id} no existe`);

  return res.status(200).json(user);
};
