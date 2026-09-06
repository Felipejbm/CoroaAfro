import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import AprendizadoLayout from "./AprendizadoLayout";
import {
  chaveConversa,
  enviarMensagem,
  lerMensagens,
  listarConversas,
  type Conversa,
  type Mensagem,
  type Rascunho,
} from "../../services/Auth/controllers/chat";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

const semAcesso = (err: unknown) =>
  axios.isAxiosError(err) &&
  [401, 403, 404].includes(err.response?.status ?? 0);
const juntar = (antes: Mensagem[], novas: Mensagem[]) =>
  Array.from(new Map([...antes, ...novas].map((m) => [m.id, m])).values()).sort(
    (a, b) => a.id - b.id,
  );
const horario = (data: string) =>
  new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

function HistoricoConversa({
  conversa,
  rascunho,
  onRascunho,
  onBusy,
}: {
  conversa: Conversa;
  rascunho: Rascunho;
  onRascunho: (r: Rascunho) => void;
  onBusy: (busy: boolean) => void;
}) {
  const theme = useTheme();
  const chave = chaveConversa(conversa);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [erroEnvio, setErroEnvio] = useState("");
  const [bloqueado, setBloqueado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [temAntigas, setTemAntigas] = useState(false);
  const [carregandoAntigas, setCarregandoAntigas] = useState(false);
  const [retry, setRetry] = useState(0);
  const vivo = useRef(false);
  const lista = useRef<HTMLDivElement>(null);
  const rolar = useRef(true);
  const enviandoRef = useRef(false);
  useEffect(() => {
    let active = true;
    vivo.current = true;
    let timer: ReturnType<typeof setTimeout>;
    let cursor: number | undefined;
    setLoading(true);
    setBloqueado(false);
    setErro("");
    async function atualizar() {
      let rapido = false;
      if (document.visibilityState === "hidden") {
        timer = setTimeout(() => void atualizar(), 5000);
        return;
      }
      try {
        const dados = await lerMensagens(chave, { depois: cursor });
        if (!active) return;
        if (cursor === undefined) {
          setTemAntigas(dados.tem_mais);
          setMensagens(dados.mensagens);
        } else {
          setMensagens((ms) => juntar(ms, dados.mensagens));
          rapido = dados.tem_mais;
        }
        cursor = dados.mensagens.at(-1)?.id ?? cursor ?? 0;
        setErro("");
        setBloqueado(false);
      } catch (err) {
        if (!active) return;
        setErro(mensagemErroApi(err));
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
          setLoading(false);
          return;
        }
      } finally {
        if (active) setLoading(false);
      }
      if (active)
        timer = setTimeout(() => void atualizar(), rapido ? 200 : 5000);
    }
    void atualizar();
    return () => {
      active = false;
      vivo.current = false;
      clearTimeout(timer);
    };
  }, [chave, retry]);
  useEffect(() => {
    if (rolar.current && lista.current)
      lista.current.scrollTop = lista.current.scrollHeight;
  }, [mensagens]);
  async function antigas() {
    if (!mensagens.length || carregandoAntigas) return;
    setCarregandoAntigas(true);
    const altura = lista.current?.scrollHeight ?? 0;
    const topo = lista.current?.scrollTop ?? 0;
    try {
      const dados = await lerMensagens(chave, { antes: mensagens[0].id });
      if (!vivo.current) return;
      rolar.current = false;
      setMensagens((ms) => juntar(dados.mensagens, ms));
      setTemAntigas(dados.tem_mais);
      requestAnimationFrame(() => {
        if (lista.current)
          lista.current.scrollTop = topo + lista.current.scrollHeight - altura;
      });
    } catch (err) {
      if (vivo.current) {
        setErro(mensagemErroApi(err));
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
        }
      }
    } finally {
      if (vivo.current) setCarregandoAntigas(false);
    }
  }
  async function enviar() {
    if (!rascunho.texto.trim() || enviandoRef.current || bloqueado || loading)
      return;
    enviandoRef.current = true;
    setEnviando(true);
    onBusy(true);
    setErroEnvio("");
    try {
      const mensagem = await enviarMensagem(chave, rascunho);
      if (!vivo.current) return;
      rolar.current = true;
      setMensagens((ms) => juntar(ms, [mensagem]));
      onRascunho({ texto: "", chave_envio: crypto.randomUUID() });
    } catch (err) {
      if (vivo.current) {
        setErroEnvio(
          mensagemErroApi(err) +
            " Seu texto foi mantido para tentar novamente.",
        );
        if (semAcesso(err)) {
          setBloqueado(true);
          setMensagens([]);
        }
      }
    } finally {
      enviandoRef.current = false;
      onBusy(false);
      if (vivo.current) setEnviando(false);
    }
  }
  return (
    <Paper
      sx={{
        flex: 1,
        minWidth: 0,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={2}
        sx={{ p: 2, bgcolor: theme.palette.primary.main, color: theme.palette.secondary.light }}
      >
        <Box>
          <Typography variant="h6">{conversa.nome}</Typography>
          <Typography variant="body2">
            Conversa privada · {conversa.papel}
          </Typography>
        </Box>
        <Button
          sx={{ color: theme.palette.primary.light }}
          disabled={enviando || loading || carregandoAntigas}
          onClick={() => setRetry((r) => r + 1)}
        >
          Atualizar
        </Button>
      </Stack>
      {erro && <Alert severity="error">{erro}</Alert>}
      <Stack
        ref={lista}
        role="log"
        aria-label={`Mensagens com ${conversa.nome}`}
        aria-live="polite"
        onScroll={() => {
          if (lista.current)
            rolar.current =
              lista.current.scrollHeight -
                lista.current.scrollTop -
                lista.current.clientHeight <
              80;
        }}
        sx={{
          p: 2,
          gap: 2,
          height: { xs: 380, md: 440 },
          overflowY: "auto",
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        {loading ? (
          <CircularProgress aria-label="Carregando mensagens" />
        ) : (
          <>
            {temAntigas && !bloqueado && (
              <Button
                disabled={carregandoAntigas}
                onClick={() => void antigas()}
              >
                {carregandoAntigas
                  ? "Carregando..."
                  : "Carregar mensagens anteriores"}
              </Button>
            )}
            {!mensagens.length && !erro && (
              <Typography>
                Nenhuma mensagem ainda. Comece a conversa!
              </Typography>
            )}
            {mensagens.map((m) => (
              <Box
                key={m.id}
                sx={{
                  alignSelf: m.minha ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: m.minha ? theme.palette.primary.main : theme.palette.secondary.main,
                    color: m.minha ? theme.palette.secondary.light : theme.palette.text.primary,
                  }}
                >
                  <Typography
                    sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
                  >
                    {m.texto}
                  </Typography>
                </Paper>
                <Typography variant="caption">
                  {m.minha ? "Você" : conversa.nome} · {horario(m.criado_em)}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Stack>
      {erroEnvio && <Alert severity="error">{erroEnvio}</Alert>}
      <Stack
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          void enviar();
        }}
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        sx={{ p: 2 }}
      >
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={5}
          label="Sua mensagem"
          value={rascunho.texto}
          disabled={enviando || bloqueado || loading}
          inputProps={{ maxLength: 4000 }}
          helperText={`${rascunho.texto.length}/4000 · Ctrl+Enter para enviar`}
          onChange={(e) =>
            onRascunho({
              texto: e.target.value,
              chave_envio: crypto.randomUUID(),
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              void enviar();
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<SendIcon />}
          disabled={enviando || bloqueado || loading || !rascunho.texto.trim()}
          sx={{ alignSelf: "center" }}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </Button>
      </Stack>
    </Paper>
  );
}

export default function ChatMentoria({ mentor = false }: { mentor?: boolean }) {
  const theme = useTheme();
  const [params] = useSearchParams();
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [selecionada, setSelecionada] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [rascunhos, setRascunhos] = useState<Record<string, Rascunho>>({});
  const alvo = params.get(mentor ? "empreendedor" : "mentor");
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    setLoading(true);
    async function atualizar() {
      try {
        const dados = await listarConversas();
        if (!active) return;
        setConversas(dados);
        setErro("");
      } catch (err) {
        if (active) {
          setErro(mensagemErroApi(err));
          if (semAcesso(err)) setConversas([]);
        }
      } finally {
        if (active) setLoading(false);
      }
      if (active)
        timer = setTimeout(() => {
          if (document.visibilityState === "hidden")
            timer = setTimeout(() => void atualizar(), 10000);
          else void atualizar();
        }, 10000);
    }
    void atualizar();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [retry]);
  const conversa =
    conversas.find((c) => chaveConversa(c) === selecionada) ??
    (!selecionada && alvo
      ? conversas.find(
          (c) => String(mentor ? c.id_empreendedor : c.id_mentor) === alvo,
        )
      : undefined);
  const chave = conversa ? chaveConversa(conversa) : "";
  return (
    <AprendizadoLayout mentor={mentor} titulo="Mensagens">
      <Typography>
        Converse com {mentor ? "seus mentorados" : "seus mentores"}. As
        mensagens são atualizadas automaticamente enquanto a conversa estiver
        aberta.
      </Typography>
      <Typography variant="body2">
        Nesta etapa: texto, sem anexos, chamadas ou confirmação de leitura.
      </Typography>
      {erro && <Alert severity="error">{erro}</Alert>}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={3}
        alignItems="stretch"
      >
        <Paper
          sx={{
            width: { xs: "100%", lg: 280 },
            flexShrink: 0,
            p: 2,
            bgcolor: theme.palette.secondary.light,
            color: theme.palette.text.primary,
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
            boxShadow: "0 8px 24px rgba(77,0,18,0.06)",
            borderRadius: 3,
          }}
        >
          <TextField
            fullWidth
            label="Buscar conversa"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            sx={{ bgcolor: theme.palette.secondary.light, borderRadius: 2, mb: 2 }}
          />
          <Button
            sx={{ color: theme.palette.primary.light }}
            disabled={busy || loading}
            onClick={() => setRetry((r) => r + 1)}
          >
            Atualizar contatos
          </Button>
          {loading && <CircularProgress aria-label="Carregando conversas" />}
          {!loading && !conversas.length && !erro && (
            <Typography>
              {mentor
                ? "Os empreendedores aparecerão quando escolherem suas trilhas."
                : "Comece uma trilha no catálogo para conversar com o mentor."}
            </Typography>
          )}
          <List>
            {conversas
              .filter((c) =>
                c.nome.toLocaleLowerCase().includes(busca.toLocaleLowerCase()),
              )
              .map((c) => (
                <ListItemButton
                  key={chaveConversa(c)}
                  selected={chave === chaveConversa(c)}
                  disabled={busy}
                  onClick={() => setSelecionada(chaveConversa(c))}
                  sx={{
                    borderRadius: 2,
                    "&.Mui-selected": { bgcolor: theme.palette.secondary.main },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700}>{c.nome}</Typography>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: alpha(theme.palette.text.primary, 0.7) }}
                    >
                      {c.ultima_mensagem?.texto || "Começar conversa"}
                    </Typography>
                  </Box>
                </ListItemButton>
              ))}
          </List>
        </Paper>
        {conversa ? (
          <HistoricoConversa
            key={chave}
            conversa={conversa}
            rascunho={rascunhos[chave] ?? { texto: "", chave_envio: "" }}
            onBusy={setBusy}
            onRascunho={(r) =>
              setRascunhos((atuais) => ({ ...atuais, [chave]: r }))
            }
          />
        ) : (
          <Alert severity="info" sx={{ flex: 1, alignSelf: "flex-start" }}>
            Selecione uma conversa disponível.
          </Alert>
        )}
      </Stack>
    </AprendizadoLayout>
  );
}
