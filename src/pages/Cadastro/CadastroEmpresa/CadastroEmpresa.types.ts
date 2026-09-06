import type { DadosEmpresa } from "../../../services/Auth/controllers/empresa";

export interface CompanyFormData {
    nomeEmpresa: string;
    dataFundacao: string;
    cnpj: string;
    ramoAtividade: string;
    endereco: string;
    porte: string;
    numeroFuncionarios: string;
}

export type FieldDef = { label: string; field: keyof CompanyFormData; type?: string } | null;

export type Formulario = Omit<DadosEmpresa, "num_funcionarios"> & {
    num_funcionarios: string;
};

export type Campo = {
    campo: keyof Formulario;
    label: string;
    opcional?: boolean;
    max?: number;
    tipo?: string;
};