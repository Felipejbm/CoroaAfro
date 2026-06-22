import { Avatar, List, ListItemButton, Stack, Typography, Button } from "@mui/material";
import { navItems } from "./NavBar.utils";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { fonts } from "../../styles/theme";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        width: 280,
        minHeight: "100vh",
        backgroundColor: "#15151c",
        py: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Stack
        sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, mb: 4 }}
      >
        <Avatar
          src="/logo-coroa-afro.png"
          alt="Coroa Afro"
          sx={{ width: 44, height: 44 }}
        />
        <Typography
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.2rem",
            color: "#fff",
          }}
        >
          Coroa Afro
        </Typography>
      </Stack>

      {/* Itens de navegação */}
      <List sx={{ display: "flex", flexDirection: "column", gap: 1, p: 0 }}>
        {navItems.map(({ label, href }) => {
          const isActive = location.pathname === href;

          return (
            <ListItemButton
              key={label}
              onClick={() => navigate(href)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 3,
                py: 1.4,
                borderLeft: isActive
                  ? "4px solid #e0523a"
                  : "4px solid transparent",
                backgroundColor: isActive
                  ? "rgba(122, 31, 42, 0.35)"
                  : "transparent",
                transition: "all 0.4s ease", // suaviza tudo
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(122, 31, 42, 0.45)"
                    : "rgba(255,255,255,0.04)",
                },
              }}
            >
              {/* Bolinha */}
              <Stack
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "30%",
                  backgroundColor: isActive ? "#e0523a" : "#f0a3a0",
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                  transform: isActive
                    ? "scale(1.2) rotate(180deg)"
                    : "scale(1) rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.1rem",
                  color: "#fff",
                  transition: "color 0.4s ease",
                }}
              >
                {label}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>

      {/* Rodapé com ação de sair (navega para a hero) */}
      <Stack sx={{ mt: "auto", px: 3, pt: 3 }}>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => navigate("/")}
          sx={{
            background: "linear-gradient(90deg, #f0623e, #e0523a)",
            color: "#fff",
            textTransform: "none",
            borderRadius: "8px",
            py: 1.1,
            fontFamily: fonts.body,
            fontWeight: 700,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            "&:hover": { background: "linear-gradient(90deg, #e0523a, #c43f2a)" },
          }}
        >
          Sair
        </Button>
      </Stack>
    </Stack>
  );
}
