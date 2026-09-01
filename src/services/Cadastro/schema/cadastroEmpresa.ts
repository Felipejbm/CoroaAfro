export interface CriarEmpresaReq {
    nome: string
    data_fundacao: Date
    cpnj: string
    segmento: string
    endereco: string
    porte: string
    num_funcionarios: number
}