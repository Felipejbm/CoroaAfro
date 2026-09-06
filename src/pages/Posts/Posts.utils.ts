import axios from "axios";
import api from "../../api/axios";
import type { PostWithImage } from "./Posts.types";

interface PostagemResponse {
  id_post: number; company: string; segment: string; conteudo_texto: string;
  midia_url: string | null; data_publicacao: string; comments: PostWithImage["comments"];
  minha: boolean; imagem_upload_url: string | null;
  autor_foto_url: string | null;
}
export const converterPost = (post: PostagemResponse): PostWithImage => ({
  id: String(post.id_post), company: post.company, segment: post.segment,
  content: post.conteudo_texto,
  image: post.imagem_upload_url ? api.getUri({ url: post.imagem_upload_url }) : post.midia_url || undefined,
  imageUrl: post.midia_url || "", uploadedImage: !!post.imagem_upload_url, minha: post.minha,
  comments: post.comments,
  autorFotoUrl: post.autor_foto_url,
});
export const listarPosts = async () => (await api.get<PostagemResponse[]>("/postagem")).data.map(converterPost);
export const criarPost = async (texto: string, imagem: string) => converterPost((await api.post<PostagemResponse>(
  "/postagem/criar-postagem", { conteudo_texto: texto.trim(), midia_url: imagem.trim() || null },
)).data);
export async function salvarPost(texto: string, imagem: string, arquivo: File | null, editando: PostWithImage | null, removerImagem: boolean) {
  if (arquivo) {
    const form = new FormData();
    form.append("conteudo_texto", texto.trim());
    form.append("imagem", arquivo);
    const resposta = editando
      ? await api.patch<PostagemResponse>(`/postagem/${editando.id}/com-imagem`, form)
      : await api.post<PostagemResponse>("/postagem/criar-com-imagem", form);
    return converterPost(resposta.data);
  }
  if (!editando) return criarPost(texto, imagem);
  const dados: { conteudo_texto: string; midia_url?: string | null } = { conteudo_texto: texto.trim() };
  if (removerImagem || !editando.uploadedImage || imagem.trim()) dados.midia_url = imagem.trim() || null;
  return converterPost((await api.patch<PostagemResponse>(`/postagem/${editando.id}`, dados)).data);
}
export const excluirPost = async (id: string) => { await api.delete(`/postagem/${id}`); };
export const comentarPost = async (id: string, texto: string) => (await api.post<PostWithImage["comments"][number]>(
  `/postagem/${id}/comentarios`, { texto: texto.trim() },
)).data;
export function erroPosts(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (error.response?.status === 422) return "Confira o texto e a URL da imagem antes de enviar.";
  }
  return "Não foi possível concluir a operação. Verifique sua conexão e tente novamente.";
}
export function validarPost(texto: string, imagem: string) {
  if (!texto.trim() || texto.trim().length > 4000) return "Escreva uma postagem com até 4.000 caracteres.";
  if (imagem.trim()) {
    try {
      const url = new URL(imagem.trim());
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || imagem.trim().length > 255) throw new Error();
    } catch { return "Informe uma URL HTTP ou HTTPS válida, sem credenciais e com até 255 caracteres."; }
  }
  return "";
}
