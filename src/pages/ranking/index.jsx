import { MainLayout } from "@/shared/layouts/MainLayout";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarningIcon from "@mui/icons-material/Warning";

const RankingPage = ({ user }) => {
  user = JSON.parse(user);

  return (
    <MainLayout
      user={user}
      message={
        <Box
          sx={{
            backgroundColor: "background.dark",
            color: "#d4d4d4",
            paddingY: 1,
          }}
        >
          <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <WarningIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">Próximamente</Typography>
              <WarningIcon sx={{ fontSize: 16 }} />

              <Typography variant="body2">
                El sistema de ranking esta en desarrollo
              </Typography>
            </Stack>
          </Box>
        </Box>
      }
    >
      <Grid container mt={8} alignItems="center" rowGap={14} columnSpacing={3}>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              ¿Como funciona el ranking de Padel App?
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              En Padel App, hemos creado un sistema de ranking que te permitirá
              competir con otros jugadores y ascender en la tabla de posiciones.
              Para lograrlo, hemos diseñado un algoritmo de puntuación que toma
              en cuenta diferentes factores, como el número de partidos jugados,
              el nivel de habilidad de los oponentes, el número de victorias y
              derrotas, entre otros.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%",

              img: {
                maxWidth: "100%",
                maxHeight: "180px",
                objectFit: "contain",
              },
            }}
          >
            <img src="/undraw_winners.svg" alt="Ranking" />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack
            justifyContent="flex-start"
            alignItems="left"
            sx={{
              width: "100%",
              height: "100%",

              img: {
                maxWidth: "100%",
                maxHeight: "150px",
                objectFit: "contain",
                marginLeft: "-50px",
              },
            }}
          >
            <img src="/undraw_progress.svg" alt="Clasifiacióin" />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Clasificaciones por categorías
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Para hacer el sistema de ranking más interesante y justo, hemos
              creado diferentes categorías para diferentes niveles de habilidad.
              Esto significa que competirás contra jugadores con un nivel de
              habilidad similar al tuyo, y que podrás ascender en la tabla de
              posiciones de tu categoría hasta llegar al top 1.
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Box mt={10}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: "100vw",
            height: 225,
            backgroundColor: "#e6e6e6",
            position: "absolute",
            left: 0,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: "1100px",
              paddingX: "16px !important",
              margin: "0 auto",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <CalendarMonthIcon sx={{ fontSize: 72 }} />
              <Typography align="center">Se renueva cada mes</Typography>
            </Stack>
            <Stack spacing={2} alignItems="center">
              <MilitaryTechIcon sx={{ fontSize: 72 }} />
              <Typography align="center">
                Recompensas para los mejores
              </Typography>
            </Stack>
            <Stack spacing={2} alignItems="center">
              <BarChartIcon sx={{ fontSize: 72 }} />
              <Typography align="center">
                Categorías de distinto nivel
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Grid
        container
        sx={{ marginTop: "385px", marginBottom: "80px" }}
        alignItems="center"
        rowGap={14}
        columnSpacing={3}
      >
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Incentivos para los jugadores más destacados
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Queremos motivarte a seguir mejorando tu juego y a alcanzar el top
              1 del ranking en tu categoría. Por ello, ofrecemos incentivos
              especiales a los jugadores más destacados, como descuentos en el
              alquiler de pistas o entradas gratuitas para torneos.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%",

              img: {
                maxWidth: "100%",
                maxHeight: "180px",
                objectFit: "contain",
              },
            }}
          >
            <img src="/undraw_gifts.svg" alt="Pádel" />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%",

              img: {
                maxWidth: "100%",
                maxHeight: "180px",
                objectFit: "contain",
                transform: "scaleX(-1)",
                marginLeft: "-60px",
              },
            }}
          >
            <img src="/undraw_padel.svg" alt="Pádel" />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Un sistema de ranking justo y transparente
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Nuestro sistema de ranking está diseñado para ser justo y
              transparente. Cada jugador es evaluado en función de su desempeño
              en los partidos, y el algoritmo de puntuación es fácil de entender
              y aplicar. Queremos que todos los jugadores tengan la misma
              oportunidad de ascender en la tabla de posiciones y alcanzar el
              top 1.
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Typography
        variant="h2"
        fontWeight={600}
        mb={-1}
        mt={20}
        sx={{ textDecoration: "4px underline #3454D1" }}
        align="center"
      >
        PRÓXIMAMENTE
      </Typography>
      <Typography variant="body1" mb={5} align="center">
        ¡Te envíaremos un correo con nuevas noticias!
      </Typography>
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

  let user;

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });
  }

  const pistas = await prisma.pista.findMany();

  if (user) {
    user = JSON.stringify(user);
  }

  return {
    props: {
      pistas,
      user: user || null,
    },
  };
};

export default RankingPage;
