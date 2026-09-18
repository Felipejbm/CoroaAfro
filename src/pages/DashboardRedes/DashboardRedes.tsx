import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";
import { useDashboardRedes } from "./DashboardRedes.hook";

export default function DashboardRedes() {
  const {
    navigate,
    usuario,
    profile,
    loading,
    error,
    connected,
    callbackError,
    loadInstagram,
    displayedPosts,
    postCount,
    showAllPosts,
    setShowAllPosts,
    postOrder,
    setPostOrder,
    handleConnect,
    metricasPerfil,
    metricasInteracoes,
  } = useDashboardRedes();

  const theme = useTheme();
  const cardSx = {
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
    borderRadius: 3,
    p: 2.5,
    minWidth: 0,
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.06)}`,
  };

  return (
    <Stack direction="row" sx={{ width: "100%", minHeight: "100vh", bgcolor: theme.palette.secondary.light }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          px: { xs: 2, md: 4, lg: 5 },
          py: { xs: 2.5, md: 4 },
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        <Box
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
              width: 240,
              height: 240,
              right: -80,
              top: -120,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
            },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={2}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Stack gap={0.75}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.14em",
                  color: alpha(theme.palette.secondary.main, 0.72),
                  fontFamily: fonts.button,
                  fontWeight: 700,
                }}
              >
                Presença digital
              </Typography>
              <Typography
                sx={{
                  fontFamily: fonts.hero,
                  fontWeight: 600,
                  fontSize: { xs: "1.8rem", md: "2.35rem" },
                  lineHeight: 1.1,
                }}
              >
                Evolução da sua marca
              </Typography>
              <Typography sx={{ color: alpha(theme.palette.secondary.light, 0.78) }}>
                Acompanhe o desempenho do seu Instagram em um só lugar.
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<InstagramIcon />}
                onClick={handleConnect}
                sx={{
                  bgcolor: theme.palette.secondary.light,
                  color: theme.palette.primary.main,
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": { bgcolor: theme.palette.secondary.main, boxShadow: "none" },
                }}
              >
                {profile ? "Reconectar Instagram" : "Conectar Instagram"}
              </Button>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />}
                disabled={loading}
                onClick={() => void loadInstagram()}
                sx={{
                  bgcolor: alpha(theme.palette.secondary.light, 0.12),
                  color: theme.palette.secondary.light,
                  border: `1px solid ${alpha(theme.palette.secondary.light, 0.25)}`,
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": { bgcolor: alpha(theme.palette.secondary.light, 0.2), boxShadow: "none" },
                }}
              >
                Atualizar dados
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          sx={{
            px: { xs: 0, md: 1 },
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Avatar
              src={profile?.profile_picture_url}
              sx={{ bgcolor: theme.palette.primary.main, width: 44, height: 44 }}
            />
            <Stack>
              <Typography sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                {profile ? `@${profile.username}` : usuario?.nome ?? "Visitante"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile ? "Instagram conectado" : "Instagram não conectado"}
              </Typography>
            </Stack>
          </Stack>
          <Button
            startIcon={<AccountCircleIcon />}
            onClick={() => navigate("/perfil")}
            sx={{ color: theme.palette.primary.main }}
          >
            Ver perfil
          </Button>
        </Stack>

        {connected && <Alert severity="success">Instagram conectado com sucesso.</Alert>}
        {callbackError && <Alert severity="error">{callbackError}</Alert>}
        {error && <Alert severity="warning">{error}</Alert>}

        <Stack direction="row" alignItems="center" gap={1}>
          <TrendingUpRoundedIcon sx={{ color: theme.palette.primary.main }} />
          <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.dark }}>
            Visão geral
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {metricasPerfil.map(({ label, value, icon: Icon }) => (
            <Stack key={label} sx={cardSx}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ color: theme.palette.primary.main }}>
                <Icon />
                <Typography variant="body2" color="text.secondary">{label}</Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: fonts.metrics,
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: theme.palette.primary.dark,
                  mt: 1.5,
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : value}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.dark }}>
          Interações das publicações carregadas
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {metricasInteracoes.map(({ label, value, icon: Icon }) => (
            <Stack key={label} sx={cardSx}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ color: theme.palette.primary.main }}>
                <Icon />
                <Typography color="text.secondary">{label}</Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: fonts.metrics,
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: theme.palette.primary.dark,
                  mt: 1.5,
                }}
              >
                {profile ? value : "--"}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} gap={1.5}>
          <Stack>
            <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: "1.2rem", color: theme.palette.primary.dark }}>
              {showAllPosts ? "Todas as publicações" : "Publicações em destaque"}
            </Typography>
            {postCount > 0 && (
              <Typography variant="body2" color="text.secondary">
                {showAllPosts ? `${postCount} publicações carregadas` : "As 3 publicações com mais interações"}
              </Typography>
            )}
          </Stack>
          {showAllPosts && postCount > 1 && (
            <TextField
              select
              size="small"
              label="Ordenar por"
              value={postOrder}
              onChange={(event) => setPostOrder(event.target.value as typeof postOrder)}
              sx={{ minWidth: { xs: "100%", sm: 210 }, bgcolor: theme.palette.secondary.light }}
            >
              <MenuItem value="recentes">Mais recentes</MenuItem>
              <MenuItem value="interacoes">Mais interações</MenuItem>
              <MenuItem value="curtidas">Mais curtidas</MenuItem>
              <MenuItem value="comentarios">Mais comentários</MenuItem>
            </TextField>
          )}
        </Stack>
        {displayedPosts.length === 0 ? (
          <Stack sx={{ ...cardSx, alignItems: "center", py: 5 }}>
            <InstagramIcon sx={{ color: theme.palette.primary.main, fontSize: 40, mb: 1 }} />
            <Typography color="text.secondary">
              {loading ? "Carregando publicações..." : "Nenhuma publicação disponível."}
            </Typography>
          </Stack>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(220px, 280px))" },
              gap: 2,
              justifyContent: { xs: "stretch", sm: "flex-start" },
            }}
          >
            {displayedPosts.map((post) => (
              <Stack
                key={post.id}
                component="a"
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                sx={{
                  ...cardSx,
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 280 },
                  textDecoration: "none",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 14px 30px ${alpha(theme.palette.primary.dark, 0.14)}`,
                  },
                }}
              >
                {(post.thumbnail_url || post.media_url) && (
                  <Box
                    component="img"
                    src={post.thumbnail_url || post.media_url}
                    alt={post.caption || "Publicação do Instagram"}
                    sx={{
                      width: "100%",
                      height: { xs: 190, sm: 170 },
                      objectFit: "cover",
                      borderRadius: "8px",
                      mb: 1.5,
                    }}
                  />
                )}
                <Typography noWrap sx={{ color: theme.palette.primary.dark, fontWeight: 600 }}>
                  {post.caption || "Publicação sem legenda"}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "0.8rem",
                    mt: 0.7,
                  }}
                >
                  {post.like_count ?? 0} curtidas • {post.comments_count ?? 0} comentários
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 0.4 }}>
                  {new Intl.DateTimeFormat("pt-BR").format(new Date(post.timestamp))}
                </Typography>
              </Stack>
            ))}
          </Box>
        )}
        {postCount > 3 && (
          <Button
            variant={showAllPosts ? "outlined" : "contained"}
            endIcon={showAllPosts ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            onClick={() => setShowAllPosts(!showAllPosts)}
            sx={{ alignSelf: "center", borderRadius: 2.5, px: 3, textTransform: "none", fontWeight: 700 }}
          >
            {showAllPosts ? "Mostrar apenas destaques" : `Ver todas as publicações (${postCount})`}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
