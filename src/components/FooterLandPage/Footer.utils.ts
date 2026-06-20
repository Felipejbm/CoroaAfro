import type { Developer, FooterLink, SocialLink } from "./FooterLandPage.types";

export const developers: Developer[] = [
    { name: "Allyson Rocha Dos Santos" },
    { name: "Daniel Diogo de Souza" },
    { name: "Felipe José Borges de Mello" },
    { name: "Gabriel Palozi Gonçalves" },
    { name: "Ízan Rios" },
];

export const aboutLinks: FooterLink[] = [
    { label: "Sobre", href: "#sobre" },
    { label: "Atualizações", href: "#atualizacoes" },
    { label: "Conheça os Integrantes", href: "#integrantes" },
    { label: "Politica de Privacidade", href: "#privacidade" },
    { label: "Mídias", href: "#midias" },
];

export const socialLinks: SocialLink[] = [
    { icon: "github", href: "https://github.com/" },
    { icon: "instagram", href: "https://instagram.com/" },
];

export const currentYear = new Date().getFullYear();
