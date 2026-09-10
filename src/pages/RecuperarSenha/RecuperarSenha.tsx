import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import Layout from "../../components/Layout/Layout";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import {
  confirmarRecuperacaoSenha,
  solicitarRecuperacaoSenha,
  type PapelRecuperacao,
} from "../../services/Auth/controllers/auth";
import theme, { fonts } from "../../styles/theme";

type Etapa = "email" | "codigo" | "sucesso";

function mensagemErro(error: unknown) {
  if (axios.isAxiosError<{ detail?: string }>(error)) {
    if (!error.response) return "Não foi possível conectar ao backend.";
    return error.response.data?.detail ?? "Não foi possível concluir a solicitação.";
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<Etapa>("email");
  const [papel, setPapel] = useState<PapelRecuperacao>("empreendedor");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [codigoDemo, setCodigoDemo] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const solicitar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return setErro("Informe o e-mail da sua conta.");
    setCarregando(true);
    setErro("");
    try {
      const resposta = await solicitarRecuperacaoSenha(email.trim(), papel);
      setCodigoDemo(resposta.demo_code ?? "");
      setEtapa("codigo");
    } catch (error) {
      setErro(mensagemErro(error));
    } finally {
      setCarregando(false);
    }
  };

  const redefinir = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(codigo)) return setErro("Digite o código de 6 números.");
    if (novaSenha.length < 8) return setErro("A nova senha deve ter pelo menos 8 caracteres.");
    if (novaSenha !== confirmacao) return setErro("As senhas digitadas não são iguais.");
    setCarregando(true);
    setErro("");
    try {
      await confirmarRecuperacaoSenha(email.trim(), papel, codigo, novaSenha);
      setEtapa("sucesso");
    } catch (error) {
      setErro(mensagemErro(error));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Layout showSidebar={false}>
      <NavBarLandPage />
      <Stack sx={{ minHeight: "78vh", bgcolor: "secondary.light", justifyContent: "center", py: { xs: 5, md: 8 } }}>
        <Container maxWidth="sm">
          <Stack sx={{ bgcolor: "secondary.main", borderRadius: 5, px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 }, boxShadow: `0 16px 42px ${alpha(theme.palette.primary.dark, 0.18)}` }}>
            <Box sx={{ width: 58, height: 58, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main", mb: 2 }}>
              <LockResetRoundedIcon sx={{ fontSize: 34 }} />
            </Box>

            {etapa === "sucesso" ? (
              <Stack gap={2}>
                <Typography component="h1" sx={{ fontFamily: fonts.hero, fontSize: { xs: "1.8rem", sm: "2.2rem" }, fontWeight: 700 }}>Senha redefinida!</Typography>
                <Alert severity="success">Sua nova senha já está pronta para ser utilizada.</Alert>
                <Button variant="contained" size="large" onClick={() => navigate("/login", { replace: true })} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}>Entrar na minha conta</Button>
              </Stack>
            ) : (
              <Stack component="form" onSubmit={etapa === "email" ? solicitar : redefinir} gap={2.2}>
                <Box>
                  <Typography component="h1" sx={{ fontFamily: fonts.hero, fontSize: { xs: "1.8rem", sm: "2.2rem" }, fontWeight: 700 }}>Recuperar senha</Typography>
                  <Typography sx={{ mt: 1, color: alpha(theme.palette.text.primary, 0.72), lineHeight: 1.6 }}>
                    {etapa === "email" ? "Informe os dados da sua conta para gerar um código de recuperação." : `Digite o código gerado para ${email} e escolha sua nova senha.`}
                  </Typography>
                </Box>

                {erro && <Alert severity="error">{erro}</Alert>}
                {etapa === "codigo" && codigoDemo && (
                  <Alert severity="info">
                    <strong>Modo de demonstração:</strong> seu código é <strong>{codigoDemo}</strong>. Em produção, ele será enviado por e-mail.
                  </Alert>
                )}

                {etapa === "email" ? (
                  <>
                    <TextField select label="Tipo de conta" value={papel} disabled={carregando} onChange={(event) => setPapel(event.target.value as PapelRecuperacao)}>
                      <MenuItem value="empreendedor">Empreendedor</MenuItem>
                      <MenuItem value="mentor">Mentor</MenuItem>
                    </TextField>
                    <TextField label="E-mail" type="email" value={email} disabled={carregando} autoComplete="email" onChange={(event) => setEmail(event.target.value)} />
                    <Button type="submit" variant="contained" size="large" disabled={carregando} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}>
                      {carregando ? <CircularProgress size={24} color="inherit" /> : "Gerar código de recuperação"}
                    </Button>
                  </>
                ) : (
                  <>
                    <TextField label="Código de 6 números" value={codigo} disabled={carregando} inputProps={{ inputMode: "numeric", maxLength: 6 }} onChange={(event) => setCodigo(event.target.value.replace(/\D/g, "").slice(0, 6))} />
                    <TextField label="Nova senha" type="password" value={novaSenha} disabled={carregando} autoComplete="new-password" helperText="Use pelo menos 8 caracteres." onChange={(event) => setNovaSenha(event.target.value)} />
                    <TextField label="Confirme a nova senha" type="password" value={confirmacao} disabled={carregando} autoComplete="new-password" onChange={(event) => setConfirmacao(event.target.value)} />
                    <Button type="submit" variant="contained" size="large" disabled={carregando} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}>
                      {carregando ? <CircularProgress size={24} color="inherit" /> : "Salvar nova senha"}
                    </Button>
                    <Button disabled={carregando} onClick={() => { setEtapa("email"); setCodigo(""); setCodigoDemo(""); setErro(""); }} sx={{ textTransform: "none" }}>Solicitar outro código</Button>
                  </>
                )}

                <Button component={RouterLink} to="/login" startIcon={<ArrowBackRoundedIcon />} sx={{ alignSelf: "center", color: "primary.dark", textTransform: "none" }}>Voltar para o login</Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Stack>
      <FooterLandPage />
    </Layout>
  );
}
