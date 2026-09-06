import ModalHeader from "../../components/ModalHeader/ModalHeader";
import SecaoFormulario from "../../components/SecaoFormulario/SecaoFormulario";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import theme, { fonts } from "../../styles/theme";
import { useDashboardMetas } from "./DashboardMetas.hook";
import {
  formatarEntradaNumerica,
  formatarValorMeta,
  labels,
  numero,
  unidadesMeta,
  valorNumerico,
} from "./DashboardMetas.utils";
import AvatarUsuario from "../../components/AvatarUsuario/AvatarUsuario";

export default function DashboardMetas() {
  const {
    navigate,
    empresa,
    empresaError,
    loading,
    error,
    success,
    setSuccess,
    arquivadas,
    setArquivadas,
    open,
    setOpen,
    editing,
    form,
    setForm,
    saving,
    formError,
    atualizar,
    abrirModal,
    salvar,
    metasExibidas,
    resumoMetas,
  } = useDashboardMetas();

  return (
    <Stack direction="row" sx={{ minHeight: "100vh" }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          bgcolor: "secondary.light",
          p: { xs: 2, md: 4, lg: 5 },
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        <Stack
          sx={{
            position: "relative",
            overflow: "hidden",
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            color: "secondary.light",
            background: `linear-gradient(125deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 62%, ${theme.palette.primary.light} 100%)`,
            boxShadow: `0 18px 40px ${alpha(theme.palette.primary.dark, 0.22)}`,
            "&::after": {
              content: '""',
              position: "absolute",
              width: 220,
              height: 220,
              right: -70,
              top: -100,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
            },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={2}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Stack gap={0.75}>
              <AvatarUsuario atual sx={{ width: 64, height: 64, mb: 1, bgcolor: "primary.light" }} />
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.14em",
                  color: alpha(theme.palette.secondary.main, 0.72),
                  fontFamily: fonts.button,
                  fontWeight: 700,
                }}
              >
                Painel de crescimento
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: fonts.hero,
                  fontSize: { xs: "1.8rem", md: "2.35rem" },
                  lineHeight: 1.1,
                }}
              >
                Olá, {empresa}
              </Typography>
              <Typography
                sx={{ color: alpha(theme.palette.secondary.light, 0.78) }}
              >
                Acompanhe seus objetivos e a evolução da sua marca.
              </Typography>
            </Stack>
            <Button
              onClick={() => navigate("/perfil")}
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.secondary.light, 0.45),
                color: "secondary.light",
                borderRadius: 2.5,
                px: 2,
                "&:hover": {
                  borderColor: "secondary.light",
                  bgcolor: alpha(theme.palette.secondary.light, 0.1),
                },
              }}
            >
              Ver perfil
            </Button>
          </Stack>
        </Stack>

        {empresaError && <Alert severity="warning">{empresaError}</Alert>}

        {success && (
          <Alert severity="success" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          {resumoMetas.map(({ label, value, icon: Icon }) => (
            <Paper
              key={label}
              elevation={0}
              sx={{
                flex: 1,
                p: 2.5,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.secondary.main, 0.62),
                border: `1px solid ${alpha(theme.palette.primary.dark, 0.08)}`,
              }}
            >
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Stack
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <Icon />
                </Stack>
                <Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha(theme.palette.text.primary, 0.68) }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.metrics,
                      fontSize: "1.65rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {loading || error ? "—" : value}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: alpha(theme.palette.secondary.main, 0.44),
            border: `1px solid ${alpha(theme.palette.primary.dark, 0.08)}`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
            mb={2.5}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Stack
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  color: "secondary.light",
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <FlagRoundedIcon fontSize="small" />
              </Stack>
              <Stack>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: fonts.hero,
                    color: theme.palette.primary.dark,
                  }}
                >
                  Minhas metas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transforme planos em próximos passos.
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1}>
              <Button
                disabled={loading}
                startIcon={<RefreshRoundedIcon />}
                sx={{ color: theme.palette.primary.main }}
                onClick={atualizar}
              >
                Atualizar
              </Button>
              <Button
                disabled={loading || Boolean(error)}
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    boxShadow: "none",
                  },
                }}
                onClick={() => abrirModal()}
              >
                Adicionar meta
              </Button>
            </Stack>
          </Stack>

          <FormControlLabel
            control={
              <Checkbox
                checked={arquivadas}
                onChange={(event) => setArquivadas(event.target.checked)}
                sx={{
                  color: theme.palette.primary.main,
                  "&.Mui-checked": { color: theme.palette.primary.main },
                }}
              />
            }
            label="Mostrar arquivadas"
          />

          {loading ? (
            <CircularProgress aria-label="Carregando metas" />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Stack gap={2}>
              {metasExibidas.length === 0 && (
                <Stack
                  sx={{
                    p: { xs: 3, md: 5 },
                    textAlign: "center",
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.25)}`,
                  }}
                >
                  <FlagRoundedIcon
                    sx={{
                      alignSelf: "center",
                      mb: 1,
                      fontSize: 34,
                      color: alpha(theme.palette.primary.main, 0.55),
                    }}
                  />
                  <Typography color="text.secondary">
                    Você ainda não tem metas nesta lista. Que tal definir seu
                    primeiro objetivo?
                  </Typography>
                </Stack>
              )}

              {metasExibidas.map((meta) => (
                <Paper
                  key={meta.id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.dark, 0.1),
                    bgcolor: "background.paper",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 10px 24px ${alpha(theme.palette.primary.dark, 0.1)}`,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      {meta.titulo}
                    </Typography>
                    <Chip
                      label={labels[meta.status]}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {formatarValorMeta(meta.valor_atual, meta.unidade)} /{" "}
                    {formatarValorMeta(meta.valor_alvo, meta.unidade)}{" "}
                    {meta.unidade !== "R$" && `${meta.unidade} · `}Inicial: {formatarValorMeta(meta.valor_inicial, meta.unidade)}
                  </Typography>

                  <Stack gap={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        {formatarValorMeta(meta.valor_atual, meta.unidade)}{" "}
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          / {formatarValorMeta(meta.valor_alvo, meta.unidade)} {meta.unidade !== "R$" && meta.unidade}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {numero(meta.progresso)}%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={meta.progresso}
                      aria-label={`Progresso: ${meta.titulo}`}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        },
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pt: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Prazo: {meta.prazo.split("-").reverse().join("/")} ·
                      Inicial: {formatarValorMeta(meta.valor_inicial, meta.unidade)}
                    </Typography>

                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditRoundedIcon sx={{ fontSize: 16 }} />}
                      onClick={() => abrirModal(meta)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "0.8125rem",
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      Editar
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        <Button
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ alignSelf: "flex-start", color: theme.palette.primary.main }}
          onClick={() => navigate("/dashboard-redes")}
        >
          Ver desempenho nas redes
        </Button>
        <Dialog aria-labelledby="editar-meta"
          open={open}
          onClose={() => {
            if (!saving) setOpen(false);
          }}
          fullWidth
          maxWidth="sm"
          
        >
          <form onSubmit={salvar}>
            <ModalHeader id="editar-meta" titulo={editing ? "Editar meta" : "Nova meta"} categoria="Um passo de cada vez" descricao="Transforme seus planos em um objetivo que você pode acompanhar." icone={<FlagRoundedIcon />} onClose={() => setOpen(false)} ocupado={saving} />
            <DialogContent>
              <Stack gap={3}>
                {formError && <Alert severity="error">{formError}</Alert>}
                <SecaoFormulario titulo="O que você quer conquistar?" descricao="Campos com * são obrigatórios.">
                <TextField
                  autoFocus
                  required
                  disabled={saving}
                  label="Título"
                  placeholder="Ex.: Aumentar minhas vendas"
                  value={form.titulo}
                  inputProps={{ maxLength: 120 }}
                  onChange={(event) =>
                    setForm({ ...form, titulo: event.target.value })
                  }
                />

                <TextField
                  required
                  disabled={saving}
                  select
                  label="O que vamos medir?"
                  helperText="Escolha uma unidade para manter os valores comparáveis."
                  value={form.unidade}
                  onChange={(event) =>
                    setForm({ ...form, unidade: event.target.value })
                  }
                >
                  {unidadesMeta.map((unidade) => (
                    <MenuItem key={unidade.value} value={unidade.value}>
                      {unidade.label}
                    </MenuItem>
                  ))}
                  {!unidadesMeta.some((unidade) => unidade.value === form.unidade) && (
                    <MenuItem value={form.unidade}>{form.unidade}</MenuItem>
                  )}
                </TextField>

                </SecaoFormulario>
                <SecaoFormulario titulo="Do ponto de partida à conquista" descricao="Informe onde começou, onde está hoje e aonde quer chegar.">
                <Stack sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
                {(
                  [
                    ["valor_inicial", "Valor inicial"],
                    ["valor_atual", "Valor atual"],
                    ["valor_alvo", "Valor-alvo"],
                  ] as const
                ).map(([field, label]) => {
                  const dinheiro = form.unidade === "R$";
                  const valor = valorNumerico(form[field]);
                  const erro =
                    !form[field].trim() ||
                    !Number.isFinite(valor) ||
                    valor < 0 ||
                    (field === "valor_alvo" &&
                      Number.isFinite(valorNumerico(form.valor_inicial)) &&
                      valor <= valorNumerico(form.valor_inicial));
                  return (
                    <TextField
                      key={field}
                      required
                      disabled={saving}
                      type="text"
                      inputMode="decimal"
                      label={label}
                      value={form[field]}
                      error={erro}
                      helperText={
                        erro
                          ? field === "valor_alvo"
                            ? "O alvo deve ser maior que o valor inicial."
                            : "Informe um valor igual ou maior que zero."
                          : dinheiro
                            ? "Digite o valor em reais."
                            : "Use apenas números."
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          [field]: formatarEntradaNumerica(
                            event.target.value,
                            dinheiro,
                          ),
                        })
                      }
                    />
                  );
                })}
                </Stack>
                <TextField
                  required
                  disabled={saving}
                  type="date"
                  label="Prazo"
                  helperText="Até quando você pretende alcançar essa meta?"
                  InputLabelProps={{ shrink: true }}
                  value={form.prazo}
                  onChange={(event) =>
                    setForm({ ...form, prazo: event.target.value })
                  }
                />
                </SecaoFormulario>
                <Typography variant="body2" sx={{ p: 2, bgcolor: "secondary.main", borderRadius: 2, color: "primary.dark", lineHeight: 1.6 }}>
                  O progresso mede o avanço do valor inicial até o alvo. Metas
                  com prazo passado podem ser registradas para acompanhamento.
                </Typography>

                {editing && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={saving}
                        checked={form.arquivada}
                        onChange={(event) =>
                          setForm({ ...form, arquivada: event.target.checked })
                        }
                      />
                    }
                    label="Arquivar meta (mantém os dados salvos)"
                  />
                )}
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button disabled={saving} onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saving}
                variant="contained"
                sx={{ bgcolor: theme.palette.primary.main }}
              >
                {saving ? "Salvando…" : "Salvar meta"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Stack>
    </Stack>
  );
}
