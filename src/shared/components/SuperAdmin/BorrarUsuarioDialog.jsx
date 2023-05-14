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
import { toast } from "react-toastify";

export const BorrarUsuarioDialog = ({
  usuario,
  closeDelete,
  eliminarUsuario,
}) => {
  return (
    <Dialog
      open={usuario ? true : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Borrar el usuario {usuario?.name}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Typography>
          ¿Estás seguro de que quieres borrar el usuario {usuario?.name}?
        </Typography>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={closeDelete}>Cancelar</Button>
        <Button
          onClick={() => eliminarUsuario(usuario)}
          color="error"
          variant="contained"
          autoFocus
        >
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
