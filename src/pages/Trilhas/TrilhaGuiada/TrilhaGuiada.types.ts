export type Status = "concluido" | "progresso";

export interface Module {
    number: string;
    title: string;
    description: string;
    status: Status;
    icon: React.ReactNode;
    align: "left" | "right";
}