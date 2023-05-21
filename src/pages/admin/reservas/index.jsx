import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import prisma from "../../../../lib/prisma";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ReservasCharts } from "@/shared/components/Reservas/ReservasCharts";
import { ReservasPistas } from "@/shared/components/Reservas/ReservasPistas";

const ReservasPage = ({ user: userProps, pistas: pistasProps }) => {
  const [user, setUser] = useState(JSON.parse(userProps));
  const [pistas, setPistas] = useState(JSON.parse(pistasProps));
  const [totalReservas, setTotalReservas] = useState(0);

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/admin/reservas",
      text: "Reservas",
    },
  ];

  useEffect(() => {
    setTotalReservas(0);

    pistas.map((pista) => {
      setTotalReservas((prev) => prev + pista.reserva.length);
    });
  }, []);

  useEffect(() => {
    document.title = "Reservas - Padel App";
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Box my={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{
                textDecoration: "2px underline #3454D1",
              }}
            >
              Reservas de pistas
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1.5}
            >
              <Typography variant="body2" fontWeight={300}>
                {totalReservas} reservas totales
              </Typography>
              <Typography variant="body2" fontWeight={300}>
                {pistas.length} pistas
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Grid container my={3} spacing={3}>
          <Grid item xs={3.5}>
            <ReservasCharts pistas={pistas} />
          </Grid>

          <Grid item xs={8.5}>
            <ReservasPistas pistas={pistas} />
          </Grid>
        </Grid>
      </Box>
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

  if (user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  const pistasUsuario = await prisma.pista.findMany({
    where: {
      usuarioId: user.id,
      activa: true,
    },

    include: {
      reserva: {
        include: {
          evento: true,
          usuario: true,
        },

        orderBy: {
          fecha: "asc",
        },
      },
    },
  });

  return {
    props: {
      user: JSON.stringify(user),
      pistas: JSON.stringify(pistasUsuario),
    },
  };
};

export default ReservasPage;
