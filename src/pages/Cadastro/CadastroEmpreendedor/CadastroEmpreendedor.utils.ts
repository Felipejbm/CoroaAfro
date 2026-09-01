import type { FormData } from "./CadastroEmpreendedor.types";

export const initialFormData: FormData = {
    nomeCompleto: "",
    dataNascimento: "",
    email: "",
    genero: "",
    senha: "",
    cargo: "",
    cpf: "",
    telefone: "",
};

export const fieldRows: { label: string; field: keyof FormData; type?: string }[][] = [
    [
        { label: "Nome completo:", field: "nomeCompleto" },
        { label: "Senha:", field: "senha", type: "password" },
    ],
    [
        { label: "Data de nascimento:", field: "dataNascimento", type: "date" },
        { label: "Cargo na empresa:", field: "cargo" },
    ],
    [
        { label: "E-mail:", field: "email", type: "email" },
        { label: "CPF:", field: "cpf" },
    ],
    [
        { label: "Gênero:", field: "genero" },
        { label: "Telefone/WhatsApp:", field: "telefone" },
    ],
];