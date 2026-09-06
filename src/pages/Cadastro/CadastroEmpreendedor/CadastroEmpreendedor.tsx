import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import {
  fieldRows,
  formatCpf,
  formatTelefone,
  generoOptions,
  initialFormData,
} from "./CadastroEmpreendedor.utils";
import { fieldStyles, labelStyles } from "./CadastroEmpreendedor.styles";
import type { FormData } from "./CadastroEmpreendedor.types";
import {
  criarEmpreendedor,
  mensagemErroCadastro,
} from "../../../services/Auth/controllers/empreendedor";
import Layout from "../../../components/Layout/Layout";
import NavBarLandPage from "../../../components/NavBarLandPage/NavBarLandPage";

import { useNavigate } from "react-router-dom";
import FooterLandPage from "../../../components/FooterLandPage/FooterLandPage";
import { fonts } from "../../../styles/theme";

export default function CadastroEmpreendedor() {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "cpf") value = formatCpf(value);
      if (field === "telefone") value = formatTelefone(value);
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.nomeCompleto?.trim() ||
      !formData.email?.trim() ||
      !formData.senha ||
      !formData.telefone?.trim()
    ) {
      setError("Preencha nome, e-mail, senha e telefone para continuar.");
      return;
    }

    setLoading(true);
    try {
      await criarEmpreendedor({
        nome: formData.nomeCompleto.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        telefone: formData.telefone.trim(),
        data_cadastro: new Date().toISOString().slice(0, 10),
      });
      setSuccessOpen(true);
    } catch (requestError) {
      setError(mensagemErroCadastro(requestError));
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    setSuccessOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <Layout showSidebar={false}>
      <Stack sx={{ backgroundColor: theme.palette.secondary.light, minHeight: "100vh" }}>
        <NavBarLandPage />

        <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "16px",
              boxShadow: (theme) => `0 10px 24px ${alpha(theme.palette.common.black, 0.2)}`,
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
                      <Typography sx={labelStyles}>{label}</Typography>

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
                        sx={fieldStyles}
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
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  fontFamily: fonts.hero,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 6,
                  py: 1.1,
                  boxShadow: (theme) => `0 4px 10px ${alpha(theme.palette.common.black, 0.25)}`,
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

        <Dialog
          open={successOpen}
          onClose={goToLogin}
          fullWidth
          maxWidth="xs"
          slotProps={{
            paper: {
              sx: {
                borderRadius: "20px",
               bgcolor: theme.palette.secondary.main,
                backgroundImage: "none",
                boxShadow: (theme) => `0 18px 50px ${alpha(theme.palette.primary.dark, 0.35)}`,
                px: { xs: 1, sm: 2 },
                py: 1,
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontFamily: fonts.hero,
              fontWeight: 700,
              fontSize: "1.7rem",
              color: theme.palette.text.primary,
              pt: 3,
            }}
          >
            Conta criada com sucesso!
          </DialogTitle>
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
                color: theme.palette.getContrastText(theme.palette.primary.main),
                fontFamily: fonts.hero,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.2,
                boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.22)}`,
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
