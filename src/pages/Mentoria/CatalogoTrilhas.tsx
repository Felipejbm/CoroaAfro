import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ModalHeader from "../../components/ModalHeader/ModalHeader";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useCatalogoTrilhas } from "./CatalogoTrilhas.hook";
import type { CatalogoTrilhasProps } from "./CatalogoTrilhas.types";

export default function CatalogoTrilhas({
  onComecar,
}: CatalogoTrilhasProps) {
  const {
    categorias,
    categoria,
    setCategoria,
    pagina,
    setPagina,
    resultado,
    loading,
    erro,
    setRetry,
    escolhida,
    setEscolhida,
    busy,
    erroInscricao,
    setErroInscricao,
    confirmar,
  } = useCatalogoTrilhas({ onComecar });

  const theme = useTheme();
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
      <Dialog aria-labelledby="comecar-trilha"
        open={!!escolhida}
        onClose={() => {
          if (!busy) setEscolhida(undefined);
        }}
        fullWidth
        maxWidth="sm"
      >
        <ModalHeader id="comecar-trilha" titulo={"Começar {escolhida?.titulo}?"} categoria="Seu próximo aprendizado" descricao="Conheça o conteúdo e dê o primeiro passo com seu mentor." icone={<MenuBookRoundedIcon />} onClose={() => setEscolhida(undefined)} ocupado={busy} />
        <DialogContent>
          <Stack gap={2}>
            {erroInscricao && <Alert severity="error">{erroInscricao}</Alert>}
            <Typography>
              Mentor responsável: {escolhida?.mentor.nome}
            </Typography>
            <Typography variant="h6">O que você vai estudar</Typography>
            {escolhida?.aulas.map((a, i) => (
              <Stack key={i} direction="row" alignItems="center" gap={1.5} sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fffdf9", border: "1px solid", borderColor: "secondary.main" }}>
                <Typography sx={{ bgcolor: "secondary.main", color: "primary.main", borderRadius: 2, minWidth: 32, py: 0.5, textAlign: "center", fontWeight: 700, fontSize: "0.8rem" }}>{String(i + 1).padStart(2, "0")}</Typography>
                <Typography variant="body2">{a.titulo}</Typography>
              </Stack>
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
