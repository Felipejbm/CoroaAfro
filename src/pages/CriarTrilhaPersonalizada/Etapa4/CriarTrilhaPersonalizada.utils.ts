import type { Pace } from "./CriarTrilhaPersonalizada.types";

export const paceOptions: { id: Pace; icon: string; title: string; description: string }[] = [
    { id: "Tranquilo", icon: "🐢", title: "Tranquilo", description: "1–2h por semana, no seu tempo" },
    { id: "Moderado", icon: "🏃", title: "Moderado", description: "Por semana, equilíbrio ideal" },
    { id: "Intensivo", icon: "🚀", title: "Intensivo", description: "6h+ por semana, máxima velocidade" },
];

export const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];