import { Box, Divider, Stack, Typography } from "@mui/material";
import { ReservaPistaItem } from "./ReservaPistaItem";

export const ReservasPistas = ({ pistas }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          borderRadius: 1,
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={400}>
            Reservas por pistas
          </Typography>
        </Box>
        <Divider />
        <Stack divider={<Divider sx={{ borderColor: "#f2f2f2" }} />}>
          {pistas.map((pista) => (
            <ReservaPistaItem key={pista.id} pista={pista} />
          ))}
        </Stack>
      </Box>
    </>
  );
};
