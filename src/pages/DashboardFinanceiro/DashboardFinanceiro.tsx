import {
  Avatar,
  Button,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { MetricCard, ProgressItem } from "./DashboardFinanceiro.types";
import {
  metricCards,
  monthlyGoals,
  weeklyAnalysis,
} from "./DashboardFinanceiro.utils";
import NavBar from "../../components/NavBar/NavBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import theme, { fonts } from "../../styles/theme";

function MetricCardItem({ label, value, note, noteColor }: MetricCard) {
  return (
    <Stack
      sx={{
        borderRadius: "12px",
        p: 2.5,
        flex: 1,
      }}
    >
      <Typography
        sx={{
          fontFamily: fonts.body,
          fontSize: "0.8rem",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "1.5rem",
          color: theme.palette.secondary.main,
        }}
      >
        {value}
      </Typography>
      {note && (
        <Typography
          sx={{
            fontFamily: fonts.body,
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
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: "12px",
        p: 2.5,
      }}
    >
      <Typography
        sx={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "0.95rem",
          color: theme.palette.common.white,
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
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  color: alpha(theme.palette.common.white, 0.7),
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  color: alpha(theme.palette.common.white, 0.7),
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
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
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
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack
        sx={{
          backgroundColor: theme.palette.secondary.light,
          p: { xs: 2, md: 3 },
          flex: 1,
        }}
      >
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
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              color: theme.palette.text.primary,
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
              backgroundColor: theme.palette.background.default,
              borderRadius: "30px",
              px: 2,
              py: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 36,
                height: 36,
              }}
            />
            <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: theme.palette.common.white,
                  }}
                >
                  Café da Dandara
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: alpha(theme.palette.common.white, 0.6),
                  }}
                >
                  Plano Premium
                </Typography>
              </Stack>
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: 16 }} />}
                onClick={() => navigate("/perfil")}
                sx={{
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  color: theme.palette.common.white,
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 1.5,
                  py: 0.5,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.white, 0.2),
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
                backgroundColor: theme.palette.background.default,
                borderRadius: "12px",
                p: 2.5,
                minHeight: 200,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: theme.palette.common.white,
                  mb: 2,
                }}
              >
                Insights
              </Typography>
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: alpha(theme.palette.common.white, 0.75),
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
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "12px",
            p: 2.5,
          }}
        >
          <Stack>Gráfico aqui</Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
