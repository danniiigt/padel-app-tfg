import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useState } from "react";
import { toast } from "react-toastify";

export const UserEditCard = ({ user: userProps }) => {
  const [user, setUser] = useState(userProps);
  const [editNombre, setEditNombre] = useState(false);
  const [editNombreNegocio, setEditNombreNegocio] = useState(false);
  const [nombre, setNombre] = useState(user.name);
  const [nombreNegocio, setNombreNegocio] = useState(user.businessName);
  const [nombreError, setNombreError] = useState(false);
  const [nombreNegocioError, setNombreNegocioError] = useState(false);

  const [esAdministrador, setEsAdministrador] = useState(user.role === "ADMIN");

  const handleCambiarNombre = async () => {
    setNombreError(false);

    if (!nombre) {
      toast.error("Debes ingresar un nombre");
      setNombreError(true);
    } else if (nombre.length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres");
      setNombreError(true);
    } else if (nombre.length > 50) {
      setNombreError(true);
      toast.error("El nombre debe tener menos de 50 caracteres");
    } else if (nombre === user.name) {
      setNombreError(true);
      toast.error("El nombre debe ser diferente al actual");
    } else {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: nombre,
        }),
      });

      if (res.ok) {
        setEditNombre(false);
        toast.success("Nombre cambiado correctamente");
      }

      const data = await res.json();
      setUser(data);
    }
  };

  const handleCambiarNombreNegocio = async () => {
    setNombreNegocioError(false);

    if (!nombreNegocio) {
      toast.error("Debes ingresar un nombre");
      setNombreNegocioError(true);
    } else if (nombreNegocio.length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres");
      setNombreNegocioError(true);
    } else if (nombreNegocio.length > 50) {
      setNombreNegocioError(true);
      toast.error("El nombre debe tener menos de 50 caracteres");
    } else if (nombreNegocio === user.businessName) {
      setNombreNegocioError(true);
      toast.error("El nombre debe ser diferente al actual");
    } else {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          businessName: nombreNegocio,
        }),
      });

      if (res.ok) {
        setEditNombreNegocio(false);
        toast.success("Nombre cambiado correctamente");
      }

      const data = await res.json();
      setUser(data);
    }
  };

  if (!user) return null;
  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid #d9d9d9",
        padding: 5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" fontWeight={300}>
        Información de tu cuenta
      </Typography>
      <Divider />
      <Stack mt={4} spacing={2} sx={{ maxWidth: 800, width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Typography>Nombre</Typography>
          <Stack direction="row" spacing={1}>
            {editNombre && (
              <>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  size="small"
                  value={nombre}
                  error={nombreError}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    setNombreError(false);
                  }}
                  autoFocus
                />
                <Button size="small" onClick={() => setEditNombre(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCambiarNombre}
                >
                  Guardar
                </Button>
              </>
            )}

            {!editNombre && (
              <>
                <Typography fontWeight={300}>{user.name}</Typography>
                <Tooltip title="Editar" onClick={() => setEditNombre(true)}>
                  <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>
        {esAdministrador && (
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography>Nombre de negocio</Typography>
            <Stack direction="row" spacing={1}>
              {editNombreNegocio && (
                <>
                  <TextField
                    label="Nombre de Negocio"
                    variant="outlined"
                    size="small"
                    value={nombreNegocio}
                    error={nombreNegocioError}
                    onChange={(e) => {
                      setNombreNegocio(e.target.value);
                      setNombreNegocioError(false);
                    }}
                    autoFocus
                  />
                  <Button
                    size="small"
                    onClick={() => setEditNombreNegocio(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCambiarNombreNegocio}
                  >
                    Guardar
                  </Button>
                </>
              )}

              {!editNombreNegocio && (
                <>
                  <Typography fontWeight={300}>
                    {user.businessName || "Sin establecer"}
                  </Typography>
                  <Tooltip
                    title="Editar"
                    onClick={() => setEditNombreNegocio(true)}
                  >
                    <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
                  </Tooltip>
                </>
              )}
            </Stack>
          </Stack>
        )}
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Typography>Email</Typography>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={300}>{user.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Typography>Estado</Typography>
          <Stack direction="row" spacing={1}>
            <DoneAllIcon color="success" />
            <Typography fontWeight={300}>ACTIVO</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
