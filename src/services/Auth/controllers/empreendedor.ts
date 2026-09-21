import axios from "axios";
import type {
  EmpreendedorCreate,
  EmpreendedorResponse,
  CadastroSocialPendente,
  ConcluirCadastroSocial,
} from "../schema/empreendedorSchema";
import api from "../../../api/axios";

export async function criarEmpreendedor(data: EmpreendedorCreate) {
  const response = await api.post<EmpreendedorResponse>("/empreendedor", data);
  return response.data;
}

export async function buscarCadastroSocial() {
  const response = await api.get<CadastroSocialPendente>("/auth/social-signup");
  return response.data;
}

export async function concluirCadastroSocial(data: ConcluirCadastroSocial) {
  const response = await api.post<EmpreendedorResponse>("/auth/social-signup", data);
  return response.data;
}

export function mensagemErroCadastro(error: unknown) {
  if (axios.isAxiosError<{ detail?: string | Array<{ msg: string }> }>(error)) {
    const detail = error.response?.data?.detail;
    if (Array.isArray(detail)) return detail[0]?.msg ?? "Revise os dados informados.";
    if (typeof detail === "string") return detail;
    if (error.response?.status === 500) {
      return "Não foi possível cadastrar. Verifique se o e-mail já está em uso.";
    }
  }
  return "Não foi possível cadastrar o empreendedor.";
}
