import { Button, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";

export default function CriarTrilhas() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSaveDraft = () => {
    console.log("Salvar Rascunho", {
      title,
      level,
      duration,
      category,
      content,
    });
  };

  const handlePublish = () => {
    console.log("Publicar Trilha", {
      title,
      level,
      duration,
      category,
      content,
    });
  };
  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        {/* Cabeçalho */}
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

        {/* Informações Básicas */}
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

        {/* Configurações */}
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

        {/* Conteúdo */}
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

        {/* Botões de ação */}
        <Stack sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleSaveDraft}
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
            onClick={handlePublish}
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
