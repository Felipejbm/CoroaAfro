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
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import MentorHeader from "./MentorHeader";
import { useMentoria } from "./Mentoria.hook";
import type { MentoriaProps } from "./Mentoria.types";

export default function Mentoria({
  painel = false,
  detalhe = false,
}: MentoriaProps) {
  const {
    id,
    navigate,
    nome,
    alunos,
    loading,
    error,
    setRetry,
    saindo,
    sair,
  } = useMentoria({ painel, detalhe });

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ minHeight: "100vh" }}>
      <NavBarMentor />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          p: { xs: 2, md: 4, lg: 5 },
          gap: 3,
          fontFamily: fonts.body,
        }}
      >
        <MentorHeader
          title={painel ? "Meu painel de mentoria" : detalhe ? "Detalhes do mentorado" : "Meus mentorados"}
          description={detalhe ? "Acompanhe o empreendedor, suas trilhas e os próximos passos da mentoria." : "Fortaleça conexões e acompanhe o desenvolvimento de quem empreende."}
          action={<Button disabled={saindo} onClick={() => void sair()} variant="outlined" sx={{ color: "secondary.light", borderColor: "secondary.main", borderRadius: 2.5, px: 3 }}>Sair</Button>}
        />
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
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.text.primary,
                  borderRadius: 3, border: "1px solid", borderColor: alpha(theme.palette.primary.dark, 0.12),
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.dark, 0.08)}`,
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>{aluno.nome}</Typography>
                <Typography sx={{ color: alpha(theme.palette.text.primary, 0.72) }}>
                  {aluno.empresa || "Empresa ainda não cadastrada"}
                </Typography>
                <Button
                  variant="outlined" sx={{ color: theme.palette.primary.main, mt: 2, mr: 1, borderRadius: 2 }}
                  onClick={() => navigate(`/chat-mentor?empreendedor=${aluno.id}`)}
                >
                  Conversar
                </Button>
                {!detalhe && (
                  <Button
                    variant="outlined" sx={{ color: theme.palette.primary.main, mt: 2, mr: 1, borderRadius: 2 }}
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
