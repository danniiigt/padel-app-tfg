import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useRouter } from "next/router";
import { DashboardDepositos } from "@/shared/components/DashboardDepositos";
import { DashboardRetiradas } from "@/shared/components/DashboardRetiradas";
import prisma from "../../../lib/prisma";
import { DashboardBancoReservas } from "@/shared/components/DashboardBancoReservas";

const BancoPage = ({
  user,
  transaccionesDepositos,
  transaccionesRetiradas,
  transaccionesReservas,
}) => {
  user = JSON.parse(user);
  transaccionesDepositos = JSON.parse(transaccionesDepositos);
  transaccionesRetiradas = JSON.parse(transaccionesRetiradas);
  transaccionesReservas = JSON.parse(transaccionesReservas);

  const esAdmin = user.role.toLowerCase() == "admin";

  const router = useRouter();

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/banco",
      text: "Banco",
    },
  ];

  const handleRedirect = (path) => {
    router.push(path);
  };

  useEffect(() => {
    document.title = "Banco - Padel App";
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Box mt={4}>
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ textDecoration: "2px underline #3454D1" }}
        >
          Tus transacciones
        </Typography>
        {esAdmin ? (
          <Typography>Aqui puedes gestionar tus depósitos y retiros</Typography>
        ) : (
          <Typography>Aqui puedes gestionar tus movimientos</Typography>
        )}
      </Box>

      <Grid container mt={0} spacing={5}>
        <Grid item xs={9.5}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
              padding: 3,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              minHeight: 175,
            }}
          >
            <Typography align="center" variant="h3" fontWeight={600}>
              {Number(user.saldo).toFixed(2)} €
            </Typography>
            <Typography align="center" variant="body2">
              Tu saldo
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2.5}>
          <Stack
            spacing={1}
            justifyContent="space-evenly"
            divider={<Divider orientation="horizontal" flexItem />}
            sx={{
              padding: 2,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              minHeight: 175,
            }}
          >
            <Tooltip title="Añadir saldo">
              <IconButton
                onClick={() => handleRedirect("/banco/depositar")}
                sx={{
                  width: "100%",
                  height: "100%",
                  flexGrow: 1,
                  borderRadius: 1.5,
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            {esAdmin && (
              <Tooltip title="Retirar saldo">
                <IconButton
                  onClick={() => handleRedirect("/banco/retirar")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    borderRadius: 1.5,
                  }}
                >
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Grid>
      </Grid>

      <Grid container mt={1} mb={5} spacing={3}>
        <Grid item xs={6}>
          <DashboardDepositos depositos={transaccionesDepositos} />
        </Grid>
        {esAdmin && (
          <Grid item xs={6}>
            <DashboardRetiradas retiradas={transaccionesRetiradas} />
          </Grid>
        )}

        <Grid item xs={esAdmin ? 12 : 6}>
          <DashboardBancoReservas reservas={transaccionesReservas} />
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

  const transaccionesDepositos = await prisma.transaccion.findMany({
    where: {
      usuarioId: user.id,
      tipo: "Depósito",
    },

    orderBy: {
      fecha: "desc",
    },
  });

  const transaccionesRetiradas = await prisma.transaccion.findMany({
    where: {
      usuarioId: user.id,
      tipo: "Retirada",
    },

    orderBy: {
      fecha: "desc",
    },
  });

  const transaccionesReservas = await prisma.transaccion.findMany({
    where: {
      usuarioId: user.id,
      tipo: {
        in: ["Pago de reserva", "Reserva de pista"],
      },
    },

    include: {
      reserva: {
        include: {
          pista: true,
        },
      },
    },

    orderBy: {
      fecha: "desc",
    },
  });

  // if (!session || user.role !== "ADMIN") {
  //   return { redirect: { destination: "/auth/login" } };
  // }

  return {
    props: {
      user: JSON.stringify(user),
      transaccionesDepositos: JSON.stringify(transaccionesDepositos),
      transaccionesRetiradas: JSON.stringify(transaccionesRetiradas),
      transaccionesReservas: JSON.stringify(transaccionesReservas),
    },
  };
};

export default BancoPage;
