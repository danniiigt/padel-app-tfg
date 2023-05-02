import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
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
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export const AdminNavbar = ({ userImage, breadcrumbsItems }) => {
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
        <Toolbar
          sx={{
            maxWidth: 1100,
            marginX: "auto",
            width: "100%",
            paddingX: "16px !important",
          }}
        >
          <Box
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
                  sx={{ "&:hover": { color: "secondary.main" } }}
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
                      sx={{ "&:hover": { color: "secondary.main" } }}
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
