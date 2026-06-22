import { Button, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { Suggestion } from "./CriarTrilhaPersonalizada.types";
import { suggestions } from "./CriarTrilhaPersonalizada.utils";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhaPersonalizada1() {
  const totalSteps = 5;
  const currentStep = 1;

  const [trailName, setTrailName] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion.id);
    setTrailName(suggestion.title);
  };

  const navigate = useNavigate()


  return (
    // AJUSTE: direction={"row"} adicionado aqui para colocar a NavBar ao lado do conteúdo
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
              mb: 3,
            }}
          >
            Monte seu percurso de aprendizado do seu jeito
          </Typography>

          {/* Barra de progresso */}
          <Stack
            direction={"row"} // AJUSTE: Itens lado a lado
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
            Como você quer chamar sua trilha?
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.85rem",
              color: "#3a3a3a",
              mb: 2.5,
            }}
          >
            Dê um nome que represente seu objetivo. Pode ser algo inspirador,
            direto ou até divertido.
          </Typography>

          {/* Campo de texto */}
          <Stack
            direction={"row"} // AJUSTE: Coloca o emoji de lápis lado a lado com o Input
            sx={{
              backgroundColor: "#16161d",
              borderRadius: "10px",
              alignItems: "center",
              gap: 1.2,
              px: 2.5,
              py: 1.6,
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>🖊️</Typography>
            <InputBase
              placeholder="Ex: Minha trilha de vendas no Instagram"
              value={trailName}
              onChange={(e) => setTrailName(e.target.value)}
              sx={{
                flex: 1,
                color: "#fff",
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.9rem",
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.4)",
                  opacity: 1,
                },
              }}
            />
          </Stack>

          {/* Sugestões */}
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "#2b2b2b",
              mb: 1.5,
            }}
          >
            Ou escolha uma sugestão
          </Typography>

          {/* Grid/Lista de Sugestões */}
          <Stack 
            direction={"row"} // AJUSTE: Faz os cards de sugestão ficarem lado a lado
            sx={{ flexWrap: "wrap", gap: 2 }}
          >
            {suggestions.map((s) => {
              const isSelected = selectedSuggestion === s.id;
              return (
                <Stack
                  key={s.id}
                  onClick={() => handleSelectSuggestion(s)}
                  direction={"column"} // Mantém o interior da sugestão empilhado
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: 165 },
                    backgroundColor: "#16161d",
                    borderRadius: "10px",
                    border: isSelected
                      ? "2px solid #e0523a"
                      : "2px solid transparent",
                    p: 2,
                    cursor: "pointer",
                    transition: "border-color 0.15s ease",
                    "&:hover": { borderColor: "rgba(224,82,58,0.5)" },
                  }}
                >
                  <PushPinIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontSize: 14,
                      color: "#e0523a",
                    }}
                  />
                  <Typography sx={{ fontSize: "1.3rem", mb: 1 }}>
                    {s.icon}
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
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {s.description}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>

        {/* Rodapé de navegação */}
        <Stack
          direction={"row"} // AJUSTE: Texto e botões lado a lado no rodapé
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

          <Stack direction={"row"} sx={{ gap: 1.5 }}> {/* AJUSTE: Botões lado a lado */}
            <Button
              onClick={() => {navigate("/trilha-personalizada")}}
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
              onClick={() => {navigate("/criar-trilha-personalizada-2")}}
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