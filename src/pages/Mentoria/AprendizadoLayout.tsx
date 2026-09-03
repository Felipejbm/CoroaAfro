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
      direction={{ xs: "column", md: "row" }}
      sx={{ minHeight: "100vh", bgcolor: theme.palette.secondary.light }}
    >
      <Stack
        sx={{
          width: { xs: "100%", md: 220 },
          flexShrink: 0,
          "& > *": {
            width: "100%",
            minHeight: { xs: "auto", md: "100vh" },
            height: "auto",
          },
        }}
      >
        {mentor ? <NavBarMentor /> : <NavBar />}
      </Stack>
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
