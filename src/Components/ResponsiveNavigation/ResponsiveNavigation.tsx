import { Box, Drawer, GlobalStyles, IconButton, Stack, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, type ReactNode } from "react";

export default function ResponsiveNavigation({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  if (!smallScreen) return <>{children}</>;
  return (
    <Box component="nav" data-app-navigation aria-label="Navegação principal" sx={{ width: "100%", height: 56, flexShrink: 0, bgcolor: "secondary.light", position: "sticky", top: 0, zIndex: 1100, px: 1, display: "flex", alignItems: "center" }}>
      <GlobalStyles styles={{ ".MuiStack-root:has(> [data-app-navigation])": { flexDirection: "column" }, "[data-app-navigation] + .MuiStack-root": { minHeight: 0 } }} />
      <IconButton aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(true)} sx={{ color: "primary.main" }}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 280, maxWidth: "90vw", bgcolor: "background.default" } }}>
        <Stack sx={{ alignItems: "flex-end" }}>
          <IconButton aria-label="Fechar menu" onClick={() => setOpen(false)} sx={{ color: "secondary.main" }}><CloseIcon /></IconButton>
        </Stack>
        <Box onClick={(event) => {
          if ((event.target as HTMLElement).closest("a, button, [role='button']")) setOpen(false);
        }} sx={{ minHeight: 0, flex: 1, "& > .MuiStack-root": { width: "100%", minWidth: 0, maxWidth: "100%", height: "100%", position: "static" } }}>
          {children}
        </Box>
      </Drawer>
    </Box>
  );
}
