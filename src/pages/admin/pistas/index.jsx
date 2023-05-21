import { MainLayout } from "../../../shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip as ChartTooltip,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../../../lib/prisma";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ChartTooltip,
  ArcElement
);

const PistasPage = ({ user, pistas, eventos, reservas }) => {
  user = JSON.parse(user);
  pistas = JSON.parse(pistas);
  eventos = JSON.parse(eventos);
  reservas = JSON.parse(reservas);

  const [pista, setPista] = useState({});
  const [mostrarDialog, setMostrarDialog] = useState(false);

  const router = useRouter();

  const handleDelete = (pista) => {
    setPista(pista);
    setMostrarDialog(true);
  };

  const refreshData = () => router.replace(router.asPath);

  const nombresPistas = pistas.map((pista) => pista.nombre);

  const eventosPorPista = nombresPistas.map((nombrePista) => {
    return eventos.filter((evento) => evento.pista.nombre === nombrePista);
  });

  const getEventosPorPistaLength = () => {
    return eventosPorPista.map((evento) => evento.length);
  };

  const getPistasNombres = () => {
    return pistas.map((pista) => pista.nombre);
  };

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/admin/pistas",
      text: "Pistas",
    },
  ];

  const getPistasReservas = () => {
    return pistas.map((pista) => pista.reserva.length);
  };

  useEffect(() => {
    document.title = "Pistas - Padel App";
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Stack direction="row" spacing={2} mt={4} alignItems="center">
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              textDecoration: "2px underline #3454D1",
            }}
          >
            Tus pistas
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1.5}
          >
            <Typography variant="body2" fontWeight={300}>
              {pistas.length} pistas
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {eventos.length} eventos totales
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {reservas.length} reservas totales
            </Typography>
          </Stack>
        </Box>
        <Stack dispaly="flex" justifyContent="flex-end" flexGrow={1}>
          <Link
            href="/admin/pistas/add"
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "fit-content",
              marginLeft: "auto",
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
        </Stack>
      </Stack>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={3.5}>
          <Stack
            spacing={4}
            divider={<Divider orientation="horizontal" flexItem />}
            alignItems="center"
            sx={{
              padding: "12px 15px",
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              paddingX: 3,
              paddingY: 3,
            }}
          >
            <Box
              sx={{ width: "100%" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography align="left" gutterBottom>
                Eventos totales
              </Typography>
              <Box sx={{ maxWidth: 150 }}>
                <Doughnut
                  data={{
                    labels: getPistasNombres(),
                    datasets: [
                      {
                        label: "Eventos totales",
                        data: getEventosPorPistaLength(),
                        backgroundColor: ["#1f1f1f", "#3454D1"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,

                    // DONT SHOW LABELS
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  height={125}
                />
              </Box>
            </Box>
            <Box
              sx={{ width: "100%" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography align="left" gutterBottom>
                Reservas totales
              </Typography>
              <Box sx={{ maxWidth: 150 }}>
                <Doughnut
                  data={{
                    labels: getPistasNombres(),
                    datasets: [
                      {
                        label: "Reservas totales",
                        data: getPistasReservas(),
                        backgroundColor: ["#1f1f1f", "#3454D1"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,

                    // DONT SHOW LABELS
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  height={125}
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={8.5}>
          <Box
            sx={{
              padding: "12px 15px",
              backgroundColor: "background.paper",
              borderRadius: "4px 4px 0 0",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Pistas
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#eeeeee" }} />
          <Box
            sx={{
              padding: "12px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "0 0 4px 4px",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            {pistas.length === 0 ? (
              <Typography variant="body2" fontWeight={300}>
                ¡Todavía no tienes pistas!{" "}
                <Link
                  href="/admin/pistas/add"
                  style={{
                    display: "inline-block",
                    marginLeft: 3,
                    textDecoration: "none",
                  }}
                >
                  Añadir pista
                </Link>
              </Typography>
            ) : (
              <Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
              >
                {pistas.map((pista) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    key={pista.id}
                    spacing={3}
                  >
                    <Typography>{pista.nombre}</Typography>
                    <Typography variant="body2" fontWeight={300}>
                      {pista.evento.length == 0
                        ? "sin eventos"
                        : pista.evento.length == 1
                        ? "1 evento disponible"
                        : `${pista.evento.length} eventos disponibles`}
                    </Typography>

                    <Stack
                      flexGrow={1}
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <Link href={`/home/pistas/${pista.id}`}>
                        <IconButton color="primary">
                          <Tooltip title="Ver">
                            <RemoveRedEyeIcon sx={{ fontSize: 19 }} />
                          </Tooltip>
                        </IconButton>
                      </Link>
                      <Link href={`/admin/pistas/${pista.id}`}>
                        <IconButton color="primary">
                          <Tooltip title="Editar">
                            <EditIcon sx={{ fontSize: 19 }} />
                          </Tooltip>
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(pista)}
                      >
                        <Tooltip title="Borrar">
                          <DeleteIcon sx={{ fontSize: 19 }} />
                        </Tooltip>
                      </IconButton>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
      <ConfirmDialog
        usuarioId={user.id}
        mostrar={mostrarDialog}
        pistaId={pista.id}
        pistaNombre={pista.nombre}
        onClose={() => setMostrarDialog(false)}
        refreshData={refreshData}
      />
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

  const pistas = await prisma.pista.findMany({
    where: {
      usuarioId: user.id,
      activa: true,
    },

    include: {
      evento: {
        where: {
          fechaInicio: {
            gte: new Date(),
          },
        },
      },

      reserva: true,
    },
  });

  const eventos = await prisma.evento.findMany({
    where: {
      pistaId: {
        in: pistas.map((pista) => pista.id),
      },
    },

    include: {
      pista: {
        select: {
          nombre: true,
        },
      },
    },
  });

  const reservas = await prisma.reserva.findMany({
    where: {
      usuarioId: user.id,
      eventoId: {
        in: eventos.map((evento) => evento.id),
      },
    },
  });

  if (user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
      pistas: JSON.stringify(pistas),
      eventos: JSON.stringify(eventos),
      reservas: JSON.stringify(reservas),
    },
  };
};

export default PistasPage;
