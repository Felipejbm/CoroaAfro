import api from "../../../api/axios";
import type { CriarEmpreendedorReq } from "../schema/cadastroEmpreendedor.Schema";

export async function cadastroEmpreendedor(req: CriarEmpreendedorReq) {
    const resp = await api.post("/criar-empreendedor", req)

    return resp.data
}