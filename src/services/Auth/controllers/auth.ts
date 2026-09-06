import api from "../../../api/axios"
import axios from "axios";

import type { LoginReq } from "../schema/authSchema";

export async function login(data: LoginReq) {
    const resp = await api.post("auth/login", data)

    const usuario = resp.data.Usuario ?? resp.data.Empreendedor;
    const id = usuario?.id ?? usuario?.id_empreendedor ?? usuario?.id_mentor;

    if (!id || !usuario?.nome || !usuario?.email) {
        throw new Error("Resposta de login inválida");
    }

    const usuarioNormalizado = data.papel === "mentor"
        ? { ...usuario, id, id_mentor: id, papel: "mentor" }
        : { ...usuario, id, id_empreendedor: id, papel: "empreendedor" };

    localStorage.setItem(
        "empreendedor",
        JSON.stringify(usuarioNormalizado)
    );

    return resp.data
}

export async function logout() {
    await api.post("/auth/logout");
    localStorage.removeItem("empreendedor")
}

export interface SessaoUsuario {
    papel: "empreendedor" | "mentor";
    id: number;
    nome: string;
    email: string;
    telefone: string;
    data_cadastro: string;
}

export async function buscarSessao(): Promise<SessaoUsuario> {
    const response = await api.get<SessaoUsuario>("/auth/me");
    localStorage.setItem("empreendedor", JSON.stringify(response.data));
    return response.data;
}

export function getUsuarioLogado() {
    const usuario = localStorage.getItem("empreendedor")

    if (!usuario) {
        return null
    }

    return JSON.parse(usuario)
}

export function mensagemErroLogin(error: unknown) {
    if (axios.isAxiosError<{ detail?: string }>(error)) {
        if (error.response?.status === 404) {
            return "Não encontramos uma conta com esse e-mail.";
        }
        if (error.response?.status === 401) {
            return "E-mail ou senha incorretos. Tente novamente.";
        }
        return error.response?.data?.detail ?? "Não foi possível entrar agora.";
    }
    return "Não foi possível entrar agora. Verifique se o backend está ligado.";
}
