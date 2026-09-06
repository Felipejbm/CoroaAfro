import { useEffect, useRef, useState } from "react";
import type { PostWithImage } from "./Posts.types";
import { comentarPost, salvarPost, excluirPost, erroPosts, listarPosts, validarPost } from "./Posts.utils";
import { useSessaoAtual } from "../../hooks/useSessaoAtual";

export function usePosts() {
  const usuario = useSessaoAtual();
  const [posts, setPosts] = useState<PostWithImage[]>([]);
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState("");
  const [erroFormulario, setErroFormulario] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [comentando, setComentando] = useState<Record<string, boolean>>({});
  const [editando, setEditando] = useState<PostWithImage | null>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [removerImagem, setRemoverImagem] = useState(false);
  const [excluindo, setExcluindo] = useState<PostWithImage | null>(null);
  const [apagando, setApagando] = useState(false);
  const [erroExclusao, setErroExclusao] = useState("");
  const exclusaoEmCurso = useRef(false);
  const enviando = useRef(false);
  const comentariosEnviando = useRef(new Set<string>());

  useEffect(() => {
    if (!arquivo) { setPreview(""); return; }
    const url = URL.createObjectURL(arquivo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [arquivo]);

  const abrirFormulario = (post: PostWithImage | null = null) => {
    setEditando(post); setTexto(post?.content || ""); setImagem(post?.imageUrl || "");
    setArquivo(null); setRemoverImagem(false); setErroFormulario(""); setAberto(true);
  };
  const selecionarArquivo = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setErroFormulario("Escolha uma imagem JPG, PNG ou WebP de até 5 MB."); return;
    }
    setArquivo(file); setImagem(""); setRemoverImagem(false); setErroFormulario("");
  };
  const limparImagem = () => { setArquivo(null); setImagem(""); setRemoverImagem(true); };
  const imagemPreview = preview || imagem || (!removerImagem ? editando?.image : "");
  const pedirExclusao = (post: PostWithImage) => { setExcluindo(post); setErroExclusao(""); };
  const confirmarExclusao = async () => {
    if (!excluindo || exclusaoEmCurso.current) return;
    exclusaoEmCurso.current = true; setApagando(true); setErroExclusao("");
    try {
      await excluirPost(excluindo.id);
      setPosts(prev => prev.filter(post => post.id !== excluindo.id)); setExcluindo(null);
    } catch (error) { setErroExclusao(erroPosts(error)); }
    finally { exclusaoEmCurso.current = false; setApagando(false); }
  };

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro("");
    listarPosts().then(data => { if (ativo) setPosts(data); })
      .catch(error => { if (ativo) setErro(erroPosts(error)); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [tentativa]);

  const publicar = async () => {
    if (enviando.current) return;
    const validacao = validarPost(texto, imagem);
    setErroFormulario(validacao);
    if (validacao) return;
    enviando.current = true;
    setSalvando(true);
    try {
      const post = await salvarPost(texto, imagem, arquivo, editando, removerImagem);
      setPosts(prev => editando ? prev.map(item => item.id === post.id ? post : item) : [post, ...prev]);
      setTexto(""); setImagem(""); setArquivo(null); setBusca(""); setAberto(false);
    } catch (error) { setErroFormulario(erroPosts(error)); }
    finally { enviando.current = false; setSalvando(false); }
  };

  const handleAddComment = async (postId: string) => {
    const comentario = newComment[postId]?.trim();
    if (!usuario || !comentario || comentario.length > 2000 || comentariosEnviando.current.has(postId)) return;
    comentariosEnviando.current.add(postId);
    setComentando(prev => ({ ...prev, [postId]: true }));
    setErro("");
    try {
      const salvo = await comentarPost(postId, comentario);
      setPosts(prev => prev.map(post => post.id === postId ? { ...post, comments: [...post.comments, salvo] } : post));
      setNewComment(prev => ({ ...prev, [postId]: "" }));
    } catch (error) { setErro(erroPosts(error)); }
    finally {
      comentariosEnviando.current.delete(postId);
      setComentando(prev => ({ ...prev, [postId]: false }));
    }
  };
  const postsVisiveis = posts.filter(post => `${post.company} ${post.segment} ${post.content}`.toLocaleLowerCase().includes(busca.trim().toLocaleLowerCase()));
  return { usuario, newComment, setNewComment, busca, setBusca, postsVisiveis, handleAddComment,
    carregando, erro, recarregar: () => setTentativa(prev => prev + 1), aberto, setAberto,
    texto, setTexto, imagem, setImagem, erroFormulario, salvando, publicar, comentando,
    editando, abrirFormulario, selecionarArquivo, limparImagem, imagemPreview, arquivo,
    excluindo, setExcluindo, apagando, erroExclusao, pedirExclusao, confirmarExclusao };
}
