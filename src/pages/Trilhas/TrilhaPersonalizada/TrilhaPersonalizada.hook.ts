import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AbaTrilha } from "./TrilhaPersonalizada.types";

export function useTrilhaPersonalizada() {
  const [tab, setTab] = useState<AbaTrilha>("personalizada");

  const navigate = useNavigate();

  return { tab, setTab, navigate };
}
