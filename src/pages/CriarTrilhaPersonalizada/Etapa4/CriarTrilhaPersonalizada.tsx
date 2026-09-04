import { Button, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Pace } from "./CriarTrilhaPersonalizada.types";
import { days, paceOptions } from "./CriarTrilhaPersonalizada.utils";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { fonts } from "../../../styles/theme";

export default function CriarTrilhaPersonalizada4() {
  const theme = useTheme();
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
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "secondary.light",
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
              fontFamily: fonts.heading,
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
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Ajuste o ritmo e os dias da sua jornada
          </Typography>

          <Stack
            direction={"row"} 
            sx={{ alignItems: "center", gap: 1.5, mb: 4 }}
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
                color: theme.palette.primary.main,
              }}
            >
              Passo {currentStep} de {totalSteps}
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: "1.3rem",
              color: theme.palette.text.primary,
              mb: 0.8,
            }}
          >
            Qual é o seu ritmo de estudo?
          </Typography>

          <Stack
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}
          >
            {paceOptions.map((opt) => {
              const isSelected = pace === opt.id;
              return (
                <Stack
                  key={opt.id}
                  onClick={() => setPace(opt.id)}
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    gap: 1.5,
                    backgroundColor: isSelected
                      ? alpha(theme.palette.primary.main, 0.15)
                      : theme.palette.background.default,
                    border: isSelected
                      ? `1px solid ${theme.palette.primary.main}`
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
                        fontFamily: fonts.body,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: isSelected ? theme.palette.text.primary : theme.palette.common.white,
                      }}
                    >
                      {opt.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.body,
                        fontSize: "0.75rem",
                        color: isSelected
                          ? alpha(theme.palette.text.primary, 0.6)
                          : alpha(theme.palette.common.white, 0.6),
                      }}
                    >
                      {opt.description}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: "1.1rem",
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Dias preferidos para estudar
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.8rem",
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Seleção múltipla permitida — escolha todos que se aplicam
          </Typography>

          <Stack
            direction={"row"} 
            sx={{ flexWrap: "wrap", gap: 1.2, mb: 3 }}
          >
            {days.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <Button
                  key={day}
                  onClick={() => toggleDay(day)}
                  sx={{
                    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
                    color: theme.palette.common.white,
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2,
                    py: 0.8,
                    "&:hover": {
                      backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.primary.dark,
                    },
                  }}
                >
                  {day}
                </Button>
              );
            })}
          </Stack>

          <Stack
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.common.white,
              borderRadius: "10px",
              px: 3,
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
              }}
            >
              Com ritmo {pace.toLowerCase()} e {selectedDays.length} dias por
              semana, você completa sua trilha em aproximadamente ~3 semanas.
            </Typography>
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
                navigate("/criar-trilha-personalizada-3");
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
                navigate("/criar-trilha-personalizada-5");
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
