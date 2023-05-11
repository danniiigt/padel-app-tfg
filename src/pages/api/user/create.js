import sha256 from "crypto-js/sha256";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `El método ${req.method} no está permitido en /api/user/create`
    );
  }
}

const hashPassword = (password) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}
