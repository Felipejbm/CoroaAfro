import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { useCriarLicoes } from "./CriarLicoes.hook";

export default function CriarLicoes() {
  const {
    title,
    setTitle,
    level,
    setLevel,
    duration,
    setDuration,
    category,
    setCategory,
    content,
    setContent,
    navigate,
  } = useCriarLicoes();

  const theme = useTheme();

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
          Criar Nova Lição
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.9rem",
            color: theme.palette.text.secondary,
            mb: 4,
          }}
        >
          Crie conteúdos para seus mentorados de forma organizada
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
          label="Título da Lição"
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
          label="Digite o conteúdo da lição"
          multiline
          rows={6}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          Materiais
        </Typography>
        <Stack
          sx={{
            backgroundColor: theme.palette.common.white,
            border: `2px dashed ${alpha(theme.palette.text.secondary, 0.3)}`,
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
            mb: 4,
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              color: theme.palette.text.secondary,
            }}
          >
            Arraste arquivos aqui ou clique para enviar
          </Typography>
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
              "&:hover": { backgroundColor: theme.palette.primary.dark },
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
            Publicar Lição
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
