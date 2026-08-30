import axios from "axios";
import api from "../../api/axios"
import type { LoginReq } from "../schema/authSchema";

export async function login(data: LoginReq) {
    const resp = await api.post("auth/login", data)

    const empreendedor = resp.data.Empreendedor;
    if (!empreendedor?.id || !empreendedor?.nome || !empreendedor?.email) {
        throw new Error("Resposta de login inválida");
    }

    localStorage.setItem(
        "empreendedor",
        JSON.stringify(empreendedor)
    );

    return resp.data
}

export function logout() {
    localStorage.removeItem("empreendedor")
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
            return "Senha incorreta. Tente novamente.";
        }
        return error.response?.data?.detail ?? "Não foi possível entrar agora.";
    }
    return "Não foi possível entrar agora. Verifique se o backend está ligado.";
}
