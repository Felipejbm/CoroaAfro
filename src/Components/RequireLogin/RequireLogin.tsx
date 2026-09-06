import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { atualizarSessao, buscarSessao } from "../../services/Auth/controllers/auth";

export default function RequireLogin({
  children,
  papel = "empreendedor",
}: {
  children: ReactNode;
  papel?: "empreendedor" | "mentor";
}) {
  const [status, setStatus] = useState("loading");
  const location = useLocation();
  useEffect(() => {
    let active = true;
    buscarSessao()
      .then((user) => {
        if (active) setStatus(user.papel === papel ? "ready" : "forbidden");
      })
      .catch((error) => {
        if (!active) return;
        if (
          axios.isAxiosError(error) &&
          [401, 403].includes(error.response?.status ?? 0)
        ) {
          atualizarSessao(null);
          setStatus("login");
        } else setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [papel, location.pathname]);
  if (status === "forbidden")
    return (
      <Stack sx={{ p: 4 }}>
        <Alert severity="warning">
          Esta página não está disponível para o seu tipo de conta.
        </Alert>
        <Button
          href={
            papel === "mentor" ? "/dashboard-financeiro" : "/dashboard-mentor"
          }
        >
          Voltar ao meu painel
        </Button>
      </Stack>
    );
  if (status === "login") return <Navigate to="/login" replace />;
  if (status === "loading")
    return (
      <Stack alignItems="center" sx={{ p: 6 }}>
        <CircularProgress aria-label="Verificando sessão" />
      </Stack>
    );
  if (status === "error")
    return (
      <Stack sx={{ p: 4 }}>
        <Alert severity="error">
          Não foi possível verificar sua sessão. Confira se o backend está
          ligado.
        </Alert>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Stack>
    );
  return children;
}
