import { useCallback, useEffect, useMemo, useState } from "react";
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
import { metricasInteracoesConfig, metricasPerfilConfig } from "./DashboardRedes.utils";

export type OrdenacaoPublicacoes = "interacoes" | "recentes" | "curtidas" | "comentarios";

export function useDashboardRedes() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const usuario = useMemo(() => getEmpreendedorLogado(), []);

  const [profile, setProfile] = useState<InstagramProfile | null>(null);

  const [media, setMedia] = useState<InstagramMedia[]>([]);

  const [reach, setReach] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [showAllPosts, setShowAllPosts] = useState(false);

  const [postOrder, setPostOrder] = useState<OrdenacaoPublicacoes>("interacoes");

  const callbackStatus = searchParams.get("instagram");
  const connected = callbackStatus === "connected";
  const callbackErrors: Record<string, string> = {
    cancelled: "A conexão com o Instagram foi cancelada. Nenhuma alteração foi feita.",
    invalid_state: "A autorização expirou ou já foi utilizada. Inicie a conexão novamente.",
    missing_code: "A Meta não concluiu a autorização. Tente conectar novamente.",
    no_professional_account: "Nenhuma Página autorizada possui um Instagram profissional vinculado. Confirme a Página, a conta Empresa ou Criador e tente novamente.",
    permissions: "As permissões necessárias não foram concedidas. Reconecte e autorize todos os acessos solicitados.",
    expired: "A autorização do Instagram expirou ou foi revogada. Conecte novamente.",
    meta_error: "A Meta não conseguiu concluir a conexão agora. Aguarde um pouco e tente novamente.",
  };
  const callbackError = callbackStatus === "error"
    ? callbackErrors[searchParams.get("reason") ?? ""] ?? "Não foi possível conectar o Instagram. Tente novamente."
    : null;

  const loadInstagram = useCallback(async () => {
    if (!usuario) {
      setError("Entre na sua conta para conectar o Instagram.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [profileResult, mediaResult, insightsResult] = await Promise.allSettled([
        buscarPerfilInstagram(usuario.id),
        buscarMidiasInstagram(usuario.id, 100),
        buscarAlcanceInstagram(usuario.id),
      ]);
      if (profileResult.status === "rejected") throw profileResult.reason;
      const profileData = profileResult.value;
      const mediaData = mediaResult.status === "fulfilled" ? mediaResult.value : [];
      const insightsData = insightsResult.status === "fulfilled" ? insightsResult.value : { data: [] };
      const reachMetric = insightsData.data.find(
        (item: InstagramInsight) => item.name === "reach",
      );
      const latestReach = reachMetric?.values.at(-1)?.value;

      setProfile(profileData);
      setMedia(mediaData);
      setReach(typeof latestReach === "number" ? latestReach : 0);
      if (mediaResult.status === "rejected" || insightsResult.status === "rejected") {
        setError("Instagram conectado, mas algumas métricas estão temporariamente indisponíveis. Use Atualizar dados para tentar novamente.");
      }
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
    if (!callbackStatus) return;
    const timer = window.setTimeout(() => {
      setSearchParams({}, { replace: true });
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [callbackStatus, setSearchParams]);

  const likes = media.reduce((total, item) => total + (item.like_count ?? 0), 0);

  const comments = media.reduce(
    (total, item) => total + (item.comments_count ?? 0),
    0,
  );

  const averageInteractions = media.length
    ? Number(((likes + comments) / media.length).toFixed(1))
    : 0;

  const sortedPosts = useMemo(() => [...media].sort((a, b) => {
    if (postOrder === "recentes") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (postOrder === "curtidas") return (b.like_count ?? 0) - (a.like_count ?? 0);
    if (postOrder === "comentarios") return (b.comments_count ?? 0) - (a.comments_count ?? 0);
    return ((b.like_count ?? 0) + (b.comments_count ?? 0))
      - ((a.like_count ?? 0) + (a.comments_count ?? 0));
  }), [media, postOrder]);

  const displayedPosts = showAllPosts ? sortedPosts : sortedPosts.slice(0, 3);

  const handleConnect = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    iniciarConexaoInstagram(usuario.id);
  };

  const metricasPerfilValores = [profile?.followers_count ?? "--", profile?.media_count ?? "--", profile ? reach : "--", profile ? averageInteractions : "--"];
  const metricasPerfil = metricasPerfilConfig.map(({ indice, ...card }) => ({ ...card, value: metricasPerfilValores[indice] }));

  const metricasInteracoesValores = [likes, comments];
  const metricasInteracoes = metricasInteracoesConfig.map(({ indice, ...card }) => ({ ...card, value: metricasInteracoesValores[indice] }));

  return {
    metricasPerfil,
    metricasInteracoes,
    navigate,
    usuario,
    profile,
    reach,
    loading,
    error,
    connected,
    callbackError,
    loadInstagram,
    likes,
    comments,
    displayedPosts,
    postCount: media.length,
    showAllPosts,
    setShowAllPosts,
    postOrder,
    setPostOrder,
    handleConnect,
  };
}
