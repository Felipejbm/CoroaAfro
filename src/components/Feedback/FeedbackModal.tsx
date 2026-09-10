import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert, Box, Button, Checkbox, Dialog, DialogContent, Fab, FormControlLabel,
  IconButton, Rating, Stack, TextField, Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { obterSessaoAtual, observarSessao } from "../../services/Auth/controllers/auth";
import { enviarFeedback, statusFeedback } from "../../services/Auth/controllers/feedback";
import { fonts } from "../../styles/theme";

const UMA_SEMANA = 7 * 24 * 60 * 60 * 1000;

export default function FeedbackModal() {
  const [sessao, setSessao] = useState(obterSessaoAtual());
  const [aberto, setAberto] = useState(false);
  const [nota, setNota] = useState<number | null>(null);
  const [comentario, setComentario] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "success" | "error"; texto: string } | null>(null);

  useEffect(() => observarSessao(() => setSessao(obterSessaoAtual())), []);
  useEffect(() => {
    if (!sessao) return;
    const chave = `coroa_feedback_adiado_${sessao.papel}_${sessao.id}`;
    const adiadoAte = Number(localStorage.getItem(chave) || 0);
    if (adiadoAte > Date.now()) return;
    const timer = window.setTimeout(async () => {
      try {
        const status = await statusFeedback();
        if (status.pode_enviar) setAberto(true);
      } catch { /* a sessão pode ter terminado */ }
    }, 15 * 60 * 1000);
    return () => window.clearTimeout(timer);
  }, [sessao]);

  if (!sessao) return null;
  const adiar = () => {
    localStorage.setItem(`coroa_feedback_adiado_${sessao.papel}_${sessao.id}`, String(Date.now() + UMA_SEMANA));
    setAberto(false);
  };
  const enviar = async () => {
    if (!nota || comentario.trim().length < 10) {
      setMensagem({ tipo: "error", texto: "Escolha uma nota e escreva pelo menos 10 caracteres." });
      return;
    }
    setEnviando(true); setMensagem(null);
    try {
      await enviarFeedback({ nota, comentario: comentario.trim(), autoriza_publicacao: autoriza });
      setMensagem({ tipo: "success", texto: "Obrigado! Seu feedback foi enviado para nossa equipe." });
      window.setTimeout(() => setAberto(false), 1800);
    } catch (erro) {
      setMensagem({ tipo: "error", texto: axios.isAxiosError(erro) ? erro.response?.data?.detail || "Não foi possível enviar." : "Não foi possível enviar." });
    } finally { setEnviando(false); }
  };

  return <>
    <Fab color="primary" aria-label="Dar feedback" onClick={() => { setMensagem(null); setAberto(true); }}
      sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1200 }}>
      <ChatBubbleOutlineIcon />
    </Fab>
    <Dialog open={aberto} onClose={adiar} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontFamily={fonts.hero} fontWeight={700}>Sua opinião importa</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Como está sendo sua experiência com o Coroa Afro?</Typography>
          </Box>
          <IconButton aria-label="Agora não" onClick={adiar}><CloseIcon /></IconButton>
        </Stack>
        <Stack gap={2.5} sx={{ mt: 3 }}>
          <Rating value={nota} onChange={(_, valor) => setNota(valor)} size="large" aria-label="Nota de uma a cinco estrelas" />
          <TextField label="Conte um pouco sobre sua experiência" value={comentario}
            onChange={e => setComentario(e.target.value)} multiline minRows={4} inputProps={{ maxLength: 1000 }}
            helperText={`${comentario.length}/1000`} />
          <FormControlLabel control={<Checkbox checked={autoriza} onChange={e => setAutoriza(e.target.checked)} />}
            label="Autorizo exibir meu comentário e meu primeiro nome na página inicial." />
          {mensagem && <Alert severity={mensagem.tipo}>{mensagem.texto}</Alert>}
          <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="flex-end" gap={1}>
            <Button onClick={adiar} disabled={enviando}>Agora não</Button>
            <Button variant="contained" onClick={() => void enviar()} disabled={enviando}>Enviar feedback</Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  </>;
}
