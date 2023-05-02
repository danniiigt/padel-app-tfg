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
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const DepositarPage = ({ user }) => {
  user = JSON.parse(user);

  const [amountValue, setAmountValue] = useState();

  const checkAmountValue = () => {
    if (amountValue < 10) {
      setAmountValue(10);
    }

    if (amountValue > 1000) {
      setAmountValue(1000);
    }
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

  return (
    <MainLayout userImage={user.image} breadcrumbsItems={breadcrumbsItems}>
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
        <Box>
          <Button
            variant="contained"
            color="inherit"
            disableElevation
            sx={{
              height: "100%",
              color: "background.paper",
            }}
            onClick={() => setAmountValue(0)}
          >
            <CloseIcon sx={{ color: "text.secondary" }} />
          </Button>
        </Box>
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
      <Stack mt={3} direction="row" justifyContent="space-between">
        <Typography>Depósito mínimo de 10€ y máximo de 1000€</Typography>
      </Stack>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

export default DepositarPage;
