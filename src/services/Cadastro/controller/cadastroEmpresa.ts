import { salvarEmpresa } from "../../Auth/controllers/empresa";
import type { CriarEmpresaReq } from "../schema/cadastroEmpresa";

export async function cadastrarEmpresa(req: CriarEmpresaReq) {
    return salvarEmpresa(req);
}

export const cadastrpEmpresa = cadastrarEmpresa;
