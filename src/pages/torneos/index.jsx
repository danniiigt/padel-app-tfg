import { MainLayout } from "@/shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { Box, Grid, Stack, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";

const Torneos = ({ user }) => {
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
                Los torneos estan en desarrollo
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
              Participa en torneos de padel y demuestra tu habilidad
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              ¡Desafía a otros jugadores y demuestra que eres el mejor en los
              torneos de padel! En Padel App, podrás encontrar una variedad de
              torneos, desde los más casuales hasta los más competitivos, en los
              que podrás poner a prueba tus habilidades en la cancha.
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
                paddingRight: 5,
              },
            }}
          >
            <img src="/undraw_create.svg" alt="Crea" />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Crea tu propio torneo personalizado y únete a la comunidad
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              ¿Te atreves a montar un torneo? En Padel App, puedes crear tu
              propio torneo personalizado con facilidad y unirte a la comunidad
              de jugadores de padel. Elige el formato, la fecha y la pista y
              deja que nos encarguemos del resto.
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Variedad de categorías y precios
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              En Padel App encontrarás una variedad de categorías de torneos y
              precios de entrada para satisfacer tus necesidades de juego. Ya
              sea que estés buscando un torneo casual para jugar con amigos o un
              torneo competitivo para demostrar tu habilidad, en nuestra
              aplicación encontrarás opciones para ti.
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
              marginLeft: 5,

              img: {
                maxWidth: "100%",
                maxHeight: "180px",
                objectFit: "contain",
                paddingLeft: 5,
              },
            }}
          >
            <img src="/undraw_preferences.svg" alt="Preferencias" />
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
              <PeopleIcon sx={{ fontSize: 72 }} />
              <Typography align="center">Crea torneos tu mismo</Typography>
            </Stack>
            <Stack spacing={2} alignItems="center">
              <EmojiEventsIcon sx={{ fontSize: 72 }} />
              <Typography align="center">Compite y sé el mejor</Typography>
            </Stack>
            <Stack spacing={2} alignItems="center">
              <BarChartIcon sx={{ fontSize: 72 }} />
              <Typography align="center">Torneos por precio y nivel</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Typography
        variant="h2"
        fontWeight={600}
        mb={-1}
        mt={20}
        sx={{ textDecoration: "4px underline #3454D1", marginTop: "385px" }}
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

export default Torneos;
