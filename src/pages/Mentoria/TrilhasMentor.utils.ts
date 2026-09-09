import {
  type AulaEntrada,
  type TrilhaEntrada
} from "../../services/Auth/controllers/aprendizado";

export const novaAula = (): AulaEntrada => ({
  titulo: "",
  conteudo: "",
  video_url: "",
});

export const novaTrilha = (): TrilhaEntrada => ({
  titulo: "",
  descricao: "",
  categoria: "",
  publico_alvo: "",
  aulas: [novaAula()],
});

export function normalizarVideo(value: string) {
  const url = value.trim();
  return /^(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(url) ? `https://${url}` : url;
}

export function erroVideo(value: string) {
  if (!value.trim()) return "";
  try {
    const url = new URL(normalizarVideo(value));
    if (url.protocol !== "https:" || !["youtube.com", "www.youtube.com", "youtu.be", "vimeo.com", "www.vimeo.com"].includes(url.hostname)
        || url.username || url.password || (url.port && url.port !== "443") || value.length > 2048) throw new Error();
    return "";
  } catch { return "Use um link HTTPS do YouTube ou Vimeo."; }
}

export function erroTrilha(dados: TrilhaEntrada, publicada = false) {
  if (!dados.categoria) return "Escolha o tema da trilha.";
  if (publicada) return "";
  if (!dados.titulo.trim()) return "Informe o título da trilha.";
  for (const [i, aula] of dados.aulas.entries()) {
    if (!aula.titulo.trim() || !aula.conteudo.trim()) return `Preencha o título e o conteúdo da aula ${i + 1}.`;
    const erro = erroVideo(aula.video_url);
    if (erro) return `Aula ${i + 1}: ${erro}`;
  }
  return "";
}
