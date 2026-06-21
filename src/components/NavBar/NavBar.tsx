import { Avatar, List, ListItemButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { navItems } from "./NavBar.utils";

export default function NavBar() {
  const [active, setActive] = useState("Minha empresa");

  return (
    <Stack
      sx={{
        width: 280,
        minHeight: "100vh",
        backgroundColor: "#15151c",
        py: 3,
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
        {navItems.map(({ label }) => {
          const isActive = active === label;

          return (
            <ListItemButton
              key={label}
              onClick={() => setActive(label)}
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
                  borderRadius: "5px",
                  backgroundColor: isActive ? "#e0523a" : "#f0a3a0",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.1rem",
                  color: "#fff",
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
