import PerfilMentor from "./pages/Mentoria/PerfilMentor";
import AdminMentores from "./pages/Mentoria/AdminMentores";
import TrilhasMentor from "./pages/Mentoria/TrilhasMentor";
import MinhasTrilhas from "./pages/Mentoria/MinhasTrilhas";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireLogin from "./components/RequireLogin/RequireLogin";
import LandPage from "./pages/LandPage/LandPage";
import Chat from "./pages/Mentoria/ChatMentoria";
import Mentoria from "./pages/Mentoria/Mentoria";
import DashboardMetas from "./pages/DashboardMetas/DashboardMetas";
import DashboardRedes from "./pages/DashboardRedes/DashboardRedes";
import Equipe from "./pages/Equipe/Equipe";
import Login from "./pages/Login/Login";
import RecuperarSenha from "./pages/RecuperarSenha/RecuperarSenha";
import Perfil from "./pages/Perfil/Perfil";
import Planos from "./pages/Planos/Planos";
import Posts from "./pages/Posts/Posts";
import CadastroEmpreendedor from "./pages/Cadastro/CadastroEmpreendedor/CadastroEmpreendedor";
import CadastroEmpresa from "./pages/Cadastro/CadastroEmpresa/CadastroEmpresa";
import AssistenteIA from "./pages/AssistenteIA/AssistenteIA";
import CheckoutPlano from "./pages/CheckoutPlano/CheckoutPlano";
import CadastroMentor from "./pages/CadastroMentor/CadastroMentor";
import Admin from "./pages/Admin/Admin";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada/PaginaNaoEncontrada";
import FeedbackModal from "./components/Feedback/FeedbackModal";

function App() {
  return (
    <>
    <Routes>
      <Route path="/perfil-mentor" element={<RequireLogin papel="mentor"><PerfilMentor /></RequireLogin>} />
      <Route path="/assistente-mentor" element={<RequireLogin papel="mentor"><AssistenteIA mentor /></RequireLogin>} />
      <Route path="/admin/mentores" element={<RequireLogin papel="mentor"><AdminMentores /></RequireLogin>} />
      <Route path="/" element={<LandPage />} />
      <Route path="/cadastro-empreendedor" element={<CadastroEmpreendedor />} />
      <Route path="/cadastro-mentor" element={<CadastroMentor />} />
      <Route path="/admin" element={<Admin />} />
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
        element={<Navigate to="/criar-trilha" replace />}
      />
      <Route
        path="/criar-licao"
        element={<Navigate to="/criar-trilha" replace />}
      />
      <Route path="/criar-trilha-personalizada-1" element={<Navigate to="/trilha-personalizada" replace />} />
      <Route path="/criar-trilha-personalizada-2" element={<Navigate to="/trilha-personalizada" replace />} />
      <Route path="/criar-trilha-personalizada-3" element={<Navigate to="/trilha-personalizada" replace />} />
      <Route path="/criar-trilha-personalizada-4" element={<Navigate to="/trilha-personalizada" replace />} />
      <Route path="/criar-trilha-personalizada-5" element={<Navigate to="/trilha-personalizada" replace />} />
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
        element={<Navigate to="/dashboard-metas" replace />}
      />
      <Route
        path="/dashboard-metas"
        element={
          <RequireLogin>
            <DashboardMetas />
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
        element={<Navigate to="/controle-mentorados" replace />}
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
        element={<Navigate to="/trilha-guiada" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
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
        path="/checkout"
        element={
          <RequireLogin papel="empreendedor">
            <CheckoutPlano />
          </RequireLogin>
        }
      />
      <Route
        path="/posts"
        element={
          <RequireLogin papel="ambos">
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
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
    <FeedbackModal />
    </>
  );
}

export default App;
