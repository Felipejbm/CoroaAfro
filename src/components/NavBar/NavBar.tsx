import ResponsiveNavigation from "../ResponsiveNavigation/ResponsiveNavigation";
import {
  Avatar,
  List,
  ListItemButton,
  Stack,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import { navItems } from "./NavBar.utils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { fonts } from "../../styles/theme";
import { useState } from "react";
import { logout } from "../../services/Auth/controllers/auth.ts";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa.ts";
import { motion } from "framer-motion";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);
  const [erroSaida, setErroSaida] = useState("");

  const sair = async () => {
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
  };

  return (
    <ResponsiveNavigation><Stack
      sx={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        flexShrink: 0,
        height: "100dvh",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        boxSizing: "border-box",
        backgroundColor: "background.default",
        py: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <Stack sx={{ minHeight: 0, flex: 1 }}>
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: { xs: 2, md: 3 },
            mb: { xs: 2.5, md: 4 },
            flexShrink: 0,
          }}
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

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 0,
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
            scrollbarWidth: "thin",
            scrollbarColor: (theme) =>
              `${alpha(theme.palette.secondary.dark, 0.7)} transparent`,
          }}
        >
          {navItems.map(({ label, href }) => {
            const isActive =
              location.pathname === href ||
              location.pathname.startsWith(`${href}/`) ||
              (href === "/trilha-guiada" &&
                (location.pathname.startsWith("/trilha-") ||
                  location.pathname.startsWith("/criar-trilha")));

            return (
              <ListItemButton
                key={label}
                onClick={() => navigate(href)}
                disableRipple
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: { xs: 2, md: 3 },
                  py: { xs: 1.2, md: 1.4 },
                  backgroundColor: "transparent",
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.common.white, 0.04),
                  },
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderLeft:
                        "4px solid var(--mui-palette-primary-light, #f06292)",
                      backgroundColor: "rgba(233, 30, 99, 0.25)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <Stack
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "30%",
                    backgroundColor: isActive
                      ? "primary.light"
                      : "secondary.dark",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                    zIndex: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: fonts.navbar,
                    fontSize: "1.1rem",
                    color: isActive ? "secondary.main" : "secondary.dark",
                    transition: "color 0.25s ease",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                  }}
                >
                  {label}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Stack>

      <Stack sx={{ mt: "auto", px: { xs: 2, md: 3 }, pt: 3, flexShrink: 0 }}>
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
            boxShadow: (theme) =>
              `0 6px 18px ${alpha(theme.palette.common.black, 0.25)}`,
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
