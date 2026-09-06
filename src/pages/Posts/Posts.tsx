import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import type { PostWithImage } from "./Posts.types";
import { initialPosts } from "./Posts.utils";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";

export default function Posts() {
  const theme = useTheme();

  const postsWithMockImages: PostWithImage[] = initialPosts.map((post, index) => {
    if (index === 0) {
      return {
        ...post,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
      };
    }
    if (index === 2) {
      return {
        ...post,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60",
      };
    }
    return post;
  });

  const [posts, setPosts] = useState<PostWithImage[]>(postsWithMockImages);
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, { author: "Você", text: newComment[postId] }],
          }
        : post,
    );
    setPosts(updatedPosts);
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <Stack direction="row" sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 4 },
          gap: 2,
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
        <Typography
          sx={{
            fontFamily: fonts.body,
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

        <Stack direction="row" sx={{ gap: 2, mb: 4 }}>
          <TextField
            placeholder="Pesquisar empresas ou assuntos..."
            variant="outlined"
            size="small"
            sx={{ flex: 1, backgroundColor: theme.palette.background.paper, borderRadius: "8px" }}
          />
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
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

        <Stack sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {posts.map((post) => (
            <Stack key={post.id} sx={{ flexDirection: "column" }}>
              <Stack
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  borderRadius: "14px 14px 0 0",
                  p: 3,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: theme.palette.secondary.light,
                  }}
                >
                  {post.company}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.8rem",
                    color: alpha(theme.palette.secondary.light, 0.7),
                    mb: 2,
                  }}
                >
                  {post.segment}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    color: theme.palette.secondary.light,
                    mb: post.image ? 2 : 0,
                  }}
                >
                  “{post.content}”
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
                  backgroundColor: alpha(theme.palette.common.white, 0.8),
                  borderRadius: "0 0 14px 14px",
                  p: 3,
                  borderTop: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
                  gap: 2,
                }}
              >
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
                        <strong style={{ color: theme.palette.primary.main }}>{c.author}:</strong>
                        {c.text}
                      </Typography>
                    ))}
                  </Stack>
                )}

                <Stack direction="row" sx={{ gap: 1.5, mt: post.comments.length > 0 ? 1 : 0 }}>
                  <TextField
                    placeholder="Escreva um comentário..."
                    variant="outlined"
                    size="small"
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
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
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
