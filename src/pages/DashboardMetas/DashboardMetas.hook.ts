import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarMinhaEmpresa,
  mensagemErroApi,
} from "../../services/Auth/controllers/empresa";
import {
  listarMetas,
  salvarMeta,
  type Meta,
  type MetaEntrada,
} from "../../services/Auth/controllers/metas";
import { resumoMetasConfig, vazio } from "./DashboardMetas.utils";

export function useDashboardMetas() {
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState("Minha empresa");

  const [empresaError, setEmpresaError] = useState("");

  const [metas, setMetas] = useState<Meta[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [retry, setRetry] = useState(0);

  const [arquivadas, setArquivadas] = useState(false);

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState<Meta | undefined>();

  const [form, setForm] = useState<MetaEntrada>(vazio);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;

    buscarMinhaEmpresa()
      .then((value) => {
        if (active) setEmpresa(value?.nome || "Empresa ainda não cadastrada");
      })
      .catch(() => {
        if (active)
          setEmpresaError("Não foi possível carregar os dados da empresa.");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    listarMetas()
      .then((items) => {
        if (active) {
          setMetas(items);
          setError("");
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

  const atualizar = useCallback(() => {
    setLoading(true);
    setRetry((value) => value + 1);
  }, []);

  const abrirModal = useCallback((meta?: Meta) => {
    setEditing(meta);
    setForm(
      meta
        ? {
          titulo: meta.titulo,
          unidade: meta.unidade,
          valor_inicial: String(meta.valor_inicial),
          valor_atual: String(meta.valor_atual),
          valor_alvo: String(meta.valor_alvo),
          prazo: meta.prazo,
          arquivada: meta.arquivada,
        }
        : { ...vazio },
    );
    setFormError("");
    setSuccess("");
    setOpen(true);
  }, []);

  const salvar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    if (
      !form.titulo.trim() ||
      !form.unidade.trim() ||
      Number(form.valor_alvo) <= Number(form.valor_inicial)
    ) {
      setFormError(
        "Preencha título e unidade. O alvo deve ser maior que o valor inicial.",
      );
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const result = await salvarMeta(form, editing);
      setMetas((items) =>
        editing
          ? items.map((item) => (item.id === result.id ? result : item))
          : [result, ...items],
      );
      setOpen(false);
      setSuccess(
        editing ? "Meta atualizada com sucesso." : "Meta criada com sucesso.",
      );
    } catch (err) {
      setFormError(mensagemErroApi(err));
    } finally {
      setSaving(false);
    }
  };

  const ativas = useMemo(
    () => metas.filter((meta) => !meta.arquivada),
    [metas],
  );

  const metasExibidas = useMemo(
    () => metas.filter((meta) => arquivadas || !meta.arquivada),
    [metas, arquivadas],
  );

  const resumoMetasValores = [ativas.length, ativas.filter((meta) => meta.status === "atingida").length];
  const resumoMetas = resumoMetasConfig.map(({ indice, ...card }) => ({ ...card, value: resumoMetasValores[indice] }));

  return {
    resumoMetas,
    navigate,
    empresa,
    empresaError,
    loading,
    error,
    success,
    setSuccess,
    arquivadas,
    setArquivadas,
    open,
    setOpen,
    editing,
    form,
    setForm,
    saving,
    formError,
    atualizar,
    abrirModal,
    salvar,
    ativas,
    metasExibidas,
  };
}
