import type { ReactNode } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import NavBarMentor from "../../components/NavMentor/NavBar";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";

export default function AprendizadoLayout({
  mentor = false,
  titulo,
  children,
}: {
  mentor?: boolean;
  titulo: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Stack
      direction={mentor ? { xs: "column", md: "row" } : "row"}
      sx={{ width: "100%", minHeight: "100vh", bgcolor: theme.palette.secondary.light }}
    >
      {mentor ? <Stack
        sx={{
          width: { xs: 220, md: "clamp(220px, 16vw, 280px)" },
          minWidth: { xs: 220, md: "clamp(220px, 16vw, 280px)" },
          flex: { xs: "0 0 220px", md: "0 0 clamp(220px, 16vw, 280px)" },
          minHeight: { xs: "100vh", md: "100vh" },
          "& > *": { width: "100%" },
        }}
      >
        <NavBarMentor />
      </Stack> : <NavBar />}
      <Stack
        component="main"
        sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4 }, gap: 3 }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: fonts.hero }}
        >
          {titulo}
        </Typography>
        {children}
      </Stack>
    </Stack>
  );
}
