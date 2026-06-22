import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { Post } from "./Posts.types";
import { initialPosts } from "./Posts.utils";
import NavBar from "../../components/NavBar/NavBar";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
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
    <Stack direction={"row"}>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        {/* Cabeçalho */}
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

        <Stack sx={{ display: "flex", gap: 2, mb: 4 }}>
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

        {/* Lista de posts */}
        <Stack sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {posts.map((post) => (
            <Stack
              key={post.id}
              sx={{ backgroundColor: "#16161d", borderRadius: "10px", p: 3 }}
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
                  mb: 1,
                }}
              >
                {post.segment}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Comfortaa', sans-serif",
                  fontSize: "0.9rem",
                  color: "#fff",
                  mb: 2,
                }}
              >
                “{post.content}”
              </Typography>

              {/* Comentários */}
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.2,
                  mb: 2,
                }}
              >
                {post.comments.map((c, idx) => (
                  <Typography
                    key={idx}
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      fontSize: "0.85rem",
                      color: "#f2f2f2",
                    }}
                  >
                    <strong>{c.author}:</strong> {c.text}
                  </Typography>
                ))}
              </Stack>

              {/* Campo para novo comentário */}
              <Stack sx={{ display: "flex", gap: 1.5 }}>
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
                  sx={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px" }}
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
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
