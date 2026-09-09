import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Alert, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import ModalHeader from "../../components/ModalHeader/ModalHeader";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import { solicitarMentoria } from "../../services/Auth/controllers/admin";
import { fonts } from "../../styles/theme";

const inicial = { nome: "", email: "", senha: "", especialidade: "", biografia: "" };

export default function CadastroMentor() {
  const navigate = useNavigate();
  const [form, setForm] = useState(inicial);
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState("");
  const [concluido, setConcluido] = useState(false);

  const enviar = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setErro("");
    try {
      await solicitarMentoria(form);
      setConcluido(true);
      setForm(inicial);
    } catch (error) {
      setErro(axios.isAxiosError<{ detail?: string }>(error)
        ? error.response?.data?.detail ?? "Não foi possível enviar a solicitação."
        : "Não foi possível enviar a solicitação.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "secondary.light" }}>
      <NavBarLandPage />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack component="form" onSubmit={enviar} gap={2.2} sx={{ p: { xs: 3, sm: 5 }, bgcolor: "secondary.main", borderRadius: 4, boxShadow: "0 14px 34px rgba(77, 0, 18, 0.14)" }}>
          <Typography component="h1" variant="h4" fontFamily={fonts.hero} fontWeight={700}>Quero ser mentor</Typography>
          <Typography>Conte sobre sua experiência. A equipe do Coroa Afro analisará sua solicitação antes de liberar o acesso.</Typography>
          {erro && <Alert severity="error">{erro}</Alert>}
          <TextField required label="Nome completo" value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} />
          <TextField required type="email" label="E-mail" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <TextField required type="password" label="Senha" helperText="Use pelo menos 8 caracteres." inputProps={{ minLength: 8 }} value={form.senha} onChange={(event) => setForm({ ...form, senha: event.target.value })} />
          <TextField required label="Especialidade" placeholder="Ex.: Marketing digital" value={form.especialidade} onChange={(event) => setForm({ ...form, especialidade: event.target.value })} />
          <TextField required multiline minRows={4} label="Biografia profissional" helperText="Conte sua experiência em pelo menos 20 caracteres." inputProps={{ minLength: 20, maxLength: 2000 }} value={form.biografia} onChange={(event) => setForm({ ...form, biografia: event.target.value })} />
          <Button type="submit" variant="contained" size="large" disabled={busy} sx={{ textTransform: "none", fontWeight: 700 }}>
            {busy ? <CircularProgress size={22} color="inherit" /> : "Enviar para análise"}
          </Button>
          <Button component={Link} to="/login" disabled={busy} sx={{ textTransform: "none" }}>Voltar para o login</Button>
        </Stack>
      </Container>
      <FooterLandPage />
      <Dialog open={concluido} fullWidth maxWidth="xs" disableEscapeKeyDown>
        <ModalHeader id="solicitacao-mentor-enviada" titulo="Cadastro enviado!" categoria="Solicitação em análise" descricao="A equipe do Coroa Afro precisa aprovar seu perfil antes do primeiro acesso." icone={<CheckCircleOutlineRoundedIcon />} />
        <DialogContent>
          <Alert severity="success" sx={{ mb: 2 }}>Recebemos sua solicitação com sucesso.</Alert>
          <Typography sx={{ lineHeight: 1.7 }}>
            Volte daqui a algum tempo e tente entrar selecionando a opção <strong>Mentor</strong>. Se o cadastro já tiver sido aprovado, seu acesso será liberado normalmente.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button fullWidth variant="contained" startIcon={<HomeRoundedIcon />} onClick={() => navigate("/", { replace: true })} sx={{ py: 1.2, textTransform: "none", fontWeight: 700 }}>
            Voltar para a página inicial
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
