import { Stack, Typography, useTheme } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import type { AprendizadoLayoutProps } from "./AprendizadoLayout.types";
import MentorHeader from "./MentorHeader";

export default function AprendizadoLayout({
  mentor = false,
  titulo,
  children,
}: AprendizadoLayoutProps) {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      sx={{ width: "100%", minHeight: "100vh", bgcolor: theme.palette.secondary.light }}
    >
      {mentor ? <NavBarMentor /> : <NavBar />}
      <Stack
        component="main"
        sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4, lg: 5 }, gap: 3 }}
      >
        {mentor ? <MentorHeader title={titulo} description={titulo === "Mensagens" ? "Conecte-se com seus mentorados e acompanhe cada próximo passo." : "Compartilhe conhecimento e acompanhe o aprendizado dos seus mentorados."} /> : <Typography
          variant="h4"
          sx={{ fontFamily: fonts.hero }}
        >
          {titulo}
        </Typography>}
        {children}
      </Stack>
    </Stack>
  );
}
