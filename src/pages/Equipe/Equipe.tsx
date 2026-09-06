import { Box, Container, Stack, Typography, alpha } from "@mui/material";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import Layout from "../../components/Layout/Layout";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import theme, { fonts } from "../../styles/theme";
import type { MemberCardProps } from "./Equipe.types";
import { developers, founders } from "./Equipe.utils";

function MemberCard({
  member,
  isDev = false,
}: MemberCardProps) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: isDev ? 130 : 150 },
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: `0 4px 14px ${alpha(theme.palette.common.black, 0.25)}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src={member.photo}
        alt={member.name}
        sx={{
          width: "100%",
          height: isDev ? 130 : 160,
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        sx={{
          backgroundColor: isDev
            ? theme.palette.background.default
            : theme.palette.primary.dark,
          color: theme.palette.getContrastText(
            isDev
              ? theme.palette.background.default
              : theme.palette.primary.dark,
          ),
          px: isDev ? 1.2 : 1.5,
          py: isDev ? 1 : 1.2,
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: isDev ? "0.85rem" : "1rem",
          }}
        >
          {member.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: isDev ? "0.6rem" : "0.65rem",
            opacity: isDev ? 0.75 : 0.85,
            mb: isDev ? 0.6 : 0.8,
          }}
        >
          {member.role}
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.65rem",
            lineHeight: isDev ? 1.35 : 1.4,
          }}
        >
          {member.bio}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TeamPage() {
  return (
    <Layout showSidebar={false}>
      <Stack>
        <NavBarLandPage />

        <Box
          sx={{
            backgroundColor: theme.palette.secondary.light,
            py: { xs: 5, md: 7 },
          }}
        >
          <Container maxWidth="md">
            <Typography
              align="center"
              sx={{
                fontFamily: fonts.hero,
                fontWeight: 700,
                fontSize: { xs: "2.2rem", md: "3rem" },
                color: theme.palette.text.primary,
                mb: 4,
              }}
            >
              Nossa equipe
            </Typography>

            <Box
              sx={{
                background: `linear-gradient(160deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                borderRadius: "20px",
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontFamily: fonts.hero,
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                  color: theme.palette.secondary.main,
                  mb: 3,
                }}
              >
                Fundadores
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2.5,
                  mb: 5,
                  alignItems: "stretch",
                }}
              >
                {founders.map((member) => (
                  <MemberCard key={member.name} member={member} />
                ))}
              </Box>

              <Typography
                align="center"
                sx={{
                  fontFamily: fonts.hero,
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                  color: theme.palette.secondary.main,
                  mb: 3,
                }}
              >
                Desenvolvedores
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                {developers.map((member) => (
                  <MemberCard key={member.name} member={member} isDev />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        <FooterLandPage />
      </Stack>
    </Layout>
  );
}
