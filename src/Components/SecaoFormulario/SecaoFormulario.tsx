import { Box, Stack, Typography } from "@mui/material";
import type { SecaoFormularioProps } from "./SecaoFormulario.types";

export default function SecaoFormulario({ titulo, descricao, children }: SecaoFormularioProps) {
  return <Box component="fieldset" sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
    <Typography component="legend" sx={{ fontWeight: 700, fontSize: "0.86rem", color: "primary.dark", mb: descricao ? 0.5 : 2 }}>{titulo}</Typography>
    {descricao && <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>{descricao}</Typography>}
    <Stack gap={2.5}>{children}</Stack>
  </Box>;
}
