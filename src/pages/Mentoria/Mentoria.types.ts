export interface Mentorado {
  id: number;
  nome: string;
  empresa: string | null;
}

export type MentoriaProps = {
  painel?: boolean;
  detalhe?: boolean;
};
