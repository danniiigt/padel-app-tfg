import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "404 - Padel App";
  }, []);

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "url('/404-bg.jpg')",
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // MAKE IT DARKER JUST THE IMAGE
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            opacity: 0.5,
          },
        }}
      ></Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: "30px 50px",
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h1" fontWeight={700}>
          404
        </Typography>
        <Typography>¡Esta página no existe!</Typography>
        <Link href="/" style={{ marginTop: 15 }}>
          <Button variant="contained">Volver al inicio</Button>
        </Link>
      </Stack>
    </>
  );
};

export default ErrorPage;
