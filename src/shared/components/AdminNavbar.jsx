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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

export const AdminNavbar = ({ user, breadcrumbsItems, message }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotifEl, setAnchorNotifEl] = useState(null);
  const [registros, setRegistros] = useState([]);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenu = (event) => {
    setAnchorNotifEl(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setAnchorNotifEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (url) => {
    router.push(url);
  };

  const fetchRegistros = async () => {
    const registros = await fetch("/api/registros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId: user.id,
        leido: false,
      }),
    });

    const data = await registros.json();
    setRegistros(data);
  };

  const marcarLeido = async () => {
    await registros.forEach(async (registro) => {
      const res = await fetch(`/api/registros/${registro.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leido: true,
        }),
      });
    });

    toast.success("Notificaciones marcadas como leídas");
    setRegistros([]);
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

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
                  href="/banco"
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
                <IconButton
                  size="small"
                  sx={{ color: "#eeee", mr: 1 }}
                  onClick={handleNotifMenu}
                >
                  <Badge badgeContent={registros.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Tu perfil">
                <IconButton sx={{ width: 28, height: 28 }} onClick={handleMenu}>
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
                  <Stack>
                    <ListItemText>{user.name}</ListItemText>
                    <ListItemText>
                      <Typography variant="body2" fontSize={13}>
                        Saldo:{" "}
                        {Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        }).format(user.saldo)}
                      </Typography>
                    </ListItemText>
                  </Stack>
                </MenuItem>

                <Divider sx={{ marginY: "3px !important" }} />

                <MenuItem onClick={() => handleRedirect("/perfil")}>
                  <ListItemIcon>
                    <Person2Icon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Perfil</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleRedirect("/admin/dashboard")}>
                  <ListItemIcon>
                    <DashboardIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Panel Control</ListItemText>
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

              <Menu
                sx={{
                  mt: "35px",
                  maxWidth: 400,
                }}
                id="menu-notif"
                anchorEl={anchorNotifEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorNotifEl)}
                onClose={handleCloseNotif}
              >
                <MenuItem disableTouchRipple disableRipple>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    <ListItemText>Notificaciones</ListItemText>
                    <Tooltip title="Marcar como leído">
                      <IconButton size="small" onClick={marcarLeido}>
                        <DoneAllIcon color="primary" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </MenuItem>
                <Divider />

                <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                  {registros.map((registro) => (
                    <MenuItem sx={{ maxWidth: "100%" }} key={registro.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ maxWidth: "100%" }}
                      >
                        <ListItemText>
                          <Stack>
                            <Typography
                              variant="body2"
                              sx={{ fontSize: 11, fontWeight: 300 }}
                              noWrap
                            >
                              {new Date(registro.fecha).toLocaleDateString(
                                "es-ES",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </Typography>
                            <Typography variant="body2" noWrap>
                              {registro.accion}
                            </Typography>
                          </Stack>
                        </ListItemText>
                      </Stack>
                    </MenuItem>
                  ))}

                  {registros.length === 0 && (
                    <MenuItem sx={{ maxWidth: "100%" }}>
                      <Stack alignItems="center" spacing={2}>
                        <CloseIcon fontSize="large" />
                        <Typography variant="body2">
                          ¡No hay notificaciones!
                        </Typography>
                      </Stack>
                    </MenuItem>
                  )}
                </Box>
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
        {message}
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
