import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../../lib/prisma";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventIcon from "@mui/icons-material/Event";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import {
  DateRangePicker,
  LocalizationProvider,
  MultiInputTimeRangeField,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import EuroIcon from "@mui/icons-material/Euro";

const PistaPage = ({ user, pista }) => {
  user = JSON.parse(user);
  pista = JSON.parse(pista);

  pista.evento.forEach((evento) => {
    evento.start = new Date(evento.fechaInicio);
    evento.end = new Date(evento.fechaFin);
    evento.title = evento.nombre;
    //bg color
    evento.backgroundColor = evento.ocupada ? "#e57373" : "#3454D1";
  });

  console.log(pista.evento);

  return (
    <MainLayout user={user}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        sx={{
          height: "100%",
          padding: 3,
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <Typography variant="h6">{pista.nombre}</Typography>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography variant="body1">
            {pista.reserva.length} reservas
          </Typography>
          <Typography variant="body1">{pista.evento.length} eventos</Typography>
          <Stack>
            <Typography variant="body2"> 53 Valoraciones</Typography>
            <Rating
              name="half-rating-read"
              defaultValue={4.4}
              precision={0.1}
              readOnly
              size="small"
            />
          </Stack>
        </Stack>
      </Stack>

      <Accordion
        elevation={0}
        sx={{
          mt: 3,
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&::before": {
            display: "none",
          },
        }}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <EventIcon fontSize="small" color="primary" />
            <Typography>Eventos y Reservas</Typography>
          </Stack>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ padding: 3, backgroundColor: "#fafafa" }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ maxWidth: 1100 }}
          >
            <Grid
              item
              xs={4.7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight={300} mb={1.5}>
                      *Añadir una fecha en múltiples días
                    </Typography>
                    <DateRangePicker
                      calendars={2}
                      disablePast={true}
                      format="DD/MM"
                      localeText={{ start: "Fecha Comienzo", end: "Fecha Fin" }}
                      sx={{
                        ".MuiOutlinedInput-input": {
                          backgroundColor: "#f9f9f9",
                        },
                      }}
                      onChange={(newValue) => {
                        let fechas = {
                          fechaInicio: "",
                          fechaFin: "",
                        };

                        if (newValue[0]) {
                          // FORMAT MUST BE YYYY-MM-DD WITH 0 IN FRONT OF SINGLE DIGIT MONTHS AND DAYS
                          const date = new Date(newValue[0]);
                          const month = date.getMonth() + 1;
                          const day = date.getDate();
                          const output =
                            date.getFullYear() +
                            "-" +
                            (month < 10 ? "0" : "") +
                            month +
                            "-" +
                            (day < 10 ? "0" : "") +
                            day;

                          fechas.fechaInicio = output;
                        }

                        if (newValue[1]) {
                          // FORMAT MUST BE YYYY-MM-DD WITH 0 IN FRONT OF SINGLE DIGIT MONTHS AND DAYS
                          const date = new Date(newValue[1]);
                          const month = date.getMonth() + 1;
                          const day = date.getDate();
                          const output =
                            date.getFullYear() +
                            "-" +
                            (month < 10 ? "0" : "") +
                            month +
                            "-" +
                            (day < 10 ? "0" : "") +
                            day;

                          fechas.fechaFin = output;
                        }

                        // setFechaEventoForm({
                        //   ...fechaEventoForm,
                        //   ...fechas,
                        // });
                      }}
                    />
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" fontWeight={300} mb={1.5}>
                      *Añadir un horario en múltiples días
                    </Typography>
                    <MultiInputTimeRangeField
                      ampm={false}
                      format="HH:mm"
                      slotProps={{
                        textField: ({ position }) => ({
                          label:
                            position === "start"
                              ? "Horario comienzo"
                              : "Horario fin",
                        }),
                      }}
                      sx={{
                        ".MuiOutlinedInput-input": {
                          backgroundColor: "#f9f9f9",
                        },
                      }}
                      onChange={async (newValue) => {
                        let horarios = {
                          horarioInicio: "",
                          horarioFin: "",
                        };

                        if (newValue[0]) {
                          // FORMAT MUST BE HH:MM WITH 0 IN FRONT OF SINGLE DIGIT HOURS AND MINUTES
                          const date = new Date(newValue[0]);
                          const hours = date.getHours();
                          const minutes = date.getMinutes();
                          const output =
                            (hours < 10 ? "0" : "") +
                            hours +
                            ":" +
                            (minutes < 10 ? "0" : "") +
                            minutes;

                          horarios.horarioInicio = output;
                        }

                        if (newValue[1]) {
                          // FORMAT MUST BE HH:MM WITH 0 IN FRONT OF SINGLE DIGIT HOURS AND MINUTES
                          const date = new Date(newValue[1]);
                          const hours = date.getHours();
                          const minutes = date.getMinutes();
                          const output =
                            (hours < 10 ? "0" : "") +
                            hours +
                            ":" +
                            (minutes < 10 ? "0" : "") +
                            minutes;

                          horarios.horarioFin = output;
                        }

                        // setFechaEventoForm({
                        //   ...fechaEventoForm,
                        //   ...horarios,
                        // });
                      }}
                    />
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" fontWeight={300} mb={1.5}>
                      *Precio para cada pista
                    </Typography>
                    <TextField
                      label="Precio"
                      type="number"
                      variant="outlined"
                      fullWidth
                      sx={{
                        ".MuiOutlinedInput-input": {
                          backgroundColor: "#f9f9f9",
                          paddingLeft: "10px",
                        },
                      }}
                      onChange={(e) => {
                        setFechaEventoForm({
                          ...fechaEventoForm,
                          precio: e.target.value,
                        });
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EuroIcon fontSize="small" sx={{ mr: 1 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Divider />

                  <Button type="submit" variant="contained" color="primary">
                    AÑADIR EVENTOS
                  </Button>
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridThreeDay"
                locale={"es"}
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
                customButtons={{
                  addReserva: {
                    text: "Añadir reserva",
                    click: function () {
                      alert("Añadir reserva");
                    },
                  },
                }}
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
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&::before": {
            display: "none",
          },
        }}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <BurstModeIcon fontSize="small" color="primary" />
            <Typography>Imagenes</Typography>
          </Stack>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ padding: 3, backgroundColor: "#fafafa" }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ maxWidth: 1100 }}
          >
            <Grid
              item
              xs={4.7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              PUM!
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridThreeDay"
                locale={"es"}
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
                customButtons={{
                  addReserva: {
                    text: "Añadir reserva",
                    click: function () {
                      alert("Añadir reserva");
                    },
                  },
                }}
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
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&::before": {
            display: "none",
          },
        }}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <InfoIcon fontSize="small" color="primary" />
            <Typography>Información General</Typography>
          </Stack>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ padding: 3, backgroundColor: "#fafafa" }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ maxWidth: 1100 }}
          >
            <Grid
              item
              xs={4.7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              PUM!
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridThreeDay"
                locale={"es"}
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
                customButtons={{
                  addReserva: {
                    text: "Añadir reserva",
                    click: function () {
                      alert("Añadir reserva");
                    },
                  },
                }}
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
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&::before": {
            display: "none",
          },
        }}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <StarIcon fontSize="small" color="primary" />
            <Typography>Valoraciones</Typography>
          </Stack>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ padding: 3, backgroundColor: "#fafafa" }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ maxWidth: 1100 }}
          >
            <Grid
              item
              xs={4.7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              PUM!
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridThreeDay"
                locale={"es"}
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
                customButtons={{
                  addReserva: {
                    text: "Añadir reserva",
                    click: function () {
                      alert("Añadir reserva");
                    },
                  },
                }}
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
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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

  const pistaId = ctx.query.id;
  const pista = await prisma.pista.findUnique({
    where: {
      id: pistaId,
    },

    include: {
      reserva: true,
      evento: true,
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
