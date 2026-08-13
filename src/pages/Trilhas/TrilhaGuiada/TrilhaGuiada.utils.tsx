import type { Module, Status } from "./TrilhaGuiada.types";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const statusConfig: Record<Status, { label: string; color: string }> = {
  concluido: { label: "✓ Concluído", color: "#3ddc97" },
  progresso: { label: "▶ Em progresso", color: "#f2b705" },
};

export const modules: Module[] = [
  {
    number: "Módulo 01",
    title: "Identidade Visual",
    description: "Tudo que sua empresa precisa para ser lembrada!",
    status: "concluido",
    icon: <EmailIcon sx={{ fontSize: 18, color: "#2b2b2b" }} />,
    align: "left",  
  },
  {
    number: "Módulo 02",
    title: "Posicionamento de Marca",
    description:
      "Como fazer sua empresa ocupar um espaço único na mente dos clientes.",
    status: "concluido",
    icon: <BarChartIcon sx={{ fontSize: 18, color: "#2b2b2b" }} />,
    align: "right",
  },
  {
    number: "Módulo 03",
    title: "Público-Alvo",
    description:
      "Descubra quem realmente compra de você e como se comunicar melhor.",
    status: "concluido",
    icon: <GroupsIcon sx={{ fontSize: 18, color: "#2b2b2b" }} />,
    align: "left",
  },
  {
    number: "Módulo 04",
    title: "Redes Sociais",
    description: "Transforme seguidores em oportunidades de negócio.",
    status: "progresso",
    icon: <TrendingUpIcon sx={{ fontSize: 18, color: "#2b2b2b" }} />,
    align: "right",
  },
];
