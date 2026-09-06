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
