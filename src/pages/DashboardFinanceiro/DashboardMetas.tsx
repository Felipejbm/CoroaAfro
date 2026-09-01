import { useEffect, useState } from "react";
import { Alert, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, LinearProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { buscarMinhaEmpresa, mensagemErroApi } from "../../services/controllers/empresa";
import { listarMetas, salvarMeta } from "../../services/controllers/metas";
import type { Meta, MetaEntrada } from "../../services/controllers/metas";
import { fonts } from "../../styles/theme";

const vazio: MetaEntrada = { titulo: "", unidade: "seguidores", valor_inicial: "0", valor_atual: "0", valor_alvo: "", prazo: "", arquivada: false };
const labels = { arquivada: "Arquivada", atingida: "Atingida", prazo_encerrado: "Prazo encerrado", em_andamento: "Em andamento" };
const numero = (value: string | number) => Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });

export default function DashboardMetas() {
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
  const [editing, setEditing] = useState<Meta>();
  const [form, setForm] = useState<MetaEntrada>(vazio);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  useEffect(() => {
    let active = true;
    buscarMinhaEmpresa().then(value => { if (active) setEmpresa(value?.nome || "Empresa ainda não cadastrada"); })
      .catch(() => { if (active) setEmpresaError("Não foi possível carregar os dados da empresa."); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    let active = true;
    listarMetas().then(items => { if (active) { setMetas(items); setError(""); } })
      .catch(err => { if (active) setError(mensagemErroApi(err)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  function atualizar() { setLoading(true); setRetry(value => value + 1); }
  function abrir(meta?: Meta) {
    setEditing(meta); setForm(meta ? { titulo: meta.titulo, unidade: meta.unidade, valor_inicial: String(meta.valor_inicial),
      valor_atual: String(meta.valor_atual), valor_alvo: String(meta.valor_alvo), prazo: meta.prazo, arquivada: meta.arquivada } : { ...vazio });
    setFormError(""); setSuccess(""); setOpen(true);
  }
  async function salvar(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    if (!form.titulo.trim() || !form.unidade.trim() || Number(form.valor_alvo) <= Number(form.valor_inicial)) {
      setFormError("Preencha título e unidade. O alvo deve ser maior que o valor inicial."); return;
    }
    setSaving(true); setFormError("");
    try {
      const result = await salvarMeta(form, editing);
      setMetas(items => editing ? items.map(item => item.id === result.id ? result : item) : [result, ...items]);
      setOpen(false); setSuccess(editing ? "Meta atualizada com sucesso." : "Meta criada com sucesso.");
    } catch (err) { setFormError(mensagemErroApi(err)); }
    finally { setSaving(false); }
  }
  const ativas = metas.filter(meta => !meta.arquivada);
  return <Stack direction="row" sx={{ minHeight: "100vh" }}>
    <NavBar />
    <Stack sx={{ flex: 1, minWidth: 0, bgcolor: "#f9dde0", p: { xs: 2, md: 4 }, gap: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Stack><Typography variant="h4" sx={{ fontFamily: fonts.hero }}>Minha empresa</Typography><Typography>{empresa}</Typography></Stack>
        <Button onClick={() => navigate("/perfil")}>Ver perfil</Button>
      </Stack>
      {empresaError && <Alert severity="warning">{empresaError}</Alert>}
      <Typography>Acompanhe seus objetivos e a evolução da sua marca.</Typography>
      {success && <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>}
      <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
        {[["Metas não arquivadas", ativas.length], ["Metas atingidas", ativas.filter(meta => meta.status === "atingida").length]].map(([label, value]) =>
          <Paper key={label} sx={{ bgcolor: "#1c1830", color: "white", p: 3, borderRadius: 3, flex: 1 }}><Typography>{label}</Typography><Typography variant="h4">{loading || error ? "—" : value}</Typography></Paper>)}
      </Stack>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: "#1c1830", color: "white" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2} mb={2}>
          <Typography variant="h5" sx={{ fontFamily: fonts.hero }}>Minhas metas</Typography>
          <Stack direction="row" gap={1}><Button disabled={loading} sx={{ color: "#f0a3a0" }} onClick={atualizar}>Atualizar</Button>
            <Button disabled={loading || !!error} variant="contained" sx={{ bgcolor: "#e0523a" }} onClick={() => abrir()}>Adicionar meta</Button></Stack>
        </Stack>
        <Typography sx={{ color: "rgba(255,255,255,.7)", mb: 2 }}>Atualização manual: informe os valores em “Editar / atualizar”. Ainda não há sincronização automática com o Instagram.</Typography>
        <FormControlLabel control={<Checkbox checked={arquivadas} onChange={event => setArquivadas(event.target.checked)} sx={{ color: "#f0a3a0" }} />} label="Mostrar arquivadas" />
        {loading ? <CircularProgress aria-label="Carregando metas" /> : error ? <Alert severity="error">{error}</Alert> : <Stack gap={2}>
          {!metas.filter(meta => arquivadas || !meta.arquivada).length && <Typography>Você ainda não tem metas nesta lista. Que tal definir seu primeiro objetivo?</Typography>}
          {metas.filter(meta => arquivadas || !meta.arquivada).map(meta => <Stack key={meta.id} sx={{ p: 2, border: "1px solid #514761", borderRadius: 2, gap: 1 }}>
            <Stack direction="row" justifyContent="space-between" gap={1} flexWrap="wrap"><Typography variant="h6">{meta.titulo}</Typography><Chip label={labels[meta.status]} sx={{ bgcolor: "#f0a3a0" }} /></Stack>
            <Typography>{numero(meta.valor_atual)} / {numero(meta.valor_alvo)} {meta.unidade} · Inicial: {numero(meta.valor_inicial)}</Typography>
            <LinearProgress variant="determinate" value={meta.progresso} aria-label={`Progresso: ${meta.titulo}`} sx={{ height: 8, borderRadius: 4, bgcolor: "#514761", "& .MuiLinearProgress-bar": { bgcolor: "#e0523a" } }} />
            <Typography variant="body2">{numero(meta.progresso)}% do avanço planejado · Prazo: {meta.prazo.split("-").reverse().join("/")}</Typography>
            <Button sx={{ alignSelf: "flex-start", color: "#f0a3a0" }} onClick={() => abrir(meta)}>Editar / atualizar</Button>
          </Stack>)}
        </Stack>}
      </Paper>
      <Alert severity="info">As análises automáticas e os indicadores financeiros ainda não estão integrados. Valores demonstrativos foram retirados deste painel.</Alert>
      <Button sx={{ alignSelf: "flex-start" }} onClick={() => navigate("/dashboard-redes")}>Consultar minhas redes</Button>
      <Dialog open={open} onClose={() => { if (!saving) setOpen(false); }} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: "#f9dde0", borderRadius: 3 } }}>
        <form onSubmit={event => void salvar(event)}>
          <DialogTitle>{editing ? "Editar meta" : "Nova meta"}</DialogTitle>
          <DialogContent><Stack gap={2} sx={{ pt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField required disabled={saving} label="Título" value={form.titulo} inputProps={{ maxLength: 120 }} onChange={event => setForm({ ...form, titulo: event.target.value })} />
            <TextField required disabled={saving} label="Unidade (ex.: seguidores, publicações, vendas)" value={form.unidade} inputProps={{ maxLength: 30 }} onChange={event => setForm({ ...form, unidade: event.target.value })} />
            {([ ["valor_inicial", "Valor inicial"], ["valor_atual", "Valor atual"], ["valor_alvo", "Valor-alvo"] ] as const).map(([field, label]) =>
              <TextField key={field} required disabled={saving} type="number" label={label} value={form[field]} inputProps={{ min: 0, max: 999999999999.99, step: "0.01" }} onChange={event => setForm({ ...form, [field]: event.target.value })} />)}
            <TextField required disabled={saving} type="date" label="Prazo" InputLabelProps={{ shrink: true }} value={form.prazo} onChange={event => setForm({ ...form, prazo: event.target.value })} />
            <Typography variant="body2">O progresso mede o avanço do valor inicial até o alvo. Metas com prazo passado podem ser registradas para acompanhamento.</Typography>
            {editing && <FormControlLabel control={<Checkbox disabled={saving} checked={form.arquivada} onChange={event => setForm({ ...form, arquivada: event.target.checked })} />} label="Arquivar meta (mantém os dados salvos)" />}
          </Stack></DialogContent>
          <DialogActions><Button disabled={saving} onClick={() => setOpen(false)}>Cancelar</Button><Button type="submit" disabled={saving} variant="contained" sx={{ bgcolor: "#e0523a" }}>{saving ? "Salvando…" : "Salvar meta"}</Button></DialogActions>
        </form>
      </Dialog>
    </Stack>
  </Stack>;
}
