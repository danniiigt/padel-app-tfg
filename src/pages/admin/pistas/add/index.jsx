import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { MainLayout } from "../../../../shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { PistaItem } from "@/shared/components/PistaItem";
import { useRouter } from "next/router";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import prisma from "../../../../../lib/prisma";
import {
  DateRangePicker,
  MultiInputTimeRangeField,
  TimePicker,
} from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import EuroIcon from "@mui/icons-material/Euro";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Map from "@/shared/components/Map";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const AddPista = ({ user, step }) => {
  user = JSON.parse(user);

  const router = useRouter();

  const initialPistaForm = {
    nombre: "",
    descripcion: "",
    imagen: "",
    ubicacionLatitud: "",
    ubicacionLongitud: "",
    telefono: "",
    horarioApertura: "",
  };

  const steps = ["Información general", "Añadir horarios y precios", "Resumen"];
  const [siguienteActivo, setSiguienteActivo] = useState(false);
  const [pistaForm, setPistaForm] = useState(initialPistaForm);
  const [fechaEventoForm, setFechaEventoForm] = useState({
    fechaInicio: "",
    fechaFin: "",
    horarioInicio: "",
    horarioFin: "",
    precio: "",
  });
  const [eventos, setEventos] = useState([]);
  const [eventosFormateados, setEventosFormateados] = useState([]);

  const handleImageUpload = (e) => {
    // UPLOAD THE IMAGE TO CLOUDINARY
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kynbyrvd");
    fetch("https://api.cloudinary.com/v1_1/dqcgushqm/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPistaForm({
          ...pistaForm,
          imagen: data.secure_url,
        });
      });
  };

  const handleAñadirEvento = (e) => {
    e.preventDefault();
    // CREA UN OBJETO POR CADA DIA ENTRE AMBAS FECHAS | LO METE EN UN ARRAY | DESPUES LO METE EN EL STATE DE EVENTOS
    const eventosEntreFechas = [];
    const eventosFormat = [];
    const fechaInicio = new Date(fechaEventoForm.fechaInicio);
    const fechaFin = new Date(fechaEventoForm.fechaFin);
    const diasEntreFechas = (fechaFin - fechaInicio) / (1000 * 3600 * 24);

    for (let i = 0; i <= diasEntreFechas; i++) {
      const fecha = new Date(fechaInicio);
      fecha.setDate(fecha.getDate() + i);
      eventosEntreFechas.push({
        title: `Libre - ${fechaEventoForm.precio}€`,
        start: `${fecha.toISOString().split("T")[0]}T${
          fechaEventoForm.horarioInicio
        }`,
        end: `${fecha.toISOString().split("T")[0]}T${
          fechaEventoForm.horarioFin
        }`,
      });

      eventosFormat.push({
        nombre: "Libre",
        descripcion: "",
        precio: Number(fechaEventoForm.precio),
        fechaInicio: `${fecha.toISOString().split("T")[0]}T${
          fechaEventoForm.horarioInicio
        }`,
        fechaFin: `${fecha.toISOString().split("T")[0]}T${
          fechaEventoForm.horarioFin
        }`,
      });
    }

    setEventosFormateados([...eventosFormateados, ...eventosFormat]);
    setEventos([...eventos, ...eventosEntreFechas]);
  };

  const handleCreatePista = async () => {
    const res = await fetch("/api/pistas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...pistaForm,
        eventos: eventosFormateados,
        usuarioId: user.id,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      router.push("/admin");
    }
  };

  useEffect(() => {
    if (step == 1) {
      const pistaFormKeys = Object.keys(pistaForm);
      const pistaFormValues = Object.values(pistaForm);
      const pistaFormValuesFiltered = pistaFormValues.filter(
        (value) => value !== ""
      );

      if (pistaFormKeys.length === pistaFormValuesFiltered.length) {
        setSiguienteActivo(true);
      } else {
        setSiguienteActivo(false);
      }
    } else if (step == 2) {
      if (eventos.length > 0) {
        setSiguienteActivo(true);
      } else {
        setSiguienteActivo(false);
      }
    }
  }, [pistaForm, eventos, step]);

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/admin/pistas",
      text: "Pistas",
    },
    {
      link: "/admin/pistas/add",
      text: "Añadir pista",
    },
  ];

  if (step == 1) {
    return (
      <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
        <Stack
          mt={4}
          spacing={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            p: "15px 20px",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            borderTop: "3px solid #3454D1",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Añadir pista
            </Typography>
            <Typography noWrap>
              Tienes un total de {user.pista.length} pistas
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ width: "100%" }} activeStep={step - 1}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <Grid container spacing={4} mt={0}>
          <Grid item xs={7}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    placeholder="Nombre de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    defaultValue={pistaForm.nombre}
                    onChange={(e) => {
                      setPistaForm({
                        ...pistaForm,
                        nombre: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    placeholder="Teléfono de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    value={pistaForm.telefono}
                    onChange={(e) => {
                      if (isNaN(e.target.value)) return;
                      if (e.target.value.length > 9) return;
                      setPistaForm({
                        ...pistaForm,
                        telefono: e.target.value,
                      });
                    }}
                  />
                </Stack>
                <TextField
                  label="Descripcion"
                  variant="outlined"
                  placeholder="Pista de pádel de tierra batida..."
                  size="small"
                  fullWidth
                  sx={{ backgroundColor: "#f9f9f9" }}
                  // MAKE IT A TEXTAREA
                  multiline
                  rows={4}
                  value={pistaForm.descripcion}
                  onChange={(e) => {
                    setPistaForm({
                      ...pistaForm,
                      descripcion: e.target.value,
                    });
                  }}
                />

                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Latitud"
                    variant="outlined"
                    placeholder="Latitud de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    value={pistaForm.ubicacionLatitud}
                    onChange={(e) => {
                      if (isNaN(e.target.value)) return;
                      setPistaForm({
                        ...pistaForm,
                        ubicacionLatitud: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    label="Longitud"
                    variant="outlined"
                    placeholder="Longitud de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    value={pistaForm.ubicacionLongitud}
                    onChange={(e) => {
                      // LET INTRODUCE '-' '.' AND NUMBERS

                      setPistaForm({
                        ...pistaForm,
                        ubicacionLongitud: e.target.value,
                      });
                    }}
                  />
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Apertura"
                      ampm={false}
                      format="HH:mm"
                      sx={{
                        height: "40px",

                        ".MuiInputLabel-formControl": {
                          marginTop: "-8px",
                        },

                        ".MuiOutlinedInput-input": {
                          backgroundColor: "#f9f9f9",
                          height: "40px",
                          boxSizing: "border-box",
                          padding: "8.5px 14px",
                        },
                      }}
                      onChange={(newValue) => {
                        setPistaForm({
                          ...pistaForm,
                          horarioApertura: `${newValue.$H}:${newValue.$m}`,
                        });
                      }}
                    />
                  </LocalizationProvider>
                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
                      <PhotoCamera />
                    </IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      component="label"
                    >
                      Imagen
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={
                pistaForm !== initialPistaForm
                  ? {
                      padding: "20px",
                      borderRadius: 2,
                      height: "100%",
                      border: "2px dotted #dbdbdb",
                    }
                  : {
                      padding: "20px",
                      borderRadius: 1,
                      height: "100%",
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
              }
            >
              {pistaForm == initialPistaForm && (
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <RemoveRedEyeOutlinedIcon />
                  <Typography variant="h6" fontWeight={300}>
                    Vista previa...
                  </Typography>
                </Stack>
              )}
              <PistaItem pista={pistaForm} />
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={3}
          sx={{
            backgroundColor: "background.paper",
            p: "15px",
            width: "fit-content",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
          }}
        >
          <Button
            variant="outlined"
            disabled
            color="primary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={!siguienteActivo}
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              router.push(`/admin/pistas/add?step=${Number(step) + 1}`);
              setSiguienteActivo(false);
            }}
          >
            Siguiente
          </Button>
        </Box>
      </MainLayout>
    );
  } else if (step == 2) {
    return (
      <MainLayout user={user}>
        <Stack
          mt={4}
          spacing={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            p: "15px 20px",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            borderTop: "3px solid #3454D1",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Añadir pista
            </Typography>
            <Typography noWrap>
              Tienes un total de {user.pista.length} pistas
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ width: "100%" }} activeStep={step - 1}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <Grid container spacing={4} mt={0}>
          <Grid item xs={5}>
            <Box
              component="form"
              onSubmit={handleAñadirEvento}
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
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

                        setFechaEventoForm({
                          ...fechaEventoForm,
                          ...fechas,
                        });
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

                        setFechaEventoForm({
                          ...fechaEventoForm,
                          ...horarios,
                        });
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
                    AÑADIR PISTAS
                  </Button>
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box
              mt={3}
              sx={{
                backgroundColor: "background.paper",
                p: "15px",
                width: "fit-content",
                borderRadius: 1.5,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ChevronLeftIcon />}
                sx={{ mr: 2 }}
                onClick={() => {
                  router.push(`/admin/pistas/add?step=${Number(step) - 1}`);
                }}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!siguienteActivo}
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                  router.push(`/admin/pistas/add?step=${Number(step) + 1}`);
                }}
              >
                Siguiente
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridThreeDay"
                locale={"es"}
                slotMinTime={
                  pistaForm.horarioApertura == ""
                    ? "00:00"
                    : pistaForm.horarioApertura
                }
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
                events={eventos}
              />
            </Box>
          </Grid>
        </Grid>
      </MainLayout>
    );
  } else if (step == 3) {
    return (
      <MainLayout user={user}>
        <Stack
          mt={4}
          spacing={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            p: "15px 20px",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            borderTop: "3px solid #3454D1",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Añadir pista
            </Typography>
            <Typography noWrap>
              Tienes un total de {user.pista.length} pistas
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ width: "100%" }} activeStep={step - 1}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <Grid container spacing={3} mt={1}>
          <Grid item xs={5}>
            <Box>
              <PistaItem pista={pistaForm} />
            </Box>
          </Grid>
          <Grid item xs={7}>
            {pistaForm.ubicacionLatitud != "" &&
            pistaForm.ubicacionLongitud != "" ? (
              <Box
                sx={{
                  padding: "5px",
                  backgroundColor: "background.paper",
                  borderRadius: 1,
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <Map
                  lat={Number(pistaForm.ubicacionLatitud)}
                  lng={Number(pistaForm.ubicacionLongitud)}
                />
              </Box>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={0}>
          <Grid item xs={4}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <LocalPhoneOutlinedIcon color="primary" />
              <Typography fontWeight={300}>601361279</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <EventOutlinedIcon color="primary" />
              <Typography fontWeight={300}>
                {eventos.length} reservas
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <AccessTimeOutlinedIcon color="primary" />
              <Typography fontWeight={300}>
                {pistaForm.horarioApertura} apertura
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box
          mt={3}
          sx={{
            backgroundColor: "background.paper",
            p: "15px",
            width: "fit-content",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
            onClick={() => {
              router.push(`/admin/pistas/add?step=${Number(step) - 1}`);
            }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={!siguienteActivo}
            endIcon={<DoneAllOutlinedIcon />}
            onClick={handleCreatePista}
          >
            CONFIRMAR
          </Button>
        </Box>
      </MainLayout>
    );
  }
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

  const { step } = ctx.query;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },

    include: {
      pista: true,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/auth/login" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
      step: step || 1,
    },
  };
};

export default AddPista;
