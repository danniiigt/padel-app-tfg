import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { signOut } from "next-auth/react";

export const Navbar = ({ userImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "background.dark" }}>
        <Toolbar>
          <Box
            sx={{
              maxWidth: 1100,
              width: "100%",
              marginX: "auto",
              paddingX: "12px",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">Admin</Typography>

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
                <MenuItem onClick={handleClose}>Perfil</MenuItem>

                <Divider sx={{ marginY: "3px !important" }} />

                <MenuItem
                  onClick={() => {
                    signOut();
                    handleClose();
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
