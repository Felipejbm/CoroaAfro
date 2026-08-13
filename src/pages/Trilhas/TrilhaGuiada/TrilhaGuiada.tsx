import { Button, Stack, Typography } from "@mui/material";
import type { Module } from "./TrilhaGuiada.types";
import { modules, statusConfig } from "./TrilhaGuiada.utils";
import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function ModuleCard({ module }: { module: Module }) {
  const { number, title, description, status, icon } = module;
  const config = statusConfig[status];

  

  return (
    <Stack
      sx={{
        backgroundColor: "#16161d",
        borderRadius: "14px",
        borderLeft: `4px solid ${config.color}`,
        width: { xs: "100%", sm: 340 },
        p: 2.5,
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
        backgroundColor: "#16161d",
        zIndex: 2,
      }}
    />
  );
}

export default function TrilhaGuiada() {
  const [tab, setTab] = useState<"guiada" | "personalizada">("guiada");

  const navigate = useNavigate()
  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "#f9dde0",
          p: { xs: 3, md: 4 },
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
            onClick={() => navigate("/trilha-personalizada")}
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
              backgroundColor: "rgba(0,0,0,0.15)",
              zIndex: 1,
            }}
          />

          {modules.map((module, i) => {
            const dotColor = statusConfig[module.status].color;
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
    </Stack>
  );
}