import { getServerSession } from "next-auth";
import React, { useRef, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { Box, Button, Stack, Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";

const Home = () => {
  const landingBg = useRef(null);
  const [arrowDown, setArrowDown] = useState(false);

  setTimeout(() => {
    landingBg?.current?.classList.add("fadeIn-bg");
  }, 200);

  const buttonStyles = {
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid #242424",
    borderBottom: "2px solid #3454D1",

    "&:hover": {
      backgroundColor: "rgba(0,0,0, 0.5)",
      border: "1px solid #242424",
      borderBottom: "2px solid #3454D1",
    },
  };

  return (
    <>
      <Stack
        ref={landingBg}
        direction="row"
        alignItems="center"
        sx={{
          backgroundImage: `url('/landing-bg.jpg')`,
          position: "sticky",
          width: "100vw",
          left: 0,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,

          "&::before": {
            transition: "all 5s ease",
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,1)",
            zIndex: 1,
          },

          "*": {
            fontFamily: "Quicksand, Poppins, sans-serif !important",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1500,
            marginX: "auto",
            paddingX: "64px",
            zIndex: 1,
            marginBottom: 9.5,
          }}
        >
          <Typography
            className="animate__animated animate__fadeIn delay-1750"
            variant="h3"
            sx={{ textDecoration: "4px underline #3454D1" }}
            color="rgba(255,255,255,0.7)"
            fontFamily={"Poppins, sans-serif !important"}
          >
            Padel App
          </Typography>
          <Typography
            variant="h1"
            fontWeight={700}
            color="rgba(255,255,255,0.7)"
            className="animate__animated animate__fadeIn animate__delay-3s"
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Donde los profesionales se encuentran")
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString("Pistas de pádel a un click")
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString(
                    "El hogar de los jugadores profesionales de pádel y sus desafíos"
                  )
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString(
                    "El punto de encuentro de los verdaderos profesionales del pádel"
                  )
                  .pauseFor(2500)
                  .deleteAll()
                  .start()
                  .typeString("Donde los profesionales se encuentran");
              }}
            />
          </Typography>
        </Box>

        <Stack
          className="animate__animated animate__fadeIn animate__delay-5s"
          direction="row"
          spacing={3}
          sx={{
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <Link href="/home">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              sx={buttonStyles}
            >
              Ver Pistas
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              sx={buttonStyles}
            >
              Iniciar sesion
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const nextAuthSession = await getServerSession(ctx.req, ctx.res, authOptions);

  if (nextAuthSession) {
    return {
      redirect: {
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
