import { Box, Typography, Container, Stack } from "@mui/material";
import type { TeamMember } from "./Equipe.types";
import { founders, developers } from "./Equipe.utils";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import Layout from "../../components/Layout/Layout";

function MemberCard({
  member,
  isDev = false,
}: {
  member: TeamMember;
  isDev?: boolean;
}) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: isDev ? 130 : 150 },
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
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
          backgroundColor: isDev ? "#1c1c1c" : "#7a1f4a",
          color: "#fff",
          px: isDev ? 1.2 : 1.5,
          py: isDev ? 1 : 1.2,
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: isDev ? "0.85rem" : "1rem",
          }}
        >
          {member.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: isDev ? "0.6rem" : "0.65rem",
            opacity: isDev ? 0.75 : 0.85,
            mb: isDev ? 0.6 : 0.8,
          }}
        >
          {member.role}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
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
    <Layout>
      <Stack>
        <NavBarLandPage />

        <Box sx={{ backgroundColor: "#f7dde0", py: { xs: 5, md: 7 } }}>
          <Container maxWidth="md">
            <Typography
              align="center"
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: { xs: "2.2rem", md: "3rem" },
                color: "#2b2b2b",
                mb: 4,
              }}
            >
              Nossa equipe
            </Typography>

            <Box
              sx={{
                background: "linear-gradient(160deg, #f0623e, #d8456a)",
                borderRadius: "20px",
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                  color: "#2b2b2b",
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
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                  color: "#2b2b2b",
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
