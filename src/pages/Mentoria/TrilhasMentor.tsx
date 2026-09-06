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
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import AprendizadoLayout from "./AprendizadoLayout";
import {
  acompanharTrilhas,
  categoriasTrilhas,
  listarMentorados,
  listarTrilhas,
  publicarTrilha,
  salvarTrilha,
  type AulaEntrada,
  type Categoria,
  type Mentorado,
  type Trilha,
  type TrilhaEntrada,
} from "../../services/Auth/controllers/aprendizado";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

const novaAula = (): AulaEntrada => ({
  titulo: "",
  conteudo: "",
  video_url: "",
});
const novaTrilha = (): TrilhaEntrada => ({
  titulo: "",
  descricao: "",
  categoria: "",
  publico_alvo: "",
  aulas: [novaAula()],
});

export default function TrilhasMentor() {
  const theme = useTheme();
  const [params] = useSearchParams();
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [alunos, setAlunos] = useState<Mentorado[]>([]);
  const [aluno, setAluno] = useState(params.get("mentorado") || "");
  const [acompanhamento, setAcompanhamento] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAluno, setLoadingAluno] = useState(false);
  const [error, setError] = useState("");
  const [erroAluno, setErroAluno] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [atual, setAtual] = useState<Trilha>();
  const [dados, setDados] = useState<TrilhaEntrada>(novaTrilha);
  const [erroForm, setErroForm] = useState("");
  const [confirmar, setConfirmar] = useState<Trilha>();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([listarTrilhas(), listarMentorados(), categoriasTrilhas(true)])
      .then(([ts, ms, cs]) => {
        if (active) {
          setTrilhas(ts);
          setAlunos(ms);
          setCategorias(cs);
        }
      })
      .catch((err) => {
        if (active) setError(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [retry]);
  useEffect(() => {
    let active = true;
    setAcompanhamento([]);
    setErroAluno("");
    if (!aluno) {
      setLoadingAluno(false);
      return;
    }
    setLoadingAluno(true);
    acompanharTrilhas(Number(aluno))
      .then((ts) => {
        if (active) setAcompanhamento(ts);
      })
      .catch((err) => {
        if (active) setErroAluno(mensagemErroApi(err));
      })
      .finally(() => {
        if (active) setLoadingAluno(false);
      });
    return () => {
      active = false;
    };
  }, [aluno, retry]);

  function abrir(t?: Trilha) {
    setAtual(t);
    setErroForm("");
    setDados(
      t
        ? {
            titulo: t.titulo,
            descricao: t.descricao,
            categoria: t.categoria,
            publico_alvo: t.publico_alvo,
            aulas: t.aulas.map((a) => ({
              titulo: a.titulo,
              conteudo: a.conteudo,
              video_url: a.video_url,
            })),
          }
        : novaTrilha(),
    );
    setDialog(true);
  }
  function mudarAula(index: number, key: keyof AulaEntrada, value: string) {
    setDados((d) => ({
      ...d,
      aulas: d.aulas.map((a, i) => (i === index ? { ...a, [key]: value } : a)),
    }));
  }
  async function salvar() {
    if (busy) return;
    setBusy(true);
    setErroForm("");
    try {
      await salvarTrilha(dados, atual);
      setDialog(false);
      setSucesso(
        atual?.publicada
          ? "Categoria e público da trilha atualizados."
          : "Rascunho salvo. Revise e publique quando estiver pronto.",
      );
      setRetry((r) => r + 1);
    } catch (err) {
      setErroForm(mensagemErroApi(err));
    } finally {
      setBusy(false);
    }
  }
  async function publicar() {
    if (!confirmar || busy) return;
    setBusy(true);
    setError("");
    try {
      await publicarTrilha(confirmar);
      setSucesso(
        "Trilha publicada no catálogo. Os empreendedores já podem se inscrever.",
      );
      setRetry((r) => r + 1);
    } catch (err) {
      setError(mensagemErroApi(err));
    } finally {
      setBusy(false);
      setConfirmar(undefined);
    }
  }

  return (
    <AprendizadoLayout mentor titulo="Trilhas e aulas">
      <Typography>
        Organize as aulas e publique no catálogo. Cada empreendedor escolhe a
        trilha e passa a ser seu mentorado. O progresso é informado pelo próprio
        empreendedor.
      </Typography>
      <Stack direction="row" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          onClick={() => abrir()}
          disabled={busy || loading}
        >
          Nova trilha
        </Button>
        <Button
          onClick={() => setRetry((r) => r + 1)}
          disabled={busy || loading}
        >
          Atualizar
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {sucesso && (
        <Alert severity="success" onClose={() => setSucesso("")}>
          {sucesso}
        </Alert>
      )}
      {loading ? (
        <CircularProgress aria-label="Carregando trilhas" />
      ) : (
        <>
          <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid", borderColor: "secondary.main", boxShadow: "0 8px 24px rgba(77,0,18,0.06)", backgroundColor: theme.palette.secondary.light, color: theme.palette.text.primary }}>
            <Typography variant="h6" mb={2} sx={{ color: theme.palette.text.primary }}>
              Acompanhamento dos inscritos
            </Typography>
            <TextField
              select
              fullWidth
              label="Mentorado"
              value={alunos.some((a) => String(a.nome) === aluno) ? aluno : ""}
              disabled={busy}
              onChange={(e) => setAluno(e.target.value)}
            >
              <MenuItem value="">Selecione um mentorado</MenuItem>
              {alunos.map((a) => (
                <MenuItem key={a.empresa} value={String(a.empresa)}>
                  {a.nome}
                  {a.empresa ? ` — ${a.empresa}` : ""}
                </MenuItem>
              ))}
            </TextField>
            {!alunos.length && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Seus mentorados aparecerão aqui quando começarem uma das suas
                trilhas.
              </Alert>
            )}
            {loadingAluno && (
              <CircularProgress
                size={24}
                sx={{ mt: 2 }}
                aria-label="Carregando progresso"
              />
            )}
            {erroAluno && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {erroAluno}
              </Alert>
            )}
            {aluno && !loadingAluno && !erroAluno && !acompanhamento.length && (
              <Typography mt={2}>
                Este mentorado ainda não tem inscrições nas suas trilhas.
              </Typography>
            )}
            {acompanhamento.map((t) => (
              <Stack
                key={t.id}
                sx={{ mt: 2, p: 2, bgcolor: "secondary.light", borderRadius: 2 }}
              >
                <Typography fontWeight={700}>
                  {t.titulo} — {t.progresso}%
                </Typography>
                <Typography>
                  {t.aulas.filter((a) => a.concluida).length} de{" "}
                  {t.aulas.length} aulas concluídas
                </Typography>
                {t.aulas.map((a) => (
                  <Typography key={a.id} variant="body2">
                    {a.concluida ? "Concluída" : "Pendente"}: {a.titulo}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Paper>
          {!trilhas.length && !error && (
            <Alert severity="info">
              Você ainda não criou trilhas. Comece em “Nova trilha”.
            </Alert>
          )}
          {trilhas.map((t) => (
            <Paper
              key={t.id}
              sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid", borderColor: "secondary.main", boxShadow: "0 8px 24px rgba(77,0,18,0.06)", bgcolor: theme.palette.secondary.light, color: theme.palette.text.primary }}
            >
              <Typography variant="h6" sx={{ overflowWrap: "anywhere" }}>
                {t.titulo}
              </Typography>
              <Typography
                sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
              >
                {t.descricao}
              </Typography>
              <Typography sx={{ mt: 1 }}>{t.categoria_label}</Typography>
              <Typography sx={{ my: 1 }}>
                {t.publicada ? "Publicada" : "Rascunho"} · {t.aulas.length}{" "}
                aula(s)
              </Typography>
              <Button
                sx={{ color: theme.palette.primary.light }}
                disabled={busy}
                onClick={() => abrir(t)}
              >
                {t.publicada ? "Ver aulas" : "Editar rascunho"}
              </Button>
              {!t.publicada && (
                <Button
                  variant="contained"
                  disabled={busy || !t.aulas.length}
                  onClick={() => setConfirmar(t)}
                >
                  Publicar
                </Button>
              )}
            </Paper>
          ))}
        </>
      )}
      <Dialog
        open={dialog}
        onClose={() => {
          if (!busy) setDialog(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {atual?.publicada
            ? "Conteúdo publicado"
            : atual
              ? "Editar rascunho"
              : "Nova trilha"}
        </DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="form-trilha"
            gap={2}
            sx={{ pt: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              void salvar();
            }}
          >
            {erroForm && <Alert severity="error">{erroForm}</Alert>}
            {atual?.publicada && (
              <Alert severity="info">
                As aulas publicadas não podem ser alteradas. Você pode ajustar a
                categoria e o público da trilha sem afetar o progresso.
              </Alert>
            )}
            <TextField
              label="Título da trilha"
              required
              value={dados.titulo}
              disabled={busy || atual?.publicada}
              inputProps={{ maxLength: 150 }}
              onChange={(e) => setDados({ ...dados, titulo: e.target.value })}
            />
            <TextField
              label="Descrição"
              multiline
              minRows={2}
              value={dados.descricao}
              disabled={busy || atual?.publicada}
              inputProps={{ maxLength: 3000 }}
              onChange={(e) =>
                setDados({ ...dados, descricao: e.target.value })
              }
            />
            <TextField
              select
              required
              label="Tema da trilha"
              value={dados.categoria}
              disabled={busy}
              onChange={(e) =>
                setDados({ ...dados, categoria: e.target.value })
              }
            >
              {categorias.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Para quem é esta trilha?"
              value={dados.publico_alvo}
              disabled={busy}
              inputProps={{ maxLength: 500 }}
              onChange={(e) =>
                setDados({ ...dados, publico_alvo: e.target.value })
              }
            />
            {dados.aulas.map((a, i) => (
              <Paper variant="outlined" key={i} sx={{ p: 2 }}>
                <Stack gap={2}>
                  <Typography variant="h6">Aula {i + 1}</Typography>
                  <TextField
                    label={`Título da aula ${i + 1}`}
                    required
                    value={a.titulo}
                    disabled={busy || atual?.publicada}
                    inputProps={{ maxLength: 150 }}
                    onChange={(e) => mudarAula(i, "titulo", e.target.value)}
                  />
                  <TextField
                    label={`Conteúdo da aula ${i + 1}`}
                    required
                    multiline
                    minRows={4}
                    value={a.conteudo}
                    disabled={busy || atual?.publicada}
                    inputProps={{ maxLength: 15000 }}
                    onChange={(e) => mudarAula(i, "conteudo", e.target.value)}
                  />
                  <TextField
                    label="Link de vídeo (opcional)"
                    type="url"
                    helperText="Link HTTPS do YouTube ou Vimeo. O vídeo será aberto em outra aba."
                    value={a.video_url}
                    disabled={busy || atual?.publicada}
                    inputProps={{ maxLength: 2048 }}
                    onChange={(e) => mudarAula(i, "video_url", e.target.value)}
                  />
                  {!atual?.publicada && (
                    <Button
                      disabled={busy}
                      onClick={() =>
                        setDados((d) => ({
                          ...d,
                          aulas: d.aulas.filter((_, index) => index !== i),
                        }))
                      }
                    >
                      Remover aula {i + 1} do rascunho
                    </Button>
                  )}
                </Stack>
              </Paper>
            ))}
            {!atual?.publicada && (
              <Button
                disabled={busy || dados.aulas.length >= 30}
                onClick={() =>
                  setDados((d) => ({ ...d, aulas: [...d.aulas, novaAula()] }))
                }
              >
                Adicionar aula
              </Button>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setDialog(false)}>
            {atual?.publicada ? "Fechar" : "Cancelar"}
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="form-trilha"
            disabled={busy}
          >
            {busy
              ? "Salvando..."
              : atual?.publicada
                ? "Salvar categoria e público"
                : "Salvar rascunho"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!confirmar}
        onClose={() => {
          if (!busy) setConfirmar(undefined);
        }}
      >
        <DialogTitle>Publicar trilha?</DialogTitle>
        <DialogContent>
          Após publicar, as aulas desta versão não poderão ser alteradas,
          preservando o progresso dos mentorados. A trilha ficará visível no
          catálogo e os empreendedores poderão escolher começar.
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setConfirmar(undefined)}>
            Voltar
          </Button>
          <Button
            variant="contained"
            disabled={busy}
            onClick={() => void publicar()}
          >
            Confirmar publicação
          </Button>
        </DialogActions>
      </Dialog>
    </AprendizadoLayout>
  );
}
