import TrilhasMentor from "./pages/Mentoria/TrilhasMentor";
import MinhasTrilhas from "./pages/Mentoria/MinhasTrilhas";
import { Route, Routes } from "react-router-dom";
import RequireLogin from "./components/RequireLogin/RequireLogin";
import LandPage from "./pages/LandPage/LandPage";
import Chat from "./pages/Mentoria/ChatMentoria";
import Mentoria from "./pages/Mentoria/Mentoria";
import DashboardFinanceiro from "./pages/DashboardFinanceiro/DashboardMetas";
import DashboardRedes from "./pages/DashboardRedes/DashboardRedes";
import Equipe from "./pages/Equipe/Equipe";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Planos from "./pages/Planos/Planos";
import Posts from "./pages/Posts/Posts";
import CadastroEmpreendedor from "./pages/Cadastro/CadastroEmpreendedor/CadastroEmpreendedor";
import CadastroEmpresa from "./pages/Cadastro/CadastroEmpresa/CadastroEmpresa";
import AssistenteIA from "./pages/AssistenteIA/AssistenteIA";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandPage />} />
      <Route path="/cadastro-empreendedor" element={<CadastroEmpreendedor />} />
      <Route
        path="/cadastro-empresa"
        element={
          <RequireLogin>
            <CadastroEmpresa />
          </RequireLogin>
        }
      />
      <Route
        path="/chat"
        element={
          <RequireLogin>
            <Chat />
          </RequireLogin>
        }
      />
      <Route
        path="/assistente"
        element={
          <RequireLogin papel="empreendedor">
            <AssistenteIA />
          </RequireLogin>
        }
      />
      <Route
        path="/controle-mentorados"
        element={
          <RequireLogin papel="mentor">
            <Mentoria />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-atividade"
        element={
          <RequireLogin papel="mentor">
            <TrilhasMentor />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-licao"
        element={
          <RequireLogin papel="mentor">
            <TrilhasMentor />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha-personalizada-1"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha-personalizada-2"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha-personalizada-3"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha-personalizada-4"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha-personalizada-5"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/criar-trilha"
        element={
          <RequireLogin papel="mentor">
            <TrilhasMentor />
          </RequireLogin>
        }
      />
      <Route
        path="/dashboard-financeiro"
        element={
          <RequireLogin>
            <DashboardFinanceiro />
          </RequireLogin>
        }
      />
      <Route
        path="/dashboard-redes"
        element={
          <RequireLogin>
            <DashboardRedes />
          </RequireLogin>
        }
      />
      <Route
        path="/detalhes-mentorado"
        element={
          <RequireLogin papel="mentor">
            <Mentoria detalhe />
          </RequireLogin>
        }
      />
      <Route
        path="/detalhes-mentorado/:id"
        element={
          <RequireLogin papel="mentor">
            <Mentoria detalhe />
          </RequireLogin>
        }
      />
      <Route path="/equipe" element={<Equipe />} />
      <Route
        path="/licoes"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/perfil"
        element={
          <RequireLogin>
            <Perfil />
          </RequireLogin>
        }
      />
      <Route path="/planos" element={<Planos />} />
      <Route
        path="/posts"
        element={
          <RequireLogin>
            <Posts />
          </RequireLogin>
        }
      />
      <Route
        path="/trilha-guiada"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/trilha-personalizada"
        element={
          <RequireLogin>
            <MinhasTrilhas />
          </RequireLogin>
        }
      />
      <Route
        path="/dashboard-mentor"
        element={
          <RequireLogin papel="mentor">
            <Mentoria painel />
          </RequireLogin>
        }
      />
      <Route
        path="/chat-mentor"
        element={
          <RequireLogin papel="mentor">
            <Chat mentor />
          </RequireLogin>
        }
      />
    </Routes>
  );
}

export default App;
