import api from "../../../api/axios"
import axios from "axios";

import type { LoginReq } from "../schema/authSchema";

class RespostaAutenticacaoInvalida extends Error {}

let sessaoAtual: SessaoUsuario | null = null;
const ouvintesSessao = new Set<() => void>();
export const obterSessaoAtual = () => sessaoAtual;
export const observarSessao = (ouvinte: () => void) => {
    ouvintesSessao.add(ouvinte);
    return () => { ouvintesSessao.delete(ouvinte); };
};

export function atualizarSessao(usuario: SessaoUsuario | null) {
    sessaoAtual = usuario;
    if (usuario) {
        const normalizado = usuario.papel === "mentor"
            ? { ...usuario, id_mentor: usuario.id }
            : { ...usuario, id_empreendedor: usuario.id };
        localStorage.setItem("empreendedor", JSON.stringify(normalizado));
    } else {
        localStorage.removeItem("empreendedor");
    }
    ouvintesSessao.forEach(ouvinte => ouvinte());
}

export async function login(data: LoginReq) {
    const resp = await api.post("auth/login", data)
    await buscarSessao();

    return resp.data
}

export async function logout() {
    await api.post("/auth/logout");
    atualizarSessao(null);
}

export interface SessaoUsuario {
    papel: "empreendedor" | "mentor";
    id: number;
    nome: string;
    email: string;
    telefone: string;
    data_cadastro: string;
    foto_perfil_url?: string | null;
}

export async function buscarSessao(): Promise<SessaoUsuario> {
    const response = await api.get<SessaoUsuario>("/auth/me");
    const usuario = response.data;
    if (!usuario || typeof usuario.id !== "number" || !usuario.nome ||
        !usuario.email || !["mentor", "empreendedor"].includes(usuario.papel)) {
        throw new RespostaAutenticacaoInvalida("O servidor retornou dados de sessão inválidos. Não foi possível confirmar sua conta.");
    }
    const usuarioNormalizado = usuario.papel === "mentor"
        ? { ...usuario, id_mentor: usuario.id }
        : { ...usuario, id_empreendedor: usuario.id };
    atualizarSessao(usuarioNormalizado);
    return usuarioNormalizado;
}

export function getUsuarioLogado() {
    const usuario = localStorage.getItem("empreendedor")

    if (!usuario) {
        return null
    }

    return JSON.parse(usuario)
}

export function mensagemErroLogin(error: unknown) {
    if (error instanceof RespostaAutenticacaoInvalida) return error.message;
    if (axios.isAxiosError<{ detail?: string }>(error)) {
        if (!error.response) {
            return "Não foi possível conectar ao servidor. Verifique sua conexão e se o backend está ligado.";
        }
        if (error.response?.status === 404) {
            return "Não encontramos uma conta com esse e-mail.";
        }
        if (error.response?.status === 401) {
            return "E-mail ou senha incorretos. Tente novamente.";
        }
        return error.response?.data?.detail ?? "Não foi possível entrar agora.";
    }
    return "Não foi possível concluir o login no navegador. Tente novamente.";
}
