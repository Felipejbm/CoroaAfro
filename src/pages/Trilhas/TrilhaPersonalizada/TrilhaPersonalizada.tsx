import { Avatar, Button, Stack, Typography } from "@mui/material";
import type { ModuleItem } from "./TrilhaPersonalizada.types";
import { useState } from "react";
import { modules } from "./TrilhasPersonalizada.utils";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function ModuleCard({ module }: { module: ModuleItem }) {
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundColor: "#16161d",
        borderRadius: "14px", // Igual ao Código 1
        borderLeft: "4px solid #d97a6a", // Borda lateral usando a cor tema da trilha personalizada
        width: { xs: "100%", sm: 340 }, // Mantido o tamanho ideal para o zigue-zague
        p: 2.5, // Igual ao Código 1
      }}
      direction={"column"}
    >
      {/* Cabeçalho do Card (Ajustado para o mesmo comportamento de linha do Código 1) */}
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
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.7rem", // Igual ao Código 1
            color: "rgba(255,255,255,0.55)",
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
              border: "2px solid #16161d",
            }}
          />
        )}
      </Stack>

      {/* Título do Módulo */}
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem", // Igual ao Código 1
          color: "#fff",
          mb: 1.5, // Igual ao Código 1
        }}
      >
        {module.title}
      </Typography>

      {/* Conteúdo/Descrição do Módulo */}
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.8rem", // Igual ao Código 1
          color: "rgba(255,255,255,0.7)", // Igual ao Código 1
          lineHeight: 1.5, // Igual ao Código 1
          mb: 2,
        }}
      >
        {module.content}
      </Typography>

      {/* Link de Ação Inferior (Igual ao Código 1) */}
      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.75rem", // Igual ao Código 1
            fontWeight: 700, // Igual ao Código 1
            color: "#d97a6a",
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
  return (
    <Stack
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: `3px solid #d97a6a`,
        backgroundColor: "#16161d",
        zIndex: 2,
      }}
    />
  );
}

export default function TrilhaPersonalizada() {
  const [tab, setTab] = useState<"guiada" | "personalizada">("personalizada");
  const navigate = useNavigate();

  return (
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
        <Stack sx={{ backgroundColor: "#3a3033", height: 36 }} />

        <Stack sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
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

          {/* Container da Linha do Tempo em Zigue-Zague */}
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
                backgroundColor: "rgba(0,0,0,0.15)",
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

          {/* Botão criar trilha */}
          <Stack sx={{ display: "flex", alignItems: "flex-end", mt: 4 }}>
            <Button
              onClick={() => navigate("/criar-trilha-personalizada-1")}
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