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
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

const RegisterPage = () => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Registro - Padel App";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    let errors = false;

    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("password-confirm");

    if (name.length < 3) {
      setNameError(true);
      errors = true;
    }

    if ((await emailEnUso(email)) == true) {
      setEmailError(true);
      errors = true;
    }

    if (password.length < 8) {
      setPasswordError(true);
      errors = true;
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
      errors = true;
    }

    if (errors) {
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.status == 200) {
      await signIn("credentials", {
        email,
        password,
        redirect: `${window.location.origin}/admin`,
      });
    }

    setLoading(false);
  };

  const emailEnUso = async (email) => {
    const res = await fetch(`/api/user/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (data.ok == false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box height="100vh" width="100vw" display="flex">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)",
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
          borderBottom: "4px solid #3454D1",
        }}
        className="animate__animated animate__fadeIn"
      >
        <Box
          component="form"
          onSubmit={handleRegister}
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
              <Typography variant="h4">Crear una cuenta</Typography>
              <Typography variant="body2" color="primary">
                ¿Ya tienes cuenta?{" "}
                <Link href="/auth/login" style={{ color: "inherit" }}>
                  Inicia sesión
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
              onClick={() =>
                signIn("google", {
                  callbackUrl: `${window.location.origin}/admin`,
                }).then(() => {})
              }
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
              onClick={() =>
                signIn("twitter", {
                  callbackUrl: `${window.location.origin}/admin`,
                })
              }
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
              onClick={() =>
                signIn("github", {
                  callbackUrl: `${window.location.origin}/admin`,
                })
              }
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
              label="Nombre completo"
              variant="outlined"
              placeholder="Tu nombre completo"
              fullWidth
              name="name"
              required
              error={nameError}
              helperText={nameError && "El nombre debe tener al menos 3 letras"}
              onKeyUp={() => setNameError(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Correo electrónico"
              variant="outlined"
              placeholder="tucorreo@correo.com"
              fullWidth
              type="email"
              name="email"
              required
              error={emailError}
              helperText={emailError && "El correo ya está en uso"}
              onKeyUp={() => setEmailError(false)}
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
              placeholder="ContrAseÑaSegura!"
              type="password"
              fullWidth
              name="password"
              required
              error={passwordError}
              helperText={passwordError && "La contraseña es muy corta"}
              onKeyUp={() => setPasswordError(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="COnfirmar contraseña"
              variant="outlined"
              placeholder="ContrAseÑaSegura!"
              type="password"
              fullWidth
              name="password-confirm"
              required
              error={passwordConfirmError}
              helperText={
                passwordConfirmError && "Las contraseñas no coinciden"
              }
              onKeyUp={() => setPasswordConfirmError(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 3 }}
              disableRipple
              type="submit"
              loading={loading}
            >
              Crear cuenta
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const nextAuthSession = await getServerSession(ctx.req, ctx.res, authOptions);
  let session = null;

  if (nextAuthSession?.user?.user) {
    session = nextAuthSession.user;
  } else {
    session = nextAuthSession;
  }

  if (session) {
    return { redirect: { destination: "/home" } };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
