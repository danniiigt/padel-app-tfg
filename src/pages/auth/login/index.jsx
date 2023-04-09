import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <Box height="100vh" width="100vw" display="flex">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.5)",
        }}
      ></Box>
      <Box
        sx={{
          width: "30%",
          minWidth: 500,
          padding: "0 20px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
        }}
        className="animate__animated animate__fadeIn"
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box
            mb={5}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h4">Iniciar Sesión</Typography>
              <Typography variant="body2" color="primary">
                ¿No tienes cuenta?{" "}
                <Link href="/auth/register" style={{ color: "inherit" }}>
                  Regístrate
                </Link>
              </Typography>
            </Box>
            <Box>
              <LockOutlinedIcon
                fontSize="large"
                color="primary"
                sx={{ mr: 1 }}
              />
            </Box>
          </Box>

          <Stack spacing={1} direction={"row"}>
            <Button
              variant="outlined"
              fullWidth
              size="medium"
              color="info"
              sx={{ textTransform: "none" }}
              onClick={() => signIn("google")}
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google-logo"
                style={{ width: 30, marginRight: 10 }}
              />
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="medium"
              color="info"
              sx={{ textTransform: "none" }}
            >
              <img
                src="https://seeklogo.com/images/T/twitter-2012-positive-logo-916EDF1309-seeklogo.com.png"
                alt=""
                style={{ width: 20, marginRight: 10 }}
              />
              Twitter
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="medium"
              color="info"
              sx={{ textTransform: "none" }}
              onClick={() => signIn("github")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt=""
                style={{ width: 20, marginRight: 10 }}
              />
              GitHub
            </Button>
          </Stack>

          <Divider sx={{ my: 4, color: "text.secondary" }}>o</Divider>

          <Stack spacing={3}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              placeholder="Correo electrónico"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Contraseña"
              variant="outlined"
              placeholder="Contraseña"
              type="password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 3 }}
              disableRipple
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return { redirect: { destination: "/home" } };
  }

  return {
    props: {},
  };
};

export default LoginPage;
