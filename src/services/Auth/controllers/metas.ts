import api from "../../../api/axios";


export interface MetaEntrada {
  titulo: string; unidade: string; valor_inicial: string; valor_atual: string;
  valor_alvo: string; prazo: string | null; arquivada: boolean;
  tipo: "manual" | "instagram";
  origem: "manual" | "ia";
  metrica: "seguidores" | "publicacoes" | "alcance_7d" | "interacoes_recentes" | null;
}
export interface Meta extends MetaEntrada {
  id: number; versao: number; progresso: number;
  status: "arquivada" | "atingida" | "prazo_encerrado" | "em_andamento";
  ultima_sincronizacao: string | null;
}
export async function listarMetas(): Promise<Meta[]> { return (await api.get("/metas")).data; }
export async function salvarMeta(dados: MetaEntrada, meta?: Meta): Promise<Meta> {
  return meta ? (await api.patch(`/metas/${meta.id}`, { ...dados, versao: meta.versao })).data
    : (await api.post("/metas", dados)).data;
}
