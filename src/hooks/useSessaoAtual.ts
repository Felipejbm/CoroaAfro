import { useSyncExternalStore } from "react";
import { obterSessaoAtual, observarSessao } from "../services/Auth/controllers/auth";

export function useSessaoAtual() {
  return useSyncExternalStore(observarSessao, obterSessaoAtual);
}
