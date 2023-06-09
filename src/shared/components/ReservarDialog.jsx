import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const ReservarDialog = ({
  mostrar,
  saldoUsuario,
  pista,
  onClose,
  handleReservarPista,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [mostrar]);

  return (
    <Dialog
      open={mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Reservar la pista</DialogTitle>

      <Divider />

      <DialogContent sx={{ backgroundColor: "#fafafa" }}>
        <Typography variant="body1">
          ¿Estás seguro de que quieres reservar la pista?
        </Typography>
        <Typography variant="body2">
          Tu saldo es:{" "}
          {Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
          }).format(saldoUsuario)}
        </Typography>

        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <Typography variant="body2">
              Precio:{" "}
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(pista?.precio)}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Fecha de inicio:{" "}
              {new Date(pista?.fechaInicio).toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Fecha de fin:{" "}
              {new Date(pista?.fechaFin).toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Typography>
          </li>
        </ul>
      </DialogContent>

      <Divider />

      <DialogActions>
        <LoadingButton loading={loading} variant="" onClick={onClose}>
          Cancelar
        </LoadingButton>
        <LoadingButton
          loading={loading}
          onClick={() => {
            setLoading(true);
            handleReservarPista(pista.eventoId);
          }}
          color="primary"
          variant="contained"
          autoFocus
        >
          Reservar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
