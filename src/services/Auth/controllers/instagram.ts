import axios from "axios";

import type {
  InstagramInsightsResponse,
  InstagramMediaResponse,
  InstagramProfile,
  UsuarioLogado,
} from "../schema/instagramSchema";
import api from "../../../api/axios";

export function getEmpreendedorLogado(): UsuarioLogado | null {
  const stored = localStorage.getItem("empreendedor");
  if (!stored) return null;

  try {
    const usuario = JSON.parse(stored) as Partial<UsuarioLogado>;
    if (!usuario.id || !usuario.nome || !usuario.email) return null;
    return usuario as UsuarioLogado;
  } catch {
    return null;
  }
}

export function iniciarConexaoInstagram(empreendedorId: number) {
  const baseUrl = api.defaults.baseURL ?? "http://localhost:8000";
  window.location.assign(
    `${baseUrl}/auth/meta?empreendedor_id=${encodeURIComponent(empreendedorId)}`,
  );
}

export async function buscarPerfilInstagram(empreendedorId: number) {
  const response = await api.get<InstagramProfile>("/instagram/profile", {
    params: { empreendedor_id: empreendedorId },
  });
  return response.data;
}

export async function buscarMidiasInstagram(
  empreendedorId: number,
  limit = 25,
) {
  const response = await api.get<InstagramMediaResponse>("/instagram/media", {
    params: { empreendedor_id: empreendedorId, limit },
  });
  return response.data.data;
}

export async function buscarAlcanceInstagram(empreendedorId: number) {
  const response = await api.get<InstagramInsightsResponse>(
    "/instagram/insights",
    {
      params: {
        empreendedor_id: empreendedorId,
        metric: "reach",
        period: "day",
      },
    },
  );
  return response.data;
}

export function mensagemErroInstagram(error: unknown) {
  if (axios.isAxiosError<{ detail?: string }>(error)) {
    if (error.response?.status === 404) {
      return "Conecte uma conta profissional do Instagram para ver os dados.";
    }
    if (error.response?.status === 401) {
      return "A autorização expirou. Conecte o Instagram novamente.";
    }
    return error.response?.data?.detail ?? "Não foi possível consultar o Instagram.";
  }
  return "Não foi possível consultar o Instagram.";
}
