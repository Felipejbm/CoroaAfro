import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCriarTrilhaPersonalizada3() {
  const [selected, setSelected] = useState<string[]>(["fotografia", "reels"]);

  const toggleModule = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const navigate = useNavigate()

  return { selected, toggleModule, navigate };
}
