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

export const Charts = () => {
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
                  backgroundColor: "#3454D1",
                },
                {
                  label: "Reservas de la semana pasada",
                  data: [2, 18, 5, 5, 2, 3, 10],
                  backgroundColor: "#FFC914",
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
                  backgroundColor: ["#1f1f1f", "#FFC914", "#3454D1"],
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
