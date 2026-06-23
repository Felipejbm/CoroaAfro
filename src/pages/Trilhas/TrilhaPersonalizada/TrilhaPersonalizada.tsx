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
        borderRadius: "14px", 
        borderLeft: "4px solid #d97a6a", 
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
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.7rem", 
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

      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "#fff",
          mb: 1.5,
        }}
      >
        {module.title}
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
        {module.content}
      </Typography>

      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.75rem", 
            fontWeight: 700, 
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
    <Stack direction={"row"} sx={{ width: "100%" }}>
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
