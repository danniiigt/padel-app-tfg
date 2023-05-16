import { MainLayout } from "@/shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { Typography } from "@mui/material";

const MisReservas = ({ user: userProps }) => {
  const [usuario, setUsuario] = useState(JSON.parse(userProps));

  return (
    <MainLayout user={usuario}>
      <Typography>Mis reservas</Typography>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const nextAuthSession = await getServerSession(ctx.req, ctx.res, authOptions);
  let session = null;

  if (nextAuthSession?.user?.user) {
    session = nextAuthSession.user;
  } else {
    session = nextAuthSession;
  }

  if (!session) {
    return { redirect: { destination: "/auth/login" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

export default MisReservas;
