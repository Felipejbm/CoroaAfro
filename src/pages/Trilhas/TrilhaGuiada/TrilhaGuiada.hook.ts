import { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../../styles/theme";
import type { AbaTrilha, ModuleCardProps } from "./TrilhaGuiada.types";
import { statusConfig } from "./TrilhaGuiada.utils";

export function useModuleCard({ module }: ModuleCardProps) {
  const { number, title, description, status, icon } = module;

  const config = statusConfig[status];

  const statusColor =
    status === "concluido"
      ? theme.palette.primary.main
      : theme.palette.primary.light;

  return { number, title, description, icon, config, statusColor };
}

export function useTrilhaGuiada() {
  const [tab, setTab] = useState<AbaTrilha>("guiada");

  const navigate = useNavigate();

  return { tab, setTab, navigate };
}
