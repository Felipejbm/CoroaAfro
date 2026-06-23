import { Button, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";

export default function DashboardRedes() {
  const handleConnect = () => {
    console.log("Conectar com Meta Analytics");
  };

  const handleFetchData = () => {
    console.log("Buscar Dados");
  };

  return (
   
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f9dde0",
      }}
    >
      <NavBar />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2rem" },
                color: "#fff",
                mb: 2,
              }}
            >
              Acompanhe a evolução da sua marca no digital
            </Typography>
            <Stack direction={"row"} sx={{ flexWrap: "wrap", gap: 1.5 }}>
              <Button
                onClick={handleConnect}
                sx={{
                  backgroundColor: "#e0523a",
                  color: "#fff",
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 1,
                  "&:hover": { backgroundColor: "#c43f2a" },
                }}
              >
                Conectar com Meta Analytics
              </Button>
              <Button
                onClick={handleFetchData}
                sx={{
                  backgroundColor: "#26262f",
                  color: "#fff",
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 1,
                  "&:hover": { backgroundColor: "#3a3a3a" },
                }}
              >
                Buscar Dados
              </Button>
              <Button
                sx={{
                  backgroundColor: "#26262f",
                  color: "#fff",
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 1,
                  "&:hover": { backgroundColor: "#3a3a3a" },
                }}
              >
                Instagram
              </Button>
            </Stack>
          </Stack>

          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.9rem",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            Café da Dandara • Plano Premium
          </Typography>
        </Stack>

        <Stack direction={"row"} sx={{ gap: 1.5, mb: 4 }}>
          {["Hoje", "7 dias", "30 dias"].map((f) => (
            <Button
              key={f}
              sx={{
                backgroundColor: "#26262f",
                color: "#fff",
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.8rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 0.8,
                "&:hover": { backgroundColor: "#3a3a3a" },
              }}
            >
              {f}
            </Button>
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#fff",
            mb: 2,
          }}
        >
          Métricas de Visibilidade
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          {[
            "Seguidores Totais",
            "Novos Seguidores",
            "Alcance",
            "Impressões",
            "Visitas ao Perfil",
          ].map((m) => (
            <Stack
              key={m}
              sx={{ backgroundColor: "#26262f", borderRadius: "10px", p: 2 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  color: "#fff",
                }}
              >
                {m}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#e0523a",
                  mt: 1,
                }}
              >
                --
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#fff",
            mb: 2,
          }}
        >
          Métricas de Interação
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          {["Curtidas", "Comentários", "Salvamentos", "Compartilha"].map(
            (m) => (
              <Stack
                key={m}
                sx={{ backgroundColor: "#26262f", borderRadius: "10px", p: 2 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontSize: "0.85rem",
                    color: "#fff",
                  }}
                >
                  {m}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#e0523a",
                    mt: 1,
                  }}
                >
                  --
                </Typography>
              </Stack>
            ),
          )}
        </Stack>

        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          {[
            "Alcance de Reels",
            "Cliques no Link da Bio",
            "Toques no Botão de Contato",
            "Visualizações de Stories",
          ].map((m) => (
            <Stack
              key={m}
              sx={{ backgroundColor: "#26262f", borderRadius: "10px", p: 2 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  color: "#fff",
                }}
              >
                {m}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#e0523a",
                  mt: 1,
                }}
              >
                --
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#fff",
            mb: 2,
          }}
        >
          Posts Populares — Maior Alcance do Mês
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {[1, 2, 3].map((p) => (
            <Stack
              key={p}
              sx={{ backgroundColor: "#26262f", borderRadius: "10px", p: 2 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  color: "#fff",
                  mb: 1,
                }}
              >
                Aguardando dados da API...
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Alcance • Curtidas • Visualiz. • Salvamen.
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
