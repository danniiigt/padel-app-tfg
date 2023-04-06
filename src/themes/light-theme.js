import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#3454D1",
    },

    secondary: {
      main: "#FFC914",
    },

    success: {
      main: "#76B041",
    },

    // CREA EL COLOR INFO GRIS
    info: {
      main: "#999",
    },

    background: {
      default: "#e5e7eb",
      paper: "#ffffff",
    },

    text: {
      primary: "#333",
      secondary: "#999",
    },
  },
});
