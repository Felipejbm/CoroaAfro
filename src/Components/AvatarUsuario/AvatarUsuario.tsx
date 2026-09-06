import { Avatar } from "@mui/material";
import { useAvatarUsuario } from "./AvatarUsuario.hook";
import type { AvatarUsuarioProps } from "./AvatarUsuario.types";
import { iniciaisUsuario } from "./AvatarUsuario.utils";

export default function AvatarUsuario({ atual = false, nome, fotoUrl, alt, ...props }: AvatarUsuarioProps) {
  const { nomeExibido, src } = useAvatarUsuario(atual, nome, fotoUrl);
  return <Avatar {...props} src={src} alt={alt ?? `Foto de ${nomeExibido}`}>
    {iniciaisUsuario(nomeExibido)}
  </Avatar>;
}
