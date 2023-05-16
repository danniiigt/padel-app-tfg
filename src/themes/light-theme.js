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
      default: "#f3f4f6",
      paper: "#ffffff",
      dark: "#1f1f1f",
    },

    text: {
      primary: "#333",
      secondary: "#999",
    },
  },

  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowX: "hidden",
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            margin: 0,
            borderTop: "1px solid #ddd",
          },
        },
      },
    },
  },
});
