import { useTheme, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhasMentor() {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Criar Nova Trilha
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.9rem",
            color: theme.palette.text.primary,
            mb: 4,
          }}
        >
          Crie trilhas para seus mentorados de forma organizada
        </Typography>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1rem",
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Informações Básicas
        </Typography>
        <TextField
          label="Título da Trilha"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ backgroundColor: theme.palette.common.white, borderRadius: "8px", mb: 3 }}
        />

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1rem",
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Configurações
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Nível"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={{ backgroundColor: theme.palette.common.white, borderRadius: "8px" }}
          />
          <TextField
            label="Duração (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{ backgroundColor: theme.palette.common.white, borderRadius: "8px" }}
          />
          <TextField
            label="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ backgroundColor: theme.palette.common.white, borderRadius: "8px" }}
          />
        </Stack>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1rem",
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Conteúdo
        </Typography>
        <TextField
          label="Digite o conteúdo da trilha"
          multiline
          rows={6}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ backgroundColor: theme.palette.common.white, borderRadius: "8px", mb: 3 }}
        />

        {/* AJUSTE: Botões "Salvar Rascunho" e "Publicar" alinhados na horizontal */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
            mt: "auto",
          }}
        >
          <Button
            onClick={() => {
              navigate("/criar-atividade");
            }}
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.common.white,
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { backgroundColor: theme.palette.background.default },
            }}
          >
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => {
              navigate("/criar-atividade");
            }}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Publicar Trilha
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
