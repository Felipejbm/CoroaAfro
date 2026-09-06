import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";
import {
  arquivarConversaIA,
  buscarModosIA,
  criarConversaIA,
  enviarMensagemIA,
  listarConversasIA,
  listarMensagensIA,
  mensagemErroIA,
  type ConversaIA,
  type MensagemIA,
  type ModoIA,
} from "../../services/Auth/controllers/ia";

const formatarHora = (data: string) =>
  new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(data));

export default function AssistenteIA() {
  const theme = useTheme();
  const fimRef = useRef<HTMLDivElement | null>(null);
  const [modos, setModos] = useState<ModoIA[]>([]);
  const [modo, setModo] = useState("geral");
  const [conversas, setConversas] = useState<ConversaIA[]>([]);
  const [conversaAtiva, setConversaAtiva] = useState<ConversaIA | null>(null);
  const [mensagens, setMensagens] = useState<MensagemIA[]>([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const carregarMensagens = useCallback(async (conversa: ConversaIA) => {
    setConversaAtiva(conversa);
    setErro("");
    try {
      setMensagens(await listarMensagensIA(conversa.id_conversa));
    } catch (error) {
      setErro(mensagemErroIA(error));
    }
  }, []);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [opcoes, historico] = await Promise.all([buscarModosIA(), listarConversasIA()]);
        setModos(opcoes);
        setConversas(historico);
        if (historico[0]) await carregarMensagens(historico[0]);
      } catch (error) {
        setErro(mensagemErroIA(error));
      } finally {
        setCarregando(false);
      }
    };
    void carregar();
  }, [carregarMensagens]);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, enviando]);

  const novaConversa = () => {
    setConversaAtiva(null);
    setMensagens([]);
    setTexto("");
    setModo("geral");
    setErro("");
  };

  const enviar = async () => {
    const conteudo = texto.trim();
    if (!conteudo || enviando) return;
    setEnviando(true);
    setErro("");
    setTexto("");
    try {
      let conversa = conversaAtiva;
      if (!conversa) {
        conversa = await criarConversaIA(conteudo.slice(0, 55));
        setConversaAtiva(conversa);
        setConversas((atuais) => [conversa!, ...atuais]);
      }
      const resposta = await enviarMensagemIA(conversa.id_conversa, conteudo, modo);
      setMensagens((atuais) => [
        ...atuais,
        resposta.mensagem_usuario,
        resposta.mensagem_assistente,
      ]);
      setConversaAtiva(resposta.conversa);
      setConversas((atuais) => [
        resposta.conversa,
        ...atuais.filter((item) => item.id_conversa !== resposta.conversa.id_conversa),
      ]);
    } catch (error) {
      setTexto(conteudo);
      setErro(mensagemErroIA(error));
    } finally {
      setEnviando(false);
    }
  };

  const arquivar = async () => {
    if (!conversaAtiva || enviando) return;
    try {
      await arquivarConversaIA(conversaAtiva.id_conversa);
      setConversas((atuais) =>
        atuais.filter((item) => item.id_conversa !== conversaAtiva.id_conversa),
      );
      novaConversa();
    } catch (error) {
      setErro(mensagemErroIA(error));
    }
  };

  const modoAtivo = modos.find((item) => item.id === modo);

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100dvh", bgcolor: "secondary.light" }}>
      <NavBar />
      <Stack direction={{ xs: "column", md: "row" }} sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Stack
          component="aside"
          sx={{
            width: { xs: "100%", md: 210, lg: 275 },
            maxHeight: { xs: "30dvh", md: "none" },
            overflowY: "auto",
            flexShrink: 0,
            bgcolor: alpha(theme.palette.primary.main, 0.97),
            color: "secondary.light",
            borderLeft: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
          }}
        >
          <Stack sx={{ p: 2.5, gap: 2 }}>
            <Stack direction="row" alignItems="center" gap={1.2}>
              <AutoAwesomeRoundedIcon sx={{ color: "secondary.main" }} />
              <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.05rem" }}>
                Assistente IA
              </Typography>
            </Stack>
            <Button
              fullWidth
              startIcon={<AddRoundedIcon />}
              onClick={novaConversa}
              sx={{
                bgcolor: "secondary.main",
                color: "primary.dark",
                fontWeight: 700,
                borderRadius: 2,
                "&:hover": { bgcolor: "secondary.light" },
              }}
            >
              Nova conversa
            </Button>
          </Stack>
          <Typography sx={{ px: 2.5, pb: 1, fontSize: "0.72rem", opacity: 0.55 }}>
            SUAS CONVERSAS
          </Typography>
          <Stack sx={{ overflowY: "auto", px: 1.25, pb: 2, gap: 0.5 }}>
            {conversas.map((conversa) => (
              <Button
                key={conversa.id_conversa}
                onClick={() => void carregarMensagens(conversa)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  color: "secondary.light",
                  bgcolor:
                    conversaAtiva?.id_conversa === conversa.id_conversa
                      ? alpha(theme.palette.primary.light, 0.7)
                      : "transparent",
                  borderRadius: 2,
                  px: 1.5,
                  py: 1.1,
                  textTransform: "none",
                  overflow: "hidden",
                  "&:hover": { bgcolor: alpha(theme.palette.primary.light, 0.45) },
                }}
              >
                <Typography noWrap sx={{ width: "100%", fontSize: "0.8rem" }}>
                  {conversa.titulo}
                </Typography>
              </Button>
            ))}
            {!carregando && conversas.length === 0 && (
              <Typography sx={{ px: 1.5, py: 2, fontSize: "0.78rem", opacity: 0.58 }}>
                Sua primeira conversa aparecerá aqui.
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack component="main" sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: { xs: 2, md: 4 }, py: 2, bgcolor: "secondary.light", borderBottom: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}` }}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Avatar sx={{ bgcolor: "primary.main", color: "secondary.light" }}>
                <SmartToyOutlinedIcon />
              </Avatar>
              <Stack>
                <Typography sx={{ color: "primary.dark", fontFamily: fonts.heading, fontWeight: 700 }}>
                  Coroa IA
                </Typography>
                <Typography sx={{ color: alpha(theme.palette.text.primary, 0.65), fontSize: "0.75rem" }}>
                  Sua assistente para negócios e presença digital
                </Typography>
              </Stack>
            </Stack>
            {conversaAtiva && (
              <Tooltip title="Arquivar conversa">
                <IconButton onClick={() => void arquivar()} sx={{ color: "primary.main" }}>
                  <ArchiveOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Stack sx={{ height: "calc(100% - 73px)", overflow: "hidden" }}>
            <Stack sx={{ flex: 1, overflowY: "auto", px: { xs: 2, md: 5 }, py: 3 }}>
              {erro && <Alert severity="warning" sx={{ mb: 2 }}>{erro}</Alert>}
              {carregando ? (
                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 300 }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Stack>
              ) : mensagens.length === 0 ? (
                <Stack alignItems="center" sx={{ maxWidth: 880, mx: "auto", pt: { xs: 2, md: 5 } }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "24px",
                      color: "secondary.light",
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
                      boxShadow: `0 14px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
                    }}
                  >
                    <AutoAwesomeRoundedIcon sx={{ fontSize: 34 }} />
                  </Box>
                  <Typography sx={{ mt: 2.5, fontFamily: fonts.hero, fontSize: { xs: "1.65rem", md: "2.15rem" }, color: "primary.dark", textAlign: "center" }}>
                    Como posso ajudar seu negócio hoje?
                  </Typography>
                  <Typography sx={{ mt: 1, maxWidth: 610, color: alpha(theme.palette.text.primary, 0.7), textAlign: "center" }}>
                    Escolha um tipo de ajuda ou escreva livremente. A assistente considera seus dados cadastrados, metas, trilhas e Instagram.
                  </Typography>
                  <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 1.5, mt: 4 }}>
                    {modos.filter((item) => item.id !== "geral").map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => { setModo(item.id); setTexto(item.sugestao); }}
                        sx={{
                          display: "block",
                          textAlign: "left",
                          bgcolor: "secondary.light",
                          color: "primary.dark",
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                          borderRadius: 3,
                          p: 2,
                          boxShadow: `0 8px 22px ${alpha(theme.palette.primary.dark, 0.05)}`,
                          "&:hover": { bgcolor: alpha(theme.palette.primary.light, 0.08), borderColor: "primary.light", transform: "translateY(-2px)" },
                          transition: "all .2s ease",
                        }}
                      >
                        <Typography sx={{ fontFamily: fonts.subheading, fontWeight: 700, fontSize: "0.9rem" }}>{item.nome}</Typography>
                        <Typography sx={{ mt: 0.5, fontSize: "0.76rem", color: alpha(theme.palette.text.primary, 0.65) }}>{item.descricao}</Typography>
                      </Button>
                    ))}
                  </Box>
                </Stack>
              ) : (
                <Stack sx={{ maxWidth: 900, mx: "auto", gap: 2 }}>
                  {mensagens.map((mensagem) => {
                    const usuario = mensagem.papel === "usuario";
                    return (
                      <Stack key={mensagem.id_mensagem} direction="row" justifyContent={usuario ? "flex-end" : "flex-start"} gap={1.2}>
                        {!usuario && <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", color: "secondary.light" }}><AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} /></Avatar>}
                        <Stack sx={{ maxWidth: { xs: "88%", md: "72%" }, alignItems: usuario ? "flex-end" : "flex-start" }}>
                          <Box sx={{ bgcolor: usuario ? "primary.main" : "#fff", color: usuario ? "secondary.light" : "text.primary", px: 2, py: 1.5, borderRadius: usuario ? "18px 18px 4px 18px" : "4px 18px 18px 18px", boxShadow: `0 7px 18px ${alpha(theme.palette.primary.dark, 0.08)}` }}>
                            <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.65, fontSize: "0.9rem" }}>{mensagem.conteudo}</Typography>
                          </Box>
                          <Typography sx={{ mt: 0.5, px: 0.5, fontSize: "0.66rem", color: alpha(theme.palette.text.primary, 0.48) }}>{formatarHora(mensagem.criada_em)}</Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                  {enviando && (
                    <Stack direction="row" gap={1.2} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", color: "secondary.light" }}><AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} /></Avatar>
                      <Stack direction="row" alignItems="center" gap={1.2} sx={{ bgcolor: "#fff", px: 2, py: 1.3, borderRadius: "4px 18px 18px 18px" }}>
                        <CircularProgress size={16} sx={{ color: "primary.main" }} />
                        <Typography sx={{ fontSize: "0.82rem", color: alpha(theme.palette.text.primary, 0.65) }}>Analisando seus dados...</Typography>
                      </Stack>
                    </Stack>
                  )}
                  <div ref={fimRef} />
                </Stack>
              )}
            </Stack>

            <Stack sx={{ px: { xs: 2, md: 5 }, pb: 2.5, pt: 1.5, bgcolor: alpha(theme.palette.secondary.light, 0.96), borderTop: `1px solid ${alpha(theme.palette.primary.dark, 0.08)}` }}>
              <Stack sx={{ width: "100%", maxWidth: 900, mx: "auto", gap: 1 }}>
                <Stack direction="row" gap={0.75} sx={{ overflowX: "auto", pb: 0.5 }}>
                  {modos.map((item) => (
                    <Button key={item.id} onClick={() => setModo(item.id)} size="small" sx={{ flexShrink: 0, borderRadius: 5, px: 1.5, bgcolor: modo === item.id ? "primary.main" : alpha(theme.palette.primary.main, 0.07), color: modo === item.id ? "secondary.light" : "primary.main", fontSize: "0.72rem", "&:hover": { bgcolor: modo === item.id ? "primary.dark" : alpha(theme.palette.primary.main, 0.14) } }}>{item.nome}</Button>
                  ))}
                </Stack>
                <Stack direction="row" alignItems="flex-end" gap={1} sx={{ bgcolor: "#fff", border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, borderRadius: 3, p: 1, boxShadow: `0 10px 28px ${alpha(theme.palette.primary.dark, 0.08)}` }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={5}
                    value={texto}
                    disabled={enviando}
                    placeholder={modoAtivo?.sugestao ?? "Escreva sua pergunta..."}
                    onChange={(event) => setTexto(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void enviar();
                      }
                    }}
                    variant="standard"
                    slotProps={{ input: { disableUnderline: true, sx: { px: 1, py: 0.7, fontSize: "0.9rem" } } }}
                  />
                  <IconButton disabled={!texto.trim() || enviando} onClick={() => void enviar()} sx={{ bgcolor: "primary.main", color: "secondary.light", "&:hover": { bgcolor: "primary.dark" }, "&.Mui-disabled": { bgcolor: alpha(theme.palette.primary.main, 0.18) } }}>
                    {enviando ? <CircularProgress size={20} color="inherit" /> : <SendRoundedIcon />}
                  </IconButton>
                </Stack>
                <Typography sx={{ textAlign: "center", fontSize: "0.67rem", color: alpha(theme.palette.text.primary, 0.52) }}>
                  A Coroa IA pode cometer erros. Confira informações importantes antes de agir.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
