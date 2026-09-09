import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import { fonts } from "../../styles/theme";

export default function PaginaNaoEncontrada() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "secondary.light" }}>
      <NavBarLandPage />
      <Container maxWidth="sm" sx={{ flex: 1, display: "grid", placeItems: "center", py: 6 }}>
        <Stack alignItems="center" textAlign="center" gap={2}>
          <Typography sx={{ fontFamily: fonts.hero, fontWeight: 800, fontSize: { xs: "5rem", md: "8rem" }, lineHeight: 1, color: "primary.main" }}>404</Typography>
          <Typography component="h1" sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: { xs: "1.7rem", md: "2.3rem" } }}>Essa página não foi encontrada</Typography>
          <Typography sx={{ maxWidth: 480 }}>O endereço pode ter mudado ou não existe. Você pode voltar e continuar navegando pelo Coroa Afro.</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mt={1}>
            <Button variant="contained" startIcon={<HomeRoundedIcon />} onClick={() => navigate("/")}>Página inicial</Button>
            <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)}>Voltar</Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
