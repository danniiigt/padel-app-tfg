import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

export const ConfirmDialog = ({
  pistaNombre,
  pistaId,
  mostrar,
  onClose,
  usuarioId,
  refreshData,
}) => {
  const handleDeletePista = async () => {
    const res = await fetch(`/api/pistas/${pistaId}-${usuarioId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      refreshData();
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    onClose();
  };

  return (
    <Dialog
      open={mostrar}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Borrar la pista {pistaNombre}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Podrás recuperar la pista en un plazo de 30 dias.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDeletePista} color="error" autoFocus>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
