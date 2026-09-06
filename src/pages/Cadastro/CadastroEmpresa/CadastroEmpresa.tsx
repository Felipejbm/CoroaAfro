import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import theme, { fonts } from "../../../styles/theme";
import Layout from "../../../components/Layout/Layout";
import useCadastroEmpresa from "./CadastroEmpresa.hook";
import { endereco, negocio } from "./CadastroEmpresa.utils";
import { useNavigate } from "react-router-dom";

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const {
    enderecoAntigo,
    erro,
    renderCampo,
    salvar,
    empresaId,
    carregando,
    falhaCarga,
    salvando,
    sucesso,
  } = useCadastroEmpresa();
  return (
    <Layout>
      <Stack
        sx={{ bgcolor: theme.palette.secondary.light, py: { xs: 4, md: 6 } }}
      >
        <Container maxWidth="md">
          <Stack
            component="form"
            onSubmit={(event) => void salvar(event)}
            sx={{
              bgcolor: theme.palette.secondary.main,
              borderRadius: 3,
              boxShadow: (theme) =>
                `0 10px 24px ${alpha(theme.palette.common.black, 0.2)}`,
              p: { xs: 3, md: 5 },
              gap: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontFamily: fonts.hero }}>
              {empresaId ? "Editar empresa" : "Cadastre sua empresa"}
            </Typography>
            <Typography>
              Dados organizados ajudam a conhecer seu negócio e sua região.
            </Typography>
            {erro && <Alert severity="error">{erro}</Alert>}
            {carregando && (
              <CircularProgress aria-label="Carregando cadastro" />
            )}
            {falhaCarga && (
              <Button onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            )}
            <Typography variant="h6">Sobre o negócio</Typography>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              {negocio.map(renderCampo)}
            </Stack>
            <Typography variant="h6">Endereço da empresa</Typography>
            {enderecoAntigo && (
              <Alert severity="info">
                Endereço antigo preservado: {enderecoAntigo}. Preencha os campos
                abaixo para organizar sua localização.
              </Alert>
            )}
            <Typography variant="body2">
              Complemento e CEP são opcionais. Se o local não tiver número,
              informe S/N.
            </Typography>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              {endereco.map(renderCampo)}
            </Stack>
            <Button
              type="submit"
              disabled={carregando || salvando || falhaCarga || sucesso}
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main,
                ),
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {salvando
                ? "Salvando..."
                : empresaId
                  ? "Salvar alterações"
                  : "Cadastrar empresa"}
            </Button>
            <Button disabled={salvando} onClick={() => navigate("/perfil")}>
              Voltar ao perfil
            </Button>
          </Stack>
        </Container>
      </Stack>
      <Dialog
        open={sucesso}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              bgcolor: theme.palette.secondary.main,
              borderRadius: 3,
              p: 2,
            },
          },
        }}
      >
        <DialogTitle>
          {empresaId
            ? "Empresa atualizada!"
            : "Empresa cadastrada com sucesso!"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Os dados foram salvos e vinculados à sua conta.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/perfil", { replace: true })}
          >
            Ver meu perfil
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
