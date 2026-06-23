import {
  Avatar,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { MetricCard, ProgressItem } from "./DashboardFinanceiro.types";
import {
  metricCards,
  monthlyGoals,
  weeklyAnalysis,
} from "./DashboardFinanceiro.utils";
import NavBar from "../../components/NavBar/NavBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Ícone de perfil opcional
import { useNavigate } from "react-router-dom";

function MetricCardItem({ label, value, note, noteColor }: MetricCard) {
  return (
    <Stack
      sx={{ backgroundColor: "#1c1830", borderRadius: "12px", p: 2.5, flex: 1 }}
    >
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "#fff",
        }}
      >
        {value}
      </Typography>
      {note && (
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.75rem",
            color: noteColor,
            mt: 0.5,
          }}
        >
          {note}
        </Typography>
      )}
    </Stack>
  );
}

function ProgressPanel({
  title,
  items,
}: {
  title: string;
  items: ProgressItem[];
}) {
  return (
    <Stack sx={{ backgroundColor: "#1c1830", borderRadius: "12px", p: 2.5 }}>
      <Typography
        sx={{
          fontFamily: "'Comfortaa', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#fff",
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
        {items.map((item, i) => (
          <Stack key={i}>
            <Stack
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.value}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #e0523a, #f06a52)",
                },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default function DashboardFinanceiro() {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack sx={{ backgroundColor: "#f9dde0", p: { xs: 2, md: 3 }, flex: 1 }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 3,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              color: "#2b2b2b",
              maxWidth: 460,
            }}
          >
            Acompanhe a evolução da sua marca no digital.
          </Typography>

          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: "#1c1830",
              borderRadius: "30px",
              px: 2,
              py: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "#e0523a", width: 36, height: 36 }} />
            <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#fff",
                  }}
                >
                  Café da Dandara
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Plano Premium
                </Typography>
              </Stack>

              {/* Botão de Perfil adicionado */}
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: 16 }} />}
                onClick={() => navigate("/perfil")}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.75rem",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 1.5,
                  py: 0.5,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "none",
                  },
                }}
              >
                Ver Perfil
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <Stack
            sx={{
              flex: 1.4,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Stack sx={{ display: "flex", gap: 2 }}>
              {metricCards.map((card) => (
                <MetricCardItem key={card.label} {...card} />
              ))}
            </Stack>

            <Stack
              sx={{
                backgroundColor: "#1c1830",
                borderRadius: "12px",
                p: 2.5,
                minHeight: 200,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#fff",
                  mb: 2,
                }}
              >
                Insights
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.6,
                }}
              >
                Seu perfil teve um aumento significativo no alcance durante os
                finais de semana. Postagens em vídeo tiveram 43% mais
                engajamento.
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <ProgressPanel title="Analises Semanais" items={weeklyAnalysis} />
            <ProgressPanel title="Metas do Mês" items={monthlyGoals} />
          </Stack>
        </Stack>

        <Stack
          sx={{ backgroundColor: "#1c1830", borderRadius: "12px", p: 2.5 }}
        >
          <Stack>Gráfico aqui</Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
