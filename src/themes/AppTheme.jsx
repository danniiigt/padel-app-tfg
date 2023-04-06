import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./light-theme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
