import { MainLayout } from "@/shared/layouts/MainLayout";
import { Box, Grid, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import React, { useEffect } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { UsuariosTable } from "@/shared/components/SuperAdmin/UsuariosTable";
import { PistasTable } from "@/shared/components/SuperAdmin/PistasTable";

const SuperAdminPage = ({ user, users, pistas, transacciones }) => {
  user = JSON.parse(user);
  users = JSON.parse(users);
  pistas = JSON.parse(pistas);
  transacciones = JSON.parse(transacciones);

  console.log(pistas);

  useEffect(() => {
    document.title = "Panel De Control - Padel App";
  }, []);

  return (
    <MainLayout user={user}>
      <Grid container mt={4} mb={4} spacing={4}>
        <Grid item xs={12}>
          <UsuariosTable users={users} />
        </Grid>
        <Grid item xs={12}>
          <PistasTable pistas={pistas} />
        </Grid>
      </Grid>
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

  const users = await prisma.user.findMany({
    orderBy: {
      saldo: "desc",
    },
  });
  const pistas = await prisma.pista.findMany({
    // INCLUYYE EL NOMBRE DEL USUARIO
    include: {
      usuario: {
        select: {
          name: true,
        },
      },

      evento: {
        select: {
          id: true,
        },
      },

      reserva: {
        select: {
          id: true,
        },
      },
    },
  });
  const transacciones = await prisma.transaccion.findMany();

  if (user.role !== "SUPERADMIN") {
    return { redirect: { destination: "/home" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
      users: JSON.stringify(users),
      pistas: JSON.stringify(pistas),
      transacciones: JSON.stringify(transacciones),
    },
  };
};

export default SuperAdminPage;
