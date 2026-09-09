export const servicos = [
  { id: "identidade-visual", nome: "Criação de Identidade Visual", preco: 150, categoria: "Marca e conteúdo" },
  { id: "site-simples", nome: "Desenvolvimento de Sites - Simples", preco: 2000, categoria: "Sites" },
  { id: "analise-de-dados", nome: "Análise de Dados", preco: 50, categoria: "Consultoria e aprendizado" },
  { id: "consultoria-individual", nome: "Consultoria Individual", preco: 150, categoria: "Consultoria e aprendizado" },
  { id: "workshop-presencial", nome: "Workshop Presencial", preco: 4500, categoria: "Consultoria e aprendizado" },
  { id: "workshop-online", nome: "Workshop Online", preco: 150, categoria: "Consultoria e aprendizado" },
  { id: "curso-online", nome: "Curso Online", preco: 170, categoria: "Consultoria e aprendizado" },
  { id: "site-institucional", nome: "Desenvolvimento de Sites - Institucional", preco: 9000, categoria: "Sites" },
  { id: "manutencao-landing-page", nome: "Manutenção de Landing Page Simples", preco: 50, categoria: "Sites" },
  { id: "conteudo-landing-page", nome: "Adição de conteúdo de Landing Page", preco: 75, categoria: "Sites" },
  { id: "producao-de-conteudo", nome: "Produção de Conteúdo", preco: 250, categoria: "Marca e conteúdo" },
];
export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
