import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  buscarSessao,
  atualizarSessao,
  type SessaoUsuario,
} from "../../services/Auth/controllers/auth";
import {
  buscarMinhaEmpresa,
  mensagemErroApi,
  type Empresa,
} from "../../services/Auth/controllers/empresa";
import { buscarFotoPerfil, salvarFotoPerfil } from "../../services/Auth/controllers/perfil";
import type { FormularioPerfil } from "./Perfil.types";
import { formatosFotoPerfil, limiteFotoPerfil } from "./Perfil.utils";

export function usePerfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<SessaoUsuario | null>(null);

  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  const [editando, setEditando] = useState(false);

  const [salvando, setSalvando] = useState(false);

  const [erroEdicao, setErroEdicao] = useState("");

  const [sucesso, setSucesso] = useState("");

  const [form, setForm] = useState<FormularioPerfil>({ nome: "", email: "", telefone: "" });
  const [fotoAtual, setFotoAtual] = useState("");
  const [editandoFoto, setEditandoFoto] = useState(false);
  const [arquivoFoto, setArquivoFoto] = useState<File | null>(null);
  const [previaFoto, setPreviaFoto] = useState("");
  const [erroFoto, setErroFoto] = useState("");
  const [erroCarregarFoto, setErroCarregarFoto] = useState("");
  const [salvandoFoto, setSalvandoFoto] = useState(false);
  const seletorFoto = useRef<HTMLInputElement>(null);
  const envioFotoEmAndamento = useRef(false);

  useEffect(() => {
    if (!arquivoFoto) {
      setPreviaFoto("");
      return;
    }
    const url = URL.createObjectURL(arquivoFoto);
    setPreviaFoto(url);
    return () => URL.revokeObjectURL(url);
  }, [arquivoFoto]);

  useEffect(() => {
    const controle = new AbortController();
    let url = "";
    setFotoAtual("");
    setErroCarregarFoto("");
    if (usuario?.foto_perfil_url) {
      buscarFotoPerfil(controle.signal)
        .then((foto) => {
          if (controle.signal.aborted) return;
          url = URL.createObjectURL(foto);
          setFotoAtual(url);
        })
        .catch(() => {
          if (!controle.signal.aborted) {
            setErroCarregarFoto("Não foi possível carregar sua foto. Recarregue a página para tentar novamente.");
          }
        });
    }
    return () => {
      controle.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [usuario?.foto_perfil_url]);

  const abrirFoto = () => {
    setArquivoFoto(null);
    setErroFoto("");
    setEditandoFoto(true);
  };

  const fecharFoto = () => {
    if (envioFotoEmAndamento.current) return;
    setEditandoFoto(false);
    setArquivoFoto(null);
    setErroFoto("");
  };

  const selecionarFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    event.target.value = "";
    if (!arquivo) return;
    setErroFoto("");
    setArquivoFoto(null);
    if (!formatosFotoPerfil.includes(arquivo.type)) {
      setErroFoto("Escolha uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (!arquivo.size || arquivo.size > limiteFotoPerfil) {
      setErroFoto("A foto deve ter conteúdo e no máximo 5 MB.");
      return;
    }
    setArquivoFoto(arquivo);
  };

  const salvarFoto = async () => {
    if (!arquivoFoto || !usuario || envioFotoEmAndamento.current) return;
    envioFotoEmAndamento.current = true;
    setSalvandoFoto(true);
    setErroFoto("");
    try {
      const atualizado = await salvarFotoPerfil(arquivoFoto);
      setUsuario(atualizado);
      atualizarSessao(atualizado);
      setEditandoFoto(false);
      setArquivoFoto(null);
      setSucesso("Foto de perfil atualizada.");
    } catch (error) {
      setErroFoto(mensagemErroApi(error));
    } finally {
      envioFotoEmAndamento.current = false;
      setSalvandoFoto(false);
    }
  };

  const escolherArquivoFoto = () => seletorFoto.current?.click();

  useEffect(() => {
    let active = true;
    Promise.all([buscarSessao(), buscarMinhaEmpresa()])
      .then(([pessoa, negocio]) => {
        if (active) {
          setUsuario(pessoa);
          setEmpresa(negocio);
        }
      })
      .catch((error) => {
        if (active) setErro(mensagemErroApi(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const editar = () => {
    if (!usuario) return;
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
    });
    setErroEdicao("");
    setEditando(true);
  };

  const salvar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!usuario || salvando) return;
    const nome = form.nome.trim();
    const email = form.email.trim().toLowerCase();
    const telefone = form.telefone.trim();
    if (nome.length < 2) {
      setErroEdicao("Informe seu nome completo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErroEdicao("Informe um e-mail válido.");
      return;
    }
    if (telefone.replace(/\D/g, "").length < 10) {
      setErroEdicao("Informe um telefone com DDD.");
      return;
    }
    setSalvando(true);
    setErroEdicao("");
    try {
      await api.patch(`/empreendedor/${usuario.id}`, { nome, email, telefone });
      setUsuario(await buscarSessao());
      setEditando(false);
      setSucesso("Dados do empreendedor atualizados.");
    } catch (error) {
      setErroEdicao(mensagemErroApi(error));
    } finally {
      setSalvando(false);
    }
  };

  return {
    navigate,
    usuario,
    empresa,
    loading,
    erro,
    editando,
    setEditando,
    salvando,
    erroEdicao,
    sucesso,
    setSucesso,
    form,
    setForm,
    editar,
    salvar,
    fotoAtual,
    editandoFoto,
    previaFoto,
    arquivoFoto,
    erroFoto,
    erroCarregarFoto,
    salvandoFoto,
    seletorFoto,
    abrirFoto,
    fecharFoto,
    selecionarFoto,
    salvarFoto,
    escolherArquivoFoto,
  };
}
