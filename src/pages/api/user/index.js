import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "PUT":
      handleActualizarUsuario(req, res);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
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

  if (!user) return res.status(404).end(`User with id ${id} not found`);

  return res.status(200).json(user);
};
