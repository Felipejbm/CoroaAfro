import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Chip, InputAdornment, Stack, TextField, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";
import { usePosts } from "./Posts.hook";

export default function Posts() {
  const { newComment, setNewComment, busca, setBusca, postsVisiveis, handleAddComment } = usePosts();

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
          px: { xs: 2, md: 4, lg: 5 },
          py: { xs: 2.5, md: 4 },
          gap: 3,
        }}
      >
        <Stack
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 4,
            color: "secondary.light",
            background: `linear-gradient(125deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            boxShadow: `0 16px 34px ${alpha(theme.palette.primary.dark, 0.2)}`,
          }}
        >
        <Typography variant="overline" sx={{ letterSpacing: "0.14em", opacity: 0.75, fontWeight: 700 }}>Conexões que fortalecem</Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: fonts.hero,
            fontWeight: 700,
            fontSize: { xs: "1.8rem", md: "2.3rem" },
            color: theme.palette.secondary.light,
            mb: 0.75,
          }}
        >
          Comunidade de Empresas
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.9rem",
            color: alpha(theme.palette.secondary.light, 0.78),
            mb: 0,
          }}
        >
          Compartilhe experiências, dúvidas e ideias com outros empreendedores
        </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2, p: 2, borderRadius: 3, bgcolor: "secondary.light", border: "1px solid", borderColor: "secondary.main" }}>
          <TextField
            placeholder="Pesquisar empresas ou assuntos..."
            variant="outlined"
            size="small"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }, htmlInput: { "aria-label": "Pesquisar publicações" } }}
            sx={{ flex: 1, backgroundColor: theme.palette.background.paper, borderRadius: "8px" }}
          />
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.light,
              fontFamily: fonts.body,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Add Postagem +
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography component="h2" sx={{ fontFamily: fonts.heading, fontSize: "1.2rem", fontWeight: 700 }}>Na comunidade</Typography>
          <Chip label={`${postsVisiveis.length} publicações`} size="small" sx={{ bgcolor: "secondary.main", color: "primary.main" }} />
        </Stack>
        <Stack sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "repeat(2, minmax(0, 1fr))" }, alignItems: "start", gap: 3 }}>
          {!postsVisiveis.length && <Typography sx={{ p: 3 }}>Nenhuma publicação encontrada para essa busca.</Typography>}
          {postsVisiveis.map((post) => (
            <Stack component="article" key={post.id} sx={{ minWidth: 0, borderRadius: 4, overflow: "hidden", border: "1px solid", borderColor: "secondary.main", boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.07)}` }}>
              <Stack
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  p: { xs: 2, md: 3 },
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Stack direction="row" gap={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", color: "secondary.light", width: 44, height: 44 }}>{post.company.charAt(0)}</Avatar>
                <Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  {post.company}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.8rem",
                    color: alpha(theme.palette.text.primary, 0.65),
                  }}
                >
                  {post.segment}
                </Typography>
                </Stack>
                </Stack>

                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    color: theme.palette.text.primary,
                    lineHeight: 1.8,
                    mb: post.image ? 2 : 0,
                  }}
                >
                  {post.content}
                </Typography>

                {post.image && (
                  <Stack
                    component="img"
                    src={post.image}
                    alt="Imagem do post"
                    sx={{
                      width: "100%",
                      maxHeight: "350px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </Stack>

              <Stack
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.35),
                  p: { xs: 2, md: 3 },
                  borderTop: `1px solid ${alpha(theme.palette.primary.dark, 0.08)}`,
                  gap: 2,
                }}
              >
                <Stack direction="row" alignItems="center" gap={1} sx={{ color: "primary.main" }}>
                  <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{post.comments.length} comentários</Typography>
                </Stack>
                {post.comments.length > 0 && (
                  <Stack sx={{ gap: 1.2 }}>
                    {post.comments.map((c, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.85rem",
                          color: theme.palette.text.primary,
                          backgroundColor: theme.palette.secondary.light,
                          p: 1.5,
                          borderRadius: "6px",
                          boxShadow: `0px 1px 3px ${alpha(theme.palette.common.black, 0.05)}`,
                        }}
                      >
                        <strong style={{ color: theme.palette.primary.main }}>{c.author}: </strong>
                        {c.text}
                      </Typography>
                    ))}
                  </Stack>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1.5, mt: post.comments.length > 0 ? 1 : 0 }}>
                  <TextField
                    placeholder="Escreva um comentário..."
                    variant="outlined"
                    size="small"
                    slotProps={{ htmlInput: { "aria-label": `Comentar na publicação de ${post.company}` } }}
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    sx={{
                      flex: 1,
                      backgroundColor: theme.palette.secondary.light,
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.secondary.light,
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 2.5,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    Comentar
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
