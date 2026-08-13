import type { Post } from "./Posts.types";

export const initialPosts: Post[] = [
    {
        id: "1",
        company: "Café Puro Ritual",
        segment: "Alimentos",
        content: "Estamos testando novas estratégias para fidelizar clientes. Alguém já usou programas de pontos digitais?",
        comments: [
            { author: "Padaria Central", text: "Nós usamos QR Code para pontos e aumentou o retorno dos clientes." },
            { author: "Mercado Afim", text: "Criamos cashback simples e funcionou bem." },
        ],
    },
    {
        id: "2",
        company: "TechNova",
        segment: "Serviço de TI",
        content: "Estamos procurando ferramentas gratuitas para gerenciar clientes. O que vocês recomendam?",
        comments: [
            { author: "Design Studio", text: "Testa Notion e Trello." },
            { author: "Loja Move", text: "Usamos Hubspot gratuito." },
        ],
    },
    {
        id: "3",
        company: "Design Studio",
        segment: "Agência Criativa",
        content: "Como vocês conseguem atrair clientes sem investir muito em anúncios?",
        comments: [
            { author: "TechNova", text: "Nosso site e Instagram ajudam bastante." },
            { author: "Café Puro Ritual", text: "Parcerias locais deram muito resultado." },
        ],
    },
];