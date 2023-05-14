import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const EditUsuarioDialog = ({
  usuario: usuarioProp,
  closeEdit,
  actualizarUsuario,
}) => {
  const [usuario, setUsuario] = useState(usuarioProp);

  useEffect(() => {
    setUsuario(usuarioProp);
  }, [usuarioProp]);

  const handleCambioRol = (e) => {
    setUsuario({ ...usuario, role: e.target.value });
  };

  return (
    <Dialog
      open={usuario ? true : false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Editar Usuario</DialogTitle>

      <Divider />

      <DialogContent sx={{ backgroundColor: "#f4f4f4" }}>
        <Stack sx={{ minWidth: 400 }} spacing={2}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            value={usuario?.name}
            onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
            disabled
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            value={usuario?.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            disabled
          />
          {/* <TextField
            label="Rol"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            value={usuario?.role}
            onChange={(e) => setUsuario({ ...usuario, role: e.target.value })}
          /> */}
          <Select
            id="demo-simple-select"
            value={usuario?.role}
            label="Rol"
            sx={{ backgroundColor: "white" }}
            onChange={handleCambioRol}
          >
            <MenuItem value={"USER"}>Usuario</MenuItem>
            <MenuItem value={"ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"SUPERADMIN"}>Superadministrador</MenuItem>
          </Select>
          <TextField
            label="Saldo"
            variant="outlined"
            fullWidth
            type="number"
            sx={{ backgroundColor: "white" }}
            value={usuario?.saldo}
            onChange={(e) => setUsuario({ ...usuario, saldo: e.target.value })}
          />
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button variant="" onClick={closeEdit}>
          Cancelar
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => actualizarUsuario(usuario)}
          autoFocus
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
