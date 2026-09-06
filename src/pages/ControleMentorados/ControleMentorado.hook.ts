import { useNavigate } from "react-router-dom";

export function useControleMentorados() {
  const navigate = useNavigate();

  return { navigate };
}
