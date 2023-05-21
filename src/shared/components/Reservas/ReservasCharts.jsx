import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LogarithmicScale,
} from "chart.js";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const ReservasCharts = ({ pistas }) => {
  const [reservasPendientes, setReservasPendientes] = useState(0);
  const [reservasCompletadas, setReservasCompletadas] = useState(0);

  const getPistasReservas = () => {
    return pistas.map((pista) => pista.reserva.length);
  };

  const getPistasNombres = () => {
    return pistas.map((pista) => pista.nombre);
  };

  useEffect(() => {
    let reservasPendientes = 0;
    let reservasCompletadas = 0;

    pistas.map((pista) => {
      pista.reserva.map((reserva) => {
        const fechaReserva = new Date(reserva.evento.fechaFin);
        const fechaActual = new Date();

        if (fechaReserva > fechaActual) {
          reservasPendientes++;
        } else {
          reservasCompletadas++;
        }
      });
    });

    setReservasPendientes(reservasPendientes);
    setReservasCompletadas(reservasCompletadas);
  }, []);

  return (
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
      <Stack alignItems="center">
        <Typography align="left" gutterBottom>
          Reservas por pista
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
      </Stack>
      <Stack alignItems="center">
        <Typography align="left" gutterBottom>
          Reservas por estado
        </Typography>
        <Box sx={{ maxWidth: 150 }}>
          <Doughnut
            data={{
              labels: ["Reservas Pendientes", "Reservas Completadas"],
              datasets: [
                {
                  label: "Total",
                  data: [reservasPendientes, reservasCompletadas],
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
      </Stack>
    </Stack>
  );
};
