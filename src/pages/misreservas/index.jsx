import { MainLayout } from "@/shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import ClearIcon from "@mui/icons-material/Clear";
import { CancelarReservaDialog } from "@/shared/components/Reservas/CancelarReservaDialog";
import { toast } from "react-toastify";

const MisReservas = ({ user: userProps, reservas: reservasProps }) => {
  const [usuario, setUsuario] = useState(JSON.parse(userProps));
  const [reservasTotales, setReservasTotales] = useState(
    JSON.parse(reservasProps)
  );
  const [reservasPendientes, setReservasPendientes] = useState([]);
  const [reservasPasadas, setReservasPasadas] = useState([]);

  const [cancelarPopup, setCancelarPopup] = useState(false);
  const [reservaId, setReservaId] = useState(null);

  const onCancel = () => {
    setCancelarPopup(false);
  };

  const onConfirm = async () => {
    const res = await fetch(`/api/reservas/${reservaId}`, {
      method: "DELETE",
    });

    if (res.status == 200) {
      const data = await res.json();
      setReservasPendientes(
        reservasPendientes.filter((reserva) => reserva.id != data.id)
      );

      toast.success("Reserva cancelada correctamente");
    }

    setCancelarPopup(false);
  };

  useEffect(() => {
    const reservasPendientes = reservasTotales.filter((reserva) => {
      return new Date(reserva.evento.fechaInicio) > new Date();
    });

    const reservasPasadas = reservasTotales.filter((reserva) => {
      return new Date(reserva.evento.fechaInicio) < new Date();
    });

    setReservasPendientes(reservasPendientes);
    setReservasPasadas(reservasPasadas);
  }, []);

  useEffect(() => {
    document.title = "Mis reservas - Padel App";
  }, []);

  return (
    <MainLayout user={usuario}>
      <Stack spacing={4} my={5}>
        <Box>
          <Stack
            sx={{
              padding: "12px 15px",
              backgroundColor: "background.paper",
              borderRadius: "4px 4px 0 0",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight={600}>
              Reservas pendientes
            </Typography>

            <Stack direction="row" spacing={2}>
              <Tooltip title="Ver en lista">
                <IconButton color="primary">
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ver en calendario">
                <IconButton color="primary">
                  <CalendarMonthIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: "#eeeeee" }} />
          <Stack
            sx={{
              padding: "12px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "0 0 4px 4px",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              maxHeight: 300,
              overflowY: "auto",
            }}
            divider={
              <Divider
                orientation="horizontal"
                sx={{ borderColor: "#e4e4e4" }}
                flexItem
              />
            }
            spacing={2}
          >
            {reservasPendientes?.length > 0 &&
              reservasPendientes?.map((reserva, index) => (
                <Stack
                  key={reserva.id}
                  direction="row"
                  spacing={5}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">
                      {new Date(reserva.evento.fechaInicio).toLocaleString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }
                      )}
                    </Typography>
                    <Chip label="Pendiente" color="primary" size="small" />
                  </Stack>
                  <Typography variant="body2">
                    <Link
                      href={`/home/pistas/${reserva.pista.id}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      Pista {reserva.pista.nombre}
                      <LaunchIcon fontSize="small" />
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    Precio{" "}
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(reserva.evento.precio)}
                  </Typography>
                  <Tooltip title="Cancelar reserva">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => {
                        setReservaId(reserva.id);
                        setCancelarPopup(true);
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}
            {reservasPendientes?.length <= 0 && (
              <Stack
                sx={{ width: "100%", height: "100%", p: 3 }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80 }} />
                <Typography fontWeight={300}>
                  ¡No hay reservas pendientes!
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
        <Box>
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
              Reservas pasadas
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#eeeeee" }} />
          <Stack
            sx={{
              padding: "12px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "0 0 4px 4px",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              maxHeight: 300,
              overflowY: "auto",
            }}
            divider={
              <Divider
                orientation="horizontal"
                sx={{ borderColor: "#e4e4e4" }}
                flexItem
              />
            }
            spacing={2}
          >
            {reservasPasadas?.length > 0 &&
              reservasPasadas?.map((reserva, index) => (
                <Stack
                  key={reserva.id}
                  direction="row"
                  spacing={5}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2">
                    {new Date(reserva.evento.fechaInicio).toLocaleString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </Typography>
                  <Typography variant="body2">
                    <Link
                      href={`/home/pistas/${reserva.pista.id}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      Pista {reserva.pista.nombre}
                      <LaunchIcon fontSize="small" />
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    Precio{" "}
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(reserva.evento.precio)}
                  </Typography>
                </Stack>
              ))}
            {reservasPasadas?.length <= 0 && (
              <Stack
                sx={{ width: "100%", height: "100%", p: 3 }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80 }} />
                <Typography fontWeight={300}>
                  ¡No hay reservas pasadas!
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>

      <CancelarReservaDialog
        mostrar={cancelarPopup}
        onCancel={onCancel}
        onConfirm={onConfirm}
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

  const reservas = await prisma.reserva.findMany({
    where: {
      usuarioId: user.id,
    },

    include: {
      pista: true,
      evento: true,
    },
  });

  return {
    props: {
      user: JSON.stringify(user),
      reservas: JSON.stringify(reservas),
    },
  };
};

export default MisReservas;
