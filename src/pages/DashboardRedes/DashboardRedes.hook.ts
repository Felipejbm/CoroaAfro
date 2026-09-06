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

export function useDashboardRedes() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const usuario = useMemo(() => getEmpreendedorLogado(), []);

  const [profile, setProfile] = useState<InstagramProfile | null>(null);

  const [media, setMedia] = useState<InstagramMedia[]>([]);

  const [reach, setReach] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const connected = searchParams.get("instagram") === "connected";

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

  const metricasPerfilValores = [profile?.followers_count ?? "--", profile?.media_count ?? "--", profile ? reach : "--", profile ? likes : "--"];
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
    loadInstagram,
    likes,
    comments,
    popularPosts,
    handleConnect,
  };
}
