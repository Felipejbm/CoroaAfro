import { Button, Stack, Typography } from "@mui/material";
import type { Module } from "./TrilhaGuiada.types";
import { modules, statusConfig } from "./TrilhaGuiada.utils";
import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";

function ModuleCard({ module }: { module: Module }) {
  const { number, title, description, status, icon } = module;
  const config = statusConfig[status];

  return (
    <Stack
      sx={{
        backgroundColor: "#16161d",
        borderRadius: "14px",
        borderLeft: `4px solid ${config.color}`,
        width: { xs: "100%", sm: 280 },
        p: 2.5,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Stack
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            backgroundColor: "#f0a3a0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Stack>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.7rem",
            color: config.color,
          }}
        >
          {config.label}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.5)",
          mb: 0.5,
        }}
      >
        {number}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "#fff",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.5,
          mb: 2,
        }}
      >
        {description}
      </Typography>

      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: config.color,
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
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: `3px solid ${color}`,
        backgroundColor: "#16161d",
      }}
    />
  );
}

export default function TrilhaGuiada() {
  const [tab, setTab] = useState<"guiada" | "personalizada">("guiada");

  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          p: { xs: 3, md: 4 },
          minHeight: "100vh",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Acompanhe o caminho percorrido
        </Typography>

        {/* Tabs */}
        <Stack
          sx={{
            display: "inline-flex",
            borderRadius: "8px",
            overflow: "hidden",
            mb: 5,
          }}
        >
          <Button
            onClick={() => setTab("guiada")}
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontVariant: "small-caps",
              fontSize: "0.8rem",
              color: "#fff",
              backgroundColor: tab === "guiada" ? "#c43f2a" : "#d97a6a",
              borderRadius: 0,
              px: 2,
              "&:hover": { backgroundColor: "#c43f2a" },
            }}
          >
            Trilha guiada
          </Button>
          <Button
            onClick={() => setTab("personalizada")}
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontVariant: "small-caps",
              fontSize: "0.8rem",
              color: "#fff",
              backgroundColor: tab === "personalizada" ? "#c43f2a" : "#d97a6a",
              borderRadius: 0,
              px: 2,
              "&:hover": { backgroundColor: "#c43f2a" },
            }}
          >
            Trilha personalizada
          </Button>
        </Stack>

        {/* Timeline em zigue-zague */}
        <Stack sx={{ position: "relative", maxWidth: 700 }}>
          {modules.map((module, i) => {
            const isLeft = module.align === "left";
            const isLast = i === modules.length - 1;
            const dotColor = statusConfig[module.status].color;

            return (
              <Stack
                key={module.number}
                sx={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  alignItems: "center",
                  position: "relative",
                  mb: isLast ? 0 : 5,
                }}
              >
                <ModuleCard module={module} />

                {/* Linha + ponto conector */}
                <Stack
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: isLeft ? "calc(100% + 12px)" : "auto",
                    right: isLeft ? "auto" : "calc(100% + 12px)",
                    transform: "translateY(-50%)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TimelineDot color={dotColor} />
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
