import { Avatar, Button, Stack, Typography } from "@mui/material";
import type { ModuleItem } from "./TrilhaPersonalizada.types";
import { useState } from "react";
import { modules } from "./TrilhasPersonalizada.utils";
import NavBar from "../../../components/NavBar/NavBar";

function ModuleCard({ module }: { module: ModuleItem }) {
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundColor: "#16161d",
        borderRadius: "10px",
        p: 2.2,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {module.avatar && (
        <Avatar
          src={module.avatar}
          sx={{
            position: "absolute",
            top: -10,
            right: 90,
            width: 32,
            height: 32,
            border: "2px solid #16161d",
          }}
        />
      )}

      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.55)",
          mb: 0.3,
        }}
      >
        Meu Módulo
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#fff",
        }}
      >
        {module.title}
      </Typography>

      <Stack sx={{ flexGrow: 1 }} />

      <Typography
        align="center"
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {module.content}
      </Typography>
    </Stack>
  );
}

export default function TrilhaPersonalizada() {
  const [tab, setTab] = useState<"guiada" | "personalizada">("personalizada");

  const handleCreateTrail = () => {
    console.log("Criar nova trilha");
  };
  return (
    <Stack>
      <NavBar />

      <Stack sx={{ backgroundColor: "#f9dde0", minHeight: "100vh" }}>
        {/* Barra superior escura */}
        <Stack sx={{ backgroundColor: "#3a3033", height: 36 }} />

        <Stack sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
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
              mb: 4,
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
                backgroundColor:
                  tab === "personalizada" ? "#c43f2a" : "#d97a6a",
                borderRadius: 0,
                px: 2,
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              Trilha personalizada
            </Button>
          </Stack>

          {/* Grid de módulos */}
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
              maxWidth: 560,
              mb: { xs: 6, md: 20 },
            }}
          >
            {modules.map((module, i) => (
              <ModuleCard key={i} module={module} />
            ))}
          </Stack>

          {/* Botão criar trilha */}
          <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleCreateTrail}
              sx={{
                backgroundColor: "#16161d",
                color: "#fff",
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.95rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                py: 1.2,
                "&:hover": { backgroundColor: "#26262f" },
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
