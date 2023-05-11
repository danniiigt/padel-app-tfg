import { Box, Grid, Stack, Typography } from "@mui/material";
import { MainLayout } from "../../../shared/layouts/MainLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import prisma from "../../../../lib/prisma";
import { Charts } from "../../../shared/components/Charts";
import { DashboardButtons } from "../../../shared/components/DashboardButtons";
import { DashboardRegistros } from "../../../shared/components/DashboardRegistros";

const AdminPage = ({ user, registros }) => {
  user = JSON.parse(user);
  registros = JSON.parse(registros);

  return (
    <MainLayout user={user}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        className="animate__animated animate__fadeIn"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ textDecoration: "2px underline #3454D1" }}
          >
            ¡Hola de nuevo {user.name}!
          </Typography>
          <Typography>Este es tu panel de control</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          <Link
            href="/admin/pistas/add"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px 15px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",

                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <AddRoadIcon fontSize="small" />
                <Typography>Añadir pista</Typography>
              </Stack>
            </Box>
          </Link>
          <Link
            href="/admin/banco/retirar"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px 15px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",

                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <PointOfSaleIcon fontSize="small" />
                <Typography>Retirar dinero</Typography>
              </Stack>
            </Box>
          </Link>
        </Stack>
      </Stack>

      <Charts />

      <DashboardButtons />

      <Grid container mt={1} mb={4} spacing={3}>
        <Grid
          item
          xs={8}
          className="animate__animated animate__fadeIn delay-1125"
        >
          <DashboardRegistros registros={registros} />
        </Grid>
        <Grid item xs={4}></Grid>
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

  const registros = await prisma.registro.findMany({
    where: {
      usuarioId: user.id,
    },
    orderBy: {
      fecha: "desc",
    },
  });

  if (user.role == "SUPERADMIN") {
    return { redirect: { destination: "/superadmin" } };
  }

  if (user.role !== "ADMIN") {
    return { redirect: { destination: "/auth/login" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
      registros: JSON.stringify(registros),
    },
  };
};

export default AdminPage;
