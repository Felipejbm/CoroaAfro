import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Pace } from "./CriarTrilhaPersonalizada.types";
import { days, paceOptions } from "./CriarTrilhaPersonalizada.utils";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhaPersonalizada4() {
  const totalSteps = 5;
  const currentStep = 4;

  const [pace, setPace] = useState<Pace>("Moderado");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Ter", "Qui"]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const navigate = useNavigate();

  return (
    // AJUSTE: direction={"row"} para a NavBar fixar corretamente na lateral esquerda
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
            Ajuste o ritmo e os dias da sua jornada
          </Typography>

          {/* Barra de progresso */}
          <Stack
            direction={"row"} // AJUSTE: Alinha a barra e o texto do passo horizontalmente
            sx={{ alignItems: "center", gap: 1.5, mb: 4 }}
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

          {/* Pergunta */}
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "#2b2b2b",
              mb: 0.8,
            }}
          >
            Qual é o seu ritmo de estudo?
          </Typography>

          {/* Opções de ritmo */}
          <Stack
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}
          >
            {paceOptions.map((opt) => {
              const isSelected = pace === opt.id;
              return (
                <Stack
                  key={opt.id}
                  onClick={() => setPace(opt.id)}
                  direction={"row"} // AJUSTE: Mantém o ícone e os textos alinhados lado a lado
                  sx={{
                    alignItems: "center",
                    gap: 1.5,
                    backgroundColor: isSelected
                      ? "rgba(224,82,58,0.15)"
                      : "#16161d",
                    border: isSelected
                      ? "1px solid #e0523a"
                      : "1px solid transparent",
                    borderRadius: "10px",
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Stack sx={{ fontSize: "1.5rem", flexShrink: 0 }}>
                    {opt.icon}
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: isSelected ? "#2b2b2b" : "#fff",
                      }}
                    >
                      {opt.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "0.75rem",
                        color: isSelected
                          ? "rgba(43,43,43,0.6)"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {opt.description}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          {/* Dias preferidos */}
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#2b2b2b",
              mb: 1,
            }}
          >
            Dias preferidos para estudar
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.8rem",
              color: "#3a3a3a",
              mb: 2,
            }}
          >
            Seleção múltipla permitida — escolha todos que se aplicam
          </Typography>

          <Stack
            direction={"row"} // AJUSTE: Exibe os botões de dias horizontalmente com quebra de linha
            sx={{ flexWrap: "wrap", gap: 1.2, mb: 3 }}
          >
            {days.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <Button
                  key={day}
                  onClick={() => toggleDay(day)}
                  sx={{
                    backgroundColor: isSelected ? "#e0523a" : "#16161d",
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontSize: "0.85rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2,
                    py: 0.8,
                    "&:hover": {
                      backgroundColor: isSelected ? "#c43f2a" : "#26262f",
                    },
                  }}
                >
                  {day}
                </Button>
              );
            })}
          </Stack>

          {/* Mensagem dinâmica */}
          <Stack
            sx={{
              backgroundColor: "#16161d",
              color: "#fff",
              borderRadius: "10px",
              px: 3,
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.85rem",
              }}
            >
              Com ritmo {pace.toLowerCase()} e {selectedDays.length} dias por
              semana, você completa sua trilha em aproximadamente ~3 semanas.
            </Typography>
          </Stack>
        </Stack>

        {/* Rodapé de navegação */}
        <Stack
          direction={"row"} // AJUSTE: Organiza o texto descritivo e as ações lado a lado
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            borderTop: "1px solid rgba(0,0,0,0.05)",
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

          <Stack direction={"row"} sx={{ gap: 1.5 }}>
            {" "}
            {/* AJUSTE: Botões de ação dispostos em linha */}
            <Button
              onClick={() => {
                navigate("/criar-trilha-personalizada-3");
              }}
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
              onClick={() => {
                navigate("/criar-trilha-personalizada-5");
              }}
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
