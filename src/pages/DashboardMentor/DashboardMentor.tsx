import { Avatar, Button, Stack, Typography } from "@mui/material";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";

export default function DashboardMentor() {
  const handleLogout = () => {
    console.log("Sair");
  };

  return (
    <Stack direction="row" sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "#f9dde0",
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
              color: "#2b2b2b",
            }}
          >
            Acompanhe a evolução de seus mentorados
          </Typography>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 2,
              backgroundColor: "#16161d",
              px: 2,
              py: 1,
              borderRadius: "10px",
            }}
          >
            <Avatar sx={{ bgcolor: "#e0523a" }}>R</Avatar>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff", whiteSpace: "nowrap" }}>
              Reginaldo Alves
            </Typography>

            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#e0523a",
                color: "#fff",
                fontFamily: fonts.body,
                fontSize: "0.8rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                "&:hover": { backgroundColor: "#c43f2a" },
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
          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Faturamento Gerado
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              $2000
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Número de alunos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              80
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Número de cursos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              4
            </Typography>
          </Stack>
        </Stack>

        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#2b2b2b",
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
          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Faturamento Gerado
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              $2000
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Número de alunos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              80
            </Typography>
          </Stack>

          <Stack sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}>
            <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: "#fff" }}>
              Número de cursos
            </Typography>
            <Typography sx={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "1.2rem", color: "#e0523a" }}>
              4
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}