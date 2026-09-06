import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { usePosts } from "./Posts.hook";
import AvatarUsuario from "../../components/AvatarUsuario/AvatarUsuario";

export default function Posts() {
  const { usuario, newComment, setNewComment, busca, setBusca, postsVisiveis, handleAddComment,
    carregando, erro, recarregar, aberto, setAberto, texto, setTexto, imagem, setImagem,
    erroFormulario, salvando, publicar, comentando, editando, abrirFormulario,
    selecionarArquivo, limparImagem, imagemPreview, arquivo,
    excluindo, setExcluindo, apagando, erroExclusao, pedirExclusao, confirmarExclusao } = usePosts();

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      {usuario?.papel === "mentor" ? <NavBarMentor /> : <NavBar />}
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: theme.palette.secondary.light,
          minHeight: "100vh",
          px: { xs: 2, md: 4, lg: 5 },
          py: { xs: 2.5, md: 4 },
          gap: 3,
          alignItems: "center",
          "& > *": { width: "100%", maxWidth: 860, boxSizing: "border-box" },
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
          Comunidade Coroa Afro
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.9rem",
            color: alpha(theme.palette.secondary.light, 0.78),
            mb: 0,
          }}
        >
          Compartilhe experiências, dúvidas e ideias com empreendedores e mentores
        </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1.5, p: 2, alignItems: { sm: "center" }, borderRadius: 3, bgcolor: "secondary.light", border: "1px solid", borderColor: "secondary.main" }}>
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
            onClick={() => abrirFormulario()}
            disabled={!usuario}
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
            Adicionar postagem +
          </Button>
        </Stack>

        {erro && <Alert severity="error" action={<Button color="inherit" onClick={recarregar}>Tentar novamente</Button>}>{erro}</Alert>}
        {carregando && <Stack alignItems="center"><CircularProgress aria-label="Carregando publicações" /></Stack>}
        <Dialog open={aberto} onClose={() => { if (!salvando) setAberto(false); }} fullWidth maxWidth="sm" aria-labelledby="nova-postagem-titulo">
          <DialogTitle id="nova-postagem-titulo">{editando ? "Editar postagem" : "Nova postagem"}</DialogTitle>
          <DialogContent>
            <Stack gap={2} sx={{ pt: 1 }}>
              <Typography variant="body2">Publicando como {usuario?.nome}</Typography>
              {erroFormulario && <Alert severity="error">{erroFormulario}</Alert>}
              <TextField label="O que você quer compartilhar?" value={texto} onChange={e => setTexto(e.target.value)}
                autoFocus multiline minRows={5} disabled={salvando} required
                helperText={`${texto.length}/4.000 caracteres`} slotProps={{ htmlInput: { maxLength: 4000 } }} />
              <Button component="label" variant="outlined" disabled={salvando}>
                {arquivo ? "Trocar arquivo" : "Enviar imagem do computador"}
                <input hidden type="file" accept="image/jpeg,image/png,image/webp" disabled={salvando}
                  onChange={event => { selecionarArquivo(event.target.files?.[0]); event.target.value = ""; }} />
              </Button>
              <Typography variant="caption">JPG, PNG ou WebP. Até 5 MB.{arquivo ? ` Arquivo: ${arquivo.name}` : ""}</Typography>
              <TextField label="Ou use uma URL de imagem (opcional)" value={imagem} onChange={e => { limparImagem(); setImagem(e.target.value); }}
                disabled={salvando} helperText="Link HTTP ou HTTPS, com até 255 caracteres."
                slotProps={{ htmlInput: { maxLength: 255 } }} />
              {imagemPreview && <Stack gap={1}>
                <Stack component="img" src={imagemPreview} alt="Prévia da imagem da postagem" referrerPolicy="no-referrer"
                  sx={{ width: "100%", maxHeight: 280, objectFit: "contain", borderRadius: 2 }} />
                <Button disabled={salvando} onClick={limparImagem}>Remover imagem</Button>
              </Stack>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button disabled={salvando} onClick={() => setAberto(false)}>Cancelar</Button>
            <Button variant="contained" disabled={salvando || !texto.trim()} onClick={publicar}>{salvando ? "Salvando..." : editando ? "Salvar alterações" : "Publicar"}</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={!!excluindo} onClose={() => { if (!apagando) setExcluindo(null); }} aria-labelledby="excluir-postagem-titulo">
          <DialogTitle id="excluir-postagem-titulo">Excluir postagem?</DialogTitle>
          <DialogContent>
            <Typography>A postagem, a imagem e todos os comentários serão excluídos. Essa ação não pode ser desfeita.</Typography>
            {erroExclusao && <Alert severity="error" sx={{ mt: 2 }}>{erroExclusao}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button disabled={apagando} onClick={() => setExcluindo(null)}>Cancelar</Button>
            <Button color="error" variant="contained" disabled={apagando} onClick={confirmarExclusao}>{apagando ? "Excluindo..." : "Excluir postagem"}</Button>
          </DialogActions>
        </Dialog>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography component="h2" sx={{ fontFamily: fonts.heading, fontSize: "1.2rem", fontWeight: 700 }}>Na comunidade</Typography>
          <Chip label={`${postsVisiveis.length} ${postsVisiveis.length === 1 ? "publicação" : "publicações"}`} size="small" sx={{ bgcolor: "secondary.main", color: "primary.main" }} />
        </Stack>
        <Stack sx={{ gap: 3, minWidth: 0 }}>
          {!carregando && !erro && !postsVisiveis.length && <Typography sx={{ p: 3 }}>{busca.trim() ? "Nenhuma publicação encontrada para essa busca." : "Ainda não há publicações. Compartilhe a primeira!"}</Typography>}
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
                <Stack direction="row" gap={1.5} alignItems="center" sx={{ mb: 2, minWidth: 0 }}>
                <AvatarUsuario atual={post.minha} nome={post.company} fotoUrl={post.autorFotoUrl}
                  sx={{ bgcolor: "primary.main", color: "secondary.light", width: 44, height: 44, flexShrink: 0 }} />
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "1rem",
                    overflowWrap: "anywhere",
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
                {post.minha && <Stack direction="row" sx={{ flexShrink: 0 }}>
                  <Tooltip title="Editar postagem"><IconButton size="small" aria-label="Editar postagem" onClick={() => abrirFormulario(post)}><EditOutlinedIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Excluir postagem"><IconButton size="small" color="error" aria-label="Excluir postagem" onClick={() => pedirExclusao(post)}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
                </Stack>}
                </Stack>

                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    color: theme.palette.text.primary,
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
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
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxHeight: { xs: 400, sm: 560 },
                      objectFit: "contain",
                      backgroundColor: alpha(theme.palette.primary.dark, 0.04),
                      borderRadius: 2,
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
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{post.comments.length} {post.comments.length === 1 ? "comentário" : "comentários"}</Typography>
                </Stack>
                {post.comments.length > 0 && (
                  <Stack sx={{ gap: 1.2 }}>
                    {post.comments.map((c, idx) => (
                      <Stack key={idx} direction="row" alignItems="flex-start" gap={1} sx={{ minWidth: 0 }}>
                        <AvatarUsuario
                          atual={!!usuario && c.autorId === usuario.id && c.autorPapel === usuario.papel}
                          nome={c.author}
                          sx={{ width: 30, height: 30, fontSize: "0.75rem", flexShrink: 0 }}
                        />
                      <Typography
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.85rem",
                          minWidth: 0,
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
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
                      </Stack>
                    ))}
                  </Stack>
                )}

                <Stack sx={{ display: "grid", gridTemplateColumns: { xs: "36px minmax(0, 1fr)", sm: "36px minmax(0, 1fr) auto" }, alignItems: "start", gap: 1.5, mt: post.comments.length > 0 ? 1 : 0 }}>
                  <AvatarUsuario atual sx={{ width: 36, height: 36, mt: 0.25 }} />
                  <TextField
                    placeholder="Escreva um comentário..."
                    variant="outlined"
                    size="small"
                    multiline
                    maxRows={4}
                    disabled={comentando[post.id]}
                    slotProps={{ htmlInput: { maxLength: 2000, "aria-label": `Comentar na publicação de ${post.company}` } }}
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      backgroundColor: theme.palette.secondary.light,
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => handleAddComment(post.id)}
                    disabled={comentando[post.id] || !newComment[post.id]?.trim() || !usuario}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.secondary.light,
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 2.5,
                      minHeight: 40,
                      gridColumn: { xs: "2", sm: "auto" },
                      justifySelf: { xs: "end", sm: "stretch" },
                      "&.Mui-disabled": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        color: theme.palette.text.secondary,
                      },
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    {comentando[post.id] ? "Enviando..." : "Comentar"}
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
