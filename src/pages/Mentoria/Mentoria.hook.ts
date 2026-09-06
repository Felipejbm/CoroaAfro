import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { buscarSessao, logout } from "../../services/Auth/controllers/auth";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import type { Mentorado, MentoriaProps } from "./Mentoria.types";

export function useMentoria({
  detalhe = false,
}: MentoriaProps) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [nome, setNome] = useState("");

  const [alunos, setAlunos] = useState<Mentorado[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [retry, setRetry] = useState(0);

  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    let active = true;
    async function carregar() {
      setLoading(true);
      setError("");
      setAlunos([]);
      try {
        const usuario = await buscarSessao();
        if (detalhe && !id) throw new Error("Selecione um mentorado na lista.");
        const response = await api.get(
          detalhe ? `/mentoria/mentorados/${id}` : "/mentoria/mentorados",
        );
        if (active) {
          setNome(usuario.nome);
          setAlunos(detalhe ? [response.data] : response.data);
        }
      } catch (err) {
        if (active)
          setError(
            err instanceof Error && !id && detalhe
              ? err.message
              : mensagemErroApi(err),
          );
      } finally {
        if (active) setLoading(false);
      }
    }
    void carregar();
    return () => {
      active = false;
    };
  }, [id, detalhe, retry]);

  async function sair() {
    setSaindo(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(mensagemErroApi(err));
    } finally {
      setSaindo(false);
    }
  }

  return { id, navigate, nome, alunos, loading, error, setRetry, saindo, sair };
}
