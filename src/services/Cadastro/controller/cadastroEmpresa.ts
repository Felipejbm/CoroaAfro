import api from "../../../api/axios";
import type { CriarEmpresaReq } from "../schema/cadastroEmpresa";

export async function cadastrpEmpresa(req: CriarEmpresaReq) {
    const resp = await api.post('/criar-empresa', req)

    return resp.data
}