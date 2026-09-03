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
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
export default function ControleMentorados() {
  const navigate = useNavigate();

  return (
    <Stack direction={"row"} sx={{ width: "100%", minHeight: "100vh" }}>
      <NavBarMentor />

      <Stack
        sx={{
          flex: 1, 
          minWidth: 0, 
          backgroundColor: "secondary.light",
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "text.primary",
            mb: 3,
          }}
        >
          Acompanhe a evolução de seus mentorados
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "background.default", borderRadius: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "common.white",
                    fontFamily: fonts.body,
                    fontWeight: 700,
                  }}
                >
                  Nome
                </TableCell>
                <TableCell
                  sx={{
                    color: "common.white",
                    fontFamily: fonts.body,
                    fontWeight: 700,
                  }}
                >
                  Empresa
                </TableCell>
                <TableCell
                  sx={{
                    color: "common.white",
                    fontFamily: fonts.body,
                    fontWeight: 700,
                  }}
                >
                  Plano
                </TableCell>
                <TableCell
                  sx={{
                    color: "common.white",
                    fontFamily: fonts.body,
                    fontWeight: 700,
                  }}
                >
                  Progresso
                </TableCell>
                <TableCell
                  sx={{
                    color: "common.white",
                    fontFamily: fonts.body,
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
                      color: "common.white",
                      fontFamily: fonts.body,
                    }}
                  >
                    {m.nome}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "common.white",
                      fontFamily: fonts.body,
                    }}
                  >
                    {m.empresa}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "common.white",
                      fontFamily: fonts.body,
                    }}
                  >
                    {m.plano}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "common.white",
                      fontFamily: fonts.body,
                    }}
                  >
                    {m.progresso}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        navigate("/detalhes-mentorado");
                      }}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "common.white",
                        fontFamily: fonts.body,
                        fontSize: "0.8rem",
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": { backgroundColor: "primary.dark" },
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
