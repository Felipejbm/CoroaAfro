import type { FormData } from "./CadastroEmpreendedor.types";

export const initialFormData: FormData = {
  nomeCompleto: "",
  dataNascimento: "",
  email: "",
  genero: "",
  senha: "",
  cpf: "",
  telefone: "",
};

export const fieldRows: { label: string; field: keyof FormData; type?: string }[][] = [
  [
    { label: "Nome completo:", field: "nomeCompleto" },
  ],
  [
    { label: "Senha:", field: "senha", type: "password" },
    { label: "Data de nascimento:", field: "dataNascimento", type: "date" },
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

export const generoOptions = [
  "Masculino",
  "Feminino",
  "Prefiro não informar",
];

export function formatCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatTelefone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits.replace(/(\d{1,2})/, "($1");
  if (digits.length <= 6) {
    return digits.replace(/(\d{2})(\d+)/, "($1) $2");
  }
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
