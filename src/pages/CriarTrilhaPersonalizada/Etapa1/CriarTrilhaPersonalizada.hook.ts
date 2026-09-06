import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Suggestion } from "./CriarTrilhaPersonalizada.types";

export function useCriarTrilhaPersonalizada1() {
  const [trailName, setTrailName] = useState("");

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion.id);
    setTrailName(suggestion.title);
  };

  const navigate = useNavigate()

  return { trailName, setTrailName, selectedSuggestion, handleSelectSuggestion, navigate };
}
