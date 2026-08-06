import api from "../../api/axios"
import type { LoginReq } from "../schema/authSchema";

export async function login(data: LoginReq) {
    const resp = await api.post("/login", data)

    const empreendedor = resp.data.Empreendedor;

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