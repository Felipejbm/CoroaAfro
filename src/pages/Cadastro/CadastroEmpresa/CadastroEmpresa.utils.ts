import type { Campo, CompanyFormData, FieldDef, Formulario } from "./CadastroEmpresa.types";

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

export const inicial: Formulario = {
    nome: "",
    nome_fantasia: "",
    data_fundacao: "",
    cnpj: "",
    segmento: "",
    porte: "",
    num_funcionarios: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
};

export const negocio: Campo[] = [
    { campo: "nome", label: "Nome da empresa", max: 150 },
    {
        campo: "nome_fantasia",
        label: "Nome fantasia (opcional)",
        opcional: true,
        max: 150,
    },
    { campo: "data_fundacao", label: "Data de fundação", tipo: "date" },
    { campo: "cnpj", label: "CNPJ (opcional)", opcional: true, max: 18 },
    { campo: "segmento", label: "Nicho principal" },
    { campo: "porte", label: "Porte / enquadramento informado" },
    {
        campo: "num_funcionarios",
        label: "Número de funcionários",
        tipo: "number",
    },
];

export const endereco: Campo[] = [
    { campo: "rua", label: "Rua / logradouro", max: 150 },
    { campo: "numero", label: "Número (ou S/N)", max: 20 },
    {
        campo: "complemento",
        label: "Complemento (opcional)",
        opcional: true,
        max: 100,
    },
    { campo: "bairro", label: "Bairro", max: 100 },
    { campo: "cidade", label: "Cidade", max: 100 },
    { campo: "estado", label: "Estado (UF)" },
    { campo: "cep", label: "CEP (opcional)", opcional: true, max: 9 },
];
