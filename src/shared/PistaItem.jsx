import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

export const PistaItem = ({ pista }) => {
  console.log(pista);

  return (
    <Stack
      spacing={0}
      sx={{
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        borderRadius: 1,
      }}
    >
      {pista.imagen && (
        <Box
          sx={{
            maxHeight: 200,
            img: {
              width: "100%",
              height: "100%",
              maxHeight: 200,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "5px 5px 0 0",
              filter: "brightness(0.8)",
            },
          }}
        >
          <img src={pista.imagen} alt="Imagen Pista" />
        </Box>
      )}

      {(pista.nombre ||
        pista.telefono ||
        pista.ubicacionLatitud ||
        pista.ubicacionLongitud) && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "background.paper",
            borderRadius: "0 0 5px 5px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography>{pista.nombre}</Typography>
              {pista.ubicacionLatitud && pista.ubicacionLongitud && (
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <LocationOnOutlinedIcon sx={{ fontSize: "15px" }} />
                  <Typography variant="body2" fontWeight={300}>
                    A 0.8km de tu ubicación
                  </Typography>
                </Stack>
              )}
            </Box>
            <Stack>
              {pista.telefono && (
                <Tooltip title="Llamar">
                  <IconButton>
                    <CallOutlinedIcon color="primary" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};
