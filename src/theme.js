import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ad5c3a",
      dark: "#85452d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#29352d",
      dark: "#1e2621",
      contrastText: "#faf9f6",
    },
    background: {
      default: "#faf9f6",
      paper: "#ffffff",
    },
    text: {
      primary: "#252d27",
      secondary: "#747a73",
    },
    divider: "#e9e8e3",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      fontWeight: 650,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#252d27",
          backgroundColor: "rgba(250, 249, 246, 0.94)",
          backgroundImage: "none",
          borderBottom: "1px solid #e9e8e3",
          backdropFilter: "blur(16px)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 650,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e9e8e3",
          borderRadius: 15,
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;
