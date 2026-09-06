import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import Layout from "../../components/Layout/Layout";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import theme, { fonts } from "../../styles/theme";
import { useLogin } from "./Login.hook";

export default function Login() {
  const {
    email,
    setEmail,
    papel,
    setPapel,
    senha,
    setSenha,
    loading,
    error,
    setError,
    handleLogin,
  } = useLogin();

  return (
    <Layout showSidebar={false}>
      <Stack>
        <NavBarLandPage />

        <Stack
          sx={{
            minHeight: "100vh",
            backgroundColor: theme.palette.secondary.light,
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
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              Bem-vindo de volta!
            </Typography>

            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: theme.palette.text.primary,
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
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "20px",
              boxShadow: `0 10px 24px ${alpha(theme.palette.common.black, 0.2)}`,
              px: { xs: 3, md: 5 },
              py: 5,
            }}
          >
            <TextField
              select
              label="Tipo de conta"
              value={papel}
              disabled={loading}
              onChange={(event) => {
                setPapel(event.target.value as "empreendedor" | "mentor");
                setError(null);
              }}
              sx={{ mb: 2 }}
            >
              <MenuItem value="empreendedor">Empreendedor</MenuItem>
              <MenuItem value="mentor">Mentor autorizado</MenuItem>
            </TextField>
            {papel === "mentor" && (
              <Alert severity="info" sx={{ mb: 2 }}>
                O acesso de mentor é autorizado pela equipe do Coroa Afro.
              </Alert>
            )}
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
                color: theme.palette.text.primary,
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
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.light },
                  border: "2px solid",
                  borderColor: "primary.dark",
                  padding: "10px",
                }}
              >
                <GoogleIcon
                  sx={{
                    color: theme.palette.primary.dark,
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.light },
                  border: "2px solid", 
                  borderColor: "primary.dark",
                  padding: "10px",
                }}
              >
                <LinkedInIcon sx={{ color: theme.palette.primary.dark }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.light },
                  border: "2px solid", 
                  borderColor: "primary.dark",
                  padding: "10px",
                }}
              >
                <EmailIcon sx={{ color: theme.palette.primary.dark }} />
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
                  backgroundColor: alpha(theme.palette.common.black, 0.25),
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
                  backgroundColor: alpha(theme.palette.common.black, 0.25),
                }}
              />
            </Stack>

            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontSize: "1.05rem",
                color: theme.palette.text.primary,
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
                backgroundColor: theme.palette.secondary.light,
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": { borderRadius: "6px" },
              }}
            />

            <Typography
              sx={{
                fontFamily: fonts.hero,
                fontSize: "1.05rem",
                color: theme.palette.text.primary,
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
                backgroundColor: theme.palette.secondary.light,
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
                  color: theme.palette.primary.dark,
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main,
                ),
                fontFamily: fonts.hero,
                fontSize: "1.1rem",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.3,
                mb: 2,
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
                  color: theme.palette.primary.dark,
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
