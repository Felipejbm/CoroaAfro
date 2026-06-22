import { Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhaPersonalizada5() {
  const totalSteps = 5;
  const currentStep = 5;

  const [reminders, setReminders] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);

  const navigate = useNavigate()

  return (
    // AJUSTE: direction={"row"} adicionado para posicionar a NavBar ao lado do conteúdo principal
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />
      
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "#f9dde0",
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
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              color: "#2b2b2b",
            }}
          >
            Criar Trilha Personalizada
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.85rem",
              color: "#3a3a3a",
              mb: 2,
            }}
          >
            Monte seu percurso de aprendizado do seu jeito
          </Typography>

          {/* Barra de progresso */}
          <Stack
            direction={"row"} // AJUSTE: Elementos alinhados na horizontal
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
                fontFamily: "'Comfortaa', sans-serif",
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
              fontFamily: "'Comfortaa', sans-serif",
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
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
              }}
            >
              Nome da trilha: Presença Digital Forte
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Ritmo Moderado • Ter & Qui
            </Typography>
          </Stack>

          {/* Estatísticas */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} // AJUSTE: Cards ficam em linha em telas maiores
            sx={{ gap: 2, mb: 3 }}
          >
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
                  fontFamily: "'Comfortaa', sans-serif",
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
                  fontFamily: "'Comfortaa', sans-serif",
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
                  fontFamily: "'Comfortaa', sans-serif",
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
              fontFamily: "'Comfortaa', sans-serif",
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
                  fontFamily: "'Comfortaa', sans-serif",
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
                  fontFamily: "'Comfortaa', sans-serif",
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
              fontFamily: "'Comfortaa', sans-serif",
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
              direction={"row"} // AJUSTE: Texto e Switch alinhados horizontalmente
              sx={{
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
                  fontFamily: "'Comfortaa', sans-serif",
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
              direction={"row"} // AJUSTE: Texto e Switch alinhados horizontalmente
              sx={{
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
                  fontFamily: "'Comfortaa', sans-serif",
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
              direction={"row"} // AJUSTE: Texto e Switch alinhados horizontalmente
              sx={{
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
                  fontFamily: "'Comfortaa', sans-serif",
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
          direction={"row"} // AJUSTE: Contador e grupo de botões lado a lado
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            borderTop: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.75rem",
              color: "#3a3a3a",
            }}
          >
            Passo {currentStep} de {totalSteps}
          </Typography>

          <Stack direction={"row"} sx={{ gap: 1.5 }}> {/* AJUSTE: Botões dispostos em linha */}
            <Button
              onClick={() => {navigate("/criar-trilha-personalizada-4")}}
              startIcon={<ArrowBackIcon fontSize="small" />}
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
              Voltar
            </Button>
            <Button
              onClick={() => {navigate("/trilha-personalizada")}}
              endIcon={<ArrowForwardIcon fontSize="small" />}
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
              Continuar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}