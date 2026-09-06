import { Stack, Typography, alpha } from "@mui/material";
import type { ReactNode } from "react";
import { fonts } from "../../styles/theme";

export default function MentorHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <Stack sx={{
      position: "relative", overflow: "hidden", p: { xs: 2.5, md: 4 }, borderRadius: 4,
      color: "secondary.light",
      background: (theme) => `linear-gradient(125deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 62%, ${theme.palette.primary.light} 100%)`,
      boxShadow: (theme) => `0 18px 40px ${alpha(theme.palette.primary.dark, 0.22)}`,
      "&::after": { content: '""', position: "absolute", width: 220, height: 220, right: -70, top: -100, borderRadius: "50%", bgcolor: "rgba(242,225,209,0.1)", pointerEvents: "none" },
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2} sx={{ zIndex: 1 }}>
        <Stack gap={1}>
          <Typography variant="overline" sx={{ letterSpacing: "0.14em", fontFamily: fonts.button, opacity: 0.75, fontWeight: 700 }}>Espaço do mentor</Typography>
          <Typography component="h1" sx={{ fontFamily: fonts.hero, fontSize: { xs: "1.8rem", md: "2.35rem" }, lineHeight: 1.2 }}>{title}</Typography>
          <Typography sx={{ opacity: 0.8, maxWidth: 700 }}>{description}</Typography>
        </Stack>
        {action}
      </Stack>
    </Stack>
  );
}
