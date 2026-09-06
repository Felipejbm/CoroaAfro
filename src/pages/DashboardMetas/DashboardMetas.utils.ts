import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import type { MetaEntrada } from "../../services/Auth/controllers/metas";
import type { ConfiguracaoMetrica } from "./DashboardMetas.types";
export const resumoMetasConfig: ConfiguracaoMetrica[] = [
  { label: "Metas ativas", icon: FlagRoundedIcon, indice: 0 },
  { label: "Metas atingidas", icon: CheckCircleOutlineRoundedIcon, indice: 1 }
];

export const vazio: MetaEntrada = {
  titulo: "",
  unidade: "seguidores",
  valor_inicial: "0",
  valor_atual: "0",
  valor_alvo: "",
  prazo: "",
  arquivada: false,
};

export const labels = {
  arquivada: "Arquivada",
  atingida: "Atingida",
  prazo_encerrado: "Prazo encerrado",
  em_andamento: "Em andamento",
};
export const numero = (value: string | number) =>
  Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
