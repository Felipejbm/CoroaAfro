import type { MetaEntrada } from "../services/Auth/controllers/metas";
export const unidadesMeta = [
  { value: "seguidores", label: "Seguidores" },
  { value: "vendas", label: "Vendas" },
  { value: "clientes", label: "Clientes" },
  { value: "publicações", label: "Publicações" },
  { value: "unidades", label: "Unidades" },
  { value: "%", label: "Taxa ou proporção (0 a 100%)" },
  { value: "R$", label: "Dinheiro (R$)" },
] as const;

// Entradas seguem pt-BR: vírgula decimal e ponto de milhar.
export function valorNumerico(value: string) {
  const texto = value.trim().replace(/^R\$\s*/, "").replace(/\s/g, "");
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(texto)) return NaN;
  return Number(texto.replace(/\./g, "").replace(",", "."));
}

export function formatarValorEntrada(value: string | number, dinheiro = false) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return number.toLocaleString("pt-BR", { minimumFractionDigits: dinheiro ? 2 : 0, maximumFractionDigits: 2 });
}

export function formatarValorMeta(value: string | number, unidade: string) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  const formatted = number.toLocaleString("pt-BR", unidade === "R$"
    ? { style: "currency", currency: "BRL" }
    : { maximumFractionDigits: 2 });
  return unidade === "%" ? `${formatted}%` : formatted;
}

export function erroValorMeta(value: string, unidade: string) {
  const number = valorNumerico(value);
  if (!value.trim()) return "Informe um valor.";
  if (!Number.isFinite(number)) return "Use números, com vírgula para os centavos/decimais.";
  if (number < 0 || number > 999999999999.99) return "Informe um valor entre 0 e 999.999.999.999,99.";
  if (unidade === "%" && number > 100) return "O percentual deve ficar entre 0 e 100.";
  if (!["R$", "%"].includes(unidade) && !Number.isInteger(number)) return "Esta medida aceita apenas números inteiros.";
  return "";
}

export function errosMeta(form: MetaEntrada) {
  const erros: Partial<Record<keyof MetaEntrada, string>> = {};
  if (!form.titulo.trim()) erros.titulo = "Dê um título à meta.";
  if (form.tipo === "manual" && !unidadesMeta.some(u => u.value === form.unidade)) erros.unidade = "Selecione uma medida da lista.";
  if (form.tipo === "instagram" && !form.metrica) erros.metrica = "Selecione uma métrica do Instagram.";
  for (const field of (form.tipo === "instagram" ? ["valor_alvo"] : ["valor_inicial", "valor_atual", "valor_alvo"]) as ("valor_inicial" | "valor_atual" | "valor_alvo")[]) {
    const erro = erroValorMeta(form[field], form.unidade);
    if (erro) erros[field] = erro;
  }
  if (form.tipo === "manual" && !erros.valor_alvo && !erros.valor_inicial && valorNumerico(form.valor_alvo) <= valorNumerico(form.valor_inicial))
    erros.valor_alvo = "O alvo deve ser maior que o valor inicial.";
  if (form.prazo && (!/^\d{4}-\d{2}-\d{2}$/.test(form.prazo) || !Number.isFinite(Date.parse(form.prazo)) || new Date(form.prazo).toISOString().slice(0, 10) !== form.prazo))
    erros.prazo = "Escolha uma data válida.";
  return erros;
}

