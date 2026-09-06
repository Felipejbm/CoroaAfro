import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { concluirAula, minhasTrilhas, type Aula, type Trilha } from "../../services/Auth/controllers/aprendizado";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import type { AbaMinhasTrilhas } from "./MinhasTrilhas.types";

export function useMinhasTrilhas() {
  const navigate = useNavigate();

  const [aba, setAba] = useState<AbaMinhasTrilhas>("minhas");

  const [trilhas, setTrilhas] = useState<Trilha[]>([]);

  const [loading, setLoading] = useState(true);

  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");

  const [sucesso, setSucesso] = useState("");

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    minhasTrilhas().then(ts => { if (active) setTrilhas(ts); })
      .catch(err => { if (active) { setError(mensagemErroApi(err)); setTrilhas([]); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);

  async function marcar(t: Trilha, a: Aula) {
    if (busy) return;
    setBusy(true); setError(""); setSucesso("");
    try {
      const atualizada = await concluirAula(t.id, a.id, !a.concluida);
      setTrilhas(ts => ts.map(item => item.id === atualizada.id ? atualizada : item));
      setSucesso(a.concluida ? "Aula marcada como pendente." : "Aula concluída! Seu progresso foi salvo.");
    } catch (err) { setError(mensagemErroApi(err)); }
    finally { setBusy(false); }
  }

  return { navigate, aba, setAba, trilhas, loading, busy, error, sucesso, setSucesso, setRetry, marcar };
}
