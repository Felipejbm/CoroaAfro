import type { ReactNode } from "react";

export interface ModalHeaderProps {
  id?: string;
  titulo: ReactNode;
  descricao: string;
  categoria: string;
  icone: ReactNode;
  onClose?: () => void;
  ocupado?: boolean;
}
