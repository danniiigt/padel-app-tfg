import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      handleDeleteUsuario(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handleDeleteUsuario = async (req, res) => {
  const { id } = req.query;

  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  if (!user) return res.status(404).end(`El usuario con id ${id} no existe`);

  return res.status(200).json(user);
};
