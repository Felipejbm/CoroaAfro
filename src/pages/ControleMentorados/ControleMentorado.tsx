import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { mentorados } from "./ControleMentorados.utils";
import NavBar from "../../components/NavBar/NavBar";

export default function ControleMentorados() {
  const handleViewProfile = (nome: string) => {
    console.log("Ver perfil de:", nome);
  };
  return (
    <Stack>
      <NavBar />
      <Stack
        sx={{
          backgroundColor: "#f9dde0",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        {/* Cabeçalho */}
        <Typography
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "#2b2b2b",
            mb: 3,
          }}
        >
          Acompanhe a evolução de seus mentorados
        </Typography>

        {/* Tabela */}
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#16161d", borderRadius: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Nome
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Empresa
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Plano
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Progresso
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "'Comfortaa', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Ação
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mentorados.map((m) => (
                <TableRow key={m.nome}>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontFamily: "'Comfortaa', sans-serif",
                    }}
                  >
                    {m.nome}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontFamily: "'Comfortaa', sans-serif",
                    }}
                  >
                    {m.empresa}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontFamily: "'Comfortaa', sans-serif",
                    }}
                  >
                    {m.plano}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontFamily: "'Comfortaa', sans-serif",
                    }}
                  >
                    {m.progresso}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleViewProfile(m.nome)}
                      sx={{
                        backgroundColor: "#e0523a",
                        color: "#fff",
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "0.8rem",
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": { backgroundColor: "#c43f2a" },
                      }}
                    >
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
