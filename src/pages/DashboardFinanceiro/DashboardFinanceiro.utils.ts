import type { MetricCard, ProgressItem } from "./DashboardFinanceiro.types";

export const metricCards: MetricCard[] = [
    { label: "Faturamento Gerado", value: "$ 28.400,00" },
    { label: "ROI", value: "4.5x" },
    { label: "CAC", value: "R$ 120,00", note: "-5% este mês", noteColor: "#4ade80" },
];

export const weeklyAnalysis: ProgressItem[] = [
    { label: "Engajamento", value: 90 },
    { label: "Crescimento do Perfil", value: 63 },
    { label: "", value: 65 },
];

export const monthlyGoals: ProgressItem[] = [
    { label: "Engajamento", value: 90 },
    { label: "Crescimento do Perfil", value: 82 },
    { label: "", value: 65 },
];

export const chartData = [
    { day: 1, vendas: 30, whatsapp: 15 },
    { day: 2, vendas: 33, whatsapp: 16 },
    { day: 3, vendas: 36, whatsapp: 17 },
    { day: 4, vendas: 40, whatsapp: 18 },
    { day: 5, vendas: 44, whatsapp: 20 },
    { day: 6, vendas: 48, whatsapp: 22 },
    { day: 7, vendas: 53, whatsapp: 24 },
    { day: 8, vendas: 58, whatsapp: 26 },
    { day: 9, vendas: 63, whatsapp: 27 },
    { day: 10, vendas: 68, whatsapp: 28 },
];