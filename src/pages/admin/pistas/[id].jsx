import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import prisma from "../../../../lib/prisma";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  Rating,
  Stack,
  TextField,
  Tooltip,
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
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PistaPage = ({ user: userProps, pista: pistaProps }) => {
  const [user, setUser] = useState(JSON.parse(userProps));
  const [pista, setPista] = useState(JSON.parse(pistaProps));

  pista.evento?.forEach((evento) => {
    evento.start = new Date(evento.fechaInicio);
    evento.end = new Date(evento.fechaFin);
    evento.title = evento.nombre + " - " + evento.precio + "€";
    //bg color
    evento.backgroundColor = evento.ocupada ? "#e57373" : "#3454D1";
  });

  const [fechas, setFechas] = useState([null, null]);
  const [horarios, setHorarios] = useState([null, null]);
  const [precio, setPrecio] = useState("");
  const [eventos, setEventos] = useState(pista.evento || []);
  const [loading, setLoading] = useState(false);

  const [editPista, setEditPista] = useState({
    nombre: pista.nombre,
    telefono: pista.telefono,
    ubicacionLatitud: pista.ubicacionLatitud,
    ubicacionLongitud: pista.ubicacionLongitud,
    horarioApertura: pista.horarioApertura,
  });

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
      link: `/admin/pistas/${pista.id}`,
      text: pista.nombre,
    },
  ];

  const handleAñadirEventos = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fechas[0] || !fechas[1] || !horarios[0] || !horarios[1] || !precio)
      return toast.error("Rellena todos los campos");

    // CREA UN OBJETO POR CADA DIA ENTRE AMBAS FECHAS INCLUYENDO LA FECHA EL HORARIO Y EL PRECIO | METELO EN UN ARRAY
    let eventosArray = [];
    let fechaInicio = fechas[0].$d;
    let fechaFin = fechas[1].$d;
    let horarioInicio = horarios[0].$d;
    let horarioFin = horarios[1].$d;
    let diasEntreFechas = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);

    for (let i = 0; i <= diasEntreFechas; i++) {
      let fecha = new Date(fechaInicio);
      fecha.setDate(fecha.getDate() + 1 + i);
      eventosArray.push({
        nombre: "Libre",
        descripcion: "",
        precio: Number(precio),
        fechaInicio:
          fecha.toISOString().slice(0, 10) +
          "T" +
          horarioInicio.toString().slice(16, 21),

        fechaFin:
          fecha.toISOString().slice(0, 10) +
          "T" +
          horarioFin.toString().slice(16, 21),
        pistaId: pista.id,
      });
    }

    const res = await fetch("/api/eventos", {
      method: "POST",
      body: JSON.stringify({ eventosArray }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      let eventosData = await res.json();

      eventosData.forEach((evento) => {
        evento.start = new Date(evento.fechaInicio);
        evento.end = new Date(evento.fechaFin);
        evento.title = evento.nombre + " - " + evento.precio + "€";
        evento.backgroundColor = evento.ocupada ? "#e57373" : "#3454D1";
      });

      setEventos([...eventos, ...eventosData]);
    }

    //LIMPIA EL FORM
    setLoading(false);
    setFechas([null, null]);
    setHorarios([null, null]);
    setPrecio("");
  };

  const handleImageUpload = async (e) => {
    // UPLOAD THE IMAGE TO CLOUDINARY
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kynbyrvd");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqcgushqm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    const resPistas = await fetch("/api/pistas", {
      method: "PUT",
      body: JSON.stringify({
        pistaId: pista.id,
        imagen: data.secure_url,
        tipo: "AñadirImagen",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      const dataPista = await resPistas.json();
      setPista({
        ...pista,
        imagenes: dataPista.pista.imagenes,
      });
      toast.success("Imagen añadida correctamente");
    }
  };

  const handleImageDelete = async (imageUrl) => {
    const resPistas = await fetch("/api/pistas", {
      method: "PUT",
      body: JSON.stringify({
        pistaId: pista.id,
        imageUrl: imageUrl,
        tipo: "EliminarImagen",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resPistas.status == 200) {
      const data = await resPistas.json();
      setPista({
        ...pista,
        imagenes: data.pista.imagenes,
      });
      toast.success("Imagen eliminada correctamente");
    }
  };

  const handleInformacionSubmit = async () => {
    if (
      !editPista.nombre ||
      !editPista.telefono ||
      !editPista.ubicacionLatitud ||
      !editPista.ubicacionLongitud ||
      !editPista.horarioApertura
    )
      return toast.error("Rellena todos los campos");

    const res = await fetch("/api/pistas", {
      method: "PUT",
      body: JSON.stringify({
        ...editPista,
        pistaId: pista.id,
        tipo: "ActualizarInformacion",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      const data = await res.json();
      setPista({
        ...pista,
        ...data.pista,
      });
      toast.success("Información actualizada correctamente");
    }
  };

  useEffect(() => {
    document.title = pista.nombre + " - Padel App";
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
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
          <Typography variant="body1">{eventos.length} eventos</Typography>
          <Stack>
            <Typography variant="body2">
              {pista.valoracion.length} Valoraciones
            </Typography>
            {pista.valoracion.length > 0 && (
              <Rating
                name="half-rating-read"
                defaultValue={4.4}
                precision={0.1}
                readOnly
                size="small"
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      <Grid container rowSpacing={1} mt={1} mb={3} columnSpacing={2}>
        <Grid item xs={12}>
          <Accordion
            defaultExpanded={true}
            disableGutters
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
                  component="form"
                  onSubmit={handleAñadirEventos}
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
                          disabled={loading}
                          calendars={2}
                          disablePast={true}
                          format="DD/MM"
                          localeText={{
                            start: "Fecha Comienzo",
                            end: "Fecha Fin",
                          }}
                          sx={{
                            ".MuiOutlinedInput-input": {
                              backgroundColor: "#f9f9f9",
                            },
                          }}
                          value={fechas}
                          onChange={(newValue) => {
                            setFechas(newValue);
                          }}
                        />
                      </Box>

                      <Divider />

                      <Box>
                        <Typography variant="body2" fontWeight={300} mb={1.5}>
                          *Añadir un horario en múltiples días
                        </Typography>
                        <MultiInputTimeRangeField
                          disabled={loading}
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
                          value={horarios}
                          onChange={async (newValue) => {
                            setHorarios(newValue);
                          }}
                        />
                      </Box>

                      <Divider />

                      <Box>
                        <Typography variant="body2" fontWeight={300} mb={1.5}>
                          *Precio para cada pista
                        </Typography>
                        <TextField
                          disabled={loading}
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
                          value={precio}
                          onChange={(e) => {
                            setPrecio(e.target.value);
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

                      <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                      >
                        AÑADIR EVENTOS
                      </LoadingButton>
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
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={6}>
          <Accordion
            defaultExpanded={true}
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
              <Stack spacing={2}>
                <ImageList
                  sx={{ width: "100%", maxHeight: 300, marginY: 0 }}
                  cols={2}
                >
                  {pista.imagenes.map((imagen) => (
                    <ImageListItem
                      key={imagen.img}
                      sx={{
                        img: {
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        },
                      }}
                    >
                      <img
                        src={`${imagen}`}
                        alt={"item.title"}
                        loading="lazy"
                      />

                      <Tooltip title="Eliminar Imágen">
                        <IconButton
                          onClick={() => handleImageDelete(imagen)}
                          size="small"
                          sx={{
                            position: "absolute",
                            bottom: "6px",
                            right: "6px",
                            zIndex: 9999,
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                            p: 0.4,

                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                          }}
                        >
                          <DeleteIcon color="error" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ImageListItem>
                  ))}
                </ImageList>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddAPhotoIcon />}
                >
                  Añadir Foto
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          <Accordion
            defaultExpanded={true}
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
              <Stack spacing={2}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={editPista.nombre}
                  onChange={(e) => {
                    setEditPista({ ...editPista, nombre: e.target.value });
                  }}
                />
                <TextField
                  label="Telefono"
                  variant="outlined"
                  fullWidth
                  value={editPista.telefono}
                  onChange={(e) => {
                    setEditPista({ ...editPista, telefono: e.target.value });
                  }}
                  type="number"
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Latitud"
                    variant="outlined"
                    fullWidth
                    value={editPista.ubicacionLatitud}
                    onChange={(e) => {
                      setEditPista({
                        ...editPista,
                        ubicacionLatitud: e.target.value,
                      });
                    }}
                    type="number"
                  />
                  <TextField
                    label="Longitud"
                    variant="outlined"
                    fullWidth
                    value={editPista.ubicacionLongitud}
                    onChange={(e) => {
                      setEditPista({
                        ...editPista,
                        ubicacionLongitud: e.target.value,
                      });
                    }}
                    type="number"
                  />
                </Stack>
                <TextField
                  label="Horario Apertura"
                  variant="outlined"
                  fullWidth
                  value={editPista.horarioApertura}
                  onChange={(e) => {
                    setEditPista({
                      ...editPista,
                      horarioApertura: e.target.value,
                    });
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleInformacionSubmit}
                  fullWidth
                  startIcon={<EditIcon />}
                >
                  Actualizar
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            defaultExpanded={true}
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
              <Typography>¡Todavía no hay valoraciones!</Typography>
            </AccordionDetails>
          </Accordion>
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
