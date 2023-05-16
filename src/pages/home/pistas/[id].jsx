import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import prisma from "../../../../lib/prisma";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ReservarDialog } from "@/shared/components/ReservarDialog";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import Link from "next/link";

const PistaPage = ({ user: userProps, pista: pistaProps }) => {
  const [user, setUser] = useState(JSON.parse(userProps));
  const [pista, setPista] = useState(JSON.parse(pistaProps));

  console.log(pista);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [pistaSeleccionada, setPistaSeleccionada] = useState(null);
  const bannerHeight = 240;

  const closeReservar = () => {
    setPistaSeleccionada(null);
  };

  const handleReservarPista = async (idEvento) => {
    const res = await fetch(`/api/eventos/${idEvento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        idPista: pista.id,
        idUsuario: user.id,
      }),
    });

    const data = await res.json();

    if (res.status == 200) {
      setPista({
        ...pista,
        evento: pista.evento.map((evento) => {
          if (evento.id == idEvento) {
            return {
              ...evento,
              ocupada: true,
              title: `Ocupada - ${evento.precio}€`,
              backgroundColor: "#D10000",
            };
          } else {
            return evento;
          }
        }),
      });

      setUser({
        ...user,
        saldo: data.usuario.saldo,
      });

      toast.success("Pista reservada correctamente");
    }

    closeReservar();
  };

  useEffect(() => {
    let precioMinimo = 0;
    pista.evento?.forEach((evento) => {
      if (precioMinimo == 0) {
        precioMinimo = evento.precio;
      } else if (evento.precio < precioMinimo) {
        precioMinimo = evento.precio;
      }
    });

    pista.evento?.forEach((evento) => {
      evento.start = new Date(evento.fechaInicio);
      evento.end = new Date(evento.fechaFin);
      evento.title = evento.nombre + " - " + evento.precio + "€";
      //bg color
      evento.backgroundColor = evento.ocupada ? "#D10000" : "#3454D1";
    });
    setPrecioMinimo(precioMinimo);
  }, [user, pista]);

  useEffect(() => {
    document.title = `${pista.nombre} - Padel App`;
  }, []);

  return (
    <MainLayout user={user}>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundImage: `url('${pista.imagenes[0]}')`,
            position: "absolute",
            width: "100vw",
            left: 0,
            height: bannerHeight,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            "&::before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1100,
              marginX: "auto",
              paddingX: "16px",
              zIndex: 1,
              marginBottom: 9.5,
            }}
          >
            <Typography variant="h4" color="white">
              {pista.nombre}
            </Typography>
            <Typography variant="body2" color="#dedede">
              {pista.descripcion}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            width: "100%",
            marginTop: `calc(${bannerHeight}px - 70px)`,
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "1px",
              backgroundColor: "background.paper",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              borderRadius: "6px 6px 0 0 ",

              img: {
                width: "100%",
                height: 500,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "6px 6px 0 0 ",
              },
            }}
          >
            <Carousel showThumbs={false}>
              {pista.imagenes.map((imagen) => (
                <div key={imagen}>
                  <img src={imagen} alt="Imagen Pista" />
                </div>
              ))}
            </Carousel>

            {/* <img src={pista.imagenes[0]} /> */}
          </Box>
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "background.paper",
              borderRadius: "0 0 6px 6px",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h5" fontWeight={400}>
                  {pista.nombre}
                </Typography>

                <Stack mt={1} direction="row" spacing={1}>
                  <Chip
                    label={`Apertura: ${pista.horarioApertura}`}
                    icon={<ScheduleIcon sx={{ p: "2px" }} color="primary" />}
                    size="small"
                  />
                  <Chip
                    label={`Cerca de tí`}
                    icon={<LocationOnIcon sx={{ p: "2px" }} color="primary" />}
                    size="small"
                  />
                  <Chip
                    label={`Horarios disponibles`}
                    icon={
                      <EventAvailableIcon sx={{ p: "2px" }} color="primary" />
                    }
                    size="small"
                  />
                  <Chip
                    label={`Buenas reseñas`}
                    size="small"
                    icon={<ThumbUpIcon sx={{ p: "2.5px" }} color="primary" />}
                  />
                  {precioMinimo <= 8 && (
                    <Chip
                      label={`Precio barato`}
                      icon={
                        <LocalOfferIcon sx={{ p: "2px" }} color="primary" />
                      }
                      size="small"
                    />
                  )}
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <Rating name="read-only" value={0} readOnly />
                <Typography variant="body2">
                  ({pista.valoracion.length})
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            mt={1.5}
            sx={{
              backgroundColor: "#f9f9f9",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              borderRadius: "0 0 6px 6px",
            }}
          >
            <Accordion elevation={0} sx={{ borderRadius: "6px 6px 0 0" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarMonthIcon color="primary" fontSize="small" />
                  <Typography variant="body1" fontWeight={400}>
                    Horarios disponibles
                  </Typography>
                </Stack>
              </AccordionSummary>
              <Divider />
              <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                <Box
                  sx={{
                    backgroundColor: "#fafafa",
                  }}
                >
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek"
                    locale={"es"}
                    height={500}
                    slotMinTime={pista.horarioApertura}
                    allDaySlot={false}
                    buttonText={{
                      today: "Hoy",
                      month: "Mes",
                      week: "Semana",
                      day: "Día",
                      list: "Lista",
                    }}
                    slotLabelFormat={{
                      hour: "numeric",
                      minute: "2-digit",
                      omitZeroMinute: false,
                      meridiem: "short",
                    }}
                    firstDay={1}
                    headerToolbar={{
                      left: "timeGridDay,timeGridThreeDay,timeGridWeek",
                      right: "prev,next",
                    }}
                    views={{
                      timeGridThreeDay: {
                        type: "timeGrid",
                        duration: { days: 3 },
                        buttonText: "3 días",
                      },
                    }}
                    events={pista.evento}
                    // ON EVENT CLICK
                    eventClick={(info) => {
                      setPistaSeleccionada({
                        ...info.event._def.extendedProps,
                        eventoId: info.event._def.publicId,
                      });
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnIcon color="primary" fontSize="small" />
                  <Typography variant="body1" fontWeight={400}>
                    Ubicación
                  </Typography>
                </Stack>
              </AccordionSummary>
              <Divider />
              <AccordionDetails
                sx={{
                  backgroundColor: "#fafafa",
                }}
              ></AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <ThumbUpIcon color="primary" fontSize="small" />
                  <Typography variant="body1" fontWeight={400}>
                    Reseñas
                  </Typography>
                </Stack>
              </AccordionSummary>
              <Divider />
              <AccordionDetails sx={{ backgroundColor: "#fafafa", padding: 3 }}>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Escribe que opinas de esta pista. ¿Te ha gustado? ¿Repetirías?. Tu opinión es importante para nosotros."
                    label="Reseña"
                    InputProps={{
                      style: {
                        backgroundColor: "white",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: {},
                    }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Stack
                      alignItems="center"
                      sx={{
                        p: 1,
                        backgroundColor: "background.paper",
                        width: "fit-content",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={4}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </Stack>

                    <Button
                      variant="contained"
                      size="large"
                      disableElevation
                      fullWidth
                    >
                      Publicar Reseña
                    </Button>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <SupportAgentIcon color="primary" fontSize="small" />
                  <Typography variant="body1" fontWeight={400}>
                    Contacto
                  </Typography>
                </Stack>
              </AccordionSummary>
              <Divider />
              <AccordionDetails
                sx={{
                  backgroundColor: "#fafafa",
                  p: 3,
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={1.5}
                  sx={{
                    backgroundColor: "background.paper",
                    p: 1,
                    width: "fit-content",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                  }}
                >
                  <Stack
                    mt={0.1}
                    direction="row"
                    spacing={0.4}
                    alignItems="center"
                  >
                    <Typography variant="body1" mt={0.2} fontWeight={300}>
                      +34
                    </Typography>
                    <Typography variant="h6" fontWeight={400}>
                      {pista.telefono}
                    </Typography>
                  </Stack>
                  <Link href={`tel:+34${pista.telefono}`}>
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      startIcon={<PhoneEnabledIcon />}
                    >
                      Llamar
                    </Button>
                  </Link>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Stack>

      <ReservarDialog
        mostrar={pistaSeleccionada == null ? false : true}
        onClose={closeReservar}
        saldoUsuario={user.saldo}
        pista={pistaSeleccionada}
        handleReservarPista={handleReservarPista}
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

  const { id } = ctx.query;
  const pista = await prisma.pista.findUnique({
    where: {
      id: id,
    },

    // INCLUYE LOS EVENTOS DONDE LA FECHA SEA IGUAL O MAYOR A LA ACTUAL
    include: {
      evento: {
        where: {
          fechaInicio: {
            // MAYOR QUE FECHA ACTUAL + 2 HORAS
            gt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
          },
        },
      },

      valoracion: true,
    },
  });

  return {
    props: {
      user: JSON.stringify(user),
      pista: JSON.stringify(pista),
    },
  };
};

export default PistaPage;
