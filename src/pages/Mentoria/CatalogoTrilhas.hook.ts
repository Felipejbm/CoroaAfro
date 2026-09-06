import { useEffect, useState } from "react";
import {
  buscarCatalogo,
  categoriasTrilhas,
  inscreverTrilha,
  type Categoria,
  type ItemCatalogo,
  type PaginaCatalogo,
} from "../../services/Auth/controllers/aprendizado";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import type { CatalogoTrilhasProps } from "./CatalogoTrilhas.types";

export function useCatalogoTrilhas({
  onComecar,
}: CatalogoTrilhasProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState("");

  const [pagina, setPagina] = useState(1);

  const [resultado, setResultado] = useState<PaginaCatalogo>();

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  const [retry, setRetry] = useState(0);

  const [escolhida, setEscolhida] = useState<ItemCatalogo>();

  const [busy, setBusy] = useState(false);

  const [erroInscricao, setErroInscricao] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErro("");
    setResultado(undefined);
    Promise.all([buscarCatalogo(categoria, pagina), categoriasTrilhas()])
      .then(([dados, opcoes]) => {
        if (active) {
          setResultado(dados);
          setCategorias(opcoes);
        }
      })
      .catch((err) => {
        if (active) setErro(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [categoria, pagina, retry]);

  async function confirmar() {
    if (!escolhida || busy) return;
    setBusy(true);
    setErroInscricao("");
    try {
      await inscreverTrilha(escolhida.id);
      onComecar();
    } catch (err) {
      setErroInscricao(mensagemErroApi(err));
    } finally {
      setBusy(false);
    }
  }

  return {
    categorias,
    categoria,
    setCategoria,
    pagina,
    setPagina,
    resultado,
    loading,
    erro,
    setRetry,
    escolhida,
    setEscolhida,
    busy,
    erroInscricao,
    setErroInscricao,
    confirmar,
  };
}
