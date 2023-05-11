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

export const PistasTable = ({ pistas }) => {
  function createData(id, name, telefono, dueño, evento, reserva) {
    return { id, name, telefono, dueño, evento, reserva };
  }

  const rows = pistas.map((pista) => {
    return createData(
      pista.id,
      pista.nombre,
      pista.telefono,
      pista.usuario.name,
      pista.evento?.length,
      pista.reserva?.length || 0
    );
  });

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
          Pistas
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
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Teléfono</TableCell>
              <TableCell align="left">Dueño</TableCell>
              <TableCell align="left">Eventos</TableCell>
              <TableCell align="left">Reservas</TableCell>
              <TableCell align="center">Eliminar</TableCell>
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
                <TableCell align="left">{row.telefono}</TableCell>
                <TableCell align="left">{row.dueño}</TableCell>
                <TableCell align="left">{row.evento}</TableCell>
                <TableCell align="left">{row.reserva}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Eliminar Pista">
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </>
  );
};
