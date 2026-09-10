import api from "../../../api/axios";
import { aprovarFeedback, listarFeedbacksAdmin, recusarFeedback, type FeedbackAdmin } from "./feedback";
export { aprovarFeedback, listarFeedbacksAdmin, recusarFeedback };
export type { FeedbackAdmin };
export interface SolicitacaoMentor { id:number; nome:string; email:string; especialidade:string; biografia:string; status:"pendente"|"aprovada"|"recusada"; motivo_recusa?:string|null; criada_em:string }
export interface AvaliacaoMentoriaAdmin { id:number; trilha_titulo:string; mentor_nome:string; empreendedor_nome:string; nota_trilha:number; nota_mentor:number; comentario:string; criada_em:string }
export const solicitarMentoria = (dados:{nome:string;email:string;senha:string;especialidade:string;biografia:string}) => api.post("/mentor-solicitacoes", dados);
export const loginAdmin = (email:string, senha:string) => api.post("/admin/login", {email,senha});
export const sessaoAdmin = () => api.get("/admin/me");
export const listarSolicitacoes = async () => (await api.get<SolicitacaoMentor[]>("/admin/mentor-solicitacoes")).data;
export const aprovarSolicitacao = async (id:number) => (await api.post<SolicitacaoMentor>(`/admin/mentor-solicitacoes/${id}/aprovar`)).data;
export const recusarSolicitacao = async (id:number, motivo:string) => (await api.post<SolicitacaoMentor>(`/admin/mentor-solicitacoes/${id}/recusar`, {motivo})).data;
export const logoutAdmin = () => api.post("/admin/logout");
export const listarAvaliacoesMentoriaAdmin = async () => (await api.get<AvaliacaoMentoriaAdmin[]>("/admin/mentoria-avaliacoes")).data;
