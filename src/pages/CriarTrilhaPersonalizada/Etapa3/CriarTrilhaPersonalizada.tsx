import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Checkbox, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../../components/NavBar/NavBar";
import { fonts } from "../../../styles/theme";
import { useCriarTrilhaPersonalizada3 } from "./CriarTrilhaPersonalizada.hook";
import { getLevelColors } from "./CriarTrilhaPersonalizada.styles";
import { currentStep, moduleOptions, totalSteps } from "./CriarTrilhaPersonalizada.utils";

export default function CriarTrilhaPersonalizada3() {
  const { selected, toggleModule, navigate } = useCriarTrilhaPersonalizada3();

  const theme = useTheme();
  const levelColors = getLevelColors(theme);

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
            Selecione os módulos da trilha
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.85rem",
              color: theme.palette.text.primary,
              mb: 2.5,
            }}
          >
            Escolha os conteúdos que farão parte do seu percurso. Você pode
            selecionar quantos quiser.
          </Typography>

          <Stack sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {moduleOptions.map((mod) => {
              const isSelected = selected.includes(mod.id);
              return (
                <Stack
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
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
                  <Checkbox
                    checked={isSelected}
                    sx={{
                      color: alpha(theme.palette.common.white, 0.4),
                      "&.Mui-checked": { color: theme.palette.primary.main },
                      p: 0,
                    }}
                  />

                  <Stack
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "8px",
                      backgroundColor: theme.palette.primary.dark,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {mod.icon}
                  </Stack>

                  <Stack sx={{ flex: 1 }} direction={"column"}>
                    <Typography
                      sx={{
                        fontFamily: fonts.body,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: isSelected ? theme.palette.text.primary : theme.palette.common.white,
                        lineHeight: 1.3,
                      }}
                    >
                      {mod.title}
                    </Typography>

                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        gap: 1,
                        mt: 0.4,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.7rem",
                          color: isSelected
                            ? alpha(theme.palette.text.primary, 0.6)
                            : alpha(theme.palette.common.white, 0.5),
                        }}
                      >
                        {mod.lessons} aulas · {mod.duration}
                      </Typography>

                      <Stack
                        sx={{
                          backgroundColor: alpha(levelColors[mod.level], 0.14),
                          borderRadius: "10px",
                          px: 1,
                          py: 0.1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: fonts.body,
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

        <Stack
          direction={"row"}  
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            borderTop: `1px solid ${alpha(theme.palette.common.black, 0.05)}`
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
              onClick={() => {navigate("/criar-trilha-personalizada-2")}}
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
              onClick={() => {navigate("/criar-trilha-personalizada-4")}}
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