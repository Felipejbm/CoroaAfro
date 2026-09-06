import type { Developer, Adm, FooterLink, SocialLink } from "./FooterLandPage.types";

export const developers: Developer[] = [
    { name: "Allyson Rocha Dos Santos", href: "https://github.com/AllysonHub" },
    { name: "Daniel Diogo de Souza", href: "https://github.com/DanielDiogo98" },
    { name: "Felipe José Borges de Mello", href: "https://github.com/Felipejbm" },
    { name: "Gabriel Palozi Gonçalves", href: "https://github.com/Gabrielpalozi778" },
    { name: "Ízan Rios", href: "https://github.com/IzanRios" },
];

export const administration: Adm[] = [
    { name: "Giovanna de Souza Antero Lopes", href: "https://www.instagram.com/llopexs.g/" },
    { name: "Danielly Cristina Barbosa dos Anjos Dias", href: "https://www.instagram.com/dany_bdx/" },
    { name: "Emilio Giarola Lopez", href: "https://www.instagram.com/lopez.pzz/" },
    { name: "Beatriz de Moraes Bertoldo", href: "https://www.instagram.com/biabertoldo.m/" },
];

export const aboutLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Planos", href: "/planos" },
    { label: "Equipe", href: "/equipe" },
    { label: "Login", href: "/login" },
];

export const socialLinks: SocialLink[] = [
    { icon: "github", href: "https://github.com/Felipejbm/CoroaAfro" },
    { icon: "instagram", href: "https://www.instagram.com/coroafro.mcm/" },
];

export const currentYear = new Date().getFullYear();
