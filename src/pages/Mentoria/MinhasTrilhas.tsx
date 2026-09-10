import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, LinearProgress, Paper, Rating, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import type { Trilha } from "../../services/Auth/controllers/aprendizado";
import { alpha } from "@mui/material/styles";
import AprendizadoLayout from "./AprendizadoLayout";
import CatalogoTrilhas from "./CatalogoTrilhas";
import { useMinhasTrilhas } from "./MinhasTrilhas.hook";

export default function MinhasTrilhas() {
  const {
    navigate,
    aba,
    setAba,
    trilhas,
    loading,
    busy,
    error,
    sucesso,
    setSucesso,
    setRetry,
    marcar,
    avaliar,
  } = useMinhasTrilhas();

  const [avaliando, setAvaliando] = useState<Trilha | null>(null);
  const [notaTrilha, setNotaTrilha] = useState<number | null>(null);
  const [notaMentor, setNotaMentor] = useState<number | null>(null);
  const [comentario, setComentario] = useState("");
  const fecharAvaliacao = () => { setAvaliando(null); setNotaTrilha(null); setNotaMentor(null); setComentario(""); };
  const enviarAvaliacao = async () => {
    if (!avaliando || !notaTrilha || !notaMentor) return;
    if (await avaliar(avaliando, notaTrilha, notaMentor, comentario.trim())) fecharAvaliacao();
  };

  const theme = useTheme();
  return <AprendizadoLayout titulo="Trilhas e aprendizado">
    <Typography>Trilhas que você escolheu e seus conteúdos. Marque como concluídas conforme estudar; isso informa seu progresso ao mentor.</Typography>
    <Stack direction="row" gap={2}>
      <Button variant={aba === "minhas" ? "contained" : "outlined"} disabled={busy} onClick={() => setAba("minhas")}>Minhas trilhas</Button>
      <Button variant={aba === "catalogo" ? "contained" : "outlined"} disabled={busy} onClick={() => setAba("catalogo")}>Explorar trilhas</Button>
    </Stack>
    {aba === "catalogo" ? <CatalogoTrilhas onComecar={() => { setAba("minhas"); setRetry(r => r + 1); setSucesso("Trilha disponível em Minhas trilhas. Seu mentor já pode acompanhar seu progresso."); }} /> : <>
    <Button sx={{ alignSelf: "flex-start" }} disabled={loading || busy} onClick={() => setRetry(r => r + 1)}>Atualizar trilhas</Button>
    {error && <Alert severity="error">{error}</Alert>}
    {sucesso && <Alert severity="success" onClose={() => setSucesso("")}>{sucesso}</Alert>}
    {loading ? <CircularProgress aria-label="Carregando suas trilhas" /> : !error && !trilhas.length ? <Alert severity="info">Você ainda não tem trilhas disponíveis. Clique em “Explorar trilhas” e escolha por onde começar.</Alert> : trilhas.map(t => <Paper key={t.id} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ overflowWrap: "anywhere" }}>{t.titulo}</Typography>
      <Typography>Mentor: {t.mentor.nome} · {t.categoria_label}</Typography>
      <Button onClick={() => navigate(`/chat?mentor=${t.mentor.id}`)}>Conversar com o mentor</Button>
      <Typography sx={{ my: 2, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{t.descricao}</Typography>
      <Typography>{t.progresso}% · {t.aulas.filter(a => a.concluida).length} de {t.aulas.length} aulas concluídas</Typography>
      <LinearProgress aria-label={`Progresso de ${t.titulo}`} variant="determinate" value={t.progresso} sx={{ my: 2, height: 8, borderRadius: 2 }} />
      {t.avaliacao ? <Stack sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, .08) }}>
        <Typography fontWeight={700}>Sua avaliação</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}><Stack direction="row" alignItems="center" gap={1}><Typography>Trilha:</Typography><Rating size="small" readOnly value={t.avaliacao.nota_trilha}/></Stack><Stack direction="row" alignItems="center" gap={1}><Typography>Mentor:</Typography><Rating size="small" readOnly value={t.avaliacao.nota_mentor}/></Stack></Stack>
        {t.avaliacao.comentario && <Typography sx={{ mt: 1 }}>{t.avaliacao.comentario}</Typography>}
      </Stack> : t.progresso === 100 && <Button variant="contained" sx={{ mb: 2, alignSelf: "flex-start" }} onClick={() => setAvaliando(t)}>Avaliar trilha e mentor</Button>}
      {t.aulas.map((a, i) => <Accordion key={a.id} disableGutters sx={{ "&:before": { display: "none" }, border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}` }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`aula-${a.id}-titulo`} aria-controls={`aula-${a.id}-conteudo`}>
          <Typography sx={{ overflowWrap: "anywhere" }}>{i + 1}. {a.titulo} — {a.concluida ? "Concluída" : "Pendente"}</Typography>
        </AccordionSummary>
        <AccordionDetails id={`aula-${a.id}-conteudo`}>
          <Stack gap={2}>
            <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{a.conteudo}</Typography>
            {a.video_url && <Button component="a" href={a.video_url} target="_blank" rel="noopener noreferrer">Abrir vídeo em outra aba</Button>}
            <Button variant={a.concluida ? "outlined" : "contained"} disabled={busy} onClick={() => void marcar(t, a)}>{a.concluida ? "Marcar como pendente" : "Marcar aula como concluída"}</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>)}
    </Paper>)}
    </>}
    <Dialog open={!!avaliando} onClose={busy ? undefined : fecharAvaliacao} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogContent><Stack gap={2.5}><Typography variant="h4">Avalie sua experiência</Typography><Typography color="text.secondary">Sua opinião ajuda o mentor a melhorar as próximas trilhas.</Typography><Stack><Typography fontWeight={700}>Como você avalia a trilha?</Typography><Rating size="large" value={notaTrilha} onChange={(_, valor) => setNotaTrilha(valor)}/></Stack><Stack><Typography fontWeight={700}>Como você avalia o mentor?</Typography><Rating size="large" value={notaMentor} onChange={(_, valor) => setNotaMentor(valor)}/></Stack><TextField label="Comentário (opcional)" multiline minRows={4} value={comentario} onChange={e => setComentario(e.target.value)} inputProps={{maxLength:1500}} helperText={`${comentario.length}/1500`}/>{(!notaTrilha || !notaMentor) && <Typography variant="caption" color="text.secondary">Escolha as duas notas para enviar.</Typography>}</Stack></DialogContent>
      <DialogActions sx={{p:3,pt:0}}><Button onClick={fecharAvaliacao} disabled={busy}>Cancelar</Button><Button variant="contained" disabled={busy||!notaTrilha||!notaMentor} onClick={()=>void enviarAvaliacao()}>Enviar avaliação</Button></DialogActions>
    </Dialog>
  </AprendizadoLayout>;
}
