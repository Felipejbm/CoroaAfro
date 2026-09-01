import api from "../../../api/axios"
import axios from "axios";

import type { LoginReq } from "../schema/authSchema";

export async function login(data: LoginReq) {
    const resp = await api.post("auth/login", data)

    const empreendedor = resp.data.Usuario ?? resp.data.Empreendedor;
    if (!empreendedor?.id || !empreendedor?.nome || !empreendedor?.email) {
        throw new Error("Resposta de login inválida");
    }

    localStorage.setItem(
        "empreendedor",
        JSON.stringify(empreendedor)
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
