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
        name: "Básico",
        price: "49",
        cents: "90",
        features: [
            "Conteúdo teórico e conceitual",
            "Sessões de mentoria em grupo",
            "Dicas e orientações gerais",
            "Material genérico de apoio",
        ],
        cta: "Começar agora",
        highlighted: false,
    },
    {
        name: "Intermediário",
        price: "99",
        cents: "90",
        features: [
            "Tudo do plano Básico",
            "Acompanhamento monitorado pela equipe",
            "Análise detalhada do seu progresso",
            "Feedback personalizado da empresa",
        ],
        cta: "Assinar agora",
        highlighted: true,
        badge: "Mais popular",
    },
    {
        name: "Premium",
        price: "199",
        cents: "90",
        features: [
            "Tudo do plano Intermediário",
            "Acesso completo à IA sem limitações",
            "Recursos avançados e exclusivos de IA",
            "Suporte prioritário 24h",
        ],
        cta: "Assinar Premium",
        highlighted: false,
    },
];

