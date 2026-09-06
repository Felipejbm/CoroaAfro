import { Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Module } from "./TrilhaGuiada.types";
import { modules, statusConfig } from "./TrilhaGuiada.utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme, { fonts } from "../../../styles/theme";

function ModuleCard({ module }: { module: Module }) {
  const { number, title, description, status, icon } = module;
  const config = statusConfig[status];
  const statusColor =
    status === "concluido"
      ? theme.palette.primary.main
      : theme.palette.primary.light;

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
        borderLeft: `4px solid ${statusColor}`,
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
        <Stack
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            backgroundColor: statusColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.secondary.light,
          }}
        >
          {icon}
        </Stack>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.7rem",
            color: statusColor,
          }}
        >
          {config.label}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontFamily: fonts.body,
          fontSize: "0.7rem",
          color: theme.palette.primary.dark,
          mb: 0.5,
        }}
      >
        {number}
      </Typography>
      <Typography
        sx={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "1.05rem",
          color: theme.palette.primary.dark,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: fonts.body,
          fontSize: "0.8rem",
          color: theme.palette.text.primary,
          lineHeight: 1.5,
          mb: 2,
          opacity: 0.7,
        }}
      >
        {description}
      </Typography>

      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.75rem",
            fontWeight: 700,
            color: statusColor,
            cursor: "pointer",
          }}
        >
          Acessar
        </Typography>
      </Stack>
    </Stack>
  );
}

function TimelineDot({ color }: { color: string }) {
  return (
    <Stack
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: `3px solid ${color}`,
        backgroundColor: "background.default",
        zIndex: 2,
      }}
    />
  );
}

export default function TrilhaGuiada() {
  const [tab, setTab] = useState<"guiada" | "personalizada">("guiada");
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        backgroundColor: theme.palette.secondary.light,
        p: { xs: 2, md: 3, lg: 4 },
        gap: 2,
        overflowX: "hidden",
      }}
    >
      <Stack
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 4,
          color: "secondary.light",
          background: `linear-gradient(125deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          boxShadow: `0 16px 34px ${alpha(theme.palette.primary.dark, 0.2)}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.hero,
            fontWeight: 700,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            color: theme.palette.secondary.light,
            mb: 0.75,
          }}
        >
          Acompanhe o caminho percorrido
        </Typography>
        <Typography sx={{ color: alpha(theme.palette.secondary.light, 0.78) }}>
          Avance no seu desenvolvimento com uma trilha feita para você.
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          display: "inline-flex",
          borderRadius: "8px",
          overflow: "hidden",
          mb: 2,
          width: "fit-content",
        }}
      >
        <Button
          onClick={() => setTab("guiada")}
          sx={{
            fontFamily: fonts.hero,
            fontVariant: "small-caps",
            fontSize: "0.8rem",
            backgroundColor:
              tab === "guiada"
                ? theme.palette.primary.main
                : alpha(theme.palette.primary.main, 0.14),
            color:
              tab === "guiada"
                ? theme.palette.secondary.light
                : theme.palette.primary.main,
            borderRadius: 0,
            px: 2,
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          Trilha guiada
        </Button>
        <Button
          onClick={() => navigate("/trilha-personalizada")}
          sx={{
            fontFamily: fonts.hero,
            fontVariant: "small-caps",
            fontSize: "0.8rem",
            backgroundColor:
              tab === "personalizada"
                ? theme.palette.primary.main
                : alpha(theme.palette.primary.main, 0.14),
            color:
              tab === "personalizada"
                ? theme.palette.secondary.light
                : theme.palette.primary.main,
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
          const dotColor =
            module.status === "concluido"
              ? theme.palette.primary.main
              : theme.palette.primary.light;
          const isLeft = i % 2 === 0;

          return (
            <Stack
              key={module.number}
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
                <TimelineDot color={dotColor} />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
