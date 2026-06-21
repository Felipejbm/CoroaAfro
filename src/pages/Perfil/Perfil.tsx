import { Avatar, Button, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";

export default function Perfil() {
  const handleEditEntrepreneur = () => {
    console.log("Editar dados do empreendedor");
  };

  const handleEditCompany = () => {
    console.log("Editar dados da empresa");
  };

  const handleResetPassword = () => {
    console.log("Redefinir senha");
  };

  const handleLogout = () => {
    console.log("Sair");
  };
  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
        }}
      >
        {/* Cabeçalho com avatar e nomes */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{ width: 80, height: 80, mb: 2, backgroundColor: "#16161d" }}
          >
            {/* Imagem genérica */}
            <Typography sx={{ color: "#fff", fontWeight: 700 }}>
              Logo
            </Typography>
          </Avatar>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#2b2b2b",
            }}
          >
            Nome da empresa
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Comfortaa', sans-serif",
              fontSize: "0.9rem",
              color: "#3a3a3a",
              mb: 2,
            }}
          >
            Nome empreendedor
          </Typography>

          <Stack sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={handleEditEntrepreneur}
              sx={{
                backgroundColor: "#e0523a",
                color: "#fff",
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              Editar
            </Button>
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#16161d",
                color: "#fff",
                fontFamily: "'Comfortaa', sans-serif",
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: "#26262f" },
              }}
            >
              Sair
            </Button>
          </Stack>
        </Stack>

        {/* Painéis de dados */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            width: "100%",
            maxWidth: 900,
          }}
        >
          {/* Dados do empreendedor */}
          <Stack
            sx={{
              flex: 1,
              backgroundColor: "#16161d",
              borderRadius: "10px",
              p: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                mb: 2,
              }}
            >
              Dados do empreendedor
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Nome: Geraldo
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Email: teste@gmail.com
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Senha: ********
            </Typography>
            <Button
              onClick={handleResetPassword}
              sx={{
                mt: 1,
                backgroundColor: "#e0523a",
                color: "#fff",
                fontSize: "0.75rem",
                textTransform: "none",
                borderRadius: "6px",
                px: 2,
                py: 0.5,
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              Redefinir senha
            </Button>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem", mt: 1 }}>
              Telefone: (11) 99999-9999
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Data de cadastro: 25/25/25
            </Typography>
            <Button
              onClick={handleEditEntrepreneur}
              sx={{
                mt: 2,
                backgroundColor: "#e0523a",
                color: "#fff",
                fontSize: "0.75rem",
                textTransform: "none",
                borderRadius: "6px",
                px: 2,
                py: 0.5,
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              Editar
            </Button>
          </Stack>

          {/* Dados da empresa */}
          <Stack
            sx={{
              flex: 1,
              backgroundColor: "#16161d",
              borderRadius: "10px",
              p: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                mb: 2,
              }}
            >
              Dados da empresa
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              CNPJ: 23.586.844/0001-61
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Localização: São Paulo
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Porte: Médio
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Segmento: Moda
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
              Saldo Atual: R$ 31.231,24
            </Typography>
            <Button
              onClick={handleEditCompany}
              sx={{
                mt: 2,
                backgroundColor: "#e0523a",
                color: "#fff",
                fontSize: "0.75rem",
                textTransform: "none",
                borderRadius: "6px",
                px: 2,
                py: 0.5,
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              Editar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
