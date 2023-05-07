import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export const NotAuthNavbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: 1100,
              marginX: "auto",
              paddingX: "16px !important",
            }}
          >
            <Typography variant="h6">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                href="/home"
              >
                Padel App
              </Link>
            </Typography>

            <Stack direction="row" ml={5} spacing={4} alignItems="center">
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/home"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Inicio
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/buscador"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Buscador
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/soporte"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Soporte
                </Link>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              flexGrow={1}
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                variant="contained"
                size="small"
                color="secondary"
                disableElevation
                endIcon={<HowToRegIcon fontSize="small" />}
              >
                <Link
                  href="/auth/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Registrarme
                </Link>
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
