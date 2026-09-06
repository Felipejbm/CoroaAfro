import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./styles/theme";
import Perfil from "./pages/Perfil/Perfil";
import Metas from "./pages/DashboardMetas/DashboardMetas";
import Trilhas from "./pages/Mentoria/TrilhasMentor";
import api from "./api/axios";
import { atualizarSessao } from "./services/Auth/controllers/auth";
import "@fontsource/playfair-display";
import "@fontsource/syne";
import "@fontsource/inter";
import "@fontsource/poppins";
import "@fontsource/sora";

const usuario = { id: 99999, nome: "Marina Oliveira", papel: "empreendedor" as const, email: "marina@example.com", telefone: "(11) 99999-9999", data_cadastro: "2026-09-01", foto_perfil_url: null };
atualizarSessao(usuario);
api.defaults.adapter = async config => {
  if (config.method !== "get") throw Error("Prévia visual: nenhuma informação é enviada.");
  const data = config.url === "/auth/me" ? usuario : config.url === "/empresa/minha" ? { nome: "Raízes Atelier", data_fundacao: null, num_funcionarios: 2 } : config.url?.includes("categorias") ? [{ value: "geral", label: "Gestão do negócio" }] : [];
  return { data, status: 200, statusText: "OK", headers: {}, config };
};
const tela = new URLSearchParams(location.search).get("tela");
createRoot(document.getElementById("root")!).render(<BrowserRouter><ThemeProvider theme={theme}><CssBaseline />{tela === "metas" ? <Metas /> : tela === "trilhas" ? <Trilhas /> : <Perfil />}</ThemeProvider></BrowserRouter>);
