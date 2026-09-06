import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  buscarSessao,
  type SessaoUsuario,
} from "../../services/Auth/controllers/auth";
import {
  buscarMinhaEmpresa,
  mensagemErroApi,
  type Empresa,
} from "../../services/Auth/controllers/empresa";

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

  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

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
    setSalvando(true);
    setErroEdicao("");
    try {
      await api.patch(`/empreendedor/${usuario.id}`, form);
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
  };
}
