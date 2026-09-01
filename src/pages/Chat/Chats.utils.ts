import type { Conversation, Message } from "./Chat.types";

export const onlineNow: Conversation[] = [
    { id: "1", name: "Karla Lima", initials: "KL", lastMessage: "Boa! Você conseguiu aplicar...", time: "14:32", unread: 2, color: "#8a3fae", online: true },
    { id: "2", name: "Mentora Beatriz", initials: "MB", lastMessage: "Viu os resultados da semana?", time: "13:18", color: "#c4621f", online: true },
    { id: "3", name: "Grupo Reels", initials: "GR", lastMessage: "Ana: Qual câmera vocês usam?", time: "11:45", unread: 7, color: "#c43f5a", online: true },
];

export const recents: Conversation[] = [
    { id: "4", name: "Tutoria de Setembro", initials: "TS", lastMessage: "Lembre de enviar o relatório", time: "Ontem", color: "#1f9aa3" },
    { id: "5", name: "Paula Fonseca", initials: "PF", lastMessage: "Obrigada pelo feedback! 🙏", time: "Seg", color: "#7a8a3f" },
    { id: "6", name: "Renata Costa", initials: "RC", lastMessage: "Quando abre nova turma?", time: "Dom", color: "#a35a1f" },
    { id: "7", name: "Módulo Conteúdo", initials: "MC", lastMessage: "Novo material disponível", time: "Sáb", color: "#c43f3f" },
];

export const messages: Message[] = [
    { id: "1", fromMe: false, text: "Oi Dandara! Queria te perguntar sobre a estratégia de conteúdo que você usou pro café. Ficou incrível o resultado!", time: "14:10" },
    { id: "2", fromMe: true, text: "Oi Karla! Fico feliz que tenha gostado 😊 Basicamente segui a trilha do módulo de Reels aqui da plataforma", time: "14:15" },
    { id: "3", fromMe: true, text: "Fiz um calendário de postagens com base no que aprendi e fui consistente por 3 semanas. O engajamento subiu 41%!", time: "14:16" },
    { id: "4", fromMe: false, text: "Nossa, que resultado! Você usou alguma ferramenta específica pra montar o calendário?", time: "14:20" },
    {
        id: "5",
        fromMe: true,
        text: "Sim! Olha esse material que a mentora Beatriz compartilhou na comunidade 👇",
        time: "14:23",
        highlight: {
            tag: "✓ Recurso da Trilha",
            title: "Calendário Editorial 30 Dias",
            subtitle: "Template completo para planejar conteúdo de redes sociais com foco em engajamento e conversão.",
        },
    },
    { id: "6", fromMe: false, text: "Perfeito! Vou baixar agora 🙌 Você conseguiu aplicar também as dicas de copy nas legendas?", time: "14:28" },
    { id: "7", fromMe: true, text: "Sim! Boa! Você conseguiu aplicar o módulo de copy também? A técnica do AIDA funciona muito bem pra café artesanal ✨", time: "14:32" },
];