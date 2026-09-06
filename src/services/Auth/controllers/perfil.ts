import api from "../../../api/axios";
import type { SessaoUsuario } from "./auth";

export async function buscarFotoPerfil(sinal: AbortSignal): Promise<Blob> {
  const response = await api.get<Blob>("/empreendedor/me/foto", {
    responseType: "blob",
    signal: sinal,
  });
  return response.data;
}

export async function salvarFotoPerfil(foto: File): Promise<SessaoUsuario> {
  const dados = new FormData();
  dados.append("foto", foto);
  const response = await api.put<SessaoUsuario>("/empreendedor/me/foto", dados);
  return response.data;
}
