export type Level = "Iniciante" | "Intermediário" | "Avançado";

export interface ModuleOption {
    id: string;
    icon: string;
    title: string;
    lessons: number;
    duration: string;
    level: Level;
}