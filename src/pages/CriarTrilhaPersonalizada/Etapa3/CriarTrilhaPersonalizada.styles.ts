import type { Theme } from "@mui/material/styles";
import type { Level } from "./CriarTrilhaPersonalizada.types";

export const getLevelColors = (theme: Theme): Record<Level, string> => ({
  Iniciante: theme.palette.primary.light,
  Intermediário: theme.palette.primary.main,
  Avançado: theme.palette.primary.dark,
});