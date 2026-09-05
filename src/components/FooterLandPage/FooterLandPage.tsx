import React from "react";
import {
  Typography,
  Avatar,
  Link,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  developers,
  aboutLinks,
  socialLinks,
  currentYear,
  administration,
} from "../FooterLandPage/FooterLandPage.utils";
import type { SocialLink } from "./FooterLandPage.types";
import { fonts } from "../../styles/theme";

const iconMap: Record<SocialLink["icon"], React.ReactElement> = {
  github: <GitHubIcon sx={{ fontSize: 18 }} />,
  instagram: <InstagramIcon sx={{ fontSize: 18 }} />,
};

export default function FooterLandPage() {
  return (
    <Stack
      sx={{
        backgroundColor: "primary.dark",
        borderTop: "4px solid secondary.light",
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
          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
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
                    fontFamily: fonts.hero,
                    color: "secondary.light",
                    fontSize: "1.2rem",
                    lineHeight: 1.2,
                  }}
                >
                  COROA AFRO
                </Typography>

                <Typography
                  sx={{
                    fontFamily: fonts.hero,
                    color: "secondary.light",
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
                    backgroundColor: "secondary.light",
                    color: "background.default",
                    width: 32,
                    height: 32,
                    "&:hover": { backgroundColor: "secondary.dark" },
                  }}
                >
                  {iconMap[social.icon]}
                </IconButton>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
            <Typography
              sx={{
                fontFamily: fonts.body,
                color: (theme) => alpha(theme.palette.secondary.light, 0.6),
                fontSize: "0.95rem",
                mb: 1.5,
              }}
            >
              Desenvolvedores:
            </Typography>

            <Stack sx={{ gap: 1 }}>
              {developers.map((dev) => (
                <Link
                  key={dev.name}
                  href={dev.href}
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: (theme) =>
                      alpha(theme.palette.secondary.light, 0.85),
                  }}
                >
                  <GitHubIcon
                    sx={{
                      fontSize: 16,
                      color: (theme) =>
                        alpha(theme.palette.secondary.light, 0.85),
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      color: (theme) =>
                        alpha(theme.palette.secondary.light, 0.85),
                      fontSize: "0.95rem",
                    }}
                  >
                    {dev.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
            <Typography
              sx={{
                fontFamily: fonts.body,
                color: (theme) => alpha(theme.palette.secondary.light, 0.6),
                fontSize: "0.95rem",
                mb: 1.5,
              }}
            >
              Administração:
            </Typography>

            <Stack sx={{ gap: 1 }}>
              {administration.map((adm) => (
                <Link
                  key={adm.name}
                  href={adm.href}
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: (theme) =>
                      alpha(theme.palette.secondary.light, 0.85),
                  }}
                >
                  <InstagramIcon
                    sx={{
                      fontSize: 16,
                      color: (theme) =>
                        alpha(theme.palette.secondary.light, 0.85),
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      color: (theme) =>
                        alpha(theme.palette.secondary.light, 0.85),
                      fontSize: "0.95rem",
                    }}
                  >
                    {adm.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
            <Stack
              sx={{
                gap: 1,
                width: "fit-content",
                alignItems: "flex-start",
              }}
            >
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="hover"
                  sx={{
                    fontFamily: fonts.body,
                    color: (theme) =>
                      alpha(theme.palette.secondary.light, 0.85),
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
                fontFamily: fonts.body,
                color: (theme) => alpha(theme.palette.secondary.light, 0.85),
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Um Projeto Transformador!
            </Typography>

            <Typography
              sx={{
                fontFamily: fonts.body,
                color: (theme) => alpha(theme.palette.secondary.light, 0.55),
                fontSize: "0.85rem",
              }}
            >
              © {currentYear} Coroa Afro | Etec Maria Cristina Medeiros 3° ano C
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
