import { Box, Typography, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FooterBrand from "./FooterBrand";
import FooterSection from "./FooterSection";
import { developers, about } from "./footerData";
export default function Footer() {
  return (
    <Box>
      {/* Faixa cinza */}
      
      {/* Footer */}
      <Box
        sx={{
          background: "#050505",
          color: "#fff",
          py: 5,
          px: 4,
        }}
      >
        <Box
          sx={{
          maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <FooterBrand />

          <FooterSection
            title="Desenvolvedores:"
            items={developers}
            icon={
              <GitHubIcon
                sx={{
                  fontSize: 18,
                  color: "#fff",
                }}
              />
            }
          />

          <FooterSection title="Sobre" items={about} />
        </Box>
        <Divider
          sx={{
            bgcolor: "#222",
            my: 3,
          }}
        />
        <Box textAlign="center">
          <Typography
            sx={{
              color: "#d1d1d1",
              mb: 1,
            }}
          >
            Um Projeto Transformador!
          </Typography>
          <Typography
            sx={{
              color: "#b5b5b5",
              fontSize: "0.9rem",
            }}
          >
            © 2026 Coroa Afro - Etec MCM | Etec Maria Cristina Medeiros 3º ano C
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
