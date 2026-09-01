import api from "../../api/axios";

export interface Aula { id: number; titulo: string; conteudo: string; video_url: string; concluida: boolean }
export interface Trilha { categoria: string; categoria_label: string; publico_alvo: string; mentor: { id: number; nome: string; especialidade: string }; id: number; titulo: string; descricao: string; publicada: boolean; versao: number; progresso: number; aulas: Aula[] }
export interface AulaEntrada { titulo: string; conteudo: string; video_url: string }
export interface TrilhaEntrada { categoria: string; publico_alvo: string; titulo: string; descricao: string; aulas: AulaEntrada[] }
export interface Mentorado { id: number; nome: string; empresa: string | null }
export const listarTrilhas = async () => (await api.get<Trilha[]>("/mentoria/trilhas")).data;
export const minhasTrilhas = async () => (await api.get<Trilha[]>("/mentoria/minhas-trilhas")).data;
export const salvarTrilha = async (dados: TrilhaEntrada, atual?: Trilha) => atual
  ? atual.publicada
    ? (await api.patch<Trilha>(`/mentoria/trilhas/${atual.id}/catalogo`, { categoria: dados.categoria, publico_alvo: dados.publico_alvo, versao: atual.versao })).data
    : (await api.put<Trilha>(`/mentoria/trilhas/${atual.id}`, { ...dados, versao: atual.versao })).data
  : (await api.post<Trilha>("/mentoria/trilhas", dados)).data;
export const publicarTrilha = async (trilha: Trilha) =>
  (await api.post<Trilha>(`/mentoria/trilhas/${trilha.id}/publicar`, { versao: trilha.versao })).data;
export const listarMentorados = async () => (await api.get<Mentorado[]>("/mentoria/mentorados")).data;
export const acompanharTrilhas = async (aluno: number) =>
  (await api.get<Trilha[]>(`/mentoria/mentorados/${aluno}/trilhas`)).data;
export const concluirAula = async (trilha: number, aula: number, concluida: boolean) =>
  (await api.put<Trilha>(`/mentoria/minhas-trilhas/${trilha}/aulas/${aula}`, { concluida })).data;
export interface Categoria { value: string; label: string }
export interface ItemCatalogo { id: number; titulo: string; descricao: string; categoria: string; categoria_label: string; publico_alvo: string; mentor: { id: number; nome: string; especialidade: string }; aulas: { titulo: string }[]; inscrito: boolean }
export interface PaginaCatalogo { itens: ItemCatalogo[]; total: number; pagina: number; por_pagina: number }
export const categoriasTrilhas = async (mentor = false) => (await api.get<Categoria[]>(mentor ? "/mentoria/trilhas/categorias" : "/mentoria/catalogo/categorias")).data;
export const buscarCatalogo = async (categoria: string, pagina: number) => (await api.get<PaginaCatalogo>("/mentoria/catalogo", { params: { categoria, pagina } })).data;
export const inscreverTrilha = async (id: number) => (await api.post<Trilha>(`/mentoria/catalogo/${id}/inscricao`)).data;
