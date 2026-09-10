import axios from "axios";
import api from "../../../api/axios";

export type PlanoId = "bronze" | "prata" | "ouro";
export type FormaPagamento = "cartao" | "pix";

export interface Assinatura {
  id: number;
  plano: PlanoId;
  valor_mensal: number;
  forma_pagamento: FormaPagamento;
  status: "ativa" | "cancelada";
  criada_em: string;
  atualizada_em: string;
  ambiente: "demonstracao";
}

export async function buscarAssinatura() {
  return (await api.get<Assinatura | null>("/assinatura/me")).data;
}

export async function confirmarAssinatura(plano: PlanoId, formaPagamento: FormaPagamento) {
  return (await api.post<Assinatura>("/assinatura/confirmar", {
    plano,
    forma_pagamento: formaPagamento,
  })).data;
}

export async function cancelarAssinatura() {
  return (await api.post<Assinatura>("/assinatura/cancelar")).data;
}

export function mensagemErroAssinatura(error: unknown) {
  if (axios.isAxiosError<{ detail?: string }>(error)) {
    if (!error.response) return "Não foi possível conectar ao backend.";
    return error.response.data?.detail ?? "Não foi possível atualizar sua assinatura.";
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}
