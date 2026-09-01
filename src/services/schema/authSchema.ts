export interface LoginReq{
    email: string;
    senha: string;
    papel?: "empreendedor" | "mentor";
}
