import { useEffect, useState, type FormEvent } from "react";
import type { Campo, Formulario } from "./CadastroEmpresa.types";
import {
  buscarMinhaEmpresa,
  buscarOpcoesEmpresa,
  mensagemErroApi,
  salvarEmpresa,
  type OpcoesEmpresa,
} from "../../../services/Auth/controllers/empresa";
import { inicial } from "./CadastroEmpresa.utils";
import { MenuItem, TextField } from "@mui/material";
import { fieldStyles } from "./CadastroEmpresa.styles";

export default function useCadastroEmpresa() {
  const [form, setForm] = useState<Formulario>(inicial);
  const [opcoes, setOpcoes] = useState<OpcoesEmpresa>({
    nichos: [],
    portes: [],
    estados: [],
  });
  const [empresaId, setEmpresaId] = useState<number>();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [falhaCarga, setFalhaCarga] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [enderecoAntigo, setEnderecoAntigo] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([buscarMinhaEmpresa(), buscarOpcoesEmpresa()])
      .then(([empresa, listas]) => {
        if (!active) return;
        setOpcoes(listas);
        if (!empresa) return;
        setEmpresaId(empresa.id_empresa);
        setForm({
          nome: empresa.nome,
          nome_fantasia: empresa.nome_fantasia,
          data_fundacao: empresa.data_fundacao ?? "",
          cnpj: empresa.cnpj,
          segmento: empresa.segmento,
          porte: empresa.porte,
          num_funcionarios:
            empresa.num_funcionarios == null
              ? ""
              : String(empresa.num_funcionarios),
          rua: empresa.rua,
          numero: empresa.numero,
          complemento: empresa.complemento,
          bairro: empresa.bairro,
          cidade: empresa.cidade,
          estado: empresa.estado,
          cep: empresa.cep,
        });
        if (!empresa.rua && empresa.endereco_legado)
          setEnderecoAntigo(empresa.endereco_legado);
      })
      .catch((error) => {
        if (active) {
          setErro(mensagemErroApi(error));
          setFalhaCarga(true);
        }
      })
      .finally(() => {
        if (active) setCarregando(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function alterar(campo: keyof Formulario, value: string) {
    if (campo === "cep")
      value = value
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/^(\d{5})(\d)/, "$1-$2");
    if (campo === "cnpj")
      value = value
        .replace(/[^a-z0-9]/gi, "")
        .toUpperCase()
        .slice(0, 14)
        .replace(/^(.{2})(.)/, "$1.$2")
        .replace(/^(.{6})(.)/, "$1.$2")
        .replace(/^(.{10})(.)/, "$1/$2")
        .replace(/^(.{15})(.)/, "$1-$2");
    setForm((prev) => ({ ...prev, [campo]: value }));
  }

  async function salvar(event: FormEvent) {
    event.preventDefault();
    if (salvando || carregando || falhaCarga || sucesso) return;
    setErro("");
    const quantidade = Number(form.num_funcionarios);
    if (
      !form.num_funcionarios.trim() ||
      !Number.isInteger(quantidade) ||
      quantidade < 0 ||
      quantidade > 1000000
    ) {
      setErro(
        "Informe uma quantidade inteira de funcionários, de 0 a 1.000.000.",
      );
      return;
    }
    if (
      !opcoes.nichos.some((item) => item.valor === form.segmento) ||
      !opcoes.portes.some((item) => item.valor === form.porte) ||
      !opcoes.estados.includes(form.estado)
    ) {
      setErro("Selecione nicho, porte/enquadramento e UF nas listas.");
      return;
    }
    setSalvando(true);
    try {
      await salvarEmpresa({ ...form, num_funcionarios: quantidade }, empresaId);
      setSucesso(true);
    } catch (error) {
      setErro(mensagemErroApi(error));
    } finally {
      setSalvando(false);
    }
  }

  function renderCampo(item: Campo) {
    const lista =
      item.campo === "segmento"
        ? opcoes.nichos
        : item.campo === "porte"
          ? opcoes.portes
          : item.campo === "estado"
            ? opcoes.estados.map((uf) => ({ valor: uf, label: uf }))
            : null;
    const antigo =
      lista &&
      form[item.campo] &&
      !lista.some((opcao) => opcao.valor === form[item.campo]);
    return (
      <TextField
        key={item.campo}
        fullWidth
        label={item.label}
        select={!!lista}
        type={item.tipo ?? "text"}
        required={!item.opcional}
        disabled={carregando || salvando || falhaCarga || sucesso}
        value={form[item.campo]}
        onChange={(event) => alterar(item.campo, event.target.value)}
        helperText={
          item.campo === "porte"
            ? "Escolha conforme o cadastro da sua empresa."
            : item.campo === "segmento"
              ? "Escolha a principal atividade do negócio."
              : undefined
        }
        InputLabelProps={item.tipo === "date" ? { shrink: true } : undefined}
        slotProps={{
          htmlInput: {
            maxLength: item.max,
            min: item.tipo === "number" ? 0 : undefined,
            max: item.tipo === "number" ? 1000000 : undefined,
            step: item.tipo === "number" ? 1 : undefined,
            inputMode: item.campo === "cep" ? "numeric" : undefined,
          },
        }}
        sx={fieldStyles}
      >
        {lista && (
          <MenuItem value="" disabled>
            Selecione
          </MenuItem>
        )}
        {antigo && (
          <MenuItem value={form[item.campo]} disabled>
            Valor antigo: {form[item.campo]} — selecione uma opção
          </MenuItem>
        )}
        {lista?.map((opcao) => (
          <MenuItem key={opcao.valor} value={opcao.valor}>
            {opcao.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  return {
    erro,
    enderecoAntigo,
    salvar,
    renderCampo,
    empresaId,
    carregando,
    falhaCarga,
    sucesso,
    salvando,
  };
}
