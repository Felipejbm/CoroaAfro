import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCriarTrilhaPersonalizada2() {
  const [selected, setSelected] = useState<string[]>(["vendas"]);

  const toggleObjective = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const navigate = useNavigate();

  return { selected, toggleObjective, navigate };
}
