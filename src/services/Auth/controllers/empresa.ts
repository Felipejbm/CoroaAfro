import axios from "axios";
import api from "../../api/axios";

export interface DadosEmpresa {
  nome: string;
  nome_fantasia: string;
  data_fundacao: string;
  cnpj: string;
  segmento: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  porte: string;
  num_funcionarios: number;
}

export interface Empresa extends Omit<DadosEmpresa, "data_fundacao" | "num_funcionarios"> {
  id_empresa: number;
  data_fundacao: string | null;
  num_funcionarios: number | null;
  endereco: string;
  endereco_legado: string;
  segmento_label: string;
  porte_label: string;
}

export interface OpcoesEmpresa {
  nichos: { valor: string; label: string }[];
  portes: { valor: string; label: string }[];
  estados: string[];
}
export async function buscarOpcoesEmpresa(): Promise<OpcoesEmpresa> {
  return (await api.get<OpcoesEmpresa>("/empresa/opcoes")).data;
}

export async function buscarMinhaEmpresa(): Promise<Empresa | null> {
  try {
    return (await api.get<Empresa>("/empresa/minha")).data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

export async function salvarEmpresa(data: DadosEmpresa, id?: number): Promise<Empresa> {
  if (id) return (await api.patch<Empresa>(`/empresa/${id}`, data)).data;
  return (await api.post<{ Empresa: Empresa }>("/empresa/criar-empresa", data)).data.Empresa;
}

export function mensagemErroApi(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) return "Sua sessão expirou. Entre novamente.";
    const detail: unknown = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail.map((item: { loc?: string[]; msg?: string }) =>
        `${item.loc?.at(-1) ?? "Campo"}: ${item.msg ?? "valor inválido"}`).join(" ");
    }
    if (!error.response) return "Não foi possível acessar o backend. Confira se ele está ligado.";
  }
  return "Não foi possível concluir. Tente novamente.";
}
