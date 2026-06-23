import React from "react";
import {
  Typography,
  Avatar,
  Link,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  developers,
  aboutLinks,
  socialLinks,
  currentYear,
} from "./FooterLandPage.utils";
import type { SocialLink } from "./FooterLandPage.types";

const iconMap: Record<SocialLink["icon"], React.ReactElement> = {
  github: <GitHubIcon sx={{ fontSize: 18 }} />,
  instagram: <InstagramIcon sx={{ fontSize: 18 }} />,
};

export default function FooterLandPage() {
  return (
    <Stack
      sx={{
        backgroundColor: "#3a3033",
        borderTop: "4px solid #f7dde0",
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          useFlexGap
          flexWrap="wrap"
        >
          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Avatar
                src="/src/assets/LogoTipo.png"
                alt="Coroa Afro"
                sx={{ width: 50, height: 50 }}
              />

              <Stack>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#fff",
                    fontSize: "1.2rem",
                    lineHeight: 1.2,
                  }}
                >
                  COROA AFRO
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "1rem",
                  }}
                >
                  Fortalecendo laços
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" sx={{ gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.icon}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#2b2b2b",
                    width: 32,
                    height: 32,
                    "&:hover": { backgroundColor: "#e8e8e8" },
                  }}
                >
                  {iconMap[social.icon]}
                </IconButton>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 40%" } }}>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.95rem",
                mb: 1.5,
              }}
            >
              Desenvolvedores:
            </Typography>

            <Stack sx={{ gap: 1 }}>
              {developers.map((dev) => (
                <Stack
                  key={dev.name}
                  direction="row"
                  sx={{ alignItems: "center", gap: 1 }}
                >
                  <GitHubIcon
                    sx={{ fontSize: 16, color: "rgba(255,255,255,0.85)" }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {dev.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
            <Stack sx={{ gap: 1 }}>
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="hover"
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.95rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: "1 1 100%", textAlign: "center", mt: 5 }}>
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Um Projeto Transformador!
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.85rem",
              }}
            >
              © {currentYear} Coroa Afro - Etec MCM | Etec Maria Cristina
              Medeiros 3° ano C
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
