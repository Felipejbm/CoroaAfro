export interface EmpreendedorCreate {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  data_cadastro: string;
  data_nascimento?: string | null;
  cpf?: string | null;
  genero?: string | null;
}

export interface EmpreendedorResponse {
  Msg: string;
  Empreendedor: {
    id_empreendedor: number;
    nome: string;
    email: string;
    telefone: string;
  };
}

export interface CadastroSocialPendente {
  provider: "google" | "linkedin";
  nome: string;
  email: string;
}

export interface ConcluirCadastroSocial {
  telefone: string;
  cpf?: string | null;
  genero?: string | null;
  data_nascimento?: string | null;
}
