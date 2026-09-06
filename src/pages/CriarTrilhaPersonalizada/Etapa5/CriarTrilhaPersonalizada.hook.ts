import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCriarTrilhaPersonalizada5() {
  const [reminders, setReminders] = useState(true);

  const [achievements, setAchievements] = useState(true);

  const [shareProgress, setShareProgress] = useState(false);

  const navigate = useNavigate();

  return { reminders, setReminders, achievements, setAchievements, shareProgress, setShareProgress, navigate };
}
