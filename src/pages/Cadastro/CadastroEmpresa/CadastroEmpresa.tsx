import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { fieldStyles } from "./CadastroEmpresa.styles";
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { fonts } from "../../../styles/theme";

import Layout from "../../../components/Layout/Layout";
import {
  buscarMinhaEmpresa,
  buscarOpcoesEmpresa,
  mensagemErroApi,
  salvarEmpresa,
  type DadosEmpresa,
  type OpcoesEmpresa,
} from "../../../services/Auth/controllers/empresa";

type Formulario = Omit<DadosEmpresa, "num_funcionarios"> & {
  num_funcionarios: string;
};
type Campo = {
  campo: keyof Formulario;
  label: string;
  opcional?: boolean;
  max?: number;
  tipo?: string;
};
const inicial: Formulario = {
  nome: "",
  nome_fantasia: "",
  data_fundacao: "",
  cnpj: "",
  segmento: "",
  porte: "",
  num_funcionarios: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
};
const negocio: Campo[] = [
  { campo: "nome", label: "Nome da empresa", max: 150 },
  {
    campo: "nome_fantasia",
    label: "Nome fantasia (opcional)",
    opcional: true,
    max: 150,
  },
  { campo: "data_fundacao", label: "Data de fundação", tipo: "date" },
  { campo: "cnpj", label: "CNPJ (opcional)", opcional: true, max: 18 },
  { campo: "segmento", label: "Nicho principal" },
  { campo: "porte", label: "Porte / enquadramento informado" },
  {
    campo: "num_funcionarios",
    label: "Número de funcionários",
    tipo: "number",
  },
];
const endereco: Campo[] = [
  { campo: "rua", label: "Rua / logradouro", max: 150 },
  { campo: "numero", label: "Número (ou S/N)", max: 20 },
  {
    campo: "complemento",
    label: "Complemento (opcional)",
    opcional: true,
    max: 100,
  },
  { campo: "bairro", label: "Bairro", max: 100 },
  { campo: "cidade", label: "Cidade", max: 100 },
  { campo: "estado", label: "Estado (UF)" },
  { campo: "cep", label: "CEP (opcional)", opcional: true, max: 9 },
];

export default function CadastroEmpre() {
  const theme = useTheme();
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
  const navigate = useNavigate();

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

  return (
    <Layout>
      <Stack sx={{ bgcolor: theme.palette.secondary.light, py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Stack
            component="form"
            onSubmit={(event) => void salvar(event)}
            sx={{
              bgcolor: theme.palette.secondary.main,
              borderRadius: 3,
              boxShadow: (theme) => `0 10px 24px ${alpha(theme.palette.common.black, 0.2)}`,
              p: { xs: 3, md: 5 },
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: fonts.hero }}
            >
              {empresaId ? "Editar empresa" : "Cadastre sua empresa"}
            </Typography>
            <Typography>
              Dados organizados ajudam a conhecer seu negócio e sua região.
            </Typography>
            {erro && <Alert severity="error">{erro}</Alert>}
            {carregando && (
              <CircularProgress aria-label="Carregando cadastro" />
            )}
            {falhaCarga && (
              <Button onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            )}
            <Typography variant="h6">Sobre o negócio</Typography>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              {negocio.map(renderCampo)}
            </Stack>
            <Typography variant="h6">Endereço da empresa</Typography>
            {enderecoAntigo && (
              <Alert severity="info">
                Endereço antigo preservado: {enderecoAntigo}. Preencha os campos
                abaixo para organizar sua localização.
              </Alert>
            )}
            <Typography variant="body2">
              Complemento e CEP são opcionais. Se o local não tiver número,
              informe S/N.
            </Typography>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              {endereco.map(renderCampo)}
            </Stack>
            <Button
              type="submit"
              disabled={carregando || salvando || falhaCarga || sucesso}
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {salvando
                ? "Salvando..."
                : empresaId
                  ? "Salvar alterações"
                  : "Cadastrar empresa"}
            </Button>
            <Button disabled={salvando} onClick={() => navigate("/perfil")}>
              Voltar ao perfil
            </Button>
          </Stack>
        </Container>
      </Stack>
      <Dialog
        open={sucesso}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: { sx: { bgcolor: theme.palette.secondary.main, borderRadius: 3, p: 2 } },
        }}
      >
        <DialogTitle>
          {empresaId
            ? "Empresa atualizada!"
            : "Empresa cadastrada com sucesso!"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Os dados foram salvos e vinculados à sua conta.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/perfil", { replace: true })}
          >
            Ver meu perfil
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
