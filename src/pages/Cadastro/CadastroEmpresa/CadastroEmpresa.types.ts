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