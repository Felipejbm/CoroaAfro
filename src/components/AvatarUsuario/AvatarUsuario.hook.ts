import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useSessaoAtual } from "../../hooks/useSessaoAtual";

// Compartilha a requisição entre contatos, cabeçalho e mensagens da mesma pessoa.
// O cache existe somente enquanto há avatares montados e é separado por sessão.
const fotos = new Map<string, {
  consumidores: number;
  promessa: Promise<string>;
  controle: AbortController;
  url: string;
}>();

export function useAvatarUsuario(atual: boolean, nome?: string, fotoUrl?: string | null) {
  const sessao = useSessaoAtual();
  const nomeExibido = (atual ? sessao?.nome : nome) || nome || "Usuário";
  const caminho = atual ? sessao?.foto_perfil_url : fotoUrl;
  const chave = sessao && caminho ? `${sessao.papel}:${sessao.id}:${caminho}` : "";
  const [foto, setFoto] = useState({ chave: "", url: "" });

  useEffect(() => {
    if (!chave || !caminho) return;
    let ativo = true;
    let entrada = fotos.get(chave);
    if (!entrada) {
      const controle = new AbortController();
      const nova = { consumidores: 0, controle, url: "", promessa: Promise.resolve("") };
      nova.promessa = api.get<Blob>(caminho, { responseType: "blob", signal: controle.signal })
        .then(({ data }) => {
          if (controle.signal.aborted) return "";
          nova.url = URL.createObjectURL(data);
          return nova.url;
        });
      entrada = nova;
      fotos.set(chave, entrada);
    }
    entrada.consumidores++;
    entrada.promessa.then(url => {
      if (ativo) setFoto({ chave, url });
    }).catch(() => {
      if (ativo) setFoto({ chave, url: "" });
    });
    return () => {
      ativo = false;
      entrada.consumidores--;
      if (!entrada.consumidores) {
        entrada.controle.abort();
        if (entrada.url) URL.revokeObjectURL(entrada.url);
        fotos.delete(chave);
      }
    };
  }, [chave, caminho]);

  return { nomeExibido, src: foto.chave === chave ? foto.url || undefined : undefined };
}
