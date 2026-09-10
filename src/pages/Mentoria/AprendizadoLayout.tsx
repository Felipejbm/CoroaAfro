import { Stack, useTheme } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMentor from "../../components/NavMentor/NavBar";
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
        <MentorHeader title={titulo} eyebrow={mentor ? "Espaço do mentor" : "Seu aprendizado"} description={titulo === "Mensagens" ? "Converse, esclareça dúvidas e acompanhe seus próximos passos." : mentor ? "Compartilhe conhecimento e acompanhe o aprendizado dos seus mentorados." : "Explore trilhas, desenvolva novas habilidades e acompanhe seu progresso."} />
        {children}
      </Stack>
    </Stack>
  );
}
