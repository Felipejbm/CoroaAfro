import { Route, Routes } from "react-router-dom";
import LandPage from "./pages/LandPage/LandPage";
import Chat from "./pages/Chat/Chat";
import ControleMentorado from "./pages/ControleMentorados/ControleMentorado";
import CriarAtividades from "./pages/CriarAtividades/CriarAtividades";
import CriarLicoes from "./pages/CriarLicoes/CriarLicoes";
import CriarTrilhas from "./pages/CriarTilhas/CriarTrilhas";
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
import CadastroEmpreendedor from "./pages/Cadastro/CadastroEmpreendedor/CadastroEmpreendedor";
import CadastroEmpresa from "./pages/Cadastro/CadastroEmpresa/CadastroEmpresa";
import CriarTrilhaPersonalizada1 from "./pages/CriarTrilhaPersonalizada/Etapa1/CriarTrilhaPersonalizada";
import CriarTrilhaPersonalizada2 from "./pages/CriarTrilhaPersonalizada/Etapa2/CriarTrilhaPersonalizada";
import CriarTrilhaPersonalizada3 from "./pages/CriarTrilhaPersonalizada/Etapa3/CriarTrilhaPersonalizada";
import CriarTrilhaPersonalizada4 from "./pages/CriarTrilhaPersonalizada/Etapa4/CriarTrilhaPersonalizada";
import CriarTrilhaPersonalizada5 from "./pages/CriarTrilhaPersonalizada/Etapa5/CriarTrilhaPersonalizada";
import DashboardMentor from "./pages/DashboardMentor/DashboardMentor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandPage />} />
      <Route path="/cadastro-empreendedor" element={<CadastroEmpreendedor />} />
      <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/controle-mentorado" element={<ControleMentorado />} />
      <Route path="/criar-atividade" element={<CriarAtividades />} />
      <Route path="/criar-licao" element={<CriarLicoes />} />
      <Route
        path="/criar-trilha-personalizada-1"
        element={<CriarTrilhaPersonalizada1 />}
      />
      <Route
        path="/criar-trilha-personalizada-2"
        element={<CriarTrilhaPersonalizada2 />}
      />
      <Route
        path="/criar-trilha-personalizada-3"
        element={<CriarTrilhaPersonalizada3 />}
      />
      <Route
        path="/criar-trilha-personalizada-4"
        element={<CriarTrilhaPersonalizada4 />}
      />
      <Route
        path="/criar-trilha-personalizada-5"
        element={<CriarTrilhaPersonalizada5 />}
      />
      <Route path="/criar-trilha" element={<CriarTrilhas />} />
      <Route path="/dashboard-financeiro" element={<DashboardFinanceiro />} />
      <Route path="/dashboard-redes" element={<DashboardRedes />} />
      <Route path="/detalhes-mentorado" element={<DetalhesMentorado />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/licoes" element={<Licoes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/trilha-guiada" element={<TrilhaGuiada />} />
      <Route path="/trilha-personalizada" element={<TrilhaPersonalizada />} />
      <Route path="/dashboard-mentor" element={<DashboardMentor />} />
    </Routes>
  );
}

export default App;
