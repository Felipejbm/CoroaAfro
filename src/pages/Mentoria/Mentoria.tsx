import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import NavBarMentor from "../../components/NavMentor/NavBar";
import api from "../../api/axios";
import { fonts } from "../../styles/theme";
import { buscarSessao, logout } from "../../services/Auth/controllers/auth";
import { mensagemErroApi } from "../../services/Auth/controllers/empresa";

interface Mentorado {
  id: number;
  nome: string;
  empresa: string | null;
}

export default function Mentoria({
  painel = false,
  detalhe = false,
}: {
  painel?: boolean;
  detalhe?: boolean;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [nome, setNome] = useState("");
  const [alunos, setAlunos] = useState<Mentorado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    let active = true;
    async function carregar() {
      setLoading(true);
      setError("");
      setAlunos([]);
      try {
        const usuario = await buscarSessao();
        if (detalhe && !id) throw new Error("Selecione um mentorado na lista.");
        const response = await api.get(
          detalhe ? `/mentoria/mentorados/${id}` : "/mentoria/mentorados",
        );
        if (active) {
          setNome(usuario.nome);
          setAlunos(detalhe ? [response.data] : response.data);
        }
      } catch (err) {
        if (active)
          setError(
            err instanceof Error && !id && detalhe
              ? err.message
              : mensagemErroApi(err),
          );
      } finally {
        if (active) setLoading(false);
      }
    }
    void carregar();
    return () => {
      active = false;
    };
  }, [id, detalhe, retry]);

  async function sair() {
    setSaindo(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(mensagemErroApi(err));
    } finally {
      setSaindo(false);
    }
  }

  return (
    <Stack direction="row" sx={{ minHeight: "100vh" }}>
      <NavBarMentor />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          p: { xs: 2, md: 5 },
          gap: 3,
          fontFamily: fonts.body,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Typography variant="h4" sx={{ fontFamily: fonts.hero, color: theme.palette.text.primary }}>
            {painel
              ? "Meu painel de mentoria"
              : detalhe
                ? "Detalhes do mentorado"
                : "Meus mentorados"}
          </Typography>
          <Button
            disabled={saindo}
            onClick={() => void sair()}
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.common.white,
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Sair
          </Button>
        </Stack>
        {loading ? (
          <CircularProgress aria-label="Carregando mentoria" />
        ) : error ? (
          <Alert
            severity="error"
            action={
              <Button onClick={() => setRetry((current) => current + 1)}>
                Tentar novamente
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <>
            <Typography sx={{ color: theme.palette.text.primary }}>Olá, {nome}.</Typography>
            {painel && (
              <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                {alunos.length} mentorado(s) vinculado(s)
              </Typography>
            )}
            {!alunos.length && (
              <Alert severity="info">
                Nenhum mentorado vinculado. Os empreendedores aparecerão aqui quando escolherem uma das suas trilhas.
              </Alert>
            )}
            {alunos.map((aluno) => (
              <Paper
                key={aluno.id}
                sx={{
                  p: 3,
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.common.white,
                  borderRadius: 3,
                  boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.12)}`,
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.common.white }}>{aluno.nome}</Typography>
                <Typography sx={{ color: alpha(theme.palette.common.white, 0.72) }}>
                  {aluno.empresa || "Empresa ainda não cadastrada"}
                </Typography>
                <Button
                  sx={{ color: theme.palette.primary.light, mt: 1, textTransform: "none" }}
                  onClick={() => navigate(`/chat-mentor?empreendedor=${aluno.id}`)}
                >
                  Conversar
                </Button>
                {!detalhe && (
                  <Button
                    sx={{ color: theme.palette.primary.light, mt: 1, textTransform: "none" }}
                    onClick={() => navigate(`/detalhes-mentorado/${aluno.id}`)}
                  >
                    Ver perfil
                  </Button>
                )}
              </Paper>
            ))}
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-start", backgroundColor: theme.palette.primary.main, textTransform: "none"}}
              onClick={() =>
                navigate(
                  detalhe && id ? `/criar-trilha?mentorado=${id}` : "/criar-trilha",
                )
              }
            >
              {detalhe ? "Acompanhar trilhas e progresso" : "Gerenciar trilhas e aulas"}
            </Button>
          </>
        )}
        {detalhe && (
          <Button onClick={() => navigate("/controle-mentorados")} sx={{ alignSelf: "flex-start", color: theme.palette.primary.main }}>
            Voltar aos mentorados
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
