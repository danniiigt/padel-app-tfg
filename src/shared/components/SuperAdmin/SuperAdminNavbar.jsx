import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EmailIcon from "@mui/icons-material/Email";

export const SuperAdminNavbar = ({ user, breadcrumbsItems, message }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar elevation={0} sx={{ backgroundColor: "background.dark" }}>
        <Stack
          sx={{ backgroundColor: "primary.main", width: "100%", height: 40 }}
        >
          <Box
            sx={{
              maxWidth: 1100,
              marginX: "auto",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingX: "16px !important",
              gap: 3,
            }}
          >
            <AdminPanelSettingsIcon sx={{ color: "white" }} />
            <Typography color="white">
              Sesión Iniciada como Super Administrador
            </Typography>
            <AdminPanelSettingsIcon sx={{ color: "white" }} />
          </Box>
        </Stack>
        <Toolbar
          sx={{
            maxWidth: 1100,
            marginX: "auto",
            width: "100%",
            paddingX: "16px !important",
          }}
        >
          <Stack
            spacing={5}
            direction="row"
            sx={{
              maxWidth: 1100,
              width: "100%",
              marginX: "auto",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                href="/superadmin"
              >
                SuperAdmin
              </Link>
            </Typography>

            <Stack direction="row" spacing={4}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  "&:hover": {
                    color: "#eeee",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/superadmin/usuarios"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Usuarios
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  "&:hover": {
                    color: "#eeee",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/superadmin/pistas"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Pistas
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  "&:hover": {
                    color: "#eeee",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/superadmin/transacciones"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Transacciones
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  "&:hover": {
                    color: "#eeee",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/superadmin/transacciones"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Soporte
                </Link>
              </Typography>
            </Stack>

            <Box
              flexGrow={1}
              justifyContent="flex-end"
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Tooltip title="Mensajes de Soporte">
                <IconButton sx={{ color: "#eeee", mr: 1 }}>
                  <Badge badgeContent={3} color="secondary">
                    <EmailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Tu perfil">
                <IconButton
                  size="small"
                  sx={{ width: 28, height: 28 }}
                  onClick={handleMenu}
                >
                  <Avatar
                    alt="Tu imagen"
                    src={user.image}
                    sx={{ width: 28, height: 28 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "35px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disableTouchRipple disableRipple>
                  <Stack spacing={5}>
                    <img
                      alt="Tu imagen"
                      src={user.image}
                      style={{
                        width: 60,
                        objectFit: "contain",
                        margin: "0 auto",
                        marginBottom: 10,
                      }}
                    />
                    <ListItemText>{user.name}</ListItemText>
                  </Stack>
                </MenuItem>

                <Divider sx={{ marginY: "3px !important" }} />

                <MenuItem
                  onClick={() => {
                    signOut({
                      callbackUrl: `${window.location.origin}/auth/login`,
                    });
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Cerrar Sesión</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {breadcrumbsItems?.length > 0 && (
        <>
          <Divider sx={{ borderColor: "#333" }} />
          <Box
            sx={{
              backgroundColor: "background.dark",
              width: "100%",
              paddingY: 1.5,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 1100,
                marginX: "auto",
                paddingX: "16px",
              }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    "&:hover": { color: "#eeee" },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    href="/"
                  >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    PadelApp
                  </Link>
                </Typography>

                {breadcrumbsItems?.length > 0 &&
                  breadcrumbsItems.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        "&:hover": { color: "#eeee" },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        href={item.link}
                      >
                        {item.text}
                      </Link>
                    </Typography>
                  ))}
              </Breadcrumbs>
            </Box>
          </Box>
        </>
      )}
      {message}
    </>
  );
};
