"use client";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    mainColor: {
      main: "#54BAB9",
    },
    searchBarColor: {
      main: "rgba(68, 68, 68, 0.5)",
    },
    textInputStroke: {
      main: "rgba(34, 122, 161, 0.5)",
    },
    mainTextColor: {
      main: "#000000",
    },
    secTextColor: {
      main: "#ffffff",
    },
    modalText: {
      main: "#444444",
    },
    placeholder: {
      main: "#ACB3C0",
    },
    updateBtnColor: {
      main: "#EDC339",
    },
    deleteBtnColor: {
      main: "#CD211D",
    },
    toastBoxColor: {
      main: "#1AB45D",
    },
  },
  typography: {
    h1: {
      fontSize: "22px",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "18px",
    },
    subtitle2: {
      fontSize: "12px",
    },
  },
});

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ width: 200, height: 200, bgcolor: "deleteBtn.main" }} />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
