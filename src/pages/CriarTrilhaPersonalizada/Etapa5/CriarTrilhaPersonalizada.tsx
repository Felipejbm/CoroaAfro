import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Stack, Switch, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../../components/NavBar/NavBar";
import { fonts } from "../../../styles/theme";
import { useCriarTrilhaPersonalizada5 } from "./CriarTrilhaPersonalizada.hook";
import { currentStep, totalSteps } from "./CriarTrilhaPersonalizada.utils";
export default function CriarTrilhaPersonalizada5() {
  const {
    reminders,
    setReminders,
    achievements,
    setAchievements,
    shareProgress,
    setShareProgress,
    navigate,
  } = useCriarTrilhaPersonalizada5();

  const theme = useTheme();

  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          sx={{
            flex: 1,
            maxWidth: 800,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 3 },
            py: 5,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              color: theme.palette.text.primary,
            }}
          >
            Criar Trilha Personalizada
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            Monte seu percurso de aprendizado do seu jeito
          </Typography>

          <Stack
            direction={"row"}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}
          >
            <Stack
              sx={{
                width: 28,
                height: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
              }}
            />
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "0.7rem",
                color: theme.palette.primary.dark,
              }}
            >
              Passo {currentStep} de {totalSteps}
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "1.3rem",
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Revise sua trilha
          </Typography>

          <Stack
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: "10px",
              px: 3,
              py: 2,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "1rem",
                color: theme.palette.common.white,
              }}
            >
              Nome da trilha: Presença Digital Forte
            </Typography>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: alpha(theme.palette.common.white, 0.7),
              }}
            >
              Ritmo Moderado • Ter & Qui
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2, mb: 3 }}>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: theme.palette.common.white,
                }}
              >
                2 módulos
              </Typography>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: theme.palette.common.white,
                }}
              >
                6h30 de conteúdo
              </Typography>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: theme.palette.common.white,
                }}
              >
                3 semanas
              </Typography>
            </Stack>
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
            Módulos Selecionados
          </Typography>
          <Stack
            sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 3 }}
          >
            <Stack
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.common.white,
                }}
              >
                📷 Fotografia para Redes Sociais
              </Typography>
            </Stack>
            <Stack
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.common.white,
                }}
              >
                🎬 Criação de Reels que Vendem
              </Typography>
            </Stack>
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
            Preferências
          </Typography>
          <Stack sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.common.white,
                }}
              >
                Lembretes de estudo
              </Typography>
              <Switch
                checked={reminders}
                onChange={() => setReminders(!reminders)}
              />
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.common.white,
                }}
              >
                Conquistas e metas
              </Typography>
              <Switch
                checked={achievements}
                onChange={() => setAchievements(!achievements)}
              />
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.common.white,
                }}
              >
                Compartilhar progresso na comunidade
              </Typography>
              <Switch
                checked={shareProgress}
                onChange={() => setShareProgress(!shareProgress)}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            borderTop: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.75rem",
              color: theme.palette.text.primary,
            }}
          >
            Passo {currentStep} de {totalSteps}
          </Typography>

          <Stack direction={"row"} sx={{ gap: 1.5 }}>
            <Button
              onClick={() => {
                navigate("/criar-trilha-personalizada-4");
              }}
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.common.white,
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.1) },
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => {
                navigate("/trilha-personalizada");
              }}
              endIcon={<ArrowForwardIcon fontSize="small" />}
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
              Continuar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
