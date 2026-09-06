import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCriarLicoes() {
  const [title, setTitle] = useState("");

  const [level, setLevel] = useState("");

  const [duration, setDuration] = useState("");

  const [category, setCategory] = useState("");

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  return {
    title,
    setTitle,
    level,
    setLevel,
    duration,
    setDuration,
    category,
    setCategory,
    content,
    setContent,
    navigate,
  };
}
