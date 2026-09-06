import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pace } from "./CriarTrilhaPersonalizada.types";

export function useCriarTrilhaPersonalizada4() {
  const [pace, setPace] = useState<Pace>("Moderado");

  const [selectedDays, setSelectedDays] = useState<string[]>(["Ter", "Qui"]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const navigate = useNavigate();

  return { pace, setPace, selectedDays, toggleDay, navigate };
}
