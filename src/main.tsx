import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.tsx";
import theme from "./styles/theme.ts";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/playfair-display";
import "@fontsource/montserrat-alternates";
import "@fontsource/cinzel";
import "@fontsource/dm-sans";
import "@fontsource/syne";
import "@fontsource/poppins";
import "@fontsource/sora";
import "@fontsource/inter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
