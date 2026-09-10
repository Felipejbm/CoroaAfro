import { useEffect, useState } from "react";
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from "@mui/material";
import AprendizadoLayout from "./AprendizadoLayout";
import { CamposMentor } from "./PerfilMentor";
import { mentorVazio, type DadosMentor } from "./PerfilMentor.types";
import api from "../../api/axios";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";
import { useSessaoAtual } from "../../hooks/useSessaoAtual";
interface Mentor extends DadosMentor { id: number; ativo: boolean; administrador: boolean }
export default function AdminMentores() {
  const sessao = useSessaoAtual();
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [retry, setRetry] = useState(0);
  const [aberto, setAberto] = useState(false);
  const [dados, setDados] = useState(mentorVazio);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [alvo, setAlvo] = useState<Mentor | null>(null);
  useEffect(() => {
    if (!sessao?.administrador) return;
    let active = true; setLoading(true); setErro("");
    api.get<Mentor[]>("/mentoria/admin/mentores").then(r => { if (active) setMentores(r.data); }).catch(e => { if (active) setErro(mensagemErroApi(e)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry, sessao?.administrador]);
  async function criar(e: React.FormEvent) {
    e.preventDefault(); if (busy || senha !== confirmarSenha) return;
    setBusy(true); setErroForm("");
    try { await api.post("/mentoria/admin/mentores", { ...dados, senha }); setAberto(false); setSenha(""); setConfirmarSenha(""); setRetry(x => x + 1); setSucesso("Mentor cadastrado e autorizado. Ele já pode entrar escolhendo o perfil Mentor."); }
    catch (error) { setErroForm(mensagemErroApi(error)); }
    finally { setBusy(false); }
  }
  async function mudarAcesso() {
    if (!alvo || busy) return;
    setBusy(true); setErro("");
    try { await api.patch('/mentoria/admin/mentores/' + alvo.id + '/acesso', { ativo: !alvo.ativo }); setAlvo(null); setRetry(x => x + 1); setSucesso("Acesso atualizado."); }
    catch (error) { setErro(mensagemErroApi(error)); setAlvo(null); }
    finally { setBusy(false); }
  }
  return <AprendizadoLayout mentor titulo="Administrar mentores">
    {!sessao?.administrador ? <Alert severity="warning">Esta área é exclusiva da administração.</Alert> : <>
      <Button variant="contained" sx={{ alignSelf: "flex-start" }} onClick={() => { setDados(mentorVazio); setSenha(""); setConfirmarSenha(""); setErroForm(""); setAberto(true); }}>Adicionar mentor</Button>
      {erro && <Alert severity="error" action={<Button onClick={() => setRetry(x => x + 1)}>Tentar novamente</Button>}>{erro}</Alert>}
      {sucesso && <Alert severity="success" onClose={() => setSucesso("")}>{sucesso}</Alert>}
      {loading ? <CircularProgress aria-label="Carregando mentores" /> : mentores.map(m => <Paper key={m.id} sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
          <Stack sx={{ minWidth: 0, overflowWrap: "anywhere" }}><Typography variant="h6">{m.nome}</Typography><Typography>{m.email}</Typography><Typography>{m.especialidade}</Typography></Stack>
          <Stack direction="row" gap={1} alignItems="center"><Chip label={m.administrador ? "Administrador" : m.ativo ? "Ativo" : "Inativo"} />{!m.administrador && <Button disabled={busy} onClick={() => setAlvo(m)}>{m.ativo ? "Desativar" : "Reativar"}</Button>}</Stack>
        </Stack>
      </Paper>)}
      <Dialog open={aberto} onClose={() => { if (!busy) { setAberto(false); setSenha(""); setConfirmarSenha(""); } }} fullWidth maxWidth="sm">
        <form onSubmit={criar}><DialogTitle>Adicionar mentor</DialogTitle><DialogContent><Stack gap={2} sx={{ pt: 1 }}>
          {erroForm && <Alert severity="error">{erroForm}</Alert>}
          <CamposMentor dados={dados} mudar={setDados} disabled={busy} />
          <TextField label="Senha inicial" type="password" autoComplete="new-password" required disabled={busy} value={senha} onChange={e => setSenha(e.target.value)} helperText="Use de 12 a 128 caracteres. Entregue a senha ao mentor por um canal privado." slotProps={{ htmlInput: { minLength: 12, maxLength: 128 } }} />
          <TextField label="Confirme a senha" type="password" autoComplete="new-password" required disabled={busy} value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} error={!!confirmarSenha && senha !== confirmarSenha} helperText={confirmarSenha && senha !== confirmarSenha ? "As senhas precisam ser iguais." : " "} />
        </Stack></DialogContent><DialogActions><Button disabled={busy} onClick={() => { setAberto(false); setSenha(""); setConfirmarSenha(""); }}>Cancelar</Button><Button type="submit" variant="contained" disabled={busy || senha.trim().length < 12 || senha !== confirmarSenha || !dados.nome.trim() || !dados.especialidade.trim()}>Cadastrar e autorizar</Button></DialogActions></form>
      </Dialog>
      <Dialog open={!!alvo} onClose={() => { if (!busy) setAlvo(null); }}><DialogTitle>{alvo?.ativo ? "Desativar acesso?" : "Reativar acesso?"}</DialogTitle><DialogContent>{alvo?.ativo ? "O mentor perderá o acesso e suas trilhas ficarão indisponíveis enquanto estiver desativado. Os dados serão preservados." : "O mentor poderá entrar novamente e suas trilhas publicadas ficarão disponíveis."}</DialogContent><DialogActions><Button disabled={busy} onClick={() => setAlvo(null)}>Cancelar</Button><Button disabled={busy} onClick={() => void mudarAcesso()}>Confirmar</Button></DialogActions></Dialog>
    </>}
  </AprendizadoLayout>;
}
