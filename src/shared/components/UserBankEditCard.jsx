import {
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { toast } from "react-toastify";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "next/link";

export const UserBankEditCard = ({ user: userProps }) => {
  const [user, setUser] = useState(userProps);
  const [editPaypalId, setEditPaypalId] = useState(false);
  const [paypalId, setPaypalId] = useState(user.paypalId);
  const [paypalIdError, setPaypalIdError] = useState(false);

  const handleCambiarNombre = async () => {
    setPaypalIdError(false);

    if (!paypalId) {
      toast.error("Debes ingresar un ID de Paypal");
      setPaypalIdError(true);
    } else if (paypalId.length < 25) {
      toast.error("El ID debe tener al menos 25 caracteres");
      setPaypalIdError(true);
    } else if (paypalId.length > 100) {
      setPaypalIdError(true);
      toast.error("El ID debe tener menos de 100 caracteres");
    } else if (paypalId === user.name) {
      setPaypalIdError(true);
      toast.error("El ID debe ser diferente al actual");
    } else {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          paypalId,
        }),
      });

      if (res.ok) {
        setEditPaypalId(false);
        toast.success("Paypal ID cambiado correctamente");
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
        Información de retiros de tu cuenta
      </Typography>
      <Divider />
      <Stack mt={4} spacing={2} sx={{ maxWidth: 800, width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Typography>Paypal ID</Typography>
          <Stack direction="row" spacing={1}>
            {editPaypalId && (
              <>
                <TextField
                  label="Paypal ID"
                  variant="outlined"
                  helperText={
                    <Typography
                      variant="body2"
                      sx={{ maxWidth: 400, fontSize: 12 }}
                      noWrap
                    >
                      P. Ej:
                      AbqVmYAQMe5ptU9dK0UMyWUnxmjBMtg1SvahWCYO-y97RV-7_RU0r-9AUy7dfi3XBMvKM0Doremkl69P
                    </Typography>
                  }
                  size="small"
                  autoComplete="off"
                  value={paypalId}
                  error={paypalIdError}
                  onChange={(e) => {
                    setPaypalId(e.target.value);
                    setPaypalIdError(false);
                  }}
                  autoFocus
                />
                <Button size="small" onClick={() => setEditPaypalId(false)}>
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

            {!editPaypalId && (
              <>
                <Typography fontWeight={300} sx={{ fontSize: 12 }}>
                  {user.paypalId || "Sin establecer"}
                </Typography>
                <Tooltip title="Editar" onClick={() => setEditPaypalId(true)}>
                  <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
                </Tooltip>
                <Tooltip title="Dónde conseguirlo">
                  <Link
                    href="https://ayuda.reworth.co/knowledge/en-d%C3%B3nde-encuentro-mi-merchant-id-de-paypal"
                    target="_blank"
                    style={{ color: "inherit" }}
                  >
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                    />
                  </Link>
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
