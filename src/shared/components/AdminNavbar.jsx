import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Person2Icon from "@mui/icons-material/Person2";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const AdminNavbar = ({ userImage, breadcrumbsItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <>
      <AppBar elevation={0} sx={{ backgroundColor: "background.dark" }}>
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
                href="/admin"
              >
                Admin
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
                  href="/admin/dashboard"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Inicio
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
                  href="/admin/reservas"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Reservas
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
                  href="/admin/pistas"
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
                  href="/admin/banco"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Banco
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
              <Tooltip title="Añadir">
                <IconButton sx={{ color: "#eeee" }}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notificaciónes">
                <IconButton sx={{ color: "#eeee", mr: 1 }}>
                  <Badge badgeContent={3} color="secondary">
                    <NotificationsIcon />
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
                    src={userImage}
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
                <MenuItem onClick={() => handleRedirect("/admin/perfil")}>
                  <ListItemIcon>
                    <Person2Icon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Perfil</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleRedirect("/soporte")}>
                  <ListItemIcon>
                    <SupportAgentIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Soporte</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleRedirect("/admin/perfil")}>
                  <ListItemIcon>
                    <DashboardIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Panel Control</ListItemText>
                </MenuItem>

                <Divider sx={{ marginY: "3px !important" }} />

                <MenuItem
                  onClick={() => {
                    signOut();
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
    </>
  );
};
