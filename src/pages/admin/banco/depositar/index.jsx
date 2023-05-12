import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const DepositarPage = ({ user }) => {
  user = JSON.parse(user);
  const router = useRouter();

  const [amountValue, setAmountValue] = useState();

  const checkAmountValue = () => {
    if (amountValue < 10) {
      setAmountValue(10);
    }

    if (amountValue > 1000) {
      setAmountValue(1000);
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
      link: "/admin/banco",
      text: "Banco",
    },
    {
      link: "/admin/banco/depositar",
      text: "Depositar",
    },
  ];

  const handleDepositPaypal = async (details) => {
    if (details?.status?.toUpperCase() == "COMPLETED") {
      const res = await fetch("/api/transacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(details.purchase_units[0].amount.value),
          tipo: "Depósito",
          usuarioId: user.id,
          paypalId: details.id,
        }),
      });

      const data = await res.json();

      if (res.status == 200) {
        toast.success(data.message);
        router.push("/admin/banco");
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Depositar - Padel App";
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
              min: 10,
              max: 1000,
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
      <Stack
        mt={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Depósito mínimo de 10€ y máximo de 1000€</Typography>

        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: process.env.NEXT_PUBLIC_PLATFORM_CURRENCY,
            components: "buttons",
          }}
        >
          <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amountValue]}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code:
                          process.env.NEXT_PUBLIC_PLATFORM_CURRENCY,
                        value: amountValue,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  // Your code here after create the order
                  return orderId;
                });
            }}
            onCancel={(data, actions) => {
              console.log("onCancel", data, actions);
            }}
            onError={(err) => {
              console.log("onError", err);
            }}
            onApprove={function (data, actions) {
              return actions.order.capture().then(function (details) {
                handleDepositPaypal(details);
                console.log(details);
              });
            }}
          />
        </PayPalScriptProvider>
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

export default DepositarPage;
