import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import { styles } from "./LandPage.styles";
import { items } from "./LandPage.utils";
import TestimonialsCarousel from "./Carrosel/Carrosel";
import Footer from "../../components/FooterLandPage/FooterLandPage";
import PricingPage from "../../components/Planos/Planos";
import Layout from "../../components/Layout/Layout";

export default function LandPage() {
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
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  color: "#2b2b2b",
                  lineHeight: 1.15,
                }}
              >
                CoroaAfro -
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  color: "#2b2b2b",
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
              fontFamily: "'Comic Neue', 'Comfortaa', sans-serif",
              fontSize: { xs: "1rem", md: "2rem" },
              color: "#3a3a3a",
              mb: 6,
            }}
          >
            Ajudamos empreendedores afro a fortalecer sua presença digital e
            conquistar mais clientes.
          </Typography>

          <Stack sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              disableElevation
              sx={{
                background: "linear-gradient(90deg, #7b1f3a, #e0523a)",
                color: "#fff",
                fontFamily: "'Comic Neue', 'Comfortaa', sans-serif",
                fontSize: "1.1rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                py: 1.2,
                boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                "&:hover": {
                  background: "linear-gradient(90deg, #6a1a32, #c43f2a)",
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
            borderColor: "#000000",
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
            background:
              "radial-gradient(circle at center, #f0623e 0%, #d8456a 55%, #8a1f4a 100%)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            align="center"
            sx={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              fontVariant: "small-caps",
              letterSpacing: 2,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.3)",
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
                    color: "#fff",
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </Stack>
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    color: "#fff",
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
            backgroundColor: "#fff",
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
