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
import PricingPage from "../../components/Planos/Planos";
import Layout from "../../components/Layout/Layout";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";

export default function LandPage() {
  const navigate = useNavigate();

  return (
    <Layout>
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
              to="/planos"
              variant="contained"
              disableElevation
              onClick={() => navigate("/login")}
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
            maxWidth: 700,
            mx: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            p: { xs: 4, md: 5 },
            background: `radial-gradient(circle at center, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: (theme) =>
              `0 6px 20px ${alpha(theme.palette.common.black, 0.25)}`,
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
              mb: 4,
            }}
          >
            Proposta Social
          </Typography>

          <List sx={{ px: { xs: 1, md: 4 } }}>
            {items.map((item) => (
              <ListItem
                key={item}
                disableGutters
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.2,
                }}
              >
                <Stack
                  component="span"
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </Stack>
                <Typography
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                  }}
                >
                  {item}
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

        <PricingPage></PricingPage>

        <Footer></Footer>
      </Stack>
    </Layout>
  );
}
