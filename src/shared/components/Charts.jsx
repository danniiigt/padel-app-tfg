import { Box, Grid } from "@mui/material";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const Charts = ({ pistas }) => {
  const getPistasReservas = () => {
    return pistas.map((pista) => pista.reserva.length);
  };

  const getPistasNombres = () => {
    return pistas.map((pista) => pista.nombre);
  };

  const getReservas7Dias = () => {
    const reservas = [];

    for (let i = 0; i < 7; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      const dia = fecha.getDay();

      const reservasDia = pistas.reduce((acc, pista) => {
        const reservas = pista.reserva.filter(
          (reserva) => new Date(reserva.fecha).getDay() === dia
        );

        return acc + reservas.length;
      }, 0);

      reservas.push(reservasDia);
    }

    return reservas;
  };

  return (
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
                new Date().getDate() - 6 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() - 5 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() - 4 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() - 3 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() - 2 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() - 1 + "/" + (new Date().getMonth() + 1),
                new Date().getDate() + "/" + (new Date().getMonth() + 1),
              ],
              datasets: [
                {
                  label: "Reservas ultimos 7 días",
                  data: getReservas7Dias().reverse(),
                  backgroundColor: ["#1f1f1f", "#3454D1"],
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
              labels: getPistasNombres(),
              datasets: [
                {
                  label: "Reservas totales",
                  data: getPistasReservas(),
                  backgroundColor: ["#1f1f1f", "#3454D1"],
                },
              ],
            }}
            height={125}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
