import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  buscarCatalogo,
  categoriasTrilhas,
  inscreverTrilha,
  type Categoria,
  type ItemCatalogo,
  type PaginaCatalogo,
} from "../../services/Auth/controllers/aprendizado";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

export default function CatalogoTrilhas({
  onComecar,
}: {
  onComecar: () => void;
}) {
  const theme = useTheme();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [pagina, setPagina] = useState(1);
  const [resultado, setResultado] = useState<PaginaCatalogo>();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [retry, setRetry] = useState(0);
  const [escolhida, setEscolhida] = useState<ItemCatalogo>();
  const [busy, setBusy] = useState(false);
  const [erroInscricao, setErroInscricao] = useState("");
  useEffect(() => {
    let active = true;
    setLoading(true);
    setErro("");
    setResultado(undefined);
    Promise.all([buscarCatalogo(categoria, pagina), categoriasTrilhas()])
      .then(([dados, opcoes]) => {
        if (active) {
          setResultado(dados);
          setCategorias(opcoes);
        }
      })
      .catch((err) => {
        if (active) setErro(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [categoria, pagina, retry]);
  async function confirmar() {
    if (!escolhida || busy) return;
    setBusy(true);
    setErroInscricao("");
    try {
      await inscreverTrilha(escolhida.id);
      onComecar();
    } catch (err) {
      setErroInscricao(mensagemErroApi(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Stack gap={3}>
      <Typography variant="h5">Explore por tema</Typography>
      <Typography>
        Escolha uma trilha de acordo com o que deseja aprender. Ao começar, o
        autor passa a acompanhar você como mentor.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
        <TextField
          select
          label="Tema"
          value={categoria}
          sx={{ minWidth: 240 }}
          disabled={busy}
          onChange={(e) => {
            setCategoria(e.target.value);
            setPagina(1);
          }}
        >
          <MenuItem value="">Todos os temas</MenuItem>
          {categorias.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          disabled={loading || busy}
          onClick={() => setRetry((r) => r + 1)}
        >
          Atualizar catálogo
        </Button>
      </Stack>
      {erro && <Alert severity="error">{erro}</Alert>}
      {loading ? (
        <CircularProgress aria-label="Carregando catálogo" />
      ) : (
        resultado && (
          <>
            {!resultado.itens.length && (
              <Alert severity="info">
                Nenhuma trilha disponível neste tema. Experimente outro filtro
                ou volte quando os mentores publicarem novos conteúdos.
              </Alert>
            )}
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "repeat(2, minmax(0, 1fr))",
                },
                gap: 3,
              }}
            >
              {resultado.itens.map((t) => (
                <Paper
                  key={t.id}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.common.white,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    overflowWrap: "anywhere",
                  }}
                >
                  <Typography sx={{ color: theme.palette.primary.light }}>
                    {t.categoria_label}
                  </Typography>
                  <Typography variant="h5">{t.titulo}</Typography>
                  <Typography>Mentor: {t.mentor.nome}</Typography>
                  <Typography variant="body2">
                    {t.mentor.especialidade}
                  </Typography>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {t.descricao || "Conheça o conteúdo desta trilha."}
                  </Typography>
                  {t.publico_alvo && (
                    <Typography>Para quem: {t.publico_alvo}</Typography>
                  )}
                  <Typography>{t.aulas.length} aula(s)</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: "auto", alignSelf: "flex-start" }}
                    onClick={() => {
                      if (t.inscrito) onComecar();
                      else {
                        setEscolhida(t);
                        setErroInscricao("");
                      }
                    }}
                  >
                    {t.inscrito
                      ? "Continuar minha trilha"
                      : "Ver aulas e começar"}
                  </Button>
                </Paper>
              ))}
            </Stack>
            {resultado.total > resultado.por_pagina && (
              <Pagination
                aria-label="Páginas do catálogo"
                page={pagina}
                count={Math.ceil(resultado.total / resultado.por_pagina)}
                onChange={(_, p) => setPagina(p)}
              />
            )}
          </>
        )
      )}
      <Dialog
        open={!!escolhida}
        onClose={() => {
          if (!busy) setEscolhida(undefined);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Começar {escolhida?.titulo}?</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            {erroInscricao && <Alert severity="error">{erroInscricao}</Alert>}
            <Typography>
              Mentor responsável: {escolhida?.mentor.nome}
            </Typography>
            <Typography variant="h6">O que você vai estudar</Typography>
            {escolhida?.aulas.map((a, i) => (
              <Typography key={i}>
                {i + 1}. {a.titulo}
              </Typography>
            ))}
            <Alert severity="info">
              Ao confirmar, você escolhe este mentor. Ele poderá ver seu nome, o
              nome da sua empresa e seu progresso nas trilhas dele. Você pode
              escolher trilhas de outros mentores também.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setEscolhida(undefined)}>
            Voltar
          </Button>
          <Button
            variant="contained"
            disabled={busy}
            onClick={() => void confirmar()}
          >
            {busy ? "Inscrevendo..." : "Começar trilha"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
