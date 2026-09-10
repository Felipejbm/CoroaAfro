import MentorHeader from "../Mentoria/MentorHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import theme, { fonts } from "../../styles/theme";
import { useDashboardFinanceiro } from "./DashboardFinanceiro.hook";
import type { MetricCard, ProgressPanelProps } from "./DashboardFinanceiro.types";
import {
  metricCards,
  monthlyGoals,
  weeklyAnalysis,
} from "./DashboardFinanceiro.utils";

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
}: ProgressPanelProps) {
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
  const { navigate } = useDashboardFinanceiro();

  const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBar />

      <Stack
        sx={{
          backgroundColor: theme.palette.secondary.light,
          p: { xs: 2, md: 4, lg: 5 },
          minWidth: 0,
          gap: 3,
          flex: 1,
        }}
      >
        <MentorHeader eyebrow="Seu negócio" title="Painel financeiro" description="Acompanhe suas finanças, resultados e próximos objetivos." action={<Button variant="outlined" sx={{ color: "inherit", borderColor: "currentColor" }} startIcon={<AccountCircleIcon />} onClick={() => navigate("/perfil")}>Ver perfil</Button>} />

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
