import api from "../../../api/axios";

export interface FeedbackAdmin {
  id: number;
  autor_nome: string;
  autor_papel: "empreendedor" | "mentor";
  nota: number;
  comentario: string;
  autoriza_publicacao: boolean;
  status: "pendente" | "aprovado" | "recusado";
  criado_em: string;
}

export interface FeedbackPublico {
  id: number;
  nome: string;
  papel: "empreendedor" | "mentor";
  nota: number;
  comentario: string;
}

export const statusFeedback = async () => (await api.get("/feedback/me/status")).data as {
  pode_enviar: boolean;
  ultimo_feedback: unknown | null;
};
export const enviarFeedback = (dados: { nota: number; comentario: string; autoriza_publicacao: boolean }) =>
  api.post("/feedback", dados);
export const listarFeedbacksPublicos = async () =>
  (await api.get<FeedbackPublico[]>("/feedback/publicos")).data;
export const listarFeedbacksAdmin = async () =>
  (await api.get<FeedbackAdmin[]>("/admin/feedbacks")).data;
export const aprovarFeedback = (id: number) => api.post(`/admin/feedbacks/${id}/aprovar`);
export const recusarFeedback = (id: number) => api.post(`/admin/feedbacks/${id}/recusar`);
