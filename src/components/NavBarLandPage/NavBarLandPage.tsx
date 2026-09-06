import { Toolbar, Box, Button, Avatar, Stack, alpha, useTheme } from "@mui/material";
import { fonts } from "../../styles/theme";
import { navLinks } from "./NavBarLandPage.utils";

const menuHeight = 86;

export default function NavBarLandPage() {
  const theme = useTheme();

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
                href={link.href}
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
