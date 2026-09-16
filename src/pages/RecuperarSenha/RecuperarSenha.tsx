import { useState, type FormEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Alert, Button, Container, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import api from "../../api/axios";
import { atualizarSessao } from "../../services/Auth/controllers/auth";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

export default function RecuperarSenha() {
  const location = useLocation();
  const [params] = useSearchParams();
  const redefinir = location.pathname === "/redefinir-senha";
  const [token] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get("token") || "");
  const [email, setEmail] = useState((location.state as { email?: string } | null)?.email || "");
  const [papel, setPapel] = useState(params.get("papel") === "mentor" ? "mentor" : "empreendedor");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const tokenValido = /^[A-Za-z0-9_-]{43}$/.test(token);
  const senhaValida = senha.trim().length >= 12 && senha.length <= 128;
  const podeEnviar = redefinir ? tokenValido && senhaValida && senha === confirmacao : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function enviar(event: FormEvent) {
    event.preventDefault();
    if (ocupado || !podeEnviar) return;
    setOcupado(true); setErro("");
    try {
      const r = redefinir
        ? await api.post("/auth/redefinir-senha", { token, senha })
        : await api.post("/auth/recuperar-senha", { email: email.trim().toLowerCase(), papel });
      setMensagem(r.data.mensagem);
      if (redefinir) {
        setSenha(""); setConfirmacao(""); atualizarSessao(null);
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (error) { setErro(mensagemErroApi(error)); }
    finally { setOcupado(false); }
  }

  return <Stack sx={{ minHeight: "100vh", bgcolor: "secondary.light", justifyContent: "center", py: 5 }}>
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, border: "1px solid", borderColor: "secondary.main" }}>
        <Stack gap={2.5} component="form" onSubmit={enviar}>
          <LockResetIcon color="primary" sx={{ fontSize: 42 }} />
          <Typography component="h1" variant="h4">{redefinir ? "Crie uma nova senha" : "Recupere seu acesso"}</Typography>
          <Typography color="text.secondary">{redefinir ? "Escolha uma senha de 12 a 128 caracteres. Você precisará entrar novamente em seus dispositivos." : "Enviaremos um link de segurança para o e-mail cadastrado. Ele vale por 30 minutos."}</Typography>
          {erro && <Alert severity="error">{erro}</Alert>}
          {mensagem ? <>
            <Alert severity="success">{mensagem}</Alert>
            {!redefinir && <Typography variant="body2">Não recebeu? Confira o e-mail e o tipo de conta, verifique o spam e aguarde alguns minutos antes de tentar novamente.</Typography>}
            <Button component={Link} to="/login" variant="contained">Voltar ao login</Button>
            {!redefinir && <Button onClick={() => setMensagem("")}>Corrigir dados ou tentar novamente</Button>}
          </> : redefinir ? <>
            {!tokenValido ? <Alert severity="warning">Abra o link completo recebido por e-mail para redefinir sua senha.</Alert> : <>
              <TextField label="Nova senha" type="password" autoComplete="new-password" required value={senha} disabled={ocupado}
                onChange={e => setSenha(e.target.value)} error={!!senha && !senhaValida} helperText="Use pelo menos 12 caracteres. Uma frase com várias palavras é uma boa opção." slotProps={{ htmlInput: { minLength: 12, maxLength: 128 } }} />
              <TextField label="Confirme a nova senha" type="password" autoComplete="new-password" required value={confirmacao} disabled={ocupado}
                onChange={e => setConfirmacao(e.target.value)} error={!!confirmacao && senha !== confirmacao} helperText={confirmacao && senha !== confirmacao ? "As senhas precisam ser iguais." : "Digite a mesma senha novamente."} slotProps={{ htmlInput: { maxLength: 128 } }} />
              <Button type="submit" variant="contained" disabled={ocupado || !podeEnviar}>{ocupado ? "Salvando..." : "Redefinir senha"}</Button>
            </>}
            <Button component={Link} to="/recuperar-senha">Solicitar um novo link</Button>
          </> : <>
            <TextField select label="Tipo de conta" value={papel} disabled={ocupado} onChange={e => setPapel(e.target.value)}>
              <MenuItem value="empreendedor">Empreendedor</MenuItem><MenuItem value="mentor">Mentor</MenuItem>
            </TextField>
            <TextField label="E-mail cadastrado" type="email" autoComplete="email" required value={email} disabled={ocupado} onChange={e => setEmail(e.target.value)} slotProps={{ htmlInput: { maxLength: 255 } }} />
            <Button type="submit" variant="contained" disabled={ocupado || !podeEnviar}>{ocupado ? "Solicitando..." : "Enviar link de segurança"}</Button>
          </>}
          {!mensagem && <Button component={Link} to="/login" disabled={ocupado}>Voltar ao login</Button>}
        </Stack>
      </Paper>
    </Container>
  </Stack>;
}
