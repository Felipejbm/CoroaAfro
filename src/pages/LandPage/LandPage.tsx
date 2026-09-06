import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import { styles } from "./LandPage.styles";
import { items } from "./LandPage.utils";
import TestimonialsCarousel from "./Carrosel/Carrosel";
import Footer from "../../components/FooterLandPage/FooterLandPage";
import Servicos from "../../components/Servicos/Servicos";
import Layout from "../../components/Layout/Layout";
import { Link as RouterLink } from "react-router-dom";
import theme from "../../styles/theme";

const socialDescriptions = [
  "Dar visibilidade a negócios afro e fortalecer quem transforma sua comunidade por meio do empreendedorismo.",
  "Valorizar identidades, histórias e talentos para que mais pessoas se reconheçam no mundo dos negócios.",
  "Compartilhar aprendizados e ferramentas para desenvolver autonomia e ampliar a presença digital.",
];

export default function LandPage() {

  return (
    <Layout showSidebar={false}>
      <Stack sx={styles.page}>
        <NavBarLandPage />

        <Stack sx={{ alignItems: "center", p: 10 }}>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: { xs: 2, md: 4 },
              mb: 5,
            }}
          >
            <Avatar
              src="/src/assets/LogoTipo.png"
              alt="Coroa Afro"
              sx={{
                width: { xs: 90, md: 140 },
                height: { xs: 90, md: 140 },
              }}
            />
            <Stack>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  color: theme.palette.text.primary,
                  lineHeight: 1.15,
                }}
              >
                CoroaAfro -
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  color: theme.palette.text.primary,
                  lineHeight: 1.15,
                }}
              >
                Fortalecendo Laços
              </Typography>
            </Stack>
          </Stack>

          <Typography
            align="center"
            sx={{
              fontSize: { xs: "1rem", md: "2rem" },
              color: theme.palette.text.primary,
              mb: 6,
            }}
          >
            Ajudamos empreendedores afro a fortalecer sua presença digital e
            conquistar mais clientes.
          </Typography>

          <Stack sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component={RouterLink}
              to="/#servicos-avulsos"
              variant="contained"
              disableElevation
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main,
                ),
                fontSize: "1.1rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                py: 1.2,
                boxShadow: (theme) =>
                  `0 3px 8px ${alpha(theme.palette.common.black, 0.25)}`,
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Quero transformar meu negócio
            </Button>
          </Stack>
        </Stack>

        <Divider
          sx={{
            my: 4,
            borderColor: theme.palette.text.primary,
            opacity: 0.3,
            borderWidth: 0.5,
          }}
        />
        <Stack
          sx={{
            position: "relative",
            width: { xs: "calc(100% - 32px)", md: "calc(100% - 64px)" },
            maxWidth: 1000,
            flexShrink: 0,
            mx: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            p: { xs: 3, md: 5 },
            background: `radial-gradient(circle at center, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: (theme) =>
              `0 12px 32px ${alpha(theme.palette.primary.dark, 0.14)}`,
          }}
        >
          <Typography
            align="center"
            sx={{
              fontVariant: "small-caps",
              letterSpacing: 2,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              color: theme.palette.secondary.light,
              textShadow: (theme) =>
                `0 2px 6px ${alpha(theme.palette.common.white, 0.3)}`,
              mb: 1.5,
            }}
          >
            Proposta Social
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light, textAlign: "center", maxWidth: 580, mx: "auto", mb: 4, lineHeight: 1.7 }}>
            Fortalecer o empreendedorismo afro é abrir espaço para histórias,
            conexões e novas oportunidades.
          </Typography>
          <List sx={{ p: 0, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
            {items.map((item, index) => (
              <ListItem
                key={item}
                disableGutters
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.common.white, 0.07),
                  border: `1px solid ${alpha(theme.palette.secondary.light, 0.18)}`,
                }}
              >
                <Stack
                  component="span"
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                  }}
                >
                  ✓
                </Stack>
                <Typography
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    fontWeight: 600,
                  }}
                >
                  {item}
                </Typography>
                <Typography sx={{ color: theme.palette.secondary.light, opacity: 0.9, fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {socialDescriptions[index]}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>

        <Divider
          sx={{
            backgroundColor: theme.palette.common.white,
            width: "60%",
            margin: "0 auto",
            height: "2px",
            mt: 10,
          }}
        />

        <TestimonialsCarousel></TestimonialsCarousel>

        <Servicos />

        <Footer></Footer>
      </Stack>
    </Layout>
  );
}
