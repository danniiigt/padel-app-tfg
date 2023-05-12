import prisma from "../../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostUsuarioEmail(req, res);
      break;

    default:
      res.status(405).end(`El método ${req.method} no está permitido`);
      break;
  }
}

const handlePostUsuarioEmail = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    return res.status(200).json({
      message: `El usuario con email ${email} no existe`,
      ok: false,
    });

  return res.status(200).json(user);
};
