import { Box, DialogTitle, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { fonts } from "../../styles/theme";
import type { ModalHeaderProps } from "./ModalHeader.types";

export default function ModalHeader({ id, titulo, descricao, categoria, icone, onClose, ocupado }: ModalHeaderProps) {
  return (
    <Box sx={{ position: "relative", flexShrink: 0, overflow: "hidden", borderBottom: "1px solid", borderColor: "secondary.main", background: t => `linear-gradient(120deg, ${t.palette.secondary.light}, ${alpha(t.palette.secondary.main, 0.75)})` }}>
      <Box aria-hidden sx={{ position: "absolute", width: 180, height: 180, border: "1px solid", borderColor: t => alpha(t.palette.primary.main, 0.08), borderRadius: "50%", right: -90, top: -80, pointerEvents: "none", "&::after": { content: '""', position: "absolute", inset: 16, border: "inherit", borderRadius: "inherit" } }} />
      <Stack direction="row" gap={2} sx={{ px: { xs: 2.5, sm: 3.5 }, py: { xs: 2.5, sm: 3 }, pr: onClose ? 7 : undefined, position: "relative" }}>
        <Box sx={{ width: 44, height: 44, flexShrink: 0, display: { xs: "none", sm: "grid" }, placeItems: "center", bgcolor: "primary.main", color: "secondary.light", borderRadius: "15px", boxShadow: t => `0 6px 16px ${alpha(t.palette.primary.dark, 0.16)}` }}>{icone}</Box>
        <Stack gap={0.7} sx={{ minWidth: 0 }}>
          <Typography component="span" sx={{ fontFamily: fonts.button, fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "primary.light" }}>{categoria}</Typography>
          <DialogTitle id={id} sx={{ p: 0, fontFamily: fonts.hero, color: "primary.dark", fontSize: { xs: "1.65rem", sm: "1.9rem" }, lineHeight: 1.15 }}>{titulo}</DialogTitle>
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.65, maxWidth: 560 }}>{descricao}</Typography>
        </Stack>
      </Stack>
      {onClose && <IconButton aria-label="Fechar janela" onClick={onClose} disabled={ocupado} sx={{ position: "absolute", top: 16, right: 14, color: "primary.main", bgcolor: t => alpha(t.palette.primary.main, 0.04), "&:hover": { bgcolor: "secondary.main" } }}><CloseRoundedIcon fontSize="small" /></IconButton>}
      {ocupado && <LinearProgress aria-label="Salvando informações" sx={{ position: "absolute", bottom: 0, width: "100%", height: 3 }} />}
    </Box>
  );
}
