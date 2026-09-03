import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  buscarAlcanceInstagram,
  buscarMidiasInstagram,
  buscarPerfilInstagram,
  getEmpreendedorLogado,
  iniciarConexaoInstagram,
  mensagemErroInstagram,
} from "../../services/Auth/controllers/instagram";
import type {
  InstagramInsight,
  InstagramMedia,
  InstagramProfile,
} from "../../services/Auth/schema/instagramSchema";

export default function DashboardRedes() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const usuario = useMemo(() => getEmpreendedorLogado(), []);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [reach, setReach] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const connected = searchParams.get("instagram") === "connected";

  const cardSx = {
    backgroundColor: theme.palette.background.default,
    borderRadius: "12px",
    p: 2,
    minWidth: 0,
  };

  const loadInstagram = useCallback(async () => {
    if (!usuario) {
      setError("Entre na sua conta para conectar o Instagram.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [profileData, mediaData, insightsData] = await Promise.all([
        buscarPerfilInstagram(usuario.id),
        buscarMidiasInstagram(usuario.id),
        buscarAlcanceInstagram(usuario.id),
      ]);
      const reachMetric = insightsData.data.find(
        (item: InstagramInsight) => item.name === "reach",
      );
      const latestReach = reachMetric?.values.at(-1)?.value;

      setProfile(profileData);
      setMedia(mediaData);
      setReach(typeof latestReach === "number" ? latestReach : 0);
    } catch (requestError) {
      setError(mensagemErroInstagram(requestError));
      setProfile(null);
      setMedia([]);
      setReach(0);
    } finally {
      setLoading(false);
    }
  }, [usuario]);

  useEffect(() => {
    void loadInstagram();
  }, [loadInstagram]);

  useEffect(() => {
    if (!connected) return;
    const timer = window.setTimeout(() => {
      setSearchParams({}, { replace: true });
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [connected, setSearchParams]);

  const likes = media.reduce((total, item) => total + (item.like_count ?? 0), 0);
  const comments = media.reduce(
    (total, item) => total + (item.comments_count ?? 0),
    0,
  );
  const popularPosts = [...media]
    .sort(
      (a, b) =>
        (b.like_count ?? 0) +
        (b.comments_count ?? 0) -
        ((a.like_count ?? 0) + (a.comments_count ?? 0)),
    )
    .slice(0, 3);

  const handleConnect = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    iniciarConexaoInstagram(usuario.id);
  };

  return (
    <Stack direction="row" sx={{ width: "100%", minHeight: "100vh", bgcolor: theme.palette.secondary.light }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2rem" },
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Acompanhe a evolução da sua marca no digital
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<InstagramIcon />}
                onClick={handleConnect}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  textTransform: "none",
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
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.common.white,
                  textTransform: "none",
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                Atualizar dados
              </Button>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1.5,
              backgroundColor: alpha(theme.palette.background.default, 0.9),
              borderRadius: "30px",
              px: 2,
              py: 1,
            }}
          >
            <Avatar src={profile?.profile_picture_url} sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }} />
            <Stack>
              <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: theme.palette.common.white }}>
                {profile ? `@${profile.username}` : usuario?.nome ?? "Visitante"}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: alpha(theme.palette.common.white, 0.65) }}>
                {profile ? "Instagram conectado" : "Instagram não conectado"}
              </Typography>
            </Stack>
            <Button
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/perfil")}
              sx={{
                color: theme.palette.common.white,
                bgcolor: alpha(theme.palette.common.white, 0.1),
                "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) },
              }}
            >
              Perfil
            </Button>
          </Stack>
        </Stack>

        {connected && <Alert severity="success" sx={{ mb: 3 }}>Instagram conectado com sucesso.</Alert>}
        {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}

        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 2, color: theme.palette.text.primary }}>
          Visão geral
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {[
            ["Seguidores", profile?.followers_count ?? "--"],
            ["Publicações", profile?.media_count ?? "--"],
            ["Alcance hoje", profile ? reach : "--"],
            ["Curtidas nos posts", profile ? likes : "--"],
          ].map(([label, value]) => (
            <Stack key={label} sx={cardSx}>
              <Typography sx={{ fontSize: "0.85rem", color: alpha(theme.palette.common.white, 0.75) }}>
                {label}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: theme.palette.primary.light,
                  mt: 1,
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : value}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 2, color: theme.palette.text.primary }}>
          Interações das publicações carregadas
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {[["Curtidas", likes], ["Comentários", comments]].map(([label, value]) => (
            <Stack key={label} sx={cardSx}>
              <Typography sx={{ color: theme.palette.common.white }}>{label}</Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: theme.palette.primary.light,
                  mt: 1,
                }}
              >
                {profile ? value : "--"}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 2, color: theme.palette.text.primary }}>
          Publicações em destaque
        </Typography>
        {popularPosts.length === 0 ? (
          <Stack sx={{ ...cardSx, alignItems: "center", py: 5 }}>
            <InstagramIcon sx={{ color: theme.palette.primary.main, fontSize: 40, mb: 1 }} />
            <Typography sx={{ color: theme.palette.common.white }}>
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
            {popularPosts.map((post) => (
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
                <Typography noWrap sx={{ color: theme.palette.common.white, fontWeight: 600 }}>
                  {post.caption || "Publicação sem legenda"}
                </Typography>
                <Typography
                  sx={{
                    color: alpha(theme.palette.common.white, 0.65),
                    fontSize: "0.8rem",
                    mt: 0.7,
                  }}
                >
                  {post.like_count ?? 0} curtidas • {post.comments_count ?? 0} comentários
                </Typography>
              </Stack>
            ))}
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
