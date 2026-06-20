import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Link,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  developers,
  aboutLinks,
  socialLinks,
  currentYear,
} from "./Footer.utils";
import type { SocialLink } from "./FooterLandPage.types";

const iconMap: Record<SocialLink["icon"], React.ReactElement> = {
  github: <GitHubIcon sx={{ fontSize: 18 }} />,
  instagram: <InstagramIcon sx={{ fontSize: 18 }} />,
};

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#3a3033",
        borderTop: "4px solid #f7dde0",
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo + redes sociais */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
            >
              <Avatar
                src="/logo-coroa-afro.png"
                alt="Coroa Afro"
                sx={{ width: 50, height: 50 }}
              />
              <Box>
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
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
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
            </Box>
          </Grid>

          {/* Desenvolvedores */}
          <Grid size={{ xs: 12, md: 5 }}>
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {developers.map((dev) => (
                <Box
                  key={dev.name}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Links institucionais */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            </Box>
          </Grid>
        </Grid>

        {/* Rodapé inferior */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
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
            © {currentYear} Coroa Afro - Etec MCM | Etec Maria Cristina Medeiros
            3° ano C
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
