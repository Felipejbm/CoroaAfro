import { alpha, Avatar, Button, Stack, Typography, useTheme } from "@mui/material";
import NavBar from "../../../components/NavBar/NavBar";
import { fonts } from "../../../styles/theme";
import { useTrilhaPersonalizada } from "./TrilhaPersonalizada.hook";
import type { ModuleCardProps } from "./TrilhaPersonalizada.types";
import { modules } from "./TrilhaPersonalizada.utils";

function ModuleCard({ module }: ModuleCardProps) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
        borderLeft: `4px solid ${theme.palette.primary.light}`,
        width: { xs: "100%", sm: 340 },
        p: 2.5,
        boxShadow: `0 10px 24px ${alpha(theme.palette.primary.dark, 0.08)}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 16px 30px ${alpha(theme.palette.primary.dark, 0.14)}`,
        },
      }}
      direction={"column"}
    >
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.7rem",
            color: alpha(theme.palette.common.white, 0.55),
          }}
        >
          Meu Módulo
        </Typography>

        {module.avatar && (
          <Avatar
            src={module.avatar}
            sx={{
              width: 32,
              height: 32,
              border: `2px solid ${theme.palette.background.default}`,
            }}
          />
        )}
      </Stack>

      <Typography
        sx={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "1.05rem",
          color: theme.palette.primary.dark,
          mb: 1.5,
        }}
      >
        {module.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: fonts.body,
          fontSize: "0.8rem",
          color: theme.palette.text.primary,
          lineHeight: 1.5,
          mb: 2,
        }}
      >
        {module.content}
      </Typography>

      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.75rem",
            fontWeight: 700,
            color: theme.palette.primary.light,
            cursor: "pointer",
          }}
        >
          Acessar
        </Typography>
      </Stack>
    </Stack>
  );
}

function TimelineDot() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: `3px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.secondary.light,
        zIndex: 2,
      }}
    />
  );
}

export default function TrilhaPersonalizada() {
  const { tab, setTab, navigate } = useTrilhaPersonalizada();

  const theme = useTheme();

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
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
        <Stack sx={{         p: { xs: 2.5, md: 4, lg: 5 }, flex: 1 }}>
          <Typography
            sx={{
              fontFamily: fonts.hero,
              fontWeight: 700,
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              color: theme.palette.primary.dark,
              mb: 0.75,
            }}
          >
            Acompanhe o caminho percorrido
          </Typography>

          <Stack
            direction={"row"}
            sx={{
              display: "inline-flex",
              borderRadius: "8px",
              overflow: "hidden",
              mb: 5,
              width: "fit-content",
            }}
          >
            <Button
              onClick={() => navigate("/trilha-guiada")}
              sx={{
                fontFamily: fonts.hero,
                fontVariant: "small-caps",
                fontSize: "0.8rem",
                color: theme.palette.getContrastText(tab === "guiada" ? theme.palette.primary.main : theme.palette.primary.light),
                backgroundColor: tab === "guiada" ? theme.palette.primary.main : theme.palette.primary.light,
                borderRadius: 0,
                px: 2,
                "&:hover": { backgroundColor: theme.palette.primary.main },
              }}
            >
              Trilha guiada
            </Button>
            <Button
              onClick={() => setTab("personalizada")}
              sx={{
                fontFamily: fonts.hero,
                fontVariant: "small-caps",
                fontSize: "0.8rem",
                color: theme.palette.getContrastText(tab === "personalizada" ? theme.palette.primary.main : theme.palette.primary.light),
                backgroundColor:
                  tab === "personalizada" ? theme.palette.primary.main : theme.palette.primary.light,
                borderRadius: 0,
                px: 2,
                "&:hover": { backgroundColor: theme.palette.primary.main },
              }}
            >
              Trilha personalizada
            </Button>
          </Stack>

          <Stack
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 800,
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              mb: 5,
            }}
          >
            <Stack
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: 20,
                bottom: 20,
                width: "2px",
                backgroundColor: alpha(theme.palette.common.black, 0.15),
                zIndex: 1,
              }}
            />

            {modules.map((module, i) => {
              const isLeft = i % 2 === 0;

              return (
                <Stack
                  key={i}
                  direction={"row"}
                  sx={{
                    position: "relative",
                    width: "100%",
                    mb: 4,
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                  }}
                >
                  <Stack
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      px: 4,
                    }}
                  >
                    <ModuleCard module={module} />
                  </Stack>

                  <Stack
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "24px",
                      transform: "translateX(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <TimelineDot />
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          <Stack sx={{ flexGrow: 1 }} />

          <Stack sx={{ display: "flex", alignItems: "flex-end", mt: 4 }}>
            <Button
              onClick={() => navigate("/criar-trilha-personalizada-1")}
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.common.white,
                fontFamily: fonts.body,
                fontSize: "0.95rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                py: 1.2,
                "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.08) },
              }}
            >
              Criar Trilha
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
