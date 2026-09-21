import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buscarSessao, iniciarLoginSocial, login, mensagemErroLogin, type ProvedorSocial } from "../../services/Auth/controllers/auth";
import { buscarMinhaEmpresa } from "../../services/Auth/controllers/empresa";
import type { PapelLogin } from "./Login.types";

export function useLogin() {
  const [email, setEmail] = useState("");

  const [papel, setPapel] = useState<PapelLogin>("empreendedor");

  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const retornoProcessado = useRef(false);

  async function encaminharEmpreendedor() {
    const empresa = await buscarMinhaEmpresa();
    navigate(empresa ? "/dashboard-metas" : "/cadastro-empresa", { replace: true });
  }

  useEffect(() => {
    const resultado = searchParams.get("oauth");
    if (!resultado || retornoProcessado.current) return;
    retornoProcessado.current = true;
    setSearchParams({}, { replace: true });

    if (resultado !== "success") {
      const mensagens: Record<string, string> = {
        cancelled: "O login foi cancelado. Nenhuma alteração foi feita.",
        invalid_state: "A tentativa de login expirou. Tente novamente.",
        account_not_found: "Este e-mail ainda não possui uma conta de empreendedor no Coroa Afro. Cadastre-se primeiro.",
        provider_error: "Não foi possível confirmar sua conta. Tente novamente.",
      };
      setError(mensagens[resultado] ?? "Não foi possível concluir o login social.");
      return;
    }

    setLoading(true);
    buscarSessao()
      .then(encaminharEmpreendedor)
      .catch((requestError) => setError(mensagemErroLogin(requestError)))
      .finally(() => setLoading(false));
  }, [searchParams, setSearchParams]);

  function handleSocialLogin(provedor: ProvedorSocial) {
    setError(null);
    if (papel !== "empreendedor") {
      setError("O login com Google ou LinkedIn está disponível para contas de empreendedor.");
      return;
    }
    setLoading(true);
    iniciarLoginSocial(provedor);
  }

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
      await encaminharEmpreendedor();
    } catch (requestError) {
      setError(mensagemErroLogin(requestError));
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, papel, setPapel, senha, setSenha, loading, error, setError, handleLogin, handleSocialLogin };
}
