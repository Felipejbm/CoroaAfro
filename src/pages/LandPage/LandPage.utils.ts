import { type Plan } from "./LandPage.types";

export const items = [
    "Valorização de empreendedores afro",
    "Representatividade",
    "Acesso ao conhecimento",
];

export const testimonials = [
    {
        name: "Cláudia",
        role: "Empresa Y",
        photo: "/avatars/claudia.jpg",
        text:
            "Excelente atendimento e profissionais muito preparados! O trabalho foi impecável, com muita dedicação e qualidade. As aulas foram claras, dinâmicas e realmente ajudaram muito no aprendizado. Recomendo demais!",
    },
    {
        name: "Cláudia",
        role: "Empresa Y",
        photo: "/avatars/claudia.jpg",
        text:
            "Ótima experiência! Profissionais atenciosos, serviço de alta qualidade e aulas muito bem explicadas. Tudo foi feito com cuidado e dedicação, trazendo confiança e excelentes resultados. Super recomendo!",
    },
    {
        name: "Roberta",
        role: "Empresa Z",
        photo: "/avatars/roberta.jpg",
        text:
            "Profissionais extremamente capacitados e atenciosos. O resultado superou minhas expectativas, e o suporte durante todo o processo foi excelente. Recomendo de olhos fechados!",
    },
    {
        name: "Marcos Silva",
        role: "Empresa Alpha",
        photo: "/avatars/marcos.jpg",
        text:
            "Atendimento impecável do início ao fim. A equipe demonstrou muito conhecimento e entregou exatamente o que eu precisava, com agilidade e qualidade acima do esperado. Experiência excelente!",
    },
    {
        name: "Juliana Costa",
        role: "Empresa Beta",
        photo: "/avatars/juliana.jpg",
        text:
            "Fiquei impressionada com a atenção aos detalhes e o cuidado em cada etapa do processo. O suporte foi sempre rápido e eficiente, e o resultado final superou totalmente minhas expectativas!",
    },
];


export const plans: Plan[] = [
    {
        name: "PLANO BÁSICO - BRONZE ",
        price: "450",
        cents: "00",
        features: [
            "Produção de conteúdo 5 posts por mês",
            "Relatório mensal",
            "Curso online (1x por semana)",
        ],
        cta: "Começar agora",
        highlighted: false,
    },
    {
        name: "PLANO PROFISSIONAL - PRATA",
        price: "750",
        cents: "00",
        features: [
            "Produção de conteúdo - 10 posts por mês",
            "Calendário de conteúdo",
            "Relatório mensal",
            "Curso online (2x por semana)",
        ],
        cta: "Assinar agora",
        highlighted: true,
        badge: "Mais popular",
    },
    {
        name: "Plano Completo - Ouro",
        price: "1.200",
        cents: "00",
        features: [
            "Produção de conteúdo - 15 posts por mês",
            "Calendário de conteúdo",
            "Relatório mensal",
            "Curso online (3x por semana)",
            "1 workshop online"
        ],
        cta: "Assinar Premium",
        highlighted: false,
    },
];


