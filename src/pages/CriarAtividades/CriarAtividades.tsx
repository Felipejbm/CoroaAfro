import { Button, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { lessons, trails } from "./CriarAtividades.utils";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

export default function CriarAtividades() {
  const theme = useTheme();
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
          Criar novas atividades
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.9rem",
            color: theme.palette.text.primary,
            mb: 4,
          }}
        >
          Crie conteúdos para seus mentorados de forma organizada
        </Typography>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
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
              sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}
            >
              <Typography
                sx={{ color: theme.palette.common.white, fontSize: "0.85rem", fontWeight: 700 }}
              >
                {t.titulo}
              </Typography>
              <Typography
                sx={{ color: alpha(theme.palette.common.white, 0.7), fontSize: "0.8rem" }}
              >
                {t.mentorado}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
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
              sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}
            >
              <Typography
                sx={{ color: theme.palette.common.white, fontSize: "0.85rem", fontWeight: 700 }}
              >
                {l.titulo}
              </Typography>
              <Typography
                sx={{ color: alpha(theme.palette.common.white, 0.7), fontSize: "0.8rem" }}
              >
                {l.mentorado}
              </Typography>
            </Stack>
          ))}
        </Stack>

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
              navigate("/criar-licao");
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
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Criar Lição
          </Button>
          <Button
            onClick={() => {
              navigate("/criar-trilha");
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
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Criar Trilha
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
