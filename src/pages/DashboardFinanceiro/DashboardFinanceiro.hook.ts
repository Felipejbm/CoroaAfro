import { useNavigate } from "react-router-dom";

export function useDashboardFinanceiro() {
  const navigate = useNavigate();

  return { navigate };
}
