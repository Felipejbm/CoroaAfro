import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { objectives } from "./CriarTrilhaPersonalizada.utils";
import PushPinIcon from "@mui/icons-material/PushPin";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";

export default function CriarTrilhaPersonalizada2() {
  const totalSteps = 5;
  const currentStep = 2;
  const [selected, setSelected] = useState<string[]>(["vendas"]);

  const toggleObjective = (id: string) => {
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
        {/* Barra superior escura */}
        <Stack sx={{ backgroundColor: "#3a3033", height: 6 }} />

        <Stack
          sx={{
            flex: 1,
            maxWidth: 900,
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
            Qual é o seu objetivo principal?
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.85rem",
              color: "#3a3a3a",
              mb: 2.5,
            }}
          >
            Escolha os focos da sua trilha. Você pode selecionar mais de um.
          </Typography>

          {/* Cards de objetivo */}
          <Stack sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1.5 }}>
            {objectives.map((obj) => {
              const isSelected = selected.includes(obj.id);
              return (
                <Stack
                  key={obj.id}
                  onClick={() => toggleObjective(obj.id)}
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: 165 },
                    backgroundColor: isSelected ? "#e0523a" : "#16161d",
                    borderRadius: "10px",
                    p: 2,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {isSelected ? (
                    <CheckIcon
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 16,
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <PushPinIcon
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 14,
                        color: "#e0523a",
                      }}
                    />
                  )}
                  <Typography sx={{ fontSize: "1.3rem", mb: 1 }}>
                    {obj.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "#fff",
                      mb: 0.4,
                      lineHeight: 1.3,
                    }}
                  >
                    {obj.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      fontSize: "0.7rem",
                      color: isSelected
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {obj.description}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>

          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.75rem",
              color: "#3a3a3a",
            }}
          >
            Seleção múltipla permitida — escolha todos que se aplicam
          </Typography>
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
