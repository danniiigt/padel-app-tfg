import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";

export const ReservaPistaItem = ({ pista }) => {
  useEffect(() => {
    // RECORRE LAS PISTAS Y AÑADELE LA PROPIEDAD COMPLETADA O NO SEGUN LA FECHA DE PISTA.RESERVA.EVENTO.FECHAFIN
    pista.reserva.map((reserva) => {
      const fechaReserva = new Date(reserva.evento.fechaFin);
      const fechaActual = new Date();

      reserva.completada = fechaReserva < fechaActual;
    });
  }, []);

  useEffect(() => {
    // RECORRE LAS PISTAS Y REORDENA LAS RESERVAS SEGUN LA FECHA DE PISTA.RESERVA.EVENTO.FECHAFIN
    pista.reserva.sort((a, b) => {
      const fechaReservaA = new Date(a.evento.fechaFin);
      const fechaReservaB = new Date(b.evento.fechaFin);

      return fechaReservaB - fechaReservaA;
    });
  }, []);

  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        mt: 3,
        "&::before": {
          display: "none",
        },
        backgroundColor: "#fafafa",
        marginTop: 0,
      }}
      square
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "97%" }}
        >
          <Typography>{pista.nombre}</Typography>
          <Box>
            <Chip
              label={`${pista.reserva.length} reservas`}
              size="small"
              color="primary"
              sx={{ fontSize: "0.7em !important" }}
            />
          </Box>
        </Stack>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ backgroundColor: "#fafafa", padding: 1 }}>
        <Stack sx={{ maxHeight: "200px !important", overflowY: "auto" }}>
          {pista.reserva.map((reserva, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{ borderColor: "#e4e4e4" }}
                  flexItem
                />
              }
              sx={{
                backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#fafafa",
                p: 1.5,
              }}
            >
              <Typography>
                {
                  // FORMAT DATE TO THIS: 20:11 18/04/2023
                  new Date(reserva.evento.fechaFin).toLocaleString("es-ES", {
                    hour: "numeric",
                    minute: "numeric",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                }
              </Typography>
              <Typography>{reserva.usuario.name}</Typography>
              <Typography>
                {reserva.completada ? "Completada" : "Pendiente"}
              </Typography>
              <Typography>
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(reserva.evento.precio)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
