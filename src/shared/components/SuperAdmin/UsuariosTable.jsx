import {
  Box,
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
import EditIcon from "@mui/icons-material/Edit";
import { EditUsuarioDialog } from "./EditUsuarioDialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../ConfirmDialog";
import { BorrarUsuarioDialog } from "./BorrarUsuarioDialog";

export const UsuariosTable = ({ users: usersProps }) => {
  const [users, setUsers] = useState(usersProps);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  function createData(id, name, businessName, email, role, saldo) {
    return { id, name, businessName, email, role, saldo };
  }

  const rows = users.map((user) => {
    return createData(
      user.id,
      user.name,
      user.businessName,
      user.email,
      user.role,
      user.saldo
    );
  });

  const closeEdit = () => {
    setSelectedUser(null);
  };

  const closeDelete = () => {
    setDeleteUser(null);
  };

  const actualizarUsuario = async (usuario) => {
    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ ...usuario }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status == 200) {
      toast.success("Usuario actualizado");
      setUsers([usuario, ...users.filter((user) => user.id !== usuario.id)]);
      closeEdit();
    }
  };

  const deleteUsuario = async (usuario) => {
    const res = await fetch(`/api/user/${usuario.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status == 200) {
      toast.success("Usuario borrado");
      setUsers(users.filter((user) => user.id !== usuario.id));
      closeDelete();
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
          Usuarios
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
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Rol</TableCell>
              <TableCell align="left">Saldo</TableCell>
              <TableCell align="left">Acciones</TableCell>
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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
                <TableCell align="left">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(row.saldo)}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row">
                    <Tooltip title="Editar Usuario">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedUser(row)}
                      >
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Usuario">
                      <IconButton
                        onClick={() => setDeleteUser(row)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

      <EditUsuarioDialog
        usuario={selectedUser}
        closeEdit={closeEdit}
        actualizarUsuario={actualizarUsuario}
      />

      <BorrarUsuarioDialog
        usuario={deleteUser}
        closeDelete={closeDelete}
        eliminarUsuario={deleteUsuario}
      />
    </>
  );
};
