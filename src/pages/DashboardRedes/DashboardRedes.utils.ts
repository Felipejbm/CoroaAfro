import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import type { ConfiguracaoMetrica } from "./DashboardRedes.types";
export const metricasPerfilConfig: ConfiguracaoMetrica[] = [
  { label: "Seguidores", icon: TrendingUpRoundedIcon, indice: 0 },
  { label: "Publicações", icon: InstagramIcon, indice: 1 },
  { label: "Alcance hoje", icon: AutoAwesomeRoundedIcon, indice: 2 },
  { label: "Curtidas nos posts", icon: FavoriteBorderRoundedIcon, indice: 3 }
];

export const metricasInteracoesConfig: ConfiguracaoMetrica[] = [
  { label: "Curtidas", icon: FavoriteBorderRoundedIcon, indice: 0 },
  { label: "Comentários", icon: ChatBubbleOutlineRoundedIcon, indice: 1 }
];
