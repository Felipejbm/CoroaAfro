import axios from "axios";
import api from "../../../api/axios";

export interface ModoIA {
  id: string;
  nome: string;
  descricao: string;
  sugestao: string;
}

export interface ConversaIA {
  id_conversa: number;
  titulo: string;
  criada_em: string;
  atualizada_em: string;
  arquivada: boolean;
}

export interface MensagemIA {
  id_mensagem: number;
  id_conversa: number;
  papel: "usuario" | "assistente";
  conteudo: string;
  criada_em: string;
}

export interface RespostaIA {
  conversa: ConversaIA;
  mensagem_usuario: MensagemIA;
  mensagem_assistente: MensagemIA;
}

export async function buscarModosIA(): Promise<ModoIA[]> {
  return (await api.get<ModoIA[]>("/ia/modos")).data;
}

export async function listarConversasIA(): Promise<ConversaIA[]> {
  return (await api.get<ConversaIA[]>("/ia/conversas")).data;
}

export async function criarConversaIA(titulo: string): Promise<ConversaIA> {
  return (await api.post<ConversaIA>("/ia/conversas", { titulo })).data;
}

export async function listarMensagensIA(id: number): Promise<MensagemIA[]> {
  return (await api.get<MensagemIA[]>(`/ia/conversas/${id}/mensagens`)).data;
}

export async function enviarMensagemIA(
  id: number,
  conteudo: string,
  modo: string,
): Promise<RespostaIA> {
  return (
    await api.post<RespostaIA>(`/ia/conversas/${id}/mensagens`, { conteudo, modo })
  ).data;
}

export async function arquivarConversaIA(id: number): Promise<void> {
  await api.patch(`/ia/conversas/${id}/arquivar`);
}

export function mensagemErroIA(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) return "Sua sessão expirou. Entre novamente.";
    if (error.response?.status === 429) return "A assistente está muito ocupada. Aguarde um pouco e tente novamente.";
    const detalhe: unknown = error.response?.data?.detail;
    if (typeof detalhe === "string") return detalhe;
    if (!error.response) return "Não foi possível acessar o backend. Confira se ele está ligado.";
  }
  return "Não foi possível concluir agora. Tente novamente.";
}
