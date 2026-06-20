import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import theme from "./styles/theme.ts";
import { ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
);
