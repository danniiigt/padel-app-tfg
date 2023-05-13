import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Link from "next/link";
import { Box, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box paddingX={5}>
      <h1>Padel App</h1>
      <Stack direction="row" spacing={5}>
        <Link href="/auth/login">Iniciar Sesión</Link>
        <Link href="/auth/login">Registrarse</Link>
      </Stack>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const nextAuthSession = await getServerSession(ctx.req, ctx.res, authOptions);

  if (nextAuthSession) {
    return {
      redirect: {
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
