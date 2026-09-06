import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ModalHeader from "../../../components/ModalHeader/ModalHeader";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { fieldRows, generoOptions } from "./CadastroEmpreendedor.utils";
import Layout from "../../../components/Layout/Layout";
import NavBarLandPage from "../../../components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../../components/FooterLandPage/FooterLandPage";
import theme, { fonts } from "../../../styles/theme";
import { useCadastroEmpreendedor } from "./CadastroEmpreendedor.hook";

export default function CadastroEmpreendedor() {
  const {
    handleSubmit,
    goToLogin,
    handleChange,
    error,
    loading,
    formData,
    successOpen,
  } = useCadastroEmpreendedor();

  return (
    <Layout showSidebar={false}>
      <Stack
        sx={{
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
        }}
      >
        <NavBarLandPage />

        <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "16px",
              boxShadow: (theme) =>
                `0 10px 24px ${alpha(theme.palette.common.black, 0.2)}`,
              px: { xs: 3, md: 5 },
              py: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "1.9rem" },
                color: theme.palette.text.primary,
              }}
            >
              Formulário de cadastro
            </Typography>

            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: theme.palette.text.primary,
                mb: 4,
              }}
            >
              Dados do empreendedor
            </Typography>

            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}

              {fieldRows.map((row, rowIndex) => (
                <Stack
                  key={row.map((f) => f.field).join("-") || rowIndex}
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 2, md: 4 }}
                >
                  {row.map(({ label, field, type }) => (
                    <Stack key={field} sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: fonts.hero,
                          fontSize: "0.95rem",
                          color: theme.palette.text.primary,
                          mb: 0.8,
                        }}
                      >
                        {label}
                      </Typography>

                      <TextField
                        fullWidth
                        type={type ?? "text"}
                        select={field === "genero"}
                        value={formData[field] ?? ""}
                        onChange={handleChange(field)}
                        slotProps={{
                          htmlInput: {
                            inputMode:
                              field === "cpf" || field === "telefone"
                                ? "numeric"
                                : undefined,
                            maxLength:
                              field === "cpf"
                                ? 14
                                : field === "telefone"
                                  ? 15
                                  : undefined,
                          },
                        }}
                        sx={{
                          backgroundColor: theme.palette.secondary.light,
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-root": { borderRadius: "6px" },
                        }}
                      >
                        {field === "genero" &&
                          generoOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>

            <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
              <Button
                type="submit"
                disabled={loading}
                sx={{
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main,
                  ),
                  fontFamily: fonts.hero,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 6,
                  py: 1.1,
                  boxShadow: (theme) =>
                    `0 4px 10px ${alpha(theme.palette.common.black, 0.25)}`,
                  "&:hover": {
                    background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </Stack>
          </Stack>
        </Container>

        <FooterLandPage />

        <Dialog aria-labelledby="cadastro-concluido"
          open={successOpen}
          onClose={goToLogin}
          fullWidth
          maxWidth="xs"
          
        >
          <ModalHeader id="cadastro-concluido" titulo={"Conta criada com sucesso!"} categoria="Bem-vindo ao Coroa Afro" descricao="Sua história agora faz parte desta comunidade." icone={<CheckCircleOutlineRoundedIcon />} onClose={goToLogin}  />
          <DialogContent>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: fonts.body,
                color: theme.palette.text.primary,
                lineHeight: 1.6,
              }}
            >
              Seu cadastro foi concluído. Agora entre com seu e-mail e senha
              para continuar no Coroa Afro.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
            <Button
              fullWidth
              onClick={goToLogin}
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main,
                ),
                fontFamily: fonts.hero,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.2,
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.common.black, 0.22)}`,
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Ir para o login
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Layout>
  );
}
