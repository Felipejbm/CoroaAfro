import { Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";
import { fonts } from "../../../styles/theme";

export default function CriarTrilhaPersonalizada5() {
  const totalSteps = 5;
  const currentStep = 5;

  const [reminders, setReminders] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);

  const handleBack = () => {
    console.log("Voltar");
  };

  const handleContinue = () => {
    console.log("Finalizar", { reminders, achievements, shareProgress });
  };
  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
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
          {/* Título */}
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              color: "#2b2b2b",
            }}
          >
            Criar Trilha Personalizada
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              color: "#3a3a3a",
              mb: 2,
            }}
          >
            Monte seu percurso de aprendizado do seu jeito
          </Typography>

          {/* Barra de progresso */}
          <Stack
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}
          >
            <Stack
              sx={{
                width: 28,
                height: 3,
                borderRadius: 2,
                backgroundColor: "#e0523a",
              }}
            />
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "#c43f2a",
                }}
              >
              Passo {currentStep} de {totalSteps}
            </Typography>
          </Stack>

          {/* Revisão */}
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "#2b2b2b",
              mb: 2,
            }}
          >
            Revise sua trilha
          </Typography>

          {/* Nome e ritmo */}
          <Stack
            sx={{
              backgroundColor: "#16161d",
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
                  color: "#fff",
                }}
              >
              Nome da trilha: Presença Digital Forte
            </Typography>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Ritmo Moderado • Ter & Qui
            </Typography>
          </Stack>

          {/* Estatísticas */}
          <Stack sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: "#16161d",
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                2 módulos
              </Typography>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: "#16161d",
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                6h30 de conteúdo
              </Typography>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                backgroundColor: "#16161d",
                borderRadius: "10px",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: "#fff",
                }}
              >
                3 semanas
              </Typography>
            </Stack>
          </Stack>

          {/* Módulos selecionados */}
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "1rem",
              color: "#2b2b2b",
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
                backgroundColor: "#16161d",
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.85rem",
                      color: "#fff",
                    }}
                  >
                📷 Fotografia para Redes Sociais
              </Typography>
            </Stack>
            <Stack
              sx={{
                backgroundColor: "#16161d",
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.85rem",
                      color: "#fff",
                    }}
                  >
                🎬 Criação de Reels que Vendem
              </Typography>
            </Stack>
          </Stack>

          {/* Preferências */}
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "1rem",
              color: "#2b2b2b",
              mb: 1,
            }}
          >
            Preferências
          </Typography>
          <Stack sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#16161d",
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: "#fff",
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
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#16161d",
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: "#fff",
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
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#16161d",
                borderRadius: "8px",
                px: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: "#fff",
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

        {/* Rodapé de navegação */}
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.75rem",
              color: "#3a3a3a",
            }}
          >
            Passo {currentStep} de {totalSteps}
          </Typography>

          <Stack sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={handleBack}
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{
                backgroundColor: "#16161d",
                color: "#fff",
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: "#26262f" },
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                backgroundColor: "#e0523a",
                color: "#fff",
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: "#c43f2a" },
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
