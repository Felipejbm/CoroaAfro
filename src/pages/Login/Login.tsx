import {
  Alert,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import FooterLandPage from "../../Components/FooterLandPage/FooterLandPage";
import NavBarLandPage from "../../Components/NavBarLandPage/NavBarLandPage";
import Layout from "../../Components/Layout/Layout";
import { fonts } from "../../styles/theme";
import { login, mensagemErroLogin } from "../../services/controllers/auth";
import { buscarMinhaEmpresa } from "../../services/controllers/empresa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [papel, setPapel] = useState<"empreendedor" | "mentor">("empreendedor");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(event?: React.FormEvent) {
    event?.preventDefault();
    setError(null);

    if (!email.trim() || !senha) {
      setError("Preencha o e-mail e a senha para entrar.");
      return;
    }

    setLoading(true);
    try {
      await login({
        email: email.trim(),
        senha,
        papel,
      });

      if (papel === "mentor") {
        navigate("/dashboard-mentor", { replace: true });
        return;
      }
      const empresa = await buscarMinhaEmpresa();
      navigate(empresa ? "/dashboard-financeiro" : "/cadastro-empresa", { replace: true });
    } catch (requestError) {
      setError(mensagemErroLogin(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Stack>
        <NavBarLandPage />

        <Stack
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f7dde0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontWeight: 700,
                fontSize: { xs: "2.4rem", md: "3rem" },
                color: "#2b2b2b",
                mb: 2,
              }}
            >
              Bem-vindo de volta!
            </Typography>

            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#3a3a3a",
                mb: 5,
              }}
            >
              Acesse sua conta para acompanhar seu desenvolvimento e seus
              projetos.
            </Typography>
          </Container>

          <Stack
            component="form"
            onSubmit={(event) => void handleLogin(event)}
            sx={{
              width: "100%",
              maxWidth: 460,
              backgroundColor: "#e7d2d3",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
              px: { xs: 3, md: 5 },
              py: 5,
            }}
          >
            <TextField select label="Tipo de conta" value={papel} disabled={loading}
              onChange={(event) => { setPapel(event.target.value as "empreendedor" | "mentor"); setError(null); }}
              sx={{ mb: 2 }}>
              <MenuItem value="empreendedor">Empreendedor</MenuItem>
              <MenuItem value="mentor">Mentor autorizado</MenuItem>
            </TextField>
            {papel === "mentor" && <Alert severity="info" sx={{ mb: 2 }}>O acesso de mentor é autorizado pela equipe do Coroa Afro.</Alert>}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Typography
              align="center"
              sx={{
                fontFamily: fonts.hero,
                fontSize: "1rem",
                color: "#2b2b2b",
                mb: 2,
              }}
            >
              Faça login com
            </Typography>

            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}
            >
              <IconButton
                sx={{
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <GoogleIcon sx={{ color: "#DB4437" }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#0a66c2",
                  "&:hover": { backgroundColor: "#0958a8" },
                }}
              >
                <LinkedInIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#4a9de0",
                  "&:hover": { backgroundColor: "#3c8bca" },
                }}
              >
                <EmailIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
            >
              <Stack
                sx={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(0,0,0,0.25)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: fonts.hero,
                  fontSize: "0.9rem",
                }}
              >
                ou
              </Typography>
              <Stack
                sx={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(0,0,0,0.25)",
                }}
              />
            </Stack>

            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontSize: "1.05rem",
                color: "#2b2b2b",
                mb: 1,
              }}
            >
              E-mail:
            </Typography>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: "#f2eaea",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": { borderRadius: "6px" },
              }}
            />

            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontSize: "1.05rem",
                color: "#2b2b2b",
                mb: 1,
              }}
            >
              Senha:
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{
                mb: 1,
                backgroundColor: "#f2eaea",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": { borderRadius: "6px" },
              }}
            />

            <Stack sx={{ textAlign: "center", mb: 3 }}>
              <MuiLink
                component={RouterLink}
                to="/recuperar-senha"
                underline="hover"
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: "#7a1f4a",
                }}
              >
                Esqueci minha senha
              </MuiLink>
            </Stack>

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                background: "linear-gradient(90deg, #f0623e, #8a1f4a)",
                color: "#fff",
                fontFamily: fonts.hero,
                fontSize: "1.1rem",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.3,
                mb: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                "&:hover": {
                  background: "linear-gradient(90deg, #e0523a, #7a1942)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Entrar"
              )}
            </Button>

            <Stack sx={{ textAlign: "center" }}>
              <MuiLink
                component={RouterLink}
                to="/cadastro-empreendedor"
                underline="hover"
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: "#7a1f4a",
                }}
              >
                Não possui conta? Cadastre-se
              </MuiLink>
            </Stack>
          </Stack>
        </Stack>

        <FooterLandPage />
      </Stack>
    </Layout>
  );
}
