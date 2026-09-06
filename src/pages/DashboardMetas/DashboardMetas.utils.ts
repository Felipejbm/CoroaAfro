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

export const unidadesMeta = [
  { value: "seguidores", label: "Seguidores" },
  { value: "vendas", label: "Vendas" },
  { value: "clientes", label: "Clientes" },
  { value: "publicações", label: "Publicações" },
  { value: "unidades", label: "Unidades" },
  { value: "%", label: "Percentual (%)" },
  { value: "R$", label: "Dinheiro (R$)" },
] as const;

export function valorNumerico(value: string) {
  const cleaned = value.replace(/[^\d,.-]/g, "");
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  return Number(normalized);
}

export function formatarEntradaNumerica(value: string, dinheiro = false) {
  const cleaned = value.replace(/[^\d,.-]/g, "");
  if (!cleaned) return "";
  if (!dinheiro) {
    const [integer, decimals] = cleaned.replace(",", ".").split(".");
    return `${integer || "0"}${decimals === undefined ? "" : `.${decimals.slice(0, 2)}`}`;
  }

  export function formatarValorEntrada(value: string | number, dinheiro = false) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "";
    return dinheiro
      ? number.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })
      : String(value);
  }
  const digits = cleaned.replace(/\D/g, "");
  if (!digits) return "";
  const number = Number(digits) / 100;
  const formatted = number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return dinheiro ? `R$ ${formatted}` : formatted;
}

export function formatarValorMeta(value: string | number, unidade: string) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return number.toLocaleString("pt-BR", {
    style: unidade === "R$" ? "currency" : "decimal",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export const labels = {
  arquivada: "Arquivada",
  atingida: "Atingida",
  prazo_encerrado: "Prazo encerrado",
  em_andamento: "Em andamento",
};
export const numero = (value: string | number) =>
  Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
