export interface Developer {
    name: string;
}

export interface Adm {
    name: string;
    href: string;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface SocialLink {
    icon: "github" | "instagram";
    href: string;
}
