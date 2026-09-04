import { Button, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { objectives } from "./CriarTrilhaPersonalizada.utils";
import PushPinIcon from "@mui/icons-material/PushPin";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { fonts } from "../../../styles/theme";

export default function CriarTrilhaPersonalizada2() {
  const theme = useTheme();
  const totalSteps = 5;
  const currentStep = 2;
  const [selected, setSelected] = useState<string[]>(["vendas"]);

  const toggleObjective = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
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
        <Stack sx={{ backgroundColor: theme.palette.primary.main, height: 6 }} />

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
            Monte seu percurso de aprendizado do seu jeito
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
            Qual é o seu objective principal?
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              color: theme.palette.text.primary,
              mb: 2.5,
            }}
          >
            Escolha os focos da sua trilha. Você pode selecionar mais de um.
          </Typography>

          <Stack
            direction={"row"} 
            sx={{ flexWrap: "wrap", gap: 2, mb: 1.5 }}
          >
            {objectives.map((obj) => {
              const isSelected = selected.includes(obj.id);
              return (
                <Stack
                  key={obj.id}
                  onClick={() => toggleObjective(obj.id)}
                  direction={"column"}
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: 165 },
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.background.default,
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
                        color: theme.palette.common.white,
                      }}
                    />
                  ) : (
                    <PushPinIcon
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 14,
                        color: theme.palette.primary.main,
                      }}
                    />
                  )}
                  <Typography sx={{ fontSize: "1.3rem", mb: 1 }}>
                    {obj.icon}
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
                    {obj.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.7rem",
                      color: isSelected
                        ? alpha(theme.palette.common.white, 0.85)
                        : alpha(theme.palette.common.white, 0.5),
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
              fontFamily: fonts.body,
              fontSize: "0.75rem",
              color: theme.palette.text.primary,
            }}
          >
            Seleção múltipla permitida — escolha todos que se aplicam
          </Typography>
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
                navigate("/criar-trilha-personalizada-1");
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
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => {
                navigate("/criar-trilha-personalizada-3");
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
          </Stack>        </Stack>
      </Stack>
    </Stack>
  );
}
