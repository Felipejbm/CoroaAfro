import type { AvatarProps } from "@mui/material";

export interface AvatarUsuarioProps extends Omit<AvatarProps, "src" | "children"> {
  atual?: boolean;
  nome?: string;
  fotoUrl?: string | null;
}
