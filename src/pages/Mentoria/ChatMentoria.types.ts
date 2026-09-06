import {
  type Conversa,
  type Rascunho
} from "../../services/Auth/controllers/chat";

export type HistoricoConversaProps = {
  conversa: Conversa;
  rascunho: Rascunho;
  onRascunho: (r: Rascunho) => void;
  onBusy: (busy: boolean) => void;
};

export type ChatMentoriaProps = { mentor?: boolean };
