import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import PixRoundedIcon from "@mui/icons-material/PixRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import {
  buscarAssinatura,
  confirmarAssinatura,
  mensagemErroAssinatura,
  type Assinatura,
  type FormaPagamento,
  type PlanoId,
} from "../../services/Auth/controllers/assinatura";
import theme, { fonts } from "../../styles/theme";

const planos: Record<PlanoId, { nome: string; valor: number; destaque: string }> = {
  bronze: { nome: "Básico — Bronze", valor: 450, destaque: "5 posts por mês e relatório mensal" },
  prata: { nome: "Profissional — Prata", valor: 750, destaque: "10 posts, calendário e acompanhamento" },
  ouro: { nome: "Completo — Ouro", valor: 1200, destaque: "15 posts, cursos e workshop online" },
};

const dinheiro = (valor: number) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CheckoutPlano() {
  const [params] = useSearchParams();
  const selecionado = params.get("plano");
  const plano = (["bronze", "prata", "ouro"].includes(selecionado ?? "") ? selecionado : "prata") as PlanoId;
  const detalhes = planos[plano];
  const [forma, setForma] = useState<FormaPagamento>("cartao");
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");
  const [confirmada, setConfirmada] = useState(false);
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroDemo, setNumeroDemo] = useState("");

  useEffect(() => {
    buscarAssinatura().then(setAssinatura).catch((error) => setErro(mensagemErroAssinatura(error))).finally(() => setCarregando(false));
  }, []);

  const assinaturaAtual = useMemo(() => assinatura && assinatura.status === "ativa" ? planos[assinatura.plano] : null, [assinatura]);

  const confirmar = async () => {
    if (forma === "cartao" && (!nomeCartao.trim() || numeroDemo.replace(/\D/g, "").length < 4)) {
      setErro("Preencha os dados demonstrativos do cartão para continuar.");
      return;
    }
    setProcessando(true);
    setErro("");
    try {
      const resultado = await confirmarAssinatura(plano, forma);
      setAssinatura(resultado);
      setConfirmada(true);
    } catch (error) {
      setErro(mensagemErroAssinatura(error));
    } finally {
      setProcessando(false);
    }
  };

  return (
    <Stack direction="row" sx={{ minHeight: "100vh", bgcolor: "secondary.light" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Alert severity="info" icon={<ShieldOutlinedIcon />} sx={{ mb: 3 }}>
          <strong>Ambiente demonstrativo:</strong> nenhuma cobrança será realizada e nenhum dado de cartão será armazenado.
        </Alert>

        {confirmada ? (
          <Paper sx={{ maxWidth: 650, mx: "auto", p: { xs: 3, md: 5 }, borderRadius: 5, textAlign: "center" }}>
            <CheckCircleRoundedIcon color="success" sx={{ fontSize: 72 }} />
            <Typography component="h1" sx={{ mt: 2, fontFamily: fonts.hero, fontWeight: 700, fontSize: { xs: "2rem", md: "2.6rem" } }}>Assinatura confirmada!</Typography>
            <Typography sx={{ mt: 1.5, mb: 3 }}>Seu plano demonstrativo <strong>{detalhes.nome}</strong> está ativo.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={1.5}>
              <Button component={RouterLink} to="/dashboard-metas" variant="contained">Ir para meu painel</Button>
              <Button component={RouterLink} to="/planos" variant="outlined">Ver outros planos</Button>
            </Stack>
          </Paper>
        ) : (
          <>
            <Typography component="h1" sx={{ fontFamily: fonts.hero, fontWeight: 700, fontSize: { xs: "2rem", md: "3rem" } }}>Finalize sua assinatura</Typography>
            <Typography sx={{ mt: 1, mb: 4, color: alpha(theme.palette.text.primary, 0.7) }}>Revise o plano e escolha como deseja simular o pagamento.</Typography>

            {erro && <Alert severity="error" sx={{ mb: 3 }}>{erro}</Alert>}
            {carregando ? <Stack alignItems="center" py={8}><CircularProgress /></Stack> : (
              <Stack direction={{ xs: "column", md: "row" }} gap={3} alignItems="flex-start">
                <Paper sx={{ flex: 1, width: "100%", p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
                  {assinaturaAtual && <Alert severity="success" sx={{ mb: 3 }}>Seu plano atual é <strong>{assinaturaAtual.nome}</strong>. A confirmação abaixo atualizará sua escolha.</Alert>}
                  <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.25rem", mb: 2 }}>Forma de pagamento</Typography>
                  {(["cartao", "pix"] as FormaPagamento[]).map((item) => (
                    <Stack key={item} direction="row" alignItems="center" onClick={() => setForma(item)} sx={{ mb: 1.5, p: 2, border: "2px solid", borderColor: forma === item ? "primary.main" : alpha(theme.palette.text.primary, 0.14), borderRadius: 3, cursor: "pointer", bgcolor: forma === item ? alpha(theme.palette.primary.main, 0.05) : "transparent" }}>
                      <Radio checked={forma === item} />
                      {item === "cartao" ? <CreditCardRoundedIcon /> : <PixRoundedIcon />}
                      <Typography sx={{ ml: 1.2, fontWeight: 700 }}>{item === "cartao" ? "Cartão demonstrativo" : "PIX demonstrativo"}</Typography>
                    </Stack>
                  ))}

                  {forma === "cartao" ? (
                    <Stack gap={2} mt={2}>
                      <Alert severity="warning">Use somente dados fictícios. Eles não serão enviados nem armazenados.</Alert>
                      <TextField label="Nome fictício no cartão" value={nomeCartao} onChange={(event) => setNomeCartao(event.target.value)} />
                      <TextField label="Número demonstrativo" value={numeroDemo} inputProps={{ maxLength: 19 }} onChange={(event) => setNumeroDemo(event.target.value.replace(/[^\d ]/g, ""))} helperText="Para a demonstração, basta informar pelo menos 4 números." />
                      <Stack direction="row" gap={2}><TextField fullWidth label="Validade" placeholder="12/30" /><TextField fullWidth label="CVV fictício" placeholder="123" /></Stack>
                    </Stack>
                  ) : (
                    <Box sx={{ mt: 2, p: 3, borderRadius: 3, textAlign: "center", bgcolor: alpha(theme.palette.primary.main, 0.06) }}>
                      <PixRoundedIcon sx={{ fontSize: 64, color: "primary.main" }} />
                      <Typography sx={{ fontWeight: 700 }}>QR Code demonstrativo</Typography>
                      <Typography variant="body2">Na integração real, o código PIX aparecerá aqui.</Typography>
                    </Box>
                  )}
                </Paper>

                <Paper sx={{ width: { xs: "100%", md: 370 }, p: 3.5, borderRadius: 4, bgcolor: "primary.main", color: "secondary.light" }}>
                  <Typography variant="overline" sx={{ opacity: 0.75 }}>RESUMO</Typography>
                  <Typography sx={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: "1.45rem" }}>{detalhes.nome}</Typography>
                  <Typography sx={{ mt: 1, opacity: 0.8 }}>{detalhes.destaque}</Typography>
                  <Divider sx={{ my: 3, borderColor: alpha(theme.palette.secondary.light, 0.25) }} />
                  <Stack direction="row" justifyContent="space-between"><Typography>Mensalidade</Typography><Typography sx={{ fontWeight: 800 }}>{dinheiro(detalhes.valor)}</Typography></Stack>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.72 }}>Renovação mensal apenas ilustrativa.</Typography>
                  <Button fullWidth onClick={() => void confirmar()} disabled={processando} sx={{ mt: 3, py: 1.3, bgcolor: "secondary.main", color: "primary.dark", fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "secondary.light" } }}>
                    {processando ? <CircularProgress size={24} color="inherit" /> : "Confirmar demonstração"}
                  </Button>
                  <Button fullWidth component={RouterLink} to="/planos" sx={{ mt: 1, color: "secondary.light", textTransform: "none" }}>Trocar plano</Button>
                </Paper>
              </Stack>
            )}
          </>
        )}
      </Container>
    </Stack>
  );
}
