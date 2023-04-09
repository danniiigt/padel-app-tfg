import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { MainLayout } from "../../../../shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useState } from "react";
import { PistaItem } from "@/shared/components/PistaItem";
import { useRouter } from "next/router";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AddPista = ({ user, step }) => {
  const router = useRouter();

  const initialPistaForm = {
    nombre: "",
    descripcion: "",
    imagen: "",
    ubicacionLatitud: "",
    ubicacionLongitud: "",
    telefono: "",
  };

  const [pistaForm, setPistaForm] = useState(initialPistaForm);
  const steps = ["Información general", "Añadir horarios y precios", "Resumen"];

  const handleImageUpload = (e) => {
    // UPLOAD THE IMAGE TO CLOUDINARY
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kynbyrvd");
    fetch("https://api.cloudinary.com/v1_1/dqcgushqm/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPistaForm({
          ...pistaForm,
          imagen: data.secure_url,
        });
      });
  };

  if (step == 1) {
    return (
      <MainLayout>
        <Stack
          mt={4}
          spacing={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            p: "15px 20px",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            borderTop: "3px solid #3454D1",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Añadir pista
            </Typography>
            <Typography noWrap>
              Tienes un total de {user.pista.length} pistas
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ width: "100%" }} activeStep={step - 1}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <Grid container spacing={4} mt={0}>
          <Grid item xs={7}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    placeholder="Nombre de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    onChange={(e) => {
                      setPistaForm({
                        ...pistaForm,
                        nombre: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    placeholder="Teléfono de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    onChange={(e) => {
                      setPistaForm({
                        ...pistaForm,
                        telefono: e.target.value,
                      });
                    }}
                  />
                </Stack>
                <TextField
                  label="Descripcion"
                  variant="outlined"
                  placeholder="Pista de pádel de tierra batida..."
                  size="small"
                  fullWidth
                  sx={{ backgroundColor: "#f9f9f9" }}
                  // MAKE IT A TEXTAREA
                  multiline
                  rows={4}
                  onChange={(e) => {
                    setPistaForm({
                      ...pistaForm,
                      descripcion: e.target.value,
                    });
                  }}
                />

                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Latitud"
                    variant="outlined"
                    placeholder="Latitud de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    onChange={(e) => {
                      setPistaForm({
                        ...pistaForm,
                        ubicacionLatitud: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    label="Longitud"
                    variant="outlined"
                    placeholder="Longitud de la pista"
                    size="small"
                    fullWidth
                    inputProps={{
                      style: {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    onChange={(e) => {
                      setPistaForm({
                        ...pistaForm,
                        ubicacionLongitud: e.target.value,
                      });
                    }}
                  />
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      // MUESTRA LA IMAGEN POR CONSOLA
                      onChange={handleImageUpload}
                    />
                    <PhotoCamera />
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    component="label"
                  >
                    Imagen
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={
                pistaForm !== initialPistaForm
                  ? {
                      padding: "20px",
                      borderRadius: 2,
                      height: "100%",
                      border: "2px dotted #dbdbdb",
                    }
                  : {
                      padding: "20px",
                      borderRadius: 1,
                      height: "100%",
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
              }
            >
              {pistaForm == initialPistaForm && (
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <RemoveRedEyeOutlinedIcon />
                  <Typography variant="h6" fontWeight={300}>
                    Vista previa...
                  </Typography>
                </Stack>
              )}
              <PistaItem pista={pistaForm} />
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={3}
          sx={{
            backgroundColor: "background.paper",
            p: "15px",
            width: "fit-content",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
          }}
        >
          <Button
            variant="outlined"
            disabled
            color="primary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              router.push(`/admin/pistas/add?step=${Number(step) + 1}`);
            }}
          >
            Siguiente
          </Button>
        </Box>
      </MainLayout>
    );
  } else if (step == 2) {
    return (
      <MainLayout>
        <Stack
          mt={4}
          spacing={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            p: "15px 20px",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Añadir pista
            </Typography>
            <Typography noWrap>
              Tienes un total de {user.pista.length} pistas
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ width: "100%" }} activeStep={step - 1}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <Box
          mt={3}
          sx={{
            backgroundColor: "background.paper",
            p: "15px",
            width: "fit-content",
            borderRadius: 1.5,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.005)",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
            onClick={() => {
              router.push(`/admin/pistas/add?step=${Number(step) - 1}`);
            }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<ChevronRightIcon />}
            onClick={() => {
              router.push(`/admin/pistas/add?step=${Number(step) + 1}`);
            }}
          >
            Siguiente
          </Button>
        </Box>
      </MainLayout>
    );
  }
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const prisma = new PrismaClient();
  const { step } = ctx.query;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },

    include: {
      pista: true,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      user,
      step: step || 1,
    },
  };
};

export default AddPista;
