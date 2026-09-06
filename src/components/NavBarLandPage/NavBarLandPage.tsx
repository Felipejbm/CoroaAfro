import { Toolbar, Box, Button, Avatar, Stack, Menu, MenuItem, Divider, ListSubheader, alpha, useTheme } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { servicos } from "../Servicos/Servicos.utils";
import { fonts } from "../../styles/theme";
import { navLinks } from "./NavBarLandPage.utils";

const menuHeight = 86;

export default function NavBarLandPage() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        backgroundColor: alpha(theme.palette.secondary.main, 0.85),
        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          py: 1,
          height: menuHeight,
          flexShrink: 0,
        }}
      >
        <Avatar
          src="/src/assets/LogoTipo.png"
          alt="Coroa Afro"
          sx={{ width: 70, height: 70 }}
        />

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
                href={link.href === "/planos" ? undefined : link.href}
                onClick={link.href === "/planos" ? (event) => setAnchor(event.currentTarget) : undefined}
                id={link.href === "/planos" ? "servicos-menu-button" : undefined}
                aria-haspopup={link.href === "/planos" ? "menu" : undefined}
                aria-expanded={link.href === "/planos" ? Boolean(anchor) : undefined}
                aria-controls={link.href === "/planos" && anchor ? "servicos-menu" : undefined}
                endIcon={link.href === "/planos" ? <ExpandMoreIcon /> : undefined}
                disableElevation
                sx={{
                  background: isActive
                    ? (theme) =>
                        `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
                    : "transparent",
                  color: isActive ? "secondary.main" : "text.primary",
                  fontFamily: fonts.navbar,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 3,
                  boxShadow: isActive ? `0 2px 6px ${alpha(theme.palette.common.black, 0.3)}` : "none",
                  "&:hover": {
                    background: isActive
                      ? (theme) =>
                          `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`
                      : alpha(theme.palette.common.white, 0.05),
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
      <Menu id="servicos-menu" anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} MenuListProps={{ "aria-labelledby": "servicos-menu-button" }} slotProps={{ paper: { sx: { maxHeight: "70vh", maxWidth: "calc(100vw - 32px)", bgcolor: "secondary.light" } } }}>
        <ListSubheader disableSticky sx={{ bgcolor: "secondary.light", color: "primary.main", fontWeight: 700 }}>
          PLANOS
        </ListSubheader>
        <MenuItem sx={{ color: "text.primary" }} onClick={() => {
          setAnchor(null);
          navigate("/planos");
        }}>
          Conhecer os planos Bronze, Prata e Ouro
        </MenuItem>
        <Divider />
        <ListSubheader disableSticky sx={{ bgcolor: "secondary.light", color: "primary.main", fontWeight: 700 }}>
          SERVIÇOS AVULSOS
        </ListSubheader>
        {[{ id: "servicos-avulsos", nome: "Todos os serviços avulsos" }, ...servicos].map((servico) => (
          <MenuItem key={servico.id} sx={{ whiteSpace: "normal", color: "text.primary" }} onClick={() => {
            setAnchor(null);
            if (location.pathname === "/" && location.hash === `#${servico.id}`) {
              document.getElementById(servico.id)?.scrollIntoView({ block: "start" });
            } else {
              navigate(`/#${servico.id}`);
            }
          }}>
            {servico.nome}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
    <Box
      aria-hidden="true"
      sx={{
        height: menuHeight + 24,
        flexShrink: 0,
        backgroundColor: "secondary.light",
      }}
    />
    </>
  );
}
