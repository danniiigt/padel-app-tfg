import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2A628F",
      light: "#3E92CC",
    },

    secondary: {
      main: "#FFC914",
    },

    success: {
      main: "#76B041",
    },

    background: {
      default: "#e5e7eb",
      paper: "#fff",
    },

    text: {
      primary: "#333",
      secondary: "#fff",
    },
  },
});
