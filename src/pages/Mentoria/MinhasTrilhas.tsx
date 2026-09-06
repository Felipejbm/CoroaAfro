import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, LinearProgress, Paper, Stack, Typography, useTheme } from "@mui/material";
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
  } = useMinhasTrilhas();

  const theme = useTheme();
  return <AprendizadoLayout titulo="Minhas trilhas">
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
  </AprendizadoLayout>;
}
