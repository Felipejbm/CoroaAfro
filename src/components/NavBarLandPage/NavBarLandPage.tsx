import { Toolbar, Box, Button, Link, Avatar, Stack } from "@mui/material";
import { navLinks } from "./NavBarLandPage.utils.ts";

export default function NavBarLandPage() {
  return (
    <Stack
      sx={{
        backgroundColor: "#C2B1B1",
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
          <Button
            href="#home"
            variant="contained"
            disableElevation
            sx={{
              background: "linear-gradient(180deg, #f06a52, #e0523a)",
              color: "#fff",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.1rem",
              textTransform: "none",
              borderRadius: "6px",
              px: 3,
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              "&:hover": {
                background: "linear-gradient(180deg, #f06a52, #c43f2a)",
              },
            }}
          >
            Home
          </Button>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              underline="none"
              sx={{
                color: "text.primary",
                fontSize: "1.1rem",
                fontFamily: "'Playfair Display', Georgia, serif",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </Stack>
  );
}
