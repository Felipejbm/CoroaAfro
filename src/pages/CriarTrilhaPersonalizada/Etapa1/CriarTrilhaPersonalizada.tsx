import { Button, InputBase, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import type { Suggestion } from "./CriarTrilhaPersonalizada.types";
import { suggestions } from "./CriarTrilhaPersonalizada.utils";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";
import { fonts } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";

export default function CriarTrilhaPersonalizada1() {
  const theme = useTheme();
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
            maxWidth: 900,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 3 },
            py: 5,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.hero,
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
              mb: 3,
            }}
          >
            Monte seu percurso de aprendizado do seu jeito
          </Typography>

          <Stack
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
              mb: 0.8,
            }}
          >
            Como você quer chamar sua trilha?
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
              mb: 2.5,
            }}
          >
            Dê um nome que represente seu objetivo. Pode ser algo inspirador,
            direto ou até divertido.
          </Typography>

          <Stack
            direction={"row"} 
            sx={{
              backgroundColor: theme.palette.background.default,
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
                color: theme.palette.common.white,
                fontFamily: fonts.body,
                fontSize: "0.9rem",
                "& .MuiInputBase-input::placeholder": {
                  color: alpha(theme.palette.common.white, 0.4),
                  opacity: 1,
                },
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.75rem",
              color: theme.palette.text.primary,
              mb: 1.5,
            }}
          >
            Ou escolha uma sugestão
          </Typography>

  
          <Stack 
            direction={"row"}  
            sx={{ flexWrap: "wrap", gap: 2 }}
          >
            {suggestions.map((s) => {
              const isSelected = selectedSuggestion === s.id;
              return (
                <Stack
                  key={s.id}
                  onClick={() => handleSelectSuggestion(s)}
                  direction={"column"}
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: 165 },
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "10px",
                    border: isSelected
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                    p: 2,
                    cursor: "pointer",
                    transition: "border-color 0.15s ease",
                    "&:hover": { borderColor: alpha(theme.palette.primary.main, 0.5) },
                  }}
                >
                  <PushPinIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontSize: 14,
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontSize: "1.3rem", mb: 1 }}>
                    {s.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: theme.palette.common.white,
                      mb: 0.4,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.7rem",
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                  >
                    {s.description}
                  </Typography>
                </Stack>
              );
            })}
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
              color: theme.palette.text.secondary,
            }}
          >
            Passo {currentStep} de {totalSteps}
          </Typography>

          <Stack direction={"row"} sx={{ gap: 1.5 }}>
            <Button
              onClick={() => {navigate("/trilha-personalizada")}}
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
                "&:hover": { backgroundColor: theme.palette.grey[800] },
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => {navigate("/criar-trilha-personalizada-2")}}
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