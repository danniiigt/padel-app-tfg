import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";
import { toast } from "react-toastify";

export const UserEditImage = ({ user: userProps }) => {
  const [user, setUser] = useState(userProps);

  const handleImageUpload = async (e) => {
    // UPLOAD THE IMAGE TO CLOUDINARY
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kynbyrvd");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqcgushqm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);

    const resUsuario = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        image: data.secure_url,
      }),
    });

    const dataUsuario = await resUsuario.json();

    if (res.status == 200) {
      toast.success("Imagen de perfil actualizada correctamente");
      setUser(dataUsuario);
    } else {
      toast.error("Error al actualizar la imagen de perfil");
    }
  };

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
        Imagen de perfil
      </Typography>
      <Divider />

      <Stack spacing={3} mt={5} alignItems="center">
        {user.image ? (
          <Avatar
            alt="Foto Perfil"
            src={user.image}
            sx={{ width: 120, height: 120 }}
          />
        ) : (
          <Typography>Imágen de usuario sin establecer</Typography>
        )}

        <Button
          variant="contained"
          component="label"
          startIcon={<AddAPhotoIcon />}
        >
          Añadir Foto
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />
        </Button>
      </Stack>
    </Box>
  );
};
