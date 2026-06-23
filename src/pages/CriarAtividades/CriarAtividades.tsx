import { Button, Stack, Typography } from "@mui/material";
import { lessons, trails } from "./CriarAtividades.utils";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { useNavigate } from "react-router-dom";

export default function CriarAtividades() {
  const navigate = useNavigate();

  return (
    // CORREÇÃO: Alinha a NavBar lateral e o conteúdo lado a lado
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      {/* Container de conteúdo ajustado */}
      <Stack
        sx={{
          flex: 1, // CORREÇÃO: Preenche o restante do espaço horizontal
          minWidth: 0, // CORREÇÃO: Evita que os grids internos quebrem a responsividade
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

        {/* AJUSTE EXTRA: direction="row" com wrap para os botões ficarem lado a lado */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
            mt: "auto", // Joga os botões para o fim da página caso haja espaço de sobra
          }}
        >
          <Button
            onClick={() => {
              navigate("/criar-licao");
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
            Criar Lição
          </Button>
          <Button
            onClick={() => {
              navigate("/criar-trilha");
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
            Criar Trilha
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
