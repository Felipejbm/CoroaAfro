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
} from "@mui/material";
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
import FooterLandPage from "../../../Components/FooterLandPage/FooterLandPage";
import NavBarLandPage from "../../../Components/NavBarLandPage/NavBarLandPage";
import Layout from "../../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import {
  criarEmpreendedor,
  mensagemErroCadastro,
} from "../../../services/controllers/empreendedor";

export default function CadastroEmpreendedor() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "cpf") value = formatCpf(value);
      if (field === "telefone") value = formatTelefone(value);
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);
    if (
      !formData.nomeCompleto.trim() ||
      !formData.email.trim() ||
      !formData.senha ||
      !formData.telefone.trim()
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
    <Layout>
      <Stack>
        <NavBarLandPage />

        <Stack sx={{ backgroundColor: "#f7dde0", py: { xs: 5, md: 7 } }}>
          <Container maxWidth="md">
            <Stack
              sx={{
                backgroundColor: "#e7d2d3",
                borderRadius: "16px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                px: { xs: 3, md: 5 },
                py: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.6rem", md: "1.9rem" },
                  color: "#2b2b2b",
                }}
              >
                Formulário de cadastro
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  color: "#2b2b2b",
                  mb: 4,
                }}
              >
                Dados do empreendedor
              </Typography>

              <Stack sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {fieldRows.map((row) => (
                  <Stack
                    key={row.map((f) => f.field).join("-")}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: { xs: 2, md: 4 },
                    }}
                  >
                    {row.map(({ label, field, type }) => (
                      <Stack key={field} sx={{ flex: 1 }}>
                        <Typography sx={labelStyles}>{label}</Typography>
                        <TextField
                          fullWidth
                          type={type ?? "text"}
                          select={field === "genero"}
                          value={formData[field]}
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

              <Stack sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  onClick={() => void handleSubmit()}
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(90deg, #f0623e, #8a1f4a)",
                    color: "#fff",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 6,
                    py: 1.1,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #e0523a, #7a1942)",
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
        </Stack>

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
                bgcolor: "#e7d2d3",
                backgroundImage: "none",
                boxShadow: "0 18px 50px rgba(44, 20, 34, 0.35)",
                px: { xs: 1, sm: 2 },
                py: 1,
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.7rem",
              color: "#2b2b2b",
              pt: 3,
            }}
          >
            Conta criada com sucesso!
          </DialogTitle>
          <DialogContent>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                color: "#4a3a40",
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
                background: "linear-gradient(90deg, #f0623e, #8a1f4a)",
                color: "#fff",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
                "&:hover": {
                  background: "linear-gradient(90deg, #e0523a, #7a1942)",
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
