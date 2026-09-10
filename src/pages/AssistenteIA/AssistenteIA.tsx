import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
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
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";
import {
  arquivarConversaIA,
  buscarModosIA,
  criarConversaIA,
  enviarMensagemIA,
  excluirConversaIA,
  listarConversasIA,
  listarMensagensIA,
  mensagemErroIA,
  renomearConversaIA,
  type ConversaIA,
  type MensagemIA,
  type ModoIA,
} from "../../services/Auth/controllers/ia";
import { salvarMeta, type MetaEntrada } from "../../services/Auth/controllers/metas";

const formatarHora = (data: string) =>
  new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(data));

const textoComDestaque = (texto: string) =>
  texto.split(/(\*\*.*?\*\*)/g).map((trecho, indice) =>
    trecho.startsWith("**") && trecho.endsWith("**") ? (
      <Box component="strong" key={indice} sx={{ fontWeight: 750 }}>{trecho.slice(2, -2)}</Box>
    ) : trecho,
  );

function ConteudoResposta({ conteudo }: { conteudo: string }) {
  return (
    <Stack gap={0.65}>
      {conteudo.split("\n").map((linha, indice) => {
        if (!linha.trim()) return <Box key={indice} sx={{ height: 4 }} />;
        const titulo = linha.match(/^#{1,3}\s+(.+)/);
        const item = linha.match(/^[-*]\s+(.+)/);
        const numerado = linha.match(/^(\d+)\.\s+(.+)/);
        if (titulo) return <Typography key={indice} sx={{ fontWeight: 800, fontSize: "0.96rem", mt: 0.4 }}>{textoComDestaque(titulo[1])}</Typography>;
        if (item) return <Stack key={indice} direction="row" gap={1}><Box component="span">•</Box><Typography sx={{ lineHeight: 1.65, fontSize: "0.9rem" }}>{textoComDestaque(item[1])}</Typography></Stack>;
        if (numerado) return <Stack key={indice} direction="row" gap={1}><Box component="span" sx={{ fontWeight: 700 }}>{numerado[1]}.</Box><Typography sx={{ lineHeight: 1.65, fontSize: "0.9rem" }}>{textoComDestaque(numerado[2])}</Typography></Stack>;
        return <Typography key={indice} sx={{ lineHeight: 1.65, fontSize: "0.9rem" }}>{textoComDestaque(linha)}</Typography>;
      })}
    </Stack>
  );
}

export default function AssistenteIA() {
  const theme = useTheme();
  const fimRef = useRef<HTMLDivElement | null>(null);
  const digitacaoRef = useRef<number | null>(null);
  const respostaCompletaRef = useRef<{ id: number; conteudo: string } | null>(null);
  const [modos, setModos] = useState<ModoIA[]>([]);
  const [modo, setModo] = useState("geral");
  const [conversas, setConversas] = useState<ConversaIA[]>([]);
  const [conversaAtiva, setConversaAtiva] = useState<ConversaIA | null>(null);
  const [mensagens, setMensagens] = useState<MensagemIA[]>([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [digitando, setDigitando] = useState(false);
  const [copiada, setCopiada] = useState<number | null>(null);
  const [dialogo, setDialogo] = useState<"renomear" | "excluir" | null>(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [fontesContexto, setFontesContexto] = useState<string[]>([]);
  const [metaForm, setMetaForm] = useState<MetaEntrada | null>(null);
  const [salvandoMeta, setSalvandoMeta] = useState(false);
  const [erroMeta, setErroMeta] = useState("");
  const [sucessoMeta, setSucessoMeta] = useState("");
  const [erro, setErro] = useState("");

  const pararDigitacao = useCallback(() => {
    if (digitacaoRef.current !== null) window.clearInterval(digitacaoRef.current);
    digitacaoRef.current = null;
    respostaCompletaRef.current = null;
    setDigitando(false);
  }, []);

  const interromperDigitacao = useCallback(() => {
    const resposta = respostaCompletaRef.current;
    if (resposta) {
      setMensagens((atuais) => atuais.map((item) =>
        item.id_mensagem === resposta.id
          ? { ...item, conteudo: resposta.conteudo }
          : item,
      ));
    }
    pararDigitacao();
  }, [pararDigitacao]);

  const carregarMensagens = useCallback(async (conversa: ConversaIA) => {
    pararDigitacao();
    setConversaAtiva(conversa);
    setFontesContexto([]);
    setErro("");
    try {
      setMensagens(await listarMensagensIA(conversa.id_conversa));
    } catch (error) {
      setErro(mensagemErroIA(error));
    }
  }, [pararDigitacao]);

  useEffect(() => () => {
    if (digitacaoRef.current !== null) window.clearInterval(digitacaoRef.current);
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
  }, [mensagens, enviando, digitando]);

  const novaConversa = () => {
    pararDigitacao();
    setConversaAtiva(null);
    setMensagens([]);
    setTexto("");
    setModo("geral");
    setFontesContexto([]);
    setErro("");
  };

  const enviar = async () => {
    const conteudo = texto.trim();
    if (!conteudo || enviando || digitando) return;
    setEnviando(true);
    setErro("");
    setTexto("");
    const idTemporario = -Date.now();
    const mensagemTemporaria: MensagemIA = {
      id_mensagem: idTemporario,
      id_conversa: conversaAtiva?.id_conversa ?? 0,
      papel: "usuario",
      conteudo,
      criada_em: new Date().toISOString(),
    };
    setMensagens((atuais) => [...atuais, mensagemTemporaria]);
    try {
      let conversa = conversaAtiva;
      if (!conversa) {
        conversa = await criarConversaIA(conteudo.slice(0, 55));
        setConversaAtiva(conversa);
        setConversas((atuais) => [conversa!, ...atuais]);
      }
      const resposta = await enviarMensagemIA(conversa.id_conversa, conteudo, modo);
      setFontesContexto(resposta.fontes_contexto);
      const respostaVazia = { ...resposta.mensagem_assistente, conteudo: "" };
      setMensagens((atuais) => [
        ...atuais.filter((item) => item.id_mensagem !== idTemporario),
        resposta.mensagem_usuario,
        respostaVazia,
      ]);
      setEnviando(false);
      setDigitando(true);
      let indice = 0;
      const textoCompleto = resposta.mensagem_assistente.conteudo;
      respostaCompletaRef.current = {
        id: resposta.mensagem_assistente.id_mensagem,
        conteudo: textoCompleto,
      };
      digitacaoRef.current = window.setInterval(() => {
        indice = Math.min(indice + 3, textoCompleto.length);
        setMensagens((atuais) => atuais.map((item) =>
          item.id_mensagem === resposta.mensagem_assistente.id_mensagem
            ? { ...item, conteudo: textoCompleto.slice(0, indice) }
            : item,
        ));
        if (indice >= textoCompleto.length) {
          respostaCompletaRef.current = null;
          pararDigitacao();
        }
      }, 18);
      setConversaAtiva(resposta.conversa);
      setConversas((atuais) => [
        resposta.conversa,
        ...atuais.filter((item) => item.id_conversa !== resposta.conversa.id_conversa),
      ]);
    } catch (error) {
      setMensagens((atuais) => atuais.filter((item) => item.id_mensagem !== idTemporario));
      setTexto(conteudo);
      setErro(mensagemErroIA(error));
    } finally {
      setEnviando(false);
    }
  };

  const arquivar = async () => {
    if (!conversaAtiva || enviando || digitando) return;
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

  const renomear = async () => {
    if (!conversaAtiva || !novoTitulo.trim()) return;
    try {
      const atualizada = await renomearConversaIA(conversaAtiva.id_conversa, novoTitulo.trim());
      setConversaAtiva(atualizada);
      setConversas((atuais) => atuais.map((item) => item.id_conversa === atualizada.id_conversa ? atualizada : item));
      setDialogo(null);
    } catch (error) {
      setErro(mensagemErroIA(error));
    }
  };

  const excluir = async () => {
    if (!conversaAtiva) return;
    try {
      await excluirConversaIA(conversaAtiva.id_conversa);
      setConversas((atuais) => atuais.filter((item) => item.id_conversa !== conversaAtiva.id_conversa));
      setDialogo(null);
      novaConversa();
    } catch (error) {
      setErro(mensagemErroIA(error));
    }
  };

  const copiar = async (mensagem: MensagemIA) => {
    await navigator.clipboard.writeText(mensagem.conteudo);
    setCopiada(mensagem.id_mensagem);
    window.setTimeout(() => setCopiada(null), 1800);
  };

  const abrirCriacaoMeta = (mensagem: MensagemIA) => {
    const primeiraLinha = mensagem.conteudo
      .split("\n")
      .map((linha) => linha.replace(/^#{1,3}\s+|^[-*]\s+|^\d+\.\s+|\*\*/g, "").trim())
      .find((linha) => linha.length >= 4);
    setMetaForm({
      titulo: (primeiraLinha || "Meta sugerida pela Coroa IA").slice(0, 120),
      unidade: "ações",
      valor_inicial: "0",
      valor_atual: "0",
      valor_alvo: "",
      prazo: null,
      arquivada: false,
      tipo: "manual",
      origem: "ia",
      metrica: null,
    });
    setErroMeta("");
    setSucessoMeta("");
  };

  const criarMetaDaIA = async () => {
    if (!metaForm || !metaForm.titulo.trim() || !metaForm.valor_alvo) {
      setErroMeta("Informe o título e o valor-alvo.");
      return;
    }
    if (metaForm.tipo === "manual" && !metaForm.unidade.trim()) {
      setErroMeta("Informe a unidade da meta manual.");
      return;
    }
    setSalvandoMeta(true);
    setErroMeta("");
    try {
      await salvarMeta(metaForm);
      setMetaForm(null);
      setSucessoMeta("Meta criada com sucesso. Ela já está disponível em Minhas metas.");
    } catch (error) {
      setErroMeta(mensagemErroIA(error));
    } finally {
      setSalvandoMeta(false);
    }
  };

  const modoAtivo = modos.find((item) => item.id === modo);

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh", bgcolor: "secondary.light" }}>
      <NavBar />
      <Stack direction="row" sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Stack
          component="aside"
          sx={{
            width: { xs: 210, lg: 275 },
            flexShrink: 0,
            bgcolor: alpha(theme.palette.primary.dark, 0.97),
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

        <Stack component="main" sx={{ flex: 1, minWidth: 0, height: "100%" }}>
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
                {fontesContexto.length > 0 && (
                  <Stack direction="row" gap={0.5} flexWrap="wrap" sx={{ mt: 0.6 }}>
                    <Typography sx={{ fontSize: "0.68rem", color: alpha(theme.palette.text.primary, 0.58), alignSelf: "center" }}>Dados analisados:</Typography>
                    {fontesContexto.map((fonte) => (
                      <Chip key={fonte} label={fonte} size="small" sx={{ height: 20, fontSize: "0.64rem", bgcolor: alpha(theme.palette.primary.main, 0.08), color: "primary.dark" }} />
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
            {conversaAtiva && (
              <Stack direction="row">
                <Tooltip title="Renomear conversa">
                  <IconButton disabled={enviando || digitando} onClick={() => { setNovoTitulo(conversaAtiva.titulo); setDialogo("renomear"); }} sx={{ color: "primary.main" }}><EditOutlinedIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Arquivar conversa">
                  <IconButton disabled={enviando || digitando} onClick={() => void arquivar()} sx={{ color: "primary.main" }}><ArchiveOutlinedIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Excluir conversa">
                  <IconButton disabled={enviando || digitando} onClick={() => setDialogo("excluir")} sx={{ color: "error.main" }}><DeleteOutlineRoundedIcon /></IconButton>
                </Tooltip>
              </Stack>
            )}
          </Stack>

          <Stack sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <Stack sx={{ flex: 1, overflowY: "auto", px: { xs: 2, md: 5 }, py: 3 }}>
              {erro && <Alert severity="warning" sx={{ mb: 2 }}>{erro}</Alert>}
              {sucessoMeta && <Alert severity="success" onClose={() => setSucessoMeta("")} sx={{ mb: 2 }}>{sucessoMeta}</Alert>}
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
                            {usuario ? (
                              <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.65, fontSize: "0.9rem" }}>{mensagem.conteudo}</Typography>
                            ) : (
                              <ConteudoResposta conteudo={mensagem.conteudo} />
                            )}
                          </Box>
                          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.5} sx={{ mt: 0.5, px: 0.25 }}>
                            <Typography sx={{ fontSize: "0.66rem", color: alpha(theme.palette.text.primary, 0.48) }}>{formatarHora(mensagem.criada_em)}</Typography>
                            {!usuario && mensagem.conteudo && (
                              <>
                                <Tooltip title={copiada === mensagem.id_mensagem ? "Copiado!" : "Copiar resposta"}>
                                  <IconButton size="small" onClick={() => void copiar(mensagem)} sx={{ ml: 0.25, color: "primary.main" }}>
                                    {copiada === mensagem.id_mensagem ? <CheckRoundedIcon sx={{ fontSize: 15 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 14 }} />}
                                  </IconButton>
                                </Tooltip>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<FlagRoundedIcon sx={{ fontSize: "15px !important" }} />}
                                  disabled={digitando}
                                  onClick={() => abrirCriacaoMeta(mensagem)}
                                  sx={{
                                    minWidth: 0,
                                    minHeight: 28,
                                    ml: 0.25,
                                    px: 1.15,
                                    py: 0.25,
                                    borderRadius: 5,
                                    borderColor: alpha(theme.palette.primary.main, 0.36),
                                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                                    color: "primary.main",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    textTransform: "none",
                                    "&:hover": {
                                      borderColor: "primary.main",
                                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                                    },
                                  }}
                                >
                                  Criar meta
                                </Button>
                              </>
                            )}
                          </Stack>
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
                    disabled={enviando || digitando}
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
                  {digitando ? (
                    <Tooltip title="Parar e mostrar a resposta completa">
                      <IconButton onClick={interromperDigitacao} sx={{ bgcolor: "primary.main", color: "secondary.light", "&:hover": { bgcolor: "primary.dark" } }}>
                        <StopRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton disabled={!texto.trim() || enviando} onClick={() => void enviar()} sx={{ bgcolor: "primary.main", color: "secondary.light", "&:hover": { bgcolor: "primary.dark" }, "&.Mui-disabled": { bgcolor: alpha(theme.palette.primary.main, 0.18) } }}>
                      {enviando ? <CircularProgress size={20} color="inherit" /> : <SendRoundedIcon />}
                    </IconButton>
                  )}
                </Stack>
                <Typography sx={{ textAlign: "center", fontSize: "0.67rem", color: alpha(theme.palette.text.primary, 0.52) }}>
                  A Coroa IA pode cometer erros. Confira informações importantes antes de agir.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Dialog open={dialogo === "renomear"} onClose={() => setDialogo(null)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontFamily: fonts.heading, color: "primary.dark" }}>Renomear conversa</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Título" value={novoTitulo} onChange={(event) => setNovoTitulo(event.target.value)} inputProps={{ maxLength: 120 }} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogo(null)}>Cancelar</Button>
          <Button variant="contained" disabled={!novoTitulo.trim()} onClick={() => void renomear()}>Salvar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogo === "excluir"} onClose={() => setDialogo(null)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontFamily: fonts.heading, color: "primary.dark" }}>Excluir esta conversa?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">As mensagens serão apagadas permanentemente. Essa ação não pode ser desfeita.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogo(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={() => void excluir()}>Excluir</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(metaForm)} onClose={() => !salvandoMeta && setMetaForm(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: fonts.heading, color: "primary.dark" }}>Criar meta sugerida pela IA</DialogTitle>
        <DialogContent>
          {metaForm && (
            <Stack gap={2} sx={{ pt: 1 }}>
              {erroMeta && <Alert severity="error">{erroMeta}</Alert>}
              <Alert severity="info">Revise os dados antes de salvar. A IA não cria metas sem sua confirmação.</Alert>
              <TextField required label="Título" value={metaForm.titulo} inputProps={{ maxLength: 120 }} onChange={(event) => setMetaForm({ ...metaForm, titulo: event.target.value })} />
              <TextField select label="Atualização do progresso" value={metaForm.tipo} onChange={(event) => {
                const tipo = event.target.value as MetaEntrada["tipo"];
                setMetaForm({ ...metaForm, tipo, metrica: tipo === "instagram" ? "seguidores" : null, unidade: tipo === "manual" ? "ações" : "seguidores" });
              }}>
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value="instagram">Automática pelo Instagram</MenuItem>
              </TextField>
              {metaForm.tipo === "instagram" ? (
                <TextField select label="Métrica do Instagram" value={metaForm.metrica ?? "seguidores"} onChange={(event) => setMetaForm({ ...metaForm, metrica: event.target.value as MetaEntrada["metrica"] })}>
                  <MenuItem value="seguidores">Seguidores</MenuItem>
                  <MenuItem value="publicacoes">Total de publicações</MenuItem>
                  <MenuItem value="alcance_7d">Alcance nos últimos 7 dias</MenuItem>
                  <MenuItem value="interacoes_recentes">Interações nas 5 publicações recentes</MenuItem>
                </TextField>
              ) : (
                <>
                  <TextField required label="Unidade" value={metaForm.unidade} onChange={(event) => setMetaForm({ ...metaForm, unidade: event.target.value })} />
                  <TextField required type="number" label="Valor inicial" value={metaForm.valor_inicial} inputProps={{ min: 0, step: "0.01" }} onChange={(event) => setMetaForm({ ...metaForm, valor_inicial: event.target.value, valor_atual: event.target.value })} />
                </>
              )}
              <TextField required type="number" label="Valor-alvo" value={metaForm.valor_alvo} inputProps={{ min: 0, step: "0.01" }} onChange={(event) => setMetaForm({ ...metaForm, valor_alvo: event.target.value })} />
              <TextField type="date" label="Prazo opcional" InputLabelProps={{ shrink: true }} value={metaForm.prazo ?? ""} onChange={(event) => setMetaForm({ ...metaForm, prazo: event.target.value || null })} />
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button disabled={salvandoMeta} onClick={() => setMetaForm(null)}>Cancelar</Button>
          <Button disabled={salvandoMeta} variant="contained" onClick={() => void criarMetaDaIA()}>{salvandoMeta ? "Salvando..." : "Criar meta"}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
