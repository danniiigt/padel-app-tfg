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

const RegisterPage = () => {
  return (
    <Box height="100vh" width="100vw" display="flex">
      <Box
        sx={{
          width: "65%",
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
          width: "35%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderBottom: "4px solid #3454D1",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 450,
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
              type="email"
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
              placeholder="ContrAseÑaSegura!"
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
              Crear cuenta
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
