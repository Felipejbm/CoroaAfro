export interface ModuleItem {
  title: string;
  content: string;
  avatar?: string;
}

export type ModuleCardProps = { module: ModuleItem };

export type AbaTrilha = "guiada" | "personalizada";
