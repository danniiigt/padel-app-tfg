import { Badge, Box, Grid, Stack, Typography } from "@mui/material";
import { MainLayout } from "../../../shared/layouts/MainLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import prisma from "../../../../lib/prisma";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminPage = ({ user }) => {
  return (
    <MainLayout userImage={user.image}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        className="animate__animated animate__fadeIn"
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            ¡Hola de nuevo {user.name}!
          </Typography>
          <Typography>Te presentamos unas acciónes rápidas</Typography>
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
      <Grid
        className="animate__animated animate__fadeIn"
        container
        spacing={3}
        mt={1}
      >
        <Grid item xs={8}>
          <Box
            sx={{
              height: "100%",
              padding: 3,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <Bar
              data={{
                labels: [
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                  "Domingo",
                ],
                datasets: [
                  {
                    label: "Reservas de esta semana",
                    data: [12, 19, 7, 11, 5, 9, 10],
                    backgroundColor: "rgba(54, 162, 235, 1)",
                  },
                  {
                    label: "Reservas de la semana pasada",
                    data: [2, 18, 5, 5, 2, 3, 10],
                    backgroundColor: "rgba(255, 99, 132, 1)",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={135}
            />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              height: "100%",
              padding: 3,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <Doughnut
              data={{
                labels: [
                  "Reservas Pista 1",
                  "Reservas Pista 2",
                  "Reservas Pista 3",
                ],
                datasets: [
                  {
                    label: "Reservas de esta semana",
                    data: [3, 5, 6],
                    backgroundColor: [
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 99, 132, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                  },
                ],
              }}
              height={125}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={4}>
          <Link
            href="/admin/reservas"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            className="animate__animated animate__fadeInUp delay-375"
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                padding: 3,
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,

                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.4s ease-in-out",
                },
              }}
            >
              <Typography color="primary" alignItems="center" display="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ height: "1.5rem", width: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                Ver reservas
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="/admin/pistas"
            style={{ textDecoration: "none", color: "inherit" }}
            className="animate__animated animate__fadeInUp delay-750"
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                padding: 3,
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,

                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.4s ease-in-out",
                },
              }}
            >
              <Typography color="primary" alignItems="center" display="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ height: "1.5rem", width: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                Mis pistas
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="/admin/banco"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            className="animate__animated animate__fadeInUp delay-1000"
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                padding: 3,
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,

                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.4s ease-in-out",
                },
              }}
            >
              <Typography color="primary" alignItems="center" display="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ height: "1.5rem", width: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                Banco
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      user,
    },
  };
};

export default AdminPage;
