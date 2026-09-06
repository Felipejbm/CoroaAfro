import { useNavigate } from "react-router-dom";

export function useCriarAtividades() {
  const navigate = useNavigate();

  return { navigate };
}
