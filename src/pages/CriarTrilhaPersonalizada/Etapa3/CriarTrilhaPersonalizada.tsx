import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { moduleOptions } from "./CriarTrilhaPersonalizada.utils";
import { levelColors } from "./CriarTrilhaPersonalizada.styles";
import NavBar from "../../../components/NavBar/NavBar";

export default function CriarTrilhaPersonalizada3() {
  const totalSteps = 5;
  const currentStep = 3;

  const [selected, setSelected] = useState<string[]>(["fotografia", "reels"]);

  const toggleModule = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBack = () => {
    console.log("Voltar");
  };

  const handleContinue = () => {
    console.log("Continuar", { selected });
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
            Selecione os módulos da trilha
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.85rem",
              color: "#3a3a3a",
              mb: 2.5,
            }}
          >
            Escolha os conteúdos que farão parte do seu percurso. Você pode
            selecionar quantos quiser.
          </Typography>

          {/* Lista de módulos */}
          <Stack sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {moduleOptions.map((mod) => {
              const isSelected = selected.includes(mod.id);
              return (
                <Stack
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  sx={{
                    display: "flex",
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
                  <Checkbox
                    checked={isSelected}
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      "&.Mui-checked": { color: "#e0523a" },
                      p: 0,
                    }}
                  />

                  <Stack
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "8px",
                      backgroundColor: "#0c0c10",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {mod.icon}
                  </Stack>

                  <Stack sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: isSelected ? "#2b2b2b" : "#fff",
                        lineHeight: 1.3,
                      }}
                    >
                      {mod.title}
                    </Typography>
                    <Stack
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.4,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Comfortaa', sans-serif",
                          fontSize: "0.7rem",
                          color: isSelected
                            ? "rgba(43,43,43,0.6)"
                            : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {mod.lessons} aulas · {mod.duration}
                      </Typography>
                      <Stack
                        sx={{
                          backgroundColor: `${levelColors[mod.level]}22`,
                          borderRadius: "10px",
                          px: 1,
                          py: 0.1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: "0.65rem",
                            color: levelColors[mod.level],
                            fontWeight: 700,
                          }}
                        >
                          {mod.level}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
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
              fontFamily: "'Comfortaa', sans-serif",
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
              onClick={handleContinue}
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
