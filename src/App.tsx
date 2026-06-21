import { Route, Routes } from "react-router-dom";
import LandPage from "./pages/LandPage/LandPage";
import Cadastro from "./pages/Cadastro/Cadastro";
import Chat from "./pages/Chat/Chat";
import ControleMentorado from "./pages/ControleMentorados/ControleMentorado";
import CriarAtividades from "./pages/CriarAtividades/CriarAtividades";
import CriarLicoes from "./pages/CriarLicoes/CriarLicoes";
import CriarTrilhas from "./pages/CriarTilhas/CriarTrilhas";
import CriarTrilhaPersonalizada from "./pages/CriarTrilhaPersonalizada/CriarTrilhaPersonalizada";
import DashboardFinanceiro from "./pages/DashboardFinanceiro/DashboardFinanceiro";
import DashboardRedes from "./pages/DashboardRedes/DashboardRedes";
import DetalhesMentorado from "./pages/DetalhesMentorado/DetalhesMentorado";
import Equipe from "./pages/Equipe/Equipe";
import Licoes from "./pages/Licoes/Licoes";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Planos from "./pages/Planos/Planos";
import Posts from "./pages/Posts/Posts";
import TrilhaGuiada from "./pages/Trilhas/TrilhaGuiada/TrilhaGuiada";
import TrilhaPersonalizada from "./pages/Trilhas/TrilhaPersonalizada/TrilhaPersonalizada";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/controle-mentorado" element={<ControleMentorado />} />
      <Route path="/criar-atividade" element={<CriarAtividades />} />
      <Route path="/criar-licao" element={<CriarLicoes />} />
      <Route
        path="/criar-trilha-personalizada"
        element={<CriarTrilhaPersonalizada />}
      />
      <Route path="/criar-trilha" element={<CriarTrilhas />} />
      <Route path="/dashboard-financeiro" element={<DashboardFinanceiro />} />
      <Route path="/dashboard-redes" element={<DashboardRedes />} />
      <Route path="/detalhes-mentorado" element={<DetalhesMentorado />} />
      <Route path="/equipe" element={<Equipe  />} />
      <Route path="/licoes" element={<Licoes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/trilha-guiada" element={<TrilhaGuiada />} />
      <Route path="/trilha-personalizada" element={<TrilhaPersonalizada />} />
    </Routes>
  );
}

export default App;
