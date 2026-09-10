import { useEffect, useState } from "react";
import { Alert, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import AprendizadoLayout from "./AprendizadoLayout";
import api from "../../api/axios";
import { buscarSessao } from "../../services/Auth/controllers/auth";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

import { mentorVazio, type DadosMentor } from "./PerfilMentor.types";
export function CamposMentor({ dados, mudar, disabled }: { dados: DadosMentor; mudar: (dados: DadosMentor) => void; disabled?: boolean }) {
  return <Stack gap={2}>
    <TextField label="Nome" required disabled={disabled} value={dados.nome} onChange={e => mudar({ ...dados, nome: e.target.value })} slotProps={{ htmlInput: { maxLength: 255 } }} />
    <TextField label="E-mail de acesso" type="email" required disabled={disabled} value={dados.email} onChange={e => mudar({ ...dados, email: e.target.value })} slotProps={{ htmlInput: { maxLength: 255 } }} />
    <TextField label="Especialidade" required disabled={disabled} value={dados.especialidade} onChange={e => mudar({ ...dados, especialidade: e.target.value })} slotProps={{ htmlInput: { maxLength: 50 } }} />
    <TextField label="Sobre você" multiline minRows={4} disabled={disabled} value={dados.biografia} onChange={e => mudar({ ...dados, biografia: e.target.value })} slotProps={{ htmlInput: { maxLength: 5000 } }} />
  </Stack>;
}
export default function PerfilMentor() {
  const [dados, setDados] = useState(mentorVazio);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setErro("");
    api.get<DadosMentor>("/mentoria/perfil").then(r => { if (active) setDados({ nome: r.data.nome, email: r.data.email, especialidade: r.data.especialidade, biografia: r.data.biografia }); }).catch(e => { if (active) setErro(mensagemErroApi(e)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  async function salvar(e: React.FormEvent) {
    e.preventDefault(); if (busy) return;
    setBusy(true); setErro(""); setSucesso("");
    try { await api.patch("/mentoria/perfil", dados); await buscarSessao(); setSucesso("Perfil atualizado."); }
    catch (error) { setErro(mensagemErroApi(error)); }
    finally { setBusy(false); }
  }
  return <AprendizadoLayout mentor titulo="Meu perfil">
    {erro && <Alert severity="error" action={<Button disabled={busy} onClick={() => setRetry(x => x + 1)}>Recarregar</Button>}>{erro}</Alert>}
    {sucesso && <Alert severity="success">{sucesso}</Alert>}
    {loading ? <CircularProgress aria-label="Carregando perfil" /> : <Paper component="form" onSubmit={salvar} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, maxWidth: 800 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Suas informações profissionais</Typography>
      <CamposMentor dados={dados} mudar={setDados} disabled={busy} />
      <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={busy || !dados.nome.trim() || !dados.especialidade.trim() || !dados.email.trim()}>{busy ? "Salvando…" : "Salvar alterações"}</Button>
    </Paper>}
  </AprendizadoLayout>;
}
