import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

export const CancelarReservaDialog = ({ mostrar, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mostrar) {
      setLoading(false);
    }
  }, [mostrar]);

  return (
    <Dialog
      open={mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cancelar la reserva</DialogTitle>
      <Divider />
      <DialogContent sx={{ backgroundColor: "#fafafa" }}>
        <DialogContentText id="alert-dialog-description">
          ¿Estás seguro de que quieres cancelar la reserva?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <LoadingButton loading={loading} onClick={() => onCancel()}>
          VOLVER
        </LoadingButton>
        <LoadingButton
          loading={loading}
          onClick={() => {
            setLoading(true);
            onConfirm();
          }}
          color="error"
          autoFocus
        >
          CANCELAR RESERVA
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
