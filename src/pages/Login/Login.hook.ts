import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, mensagemErroLogin } from "../../services/Auth/controllers/auth";
import { buscarMinhaEmpresa } from "../../services/Auth/controllers/empresa";
import type { PapelLogin } from "./Login.types";

export function useLogin() {
  const [email, setEmail] = useState("");

  const [papel, setPapel] = useState<PapelLogin>("empreendedor");

  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleLogin(event?: React.FormEvent) {
    event?.preventDefault();
    setError(null);

    if (!email.trim() || !senha) {
      setError("Preencha o e-mail e a senha para entrar.");
      return;
    }

    setLoading(true);
    try {
      await login({
        email: email.trim(),
        senha,
        papel,
      });

      if (papel === "mentor") {
        navigate("/dashboard-mentor", { replace: true });
        return;
      }
      const empresa = await buscarMinhaEmpresa();
      navigate(empresa ? "/dashboard-metas" : "/cadastro-empresa", {
        replace: true,
      });
    } catch (requestError) {
      setError(mensagemErroLogin(requestError));
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, papel, setPapel, senha, setSenha, loading, error, setError, handleLogin };
}
