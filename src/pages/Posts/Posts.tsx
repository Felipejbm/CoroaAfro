import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { PostWithImage } from "./Posts.types";
import { initialPosts } from "./Posts.utils";
import NavBar from "../../components/NavBar/NavBar";


export default function Posts() {
  const postsWithMockImages: PostWithImage[] = initialPosts.map(
    (post, index) => {
      if (index === 0) {
        return {
          ...post,
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
        };
      }
      if (index === 2) {
        return {
          ...post,
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60",
        };
      }
      return post;
    },
  );

  const [posts, setPosts] = useState<PostWithImage[]>(postsWithMockImages);
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { author: "Você", text: newComment[postId] },
            ],
          }
        : post,
    );
    setPosts(updatedPosts);
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <Stack direction={"row"} sx={{ width: "100vw", maxWidth: "100%" }}>
      <NavBar />
      <Stack
        sx={{
          flexGrow: 1,
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.8rem", md: "2.3rem" },
            color: "#2b2b2b",
            mb: 1,
          }}
        >
          Comunidade de Empresas
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.9rem",
            color: "#3a3a3a",
            mb: 3,
          }}
        >
          Compartilhe experiências, dúvidas e ideias com outros empreendedores
        </Typography>

        <Stack direction="row" sx={{ gap: 2, mb: 4 }}>
          <TextField
            placeholder="Pesquisar empresas ou assuntos..."
            variant="outlined"
            size="small"
            sx={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <Button
            sx={{
              backgroundColor: "#e0523a",
              color: "#fff",
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              "&:hover": { backgroundColor: "#c43f2a" },
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
                  backgroundColor: "#16161d",
                  borderRadius: "10px 10px 0px 0px",
                  p: 3,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                >
                  {post.company}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    mb: 2,
                  }}
                >
                  {post.segment}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Comfortaa', sans-serif",
                    fontSize: "0.9rem",
                    color: "#fff",
                    mb: post.image ? 2 : 0, // Adiciona margem embaixo apenas se houver imagem
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
                  backgroundColor: "#f0f0f0",
                  borderRadius: "0px 0px 10px 10px",
                  p: 3,
                  borderTop: "1px solid #e0e0e0",
                  gap: 2,
                }}
              >
                {post.comments.length > 0 && (
                  <Stack sx={{ gap: 1.2 }}>
                    {post.comments.map((c, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          fontFamily: "'Comfortaa', sans-serif",
                          fontSize: "0.85rem",
                          color: "#333333",
                          backgroundColor: "#fff",
                          p: 1.5,
                          borderRadius: "6px",
                          boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
                        }}
                      >
                        <strong style={{ color: "#e0523a" }}>
                          {c.author}:
                        </strong>
                        {c.text}
                      </Typography>
                    ))}
                  </Stack>
                )}

                <Stack
                  direction="row"
                  sx={{ gap: 1.5, mt: post.comments.length > 0 ? 1 : 0 }}
                >
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
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    sx={{
                      backgroundColor: "#e0523a",
                      color: "#fff",
                      fontFamily: "'Comfortaa', sans-serif",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 2.5,
                      "&:hover": { backgroundColor: "#c43f2a" },
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
