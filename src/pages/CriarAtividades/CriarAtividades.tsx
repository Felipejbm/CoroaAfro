import { Button, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { lessons, trails } from "./CriarAtividades.utils";

export default function CriarAtividades() {
  const handleCreateActivity = () => {
    console.log("Criar Atividade");
  };

  const handleCreateTrail = () => {
    console.log("Criar Trilha");
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
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "#2b2b2b",
            mb: 1,
          }}
        >
          Criar novas atividades
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.9rem",
            color: "#3a3a3a",
            mb: 4,
          }}
        >
          Crie conteúdos para seus mentorados de forma organizada
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Minhas trilhas
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {trails.map((t, idx) => (
            <Stack
              key={idx}
              sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}
            >
              <Typography
                sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}
              >
                {t.titulo}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}
              >
                {t.mentorado}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Minhas lições
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {lessons.map((l, idx) => (
            <Stack
              key={idx}
              sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}
            >
              <Typography
                sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}
              >
                {l.titulo}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}
              >
                {l.mentorado}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleCreateActivity}
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
            Criar Atividade
          </Button>
          <Button
            onClick={handleCreateTrail}
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
            Criar Trilha
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
