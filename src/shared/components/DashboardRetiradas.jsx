import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const DashboardRetiradas = ({ retiradas }) => {
  console.log(retiradas);

  return (
    <>
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
          Retiradas
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
          maxHeight: 200,
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
        {retiradas?.length > 0 &&
          retiradas.map((registro) => (
            <Stack
              key={registro.id}
              direction="row"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2}>
                <Typography variant="body2">
                  -{" "}
                  {Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(registro.amount)}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    registro.estado == "Pendiente"
                      ? "#d18111"
                      : registro.estado == "Completada"
                      ? "success.main"
                      : "error.main"
                  }
                >
                  {registro.estado}
                </Typography>
              </Stack>

              <Typography variant="body2">
                {
                  // FORMAT DATE TO THIS: 20:11 18/04/2023
                  new Date(registro.fecha).toLocaleString("es-ES", {
                    hour: "numeric",
                    minute: "numeric",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                }
              </Typography>
            </Stack>
          ))}
        {(retiradas?.length <= 0 || !retiradas) && (
          <Stack
            sx={{ width: "100%", height: "100%", p: 3 }}
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80 }} />
            <Typography fontWeight={300}>
              ¡Todavía no has hecho ningúna retirada!
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
};
