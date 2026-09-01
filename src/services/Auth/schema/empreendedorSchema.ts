export interface EmpreendedorCreate {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  data_cadastro: string;
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
