import SendIcon from "@mui/icons-material/Send";
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
import {
  chaveConversa
} from "../../services/Auth/controllers/chat";
import AprendizadoLayout from "./AprendizadoLayout";
import { useChatMentoria, useHistoricoConversa } from "./ChatMentoria.hook";
import type { ChatMentoriaProps, HistoricoConversaProps } from "./ChatMentoria.types";
import { horario } from "./ChatMentoria.utils";

function HistoricoConversa({
  conversa,
  rascunho,
  onRascunho,
  onBusy,
}: HistoricoConversaProps) {
  const {
    mensagens,
    loading,
    erro,
    erroEnvio,
    bloqueado,
    enviando,
    temAntigas,
    carregandoAntigas,
    setRetry,
    lista,
    rolar,
    antigas,
    enviar,
  } = useHistoricoConversa({ conversa, rascunho, onRascunho, onBusy });

  const theme = useTheme();
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

export default function ChatMentoria({ mentor = false }: ChatMentoriaProps) {
  const {
    conversas,
    setSelecionada,
    busca,
    setBusca,
    loading,
    erro,
    setRetry,
    busy,
    setBusy,
    rascunhos,
    setRascunhos,
    conversa,
    chave,
  } = useChatMentoria({ mentor });

  const theme = useTheme();
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
