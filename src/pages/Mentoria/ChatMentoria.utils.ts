import axios from "axios";
import {
  type Mensagem
} from "../../services/Auth/controllers/chat";

export const semAcesso = (err: unknown) =>
  axios.isAxiosError(err) &&
  [401, 403, 404].includes(err.response?.status ?? 0);

export const juntar = (antes: Mensagem[], novas: Mensagem[]) =>
  Array.from(new Map([...antes, ...novas].map((m) => [m.id, m])).values()).sort(
    (a, b) => a.id - b.id,
  );

export const horario = (data: string) =>
  new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
