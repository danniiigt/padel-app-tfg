import {
  AppBar,
  Avatar,
  Badge,
  Button,
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
import Link from "next/link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "next-auth/react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export const ClientNavBar = ({ user, message }) => {
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
      <AppBar>
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: 1100,
              marginX: "auto",
              paddingX: "16px !important",
            }}
          >
            <Typography variant="h6">
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                href="/home"
              >
                Padel App
              </Link>
            </Typography>

            <Stack direction="row" ml={5} spacing={4} alignItems="center">
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/buscador"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Buscador
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/ranking"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Ranking
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/torneos"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Torneos
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="#d9d9d9"
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Link
                  href="/banco"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Banco
                </Link>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              flexGrow={1}
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Tooltip title="Notificaciones">
                <IconButton sx={{ color: "#eeee", mr: 1 }}>
                  <Badge badgeContent={3} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Tu perfil">
                <IconButton
                  size="small"
                  sx={{ width: 30, height: 30 }}
                  onClick={handleMenu}
                >
                  <Avatar
                    alt={user.name}
                    src={user.image}
                    sx={{ width: 30, height: 30 }}
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
                      <Typography variant="body2" fontSize={12}>
                        Saldo:{" "}
                        {Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        }).format(user.saldo)}
                      </Typography>
                    </ListItemText>
                    <ListItemText>
                      <Stack direction="row" spacing={0.4}>
                        <Typography variant="body2" fontSize={12}>
                          Ranking:
                        </Typography>
                        <Typography variant="body2" color="error" fontSize={12}>
                          Próximamente
                        </Typography>
                      </Stack>
                    </ListItemText>
                  </Stack>
                </MenuItem>

                <Divider sx={{ marginY: "3px !important" }} />

                <MenuItem onClick={() => handleRedirect("/admin/perfil")}>
                  <ListItemIcon>
                    <Person2Icon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Perfil</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleRedirect("/banco")}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Banco</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleRedirect("/misreservas")}>
                  <ListItemIcon>
                    <ConfirmationNumberIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <ListItemText>Reservas</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleRedirect("/mispuntos")}>
                  <ListItemIcon>
                    <CardGiftcardIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <Stack>
                    <ListItemText>Recompensas</ListItemText>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 11 }}
                        fontWeight={300}
                        color="error"
                      >
                        Próximamente
                      </Typography>
                    </ListItemText>
                  </Stack>
                </MenuItem>

                <MenuItem onClick={() => handleRedirect("/torneos")}>
                  <ListItemIcon>
                    <EmojiEventsIcon sx={{ mr: 2 }} />
                  </ListItemIcon>
                  <Stack>
                    <ListItemText>Torneos</ListItemText>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 11 }}
                        fontWeight={300}
                        color="error"
                      >
                        Próximamente
                      </Typography>
                    </ListItemText>
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
            </Stack>
          </Stack>
        </Toolbar>
        {message}
      </AppBar>
      <Toolbar />
    </>
  );
};
