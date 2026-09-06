import { Avatar, Button, Stack, Typography, useTheme } from "@mui/material";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { useDashboardMentor } from "./DashboardMentor.hook";

export default function DashboardMentor() {
  const { handleLogout } = useDashboardMentor();

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: theme.palette.text.primary,
            }}
          >
            Acompanhe a evolução de seus mentorados
          </Typography>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 2,
              backgroundColor: theme.palette.background.default,
              px: 2,
              py: 1,
              borderRadius: "10px",
            }}
          >
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>R</Avatar>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white, whiteSpace: "nowrap" }}>
              Reginaldo Alves
            </Typography>

            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                fontFamily: fonts.body,
                fontSize: "0.8rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              Sair
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Faturamento Gerado
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              $2000
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Número de alunos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              80
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Número de cursos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              4
            </Typography>
          </Stack>
        </Stack>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.2rem",
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Minhas atividades
        </Typography>

        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Faturamento Gerado
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              $2000
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Número de alunos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              80
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
              Número de cursos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.main }}>
              4
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}