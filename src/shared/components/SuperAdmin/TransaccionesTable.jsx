import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

export const TransaccionesTable = ({
  transacciones: transaccionesProp,
  reloadPage,
}) => {
  const [transacciones, setTransacciones] = useState(transaccionesProp);

  function createData(id, amount, estado, tipo, nombre, paypalId) {
    return { id, amount, estado, tipo, nombre, paypalId };
  }

  const router = useRouter();

  const rows = transacciones.map((pista) => {
    return createData(
      pista.id,
      pista.amount,
      pista.estado,
      pista.tipo,
      pista.usuario.name,
      pista.usuario.paypalId
    );
  });

  const paypalStyledButton = {
    layout: "horizontal", // horizontal | vertical
    color: "black", // gold | blue | silver | black
    shape: "rect", // pill | rect
    label: "paypal", // pay | buynow | paypal
    tagline: false, // true | false
    height: 25,
  };

  const handleCancelarPago = async (transaccionId) => {
    const res = await fetch(`/api/transacciones/${transaccionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: "Cancelada",
      }),
    });

    if (res.status === 200) {
      toast.success("Transaccion denegada");
      reloadPage();
    }
  };

  const handleAprobarPago = async (transaccionId, paypalData) => {
    if (paypalData.status == "COMPLETED") {
      const res = await fetch(`/api/transacciones/${transaccionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: "Completada",
          paypalId: paypalData.id,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.success("Transaccion completada");
        reloadPage();
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "12px 15px",
          backgroundColor: "background.paper",
          borderRadius: "4px 4px 0 0",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Transacciones
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#eeeeee" }} />
      <Stack
        sx={{
          backgroundColor: "#f9fafb",
          borderRadius: "0 0 4px 4px",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          maxHeight: "240px",
          overflowY: "auto",
        }}
        divider={
          <Divider
            orientation="horizontal"
            sx={{ borderColor: "#e4e4e4" }}
            flexItem
          />
        }
        spacing={2}
      >
        <Table sx={{ minWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Tipo</TableCell>
              <TableCell align="left">Nombre</TableCell>
              {rows.filter((row) => row.estado.toLowerCase() == "pendiente")
                .length > 0 && <TableCell align="center">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">
                  {Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(row.amount)}
                </TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.estado}
                    color={
                      row.estado.toLowerCase() == "completada"
                        ? "success"
                        : row.estado.toLowerCase() == "cancelada"
                        ? "error"
                        : "secondary"
                    }
                  />
                </TableCell>
                <TableCell align="left">{row.tipo}</TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                {rows.filter((row) => row.estado.toLowerCase() == "pendiente")
                  .length > 0 && (
                  <TableCell align="center">
                    {row.estado.toLowerCase() == "pendiente" && (
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Tooltip title="Cancelar transaccion">
                          <IconButton
                            size="small"
                            onClick={() => handleCancelarPago(row.id)}
                          >
                            <CancelIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                        <PayPalScriptProvider
                          options={{
                            "client-id":
                              process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                            currency: process.env.NEXT_PUBLIC_PLATFORM_CURRENCY,
                            components: "buttons",
                          }}
                        >
                          <PayPalButtons
                            style={paypalStyledButton}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: row.amount,
                                      currency_code:
                                        process.env
                                          .NEXT_PUBLIC_PLATFORM_CURRENCY,
                                    },
                                    payee: {
                                      email_address: row.paypalId,
                                    },
                                    description: "Retiro de dinero Padel App",
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order
                                .capture()
                                .then((orderData) => {
                                  handleAprobarPago(row.id, orderData);
                                });
                            }}
                          />
                        </PayPalScriptProvider>
                      </Stack>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </>
  );
};
