import type { CompanyFormData, FieldDef } from "./CadastroEmpresa.types";

export const initialFormData: CompanyFormData = {
    nomeEmpresa: "",
    dataFundacao: "",
    cnpj: "",
    ramoAtividade: "",
    endereco: "",
    porte: "",
    numeroFuncionarios: "",
};

export const fieldRows: FieldDef[][] = [
    [
        { label: "Nome da empresa:", field: "nomeEmpresa" },
        { label: "Data de fundação:", field: "dataFundacao", type: "date" },
    ],
    [
        { label: "CNPJ (Opcional):", field: "cnpj" },
        { label: "Ramo de atividade:", field: "ramoAtividade" },
    ],
    [
        { label: "Endereço:", field: "endereco" },
        { label: "Porte da empresa (MEI, ME, EPP etc.)", field: "porte" },
    ],
    [{ label: "Número de funcionários:", field: "numeroFuncionarios" }, null],
];