import { Avatar, LinearProgress, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";

export default function DetalhesMentorado() {
  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        {/* Cabeçalho com perfil */}
        <Stack sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Avatar sx={{ width: 70, height: 70, bgcolor: "#16161d" }}>DS</Avatar>
          <Stack>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#2b2b2b",
              }}
            >
              Dandara Santos
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.9rem",
                color: "#3a3a3a",
              }}
            >
              Café da Dandara • Plano Premium
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.8rem",
                color: "#3ddc97",
                fontWeight: 700,
              }}
            >
              Em acompanhamento
            </Typography>
          </Stack>
        </Stack>

        {/* Resumo de progresso */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          <Stack
            sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Progresso Geral
            </Typography>
            <Typography
              sx={{ color: "#e0523a", fontWeight: 700, fontSize: "1.2rem" }}
            >
              82%
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Lições Concluídas
            </Typography>
            <Typography
              sx={{ color: "#e0523a", fontWeight: 700, fontSize: "1.2rem" }}
            >
              15
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Pendentes
            </Typography>
            <Typography
              sx={{ color: "#e0523a", fontWeight: 700, fontSize: "1.2rem" }}
            >
              4
            </Typography>
          </Stack>
          <Stack
            sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 2 }}
          >
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Trilhas Ativas
            </Typography>
            <Typography
              sx={{ color: "#e0523a", fontWeight: 700, fontSize: "1.2rem" }}
            >
              3
            </Typography>
          </Stack>
        </Stack>

        {/* Evolução da trilha */}
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Evolução da Trilha
        </Typography>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: "#2b2b2b" }}>
              Identidade Visual
            </Typography>
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#26262f",
                "& .MuiLinearProgress-bar": { backgroundColor: "#3ddc97" },
              }}
            />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: "#2b2b2b" }}>
              Posicionamento de Marca
            </Typography>
            <LinearProgress
              variant="determinate"
              value={80}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#26262f",
                "& .MuiLinearProgress-bar": { backgroundColor: "#f2b705" },
              }}
            />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "0.85rem", color: "#2b2b2b" }}>
              Redes Sociais
            </Typography>
            <LinearProgress
              variant="determinate"
              value={45}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#26262f",
                "& .MuiLinearProgress-bar": { backgroundColor: "#e0523a" },
              }}
            />
          </Stack>
        </Stack>

        {/* Atividades recentes */}
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Atividades Recentes
        </Typography>
        <Stack
          sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3, mb: 4 }}
        >
          {[
            "Concluiu a lição 'Identidade Visual'",
            "Iniciou o módulo 'Redes Sociais'",
            "Recebeu nova trilha personalizada",
            "Comentou na comunidade",
          ].map((act, idx) => (
            <Typography
              key={idx}
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.85rem",
                color: "#fff",
                mb: 1,
              }}
            >
              • {act}
            </Typography>
          ))}
        </Stack>

        {/* Informações pessoais */}
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2b2b2b",
            mb: 2,
          }}
        >
          Informações
        </Typography>
        <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
          <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
            Email: dandara@email.com
          </Typography>
          <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
            Telefone: (11) 99999-9999
          </Typography>
          <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
            Empresa: Café da Dandara
          </Typography>
          <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
            Ingresso: 15/02/2026
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
