import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const PistaItem = ({ pista }) => {
  const [mediaValoracion, setMediaValoracion] = useState(0);
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/home/pistas/${pista.id}`);
  };

  useEffect(() => {
    setMediaValoracion(0);

    if (pista.valoracion.length > 0) {
      const media = pista.valoracion.reduce((acc, valoracion) => {
        return acc + valoracion.puntuacion;
      }, 0);

      setMediaValoracion(media / pista.valoracion.length);
    }
  }, []);

  return (
    <Card
      spacing={0}
      sx={{
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        borderRadius: 1,
        height: 235,
      }}
    >
      {pista.imagenes?.length > 0 && (
        <CardActionArea
          onClick={handleRedirect}
          sx={{
            height: "67%",
            img: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "5px 5px 0 0",
              filter: "brightness(0.8)",
              transition: "all 0.5s ease",
            },

            "&:hover": {
              cursor: "pointer",

              img: {
                filter: "brightness(0.65)",
                transform: "scale(1.1)",
              },
            },
          }}
        >
          <img src={pista.imagenes[0]} alt="Imagen Pista" />
        </CardActionArea>
      )}

      {(pista.nombre ||
        pista.telefono ||
        pista.ubicacionLatitud ||
        pista.ubicacionLongitud) && (
        <Box
          sx={{
            height: "33%",
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
              <Typography>
                <Link
                  href={`/home/pistas/${pista.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {pista.nombre}
                </Link>
              </Typography>
              {pista.ubicacionLatitud && pista.ubicacionLongitud && (
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Rating
                    name="read-only"
                    value={mediaValoracion}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" fontWeight={300}>
                    ({pista.valoracion.length})
                  </Typography>
                </Stack>
              )}
            </Box>
            <Stack>
              {pista.telefono && (
                <Tooltip title="Llamar">
                  <Link href={`tel:+34601361279`}>
                    <IconButton>
                      <CallOutlinedIcon color="primary" />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Card>
  );
};
