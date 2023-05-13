import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import prisma from "../../../../lib/prisma";

const RetirarPage = ({ user }) => {
  user = JSON.parse(user);
  const router = useRouter();

  const [amountValue, setAmountValue] = useState();

  const checkAmountValue = () => {
    if (amountValue < 100) {
      setAmountValue(100);
    }

    if (user.saldo < 1000) {
      if (amountValue > user.saldo) {
        setAmountValue(user.saldo);
      }
    } else {
      if (amountValue > 1000) {
        setAmountValue(1000);
      }
    }
  };

  const style = {
    layout: "horizontal", // horizontal | vertical
    color: "black", // gold | blue | silver | black
    shape: "rect", // pill | rect
    label: "paypal", // pay | buynow | paypal
    tagline: false, // true | false
    height: 40,
  };

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/banco",
      text: "Banco",
    },
    {
      link: "/banco/retirar",
      text: "Retirar",
    },
  ];

  const handleRetiro = async () => {
    const res = await fetch("/api/transacciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountValue,
        tipo: "Retiro",
        usuarioId: user.id,
        estado: "Pendiente",
      }),
    });

    const data = await res.json();

    if (res.status == 200) {
      toast.success(data.message);
      router.push("/banco");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    document.title = "Retirar - Padel App";
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Stack
        sx={{
          marginTop: 5,
          height: "100%",
          padding: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          minHeight: 175,
        }}
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <TextField
          fullWidth
          sx={{
            height: "100%",
            flexGrow: 1,
            border: "none",
            color: "text.primary",

            ".MuiInputBase-input": {
              color: "#999 !important",
            },

            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          placeholder="125"
          InputProps={{
            style: {
              height: 175,
              fontSize: 90,
              border: "none",
            },

            inputProps: {
              min: 100,
              max: user.saldo > 1000 ? 1000 : user.saldo,
            },

            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="h1" color="text.secondary" mr={5}>
                  €
                </Typography>
              </InputAdornment>
            ),
          }}
          type="number"
          value={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
          onBlur={checkAmountValue}
          autoComplete="off"
        />

        <Stack spacing={1.5} justifyContent="space-between">
          <Button
            variant="contained"
            disableElevation
            sx={{ paddingX: 5, height: "100%", fontSize: 20 }}
            onClick={() => setAmountValue(50)}
          >
            50€
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ paddingX: 5, height: "100%", fontSize: 20 }}
            onClick={() => setAmountValue(100)}
          >
            100€
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ paddingX: 5, height: "100%", fontSize: 20 }}
            onClick={() => setAmountValue(200)}
          >
            200€
          </Button>
        </Stack>
      </Stack>
      <Stack mt={3} direction="row" spacing={3}>
        <Box
          sx={{
            height: "100%",
            padding: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <List disablePadding>
            <ListItem>
              <Typography>
                Saldo disponible para retirar:{" "}
                <span style={{ fontWeight: 600 }}>
                  {Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(user.saldo)}
                </span>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Retiro mínimo de 100,00€ y máximo de 1000,00€
              </Typography>
            </ListItem>

            <ListItem>
              <Typography>
                Los retiros se procesan en un plazo de 24 horas laborables
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{
            height: "100%",
            padding: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <Button
            variant=""
            sx={{ height: "100%", border: "1px solid #dbdbdb" }}
            endIcon={<ExitToAppIcon />}
            onClick={handleRetiro}
          >
            SOLICITAR RETIRO
          </Button>
        </Box>
      </Stack>
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

  if (!session) {
    return { redirect: { destination: "/auth/login" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/auth/login" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

export default RetirarPage;
