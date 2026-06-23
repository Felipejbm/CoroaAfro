import type { Developer, FooterLink, SocialLink } from "./FooterLandPage.types";

export const developers: Developer[] = [
    { name: "Allyson Rocha Dos Santos" },
    { name: "Daniel Diogo de Souza" },
    { name: "Felipe José Borges de Mello" },
    { name: "Gabriel Palozi Gonçalves" },
    { name: "Ízan Rios" },
];

export const aboutLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Planos", href: "/planos" },
    { label: "Equipe", href: "/equipe" },
    { label: "Login", href: "/login" },
];

export const socialLinks: SocialLink[] = [
    { icon: "github", href: "https://github.com/" },
    { icon: "instagram", href: "https://instagram.com/" },
];

export const currentYear = new Date().getFullYear();
