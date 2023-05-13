import { Box, Divider, Stack, Typography } from "@mui/material";

export const DashboardRegistros = ({ registros }) => {
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
          Registros
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
          maxHeight: "250px",
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
        {registros?.length > 0 &&
          registros.map((registro) => (
            <Stack
              key={registro.id}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="body2">{registro.accion}</Typography>
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
        {(registros?.length <= 0 || !registros) && (
          <Typography>Todavía no hay ningún registro</Typography>
        )}
      </Stack>
    </>
  );
};
