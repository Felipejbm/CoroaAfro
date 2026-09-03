import {
  Avatar,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
export default function DetalhesMentorado() {
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
        {/* BOTÃO RETORNAR: Posicionado no topo esquerdo com margem inferior */}
        <Stack direction="row" sx={{ mb: 2 }}>
          <IconButton
            onClick={() => window.history.back()}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.background.default, 0.06),
              "&:hover": { backgroundColor: alpha(theme.palette.background.default, 0.12) },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Stack>

        {/* Bloco do Perfil */}
        <Stack direction="row" sx={{ alignItems: "center", gap: 2, mb: 4 }}>
          <Avatar sx={{ width: 70, height: 70, bgcolor: theme.palette.background.default }}>DS</Avatar>
          <Stack>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "1.2rem",
                color: theme.palette.text.primary,
              }}
            >
              Dandara Santos
            </Typography>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.9rem",
                color: theme.palette.text.primary,
              }}
            >
              Café da Dandara • Plano Premium
            </Typography>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.8rem",
                color: theme.palette.success.main,
                fontWeight: 700,
              }}
            >
              Em acompanhamento
            </Typography>
          </Stack>
        </Stack>

        {/* Grid de Métricas */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <Stack
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
              Progresso Geral
            </Typography>
            <Typography
              sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: "1.2rem" }}
            >
              82%
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
              Lições Concluídas
            </Typography>
            <Typography
              sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: "1.2rem" }}
            >
              15
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
              Pendentes
            </Typography>
            <Typography
              sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: "1.2rem" }}
            >
              4
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
              Trilhas Ativas
            </Typography>
            <Typography
              sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: "1.2rem" }}
            >
              3
            </Typography>
          </Stack>
        </Stack>

        {/* Evolução da Trilha */}
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Evolução da Trilha
        </Typography>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.primary, mb: 0.5 }}>
              Identidade Visual
            </Typography>
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: theme.palette.background.default,
                "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.success.main },
              }}
            />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.primary, mb: 0.5 }}>
              Posicionamento de Marca
            </Typography>
            <LinearProgress
              variant="determinate"
              value={80}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: theme.palette.background.default,
                "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.warning.main },
              }}
            />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.primary, mb: 0.5 }}>
              Redes Sociais
            </Typography>
            <LinearProgress
              variant="determinate"
              value={45}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: theme.palette.background.default,
                "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.primary.main },
              }}
            />
          </Stack>
        </Stack>

        {/* Atividades Recentes */}
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Atividades Recentes
        </Typography>
        <Stack
          sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3, mb: 4 }}
        >
          {[
            "Concluiu a lição 'Identidade Visual'",
            "Iniciou o módulo 'Redes Sociais'",
            "Recebeu nova trilha personalizada",
            "Comentou na comunidade",
          ].map((act, idx) => (
            <Typography
              key={idx}
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: theme.palette.common.white,
                mb: 1,
                "&:last-child": { mb: 0 },
              }}
            >
              • {act}
            </Typography>
          ))}
        </Stack>

        {/* Informações de Contato */}
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Informações
        </Typography>
        <Stack
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "10px",
            p: 3,
            gap: 1,
          }}
        >
          <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
            Email: dandara@email.com
          </Typography>
          <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
            Telefone: (11) 99999-9999
          </Typography>
          <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
            Empresa: Café da Dandara
          </Typography>
          <Typography sx={{ color: theme.palette.common.white, fontSize: "0.85rem" }}>
            Ingresso: 15/02/2026
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
