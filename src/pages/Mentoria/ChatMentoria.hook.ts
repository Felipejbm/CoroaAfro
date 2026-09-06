import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  chaveConversa,
  enviarMensagem,
  lerMensagens,
  listarConversas,
  type Conversa,
  type Mensagem,
  type Rascunho,
} from "../../services/Auth/controllers/chat";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import type { ChatMentoriaProps, HistoricoConversaProps } from "./ChatMentoria.types";
import { juntar, semAcesso } from "./ChatMentoria.utils";

export function useHistoricoConversa({
  conversa,
  rascunho,
  onRascunho,
  onBusy,
}: HistoricoConversaProps) {
  const chave = chaveConversa(conversa);

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  const [erroEnvio, setErroEnvio] = useState("");

  const [bloqueado, setBloqueado] = useState(false);

  const [enviando, setEnviando] = useState(false);

  const [temAntigas, setTemAntigas] = useState(false);

  const [carregandoAntigas, setCarregandoAntigas] = useState(false);

  const [retry, setRetry] = useState(0);

  const vivo = useRef(false);

  const lista = useRef<HTMLDivElement>(null);

  const rolar = useRef(true);

  const enviandoRef = useRef(false);

  useEffect(() => {
    let active = true;
    vivo.current = true;
    let timer: ReturnType<typeof setTimeout>;
    let cursor: number | undefined;
    setLoading(true);
    setBloqueado(false);
    setErro("");
    async function atualizar() {
      let rapido = false;
      if (document.visibilityState === "hidden") {
        timer = setTimeout(() => void atualizar(), 5000);
        return;
      }
      try {
        const dados = await lerMensagens(chave, { depois: cursor });
        if (!active) return;
        if (cursor === undefined) {
          setTemAntigas(dados.tem_mais);
          setMensagens(dados.mensagens);
        } else {
          setMensagens((ms) => juntar(ms, dados.mensagens));
          rapido = dados.tem_mais;
        }
        cursor = dados.mensagens.at(-1)?.id ?? cursor ?? 0;
        setErro("");
        setBloqueado(false);
      } catch (err) {
        if (!active) return;
        setErro(mensagemErroApi(err));
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
          setLoading(false);
          return;
        }
      } finally {
        if (active) setLoading(false);
      }
      if (active)
        timer = setTimeout(() => void atualizar(), rapido ? 200 : 5000);
    }
    void atualizar();
    return () => {
      active = false;
      vivo.current = false;
      clearTimeout(timer);
    };
  }, [chave, retry]);

  useEffect(() => {
    if (rolar.current && lista.current)
      lista.current.scrollTop = lista.current.scrollHeight;
  }, [mensagens]);

  async function antigas() {
    if (!mensagens.length || carregandoAntigas) return;
    setCarregandoAntigas(true);
    const altura = lista.current?.scrollHeight ?? 0;
    const topo = lista.current?.scrollTop ?? 0;
    try {
      const dados = await lerMensagens(chave, { antes: mensagens[0].id });
      if (!vivo.current) return;
      rolar.current = false;
      setMensagens((ms) => juntar(dados.mensagens, ms));
      setTemAntigas(dados.tem_mais);
      requestAnimationFrame(() => {
        if (lista.current)
          lista.current.scrollTop = topo + lista.current.scrollHeight - altura;
      });
    } catch (err) {
      if (vivo.current) {
        setErro(mensagemErroApi(err));
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
        }
      }
    } finally {
      if (vivo.current) setCarregandoAntigas(false);
    }
  }

  async function enviar() {
    if (!rascunho.texto.trim() || enviandoRef.current || bloqueado || loading)
      return;
    enviandoRef.current = true;
    setEnviando(true);
    onBusy(true);
    setErroEnvio("");
    try {
      const mensagem = await enviarMensagem(chave, rascunho);
      if (!vivo.current) return;
      rolar.current = true;
      setMensagens((ms) => juntar(ms, [mensagem]));
      onRascunho({ texto: "", chave_envio: crypto.randomUUID() });
    } catch (err) {
      if (vivo.current) {
        setErroEnvio(
          mensagemErroApi(err) +
          " Seu texto foi mantido para tentar novamente.",
        );
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
        }
      }
    } finally {
      enviandoRef.current = false;
      onBusy(false);
      if (vivo.current) setEnviando(false);
    }
  }

  return {
    mensagens,
    loading,
    erro,
    erroEnvio,
    bloqueado,
    enviando,
    temAntigas,
    carregandoAntigas,
    setRetry,
    lista,
    rolar,
    antigas,
    enviar,
  };
}

export function useChatMentoria({ mentor = false }: ChatMentoriaProps) {
  const [params] = useSearchParams();

  const [conversas, setConversas] = useState<Conversa[]>([]);

  const [selecionada, setSelecionada] = useState("");

  const [busca, setBusca] = useState("");

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  const [retry, setRetry] = useState(0);

  const [busy, setBusy] = useState(false);

  const [rascunhos, setRascunhos] = useState<Record<string, Rascunho>>({});

  const alvo = params.get(mentor ? "empreendedor" : "mentor");

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    setLoading(true);
    async function atualizar() {
      try {
        const dados = await listarConversas();
        if (!active) return;
        setConversas(dados);
        setErro("");
      } catch (err) {
        if (active) {
          setErro(mensagemErroApi(err));
          if (semAcesso(err)) setConversas([]);
        }
      } finally {
        if (active) setLoading(false);
      }
      if (active)
        timer = setTimeout(() => {
          if (document.visibilityState === "hidden")
            timer = setTimeout(() => void atualizar(), 10000);
          else void atualizar();
        }, 10000);
    }
    void atualizar();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [retry]);

  const conversa =
    conversas.find((c) => chaveConversa(c) === selecionada) ??
    (!selecionada && alvo
      ? conversas.find(
        (c) => String(mentor ? c.id_empreendedor : c.id_mentor) === alvo,
      )
      : undefined);

  const chave = conversa ? chaveConversa(conversa) : "";

  return {
    conversas,
    setSelecionada,
    busca,
    setBusca,
    loading,
    erro,
    setRetry,
    busy,
    setBusy,
    rascunhos,
    setRascunhos,
    conversa,
    chave,
  };
}
