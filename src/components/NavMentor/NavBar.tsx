import ResponsiveNavigation from "../ResponsiveNavigation/ResponsiveNavigation";
import {
  alpha,
  Avatar,
  Button,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { fonts } from "../../styles/theme";
import { navItems } from "./NavBar.utils";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth/controllers/auth";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

export default function NavBarMentor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);
  const [erroSaida, setErroSaida] = useState("");
  async function sair() {
    if (saindo) return;
    setSaindo(true);
    setErroSaida("");
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setErroSaida(mensagemErroApi(error));
    } finally {
      setSaindo(false);
    }
  }

  return (
    <ResponsiveNavigation><Stack
      sx={{
        width: 260, minWidth: 260, flexShrink: 0, position: "sticky", top: 0, height: "100dvh", overflowY: "auto",
        minHeight: "100vh",
        backgroundColor: "background.default",
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
            fontFamily: fonts.logo,
            fontSize: "1.2rem",
            color: "secondary.main",
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
                borderLeft: isActive ? "4px solid" : "4px solid transparent",
                borderColor: isActive ? "primary.light" : "transparent",
                backgroundColor: isActive
                  ? (theme) => alpha(theme.palette.primary.main, 0.25)
                  : "transparent",
                transition: "all 0.4s ease",
                "&:hover": {
                  backgroundColor: isActive
                    ? (theme) => alpha(theme.palette.primary.main, 0.35)
                    : (theme) => alpha(theme.palette.common.white, 0.04),
                },
              }}
            >
              <Stack
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "30%",
                  backgroundColor: isActive
                    ? "primary.light"
                    : "secondary.dark",
                  flexShrink: 0,
                  transition: "transform 0.4s ease, background-color 0.4s ease",
                  animation: isActive ? "navSquareRotate 0.4s ease" : "none",
                  "@keyframes navSquareRotate": {
                    from: { transform: "scale(1) rotate(0deg)" },
                    to: { transform: "scale(1.2) rotate(180deg)" },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    transition: "none",
                  },
                  transform: isActive
                    ? "scale(1.2) rotate(180deg)"
                    : "scale(1) rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: fonts.navbar,
                  fontSize: "1.1rem",
                  color: isActive ? "secondary.main" : "secondary.dark",
                  transition: "color 0.4s ease",
                }}
              >
                {label}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
      <Stack sx={{ mt: "auto", px: 3, pt: 3 }}>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => void sair()}
          disabled={saindo}
          sx={{
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            color: "secondary.main",
            textTransform: "none",
            borderRadius: "8px",
            py: 1.1,
            fontFamily: fonts.button,
            fontWeight: 700,
            boxShadow: (theme) => `0 6px 18px ${alpha(theme.palette.common.black, 0.25)}`,
            "&:hover": {
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            },
          }}
        >
          Sair
        </Button>
        {erroSaida && (
          <Typography
            role="alert"
            sx={{ color: "common.black", fontSize: 12, mt: 1 }}
          >
            {erroSaida}
          </Typography>
        )}
      </Stack>
    </Stack></ResponsiveNavigation>
  );
}
