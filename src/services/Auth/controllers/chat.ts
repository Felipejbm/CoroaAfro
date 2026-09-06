import api from "../../../api/axios";

export interface Mensagem { id: number; texto: string; remetente: string; minha: boolean; criado_em: string }
export interface Conversa { id_mentor: number; id_empreendedor: number; nome: string; papel: string; foto_perfil_url?: string | null; ultima_mensagem: Mensagem | null }
export interface Historico { mensagens: Mensagem[]; tem_mais: boolean }
export interface Rascunho { texto: string; chave_envio: string }
export const chaveConversa = (c: Conversa) => `${c.id_mentor}/${c.id_empreendedor}`;
export const listarConversas = async () => (await api.get<Conversa[]>("/mentoria/chat/conversas")).data;
export const lerMensagens = async (chave: string, cursores: { antes?: number; depois?: number } = {}) =>
  (await api.get<Historico>(`/mentoria/chat/conversas/${chave}/mensagens`, { params: cursores })).data;
export const enviarMensagem = async (chave: string, mensagem: Rascunho) =>
  (await api.post<Mensagem>(`/mentoria/chat/conversas/${chave}/mensagens`, mensagem)).data;
