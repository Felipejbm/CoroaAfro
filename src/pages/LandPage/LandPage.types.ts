export interface Testemunhos {
    name: string;
    role: string;
    photo: string;
    text: string;
}

export type PlanCardProps = {
    plan: Plan;
};

export interface Plan {
    name: string;
    price: string;
    cents: string;
    features: string[];
    cta: string;
    highlighted: boolean;
    badge?: string;
}
