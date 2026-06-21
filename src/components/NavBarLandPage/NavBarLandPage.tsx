import { Toolbar, Box, Button, Avatar, Stack } from "@mui/material";
import { navLinks } from "./NavBarLandPage.utils.ts";
import { useLocation } from "react-router-dom";

export default function NavBarLandPage() {
  const location = useLocation();
  return (
    <Stack
      sx={{
        position: "fixed", // fixa no topo
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100, // garante que fique acima do conteúdo
        backgroundColor: "rgba(194, 177, 177, 0.85)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          py: 1,
        }}
      >
        <Avatar
          src="/src/assets/LogoTipo.png"
          alt="Coroa Afro"
          sx={{ width: 70, height: 70 }}
        />

        {/* Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, md: 5 },
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Button
                key={link.label}
                href={link.href}
                disableElevation
                sx={{
                  background: isActive
                    ? "linear-gradient(180deg, #f06a52, #e0523a)" // ativo com bg
                    : "transparent", // os outros sem fundo
                  color: isActive ? "#fff" : "text.primary",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 3,
                  boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.3)" : "none",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(180deg, #f06a52, #c43f2a)"
                      : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </Stack>
  );
}
