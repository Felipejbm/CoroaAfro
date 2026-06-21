import type { Objective, Topic } from "./Licoes.types";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GroupsIcon from "@mui/icons-material/Groups";

export const topics: Topic[] = [
  { order: 1, title: "Introdução ao conceito", duration: "2 min" },
  {
    order: 2,
    title: "Por que identidade visual é importante?",
    duration: "3 min",
  },
  { order: 3, title: "Elementos que compõem", duration: "2 min" },
  { order: 4, title: "Exemplos práticos", duration: "1 min" },
];

export const objectives: Objective[] = [
  {
    icon: <GpsFixedIcon sx={{ fontSize: 22, color: "#fff" }} />,
    text: "Entender o conceito de identidade visual",
  },
  {
    icon: <StarBorderIcon sx={{ fontSize: 22, color: "#fff" }} />,
    text: "Reconhecer sua importância para o negócio",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 22, color: "#fff" }} />,
    text: "Identificar os principais elementos que a compõem",
  },
];
