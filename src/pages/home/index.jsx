import { AdminNavbar } from "@/shared/components/AdminNavbar";
import { PistaItem } from "@/shared/components/PistaItem";
import { Box, Grid, Stack, Typography } from "@mui/material";
import prisma from "../../../lib/prisma";
import StarIcon from "@mui/icons-material/Star";
import NearMeIcon from "@mui/icons-material/NearMe";

const HomePage = ({ pistas }) => {
  return (
    <>
      <AdminNavbar />
      <Box
        sx={{
          maxWidth: 1100,
          paddingX: "12px",
          marginX: "auto",
          marginY: "40px",
        }}
      >
        <Stack>
          <Box>
            <Typography variant="h4">Pistas destacadas</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <StarIcon color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight={300}>
                Hay un total de 192 pistas
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Grid container spacing={3} mt={1.5}>
          {pistas.map((pista) => (
            <Grid key={pista.id} item xs={12} sm={6} md={4} lg={4}>
              <PistaItem key={pista.id} pista={pista} />
            </Grid>
          ))}
        </Grid>

        <Stack mt={4}>
          <Box>
            <Typography variant="h4">Pistas cerca de ti</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <NearMeIcon color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight={300}>
                En un radio entre 0.5km y 2.5km
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Grid container spacing={3} mt={1.5}>
          {/* HAZ UN MAP DE LAS PISTAS PONIENDO EL ARRAY AL REVÉS */}
          {pistas
            .slice(0)
            .reverse()
            .map((pista) => (
              <Grid key={pista.id} item xs={12} sm={6} md={4} lg={4}>
                <PistaItem key={pista.id} pista={pista} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const pistas = await prisma.pista.findMany();

  return {
    props: {
      pistas,
    },
  };
};

export default HomePage;
