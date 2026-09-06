import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  acompanharTrilhas,
  categoriasTrilhas,
  listarMentorados,
  listarTrilhas,
  publicarTrilha,
  salvarTrilha,
  type AulaEntrada,
  type Categoria,
  type Mentorado,
  type Trilha,
  type TrilhaEntrada,
} from "../../services/Auth/controllers/aprendizado";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import { novaAula, novaTrilha } from "./TrilhasMentor.utils";

export function useTrilhasMentor() {
  const [params] = useSearchParams();

  const [trilhas, setTrilhas] = useState<Trilha[]>([]);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [alunos, setAlunos] = useState<Mentorado[]>([]);

  const [aluno, setAluno] = useState(params.get("mentorado") || "");

  const [acompanhamento, setAcompanhamento] = useState<Trilha[]>([]);

  const [loading, setLoading] = useState(true);

  const [loadingAluno, setLoadingAluno] = useState(false);

  const [error, setError] = useState("");

  const [erroAluno, setErroAluno] = useState("");

  const [sucesso, setSucesso] = useState("");

  const [retry, setRetry] = useState(0);

  const [busy, setBusy] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [atual, setAtual] = useState<Trilha>();

  const [dados, setDados] = useState<TrilhaEntrada>(novaTrilha);

  const [erroForm, setErroForm] = useState("");

  const [confirmar, setConfirmar] = useState<Trilha>();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([listarTrilhas(), listarMentorados(), categoriasTrilhas(true)])
      .then(([ts, ms, cs]) => {
        if (active) {
          setTrilhas(ts);
          setAlunos(ms);
          setCategorias(cs);
        }
      })
      .catch((err) => {
        if (active) setError(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [retry]);

  useEffect(() => {
    let active = true;
    setAcompanhamento([]);
    setErroAluno("");
    if (!aluno) {
      setLoadingAluno(false);
      return;
    }
    setLoadingAluno(true);
    acompanharTrilhas(Number(aluno))
      .then((ts) => {
        if (active) setAcompanhamento(ts);
      })
      .catch((err) => {
        if (active) setErroAluno(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoadingAluno(false);
      });
    return () => {
      active = false;
    };
  }, [aluno, retry]);

  function abrir(t?: Trilha) {
    setAtual(t);
    setErroForm("");
    setDados(
      t
        ? {
          titulo: t.titulo,
          descricao: t.descricao,
          categoria: t.categoria,
          publico_alvo: t.publico_alvo,
          aulas: t.aulas.map((a) => ({
            titulo: a.titulo,
            conteudo: a.conteudo,
            video_url: a.video_url,
          })),
        }
        : novaTrilha(),
    );
    setDialog(true);
  }

  function mudarAula(index: number, key: keyof AulaEntrada, value: string) {
    setDados((d) => ({
      ...d,
      aulas: d.aulas.map((a, i) => (i === index ? { ...a, [key]: value } : a)),
    }));
  }

  async function salvar() {
    if (busy) return;
    setBusy(true);
    setErroForm("");
    try {
      await salvarTrilha(dados, atual);
      setDialog(false);
      setSucesso(
        atual?.publicada
          ? "Categoria e público da trilha atualizados."
          : "Rascunho salvo. Revise e publique quando estiver pronto.",
      );
      setRetry((r) => r + 1);
    } catch (err) {
      setErroForm(mensagemErroApi(err));
    } finally {
      setBusy(false);
    }
  }

  async function publicar() {
    if (!confirmar || busy) return;
    setBusy(true);
    setError("");
    try {
      await publicarTrilha(confirmar);
      setSucesso(
        "Trilha publicada no catálogo. Os empreendedores já podem se inscrever.",
      );
      setRetry((r) => r + 1);
    } catch (err) {
      setError(mensagemErroApi(err));
    } finally {
      setBusy(false);
      setConfirmar(undefined);
    }
  }

  const adicionarAula = () => setDados(d => ({ ...d, aulas: [...d.aulas, novaAula()] }));
  const removerAula = (indice: number) => setDados(d => ({ ...d, aulas: d.aulas.filter((_, index) => index !== indice) }));

  return {
    adicionarAula,
    removerAula,
    trilhas,
    categorias,
    alunos,
    aluno,
    setAluno,
    acompanhamento,
    loading,
    loadingAluno,
    error,
    erroAluno,
    sucesso,
    setSucesso,
    setRetry,
    busy,
    dialog,
    setDialog,
    atual,
    dados,
    setDados,
    erroForm,
    confirmar,
    setConfirmar,
    abrir,
    mudarAula,
    salvar,
    publicar,
  };
}
