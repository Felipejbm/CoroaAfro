import { Avatar, List, ListItemButton, Stack, Typography } from "@mui/material";
import { navItems } from "./NavBar.utils";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBarMentor() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        width: "15%",
        minHeight: "100vh",
        backgroundColor: "#15151c",
        py: 3,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, mb: 4 }}
      >
        <Avatar
          src="/src/assets/LogoTipo.png"
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
                transition: "all 0.4s ease", 
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(122, 31, 42, 0.45)"
                    : "rgba(255,255,255,0.04)",
                },
              }}
            >
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
    </Stack>
  );
}
