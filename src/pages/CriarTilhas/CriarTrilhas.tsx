import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhasMentor() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  return (
    // CORREÇÃO: Alinha a NavBar e o formulário lado a lado
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      {/* Container de conteúdo ajustado */}
      <Stack
        sx={{
          flex: 1, // CORREÇÃO: Ocupa o restante do espaço horizontal da tela
          minWidth: 0, // CORREÇÃO: Previne quebras em telas menores devido ao grid interno
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "#2b2b2b",
            mb: 1,
          }}
        >
          Criar Nova Trilha
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.9rem",
            color: "#3a3a3a",
            mb: 4,
          }}
        >
          Crie trilhas para seus mentorados de forma organizada
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#2b2b2b",
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
          sx={{ backgroundColor: "#fff", borderRadius: "8px", mb: 3 }}
        />

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#2b2b2b",
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
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <TextField
            label="Duração (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <TextField
            label="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#2b2b2b",
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
          sx={{ backgroundColor: "#fff", borderRadius: "8px", mb: 3 }}
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
              backgroundColor: "#16161d",
              color: "#fff",
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { backgroundColor: "#26262f" },
            }}
          >
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => {
              navigate("/criar-atividade");
            }}
            sx={{
              backgroundColor: "#e0523a",
              color: "#fff",
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              "&:hover": { backgroundColor: "#c43f2a" },
            }}
          >
            Publicar Trilha
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
