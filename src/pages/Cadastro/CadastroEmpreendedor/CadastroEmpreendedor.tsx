import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { fieldRows } from "./CadastroEmpreendedor.utils";
import { fieldStyles, labelStyles } from "./CadastroEmpreendedor.styles";
import FooterLandPage from "../../../components/FooterLandPage/FooterLandPage";
import NavBarLandPage from "../../../components/NavBarLandPage/NavBarLandPage";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCadastroEmpreendedor } from "./CadastroEmpreendedor.hook";
import { cadastroEmpreendedor } from "../../../services/Cadastro/controller/cadastroEmpreendedor";

export default function CadastroEmpreendedor() {
  const {
    nome,
    email,
    senha,
    telefone,
    cpf,
    dataNascimento,
    genero,

    setNome,
    setEmail,
    setSenha,
    setTelefone,
    setCpf,
    setDataNascimento,
    setGenero,
  } = useCadastroEmpreendedor();

  const navigate = useNavigate();

  const handleCadastro = async (): Promise<void> => {
    try {
      const response = await cadastroEmpreendedor({
        nome,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        genero,
      });

      console.log(response);

      alert("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      alert(error.response?.data?.detail ?? "Erro ao realizar cadastro.");
    }
  };

  const handleFieldChange = (field: string, value: string): void => {
    switch (field) {
      case "nome":
        setNome(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "senha":
        setSenha(value);
        break;

      case "telefone":
        setTelefone(value);
        break;

      case "cpf":
        setCpf(value);
        break;

      case "dataNascimento":
        setDataNascimento(value);
        break;

      case "genero":
        setGenero(value);
        break;

      default:
        break;
    }
  };

  return (
    <Layout>
      <Stack
        sx={{
          backgroundColor: "#f7dde0",
          py: { xs: 5, md: 7 },
        }}
      >
        <NavBarLandPage />

        <Container maxWidth="md">
          <Stack
            sx={{
              backgroundColor: "#e7d2d3",
              borderRadius: "16px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
              px: { xs: 3, md: 5 },
              py: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "1.9rem" },
                color: "#2b2b2b",
              }}
            >
              Formulário de cadastro
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: "#2b2b2b",
                mb: 4,
              }}
            >
              Dados do empreendedor
            </Typography>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {fieldRows.map((row) => (
                <Stack
                  key={row.map((f) => f.field).join("-")}
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    gap: {
                      xs: 2,
                      md: 4,
                    },
                  }}
                >
                  {row.map(({ label, field, type }) => {
                    let value = "";

                    switch (field) {
                      case "nomeCompleto":
                        value = nome;
                        break;

                      case "email":
                        value = email;
                        break;

                      case "senha":
                        value = senha;
                        break;

                      case "telefone":
                        value = telefone;
                        break;

                      case "cpf":
                        value = cpf;
                        break;

                      case "dataNascimento":
                        value = dataNascimento;
                        break;

                      case "genero":
                        value = genero;
                        break;
                    }

                    return (
                      <Stack key={field} sx={{ flex: 1 }}>
                        <Typography sx={labelStyles}>{label}</Typography>

                        <TextField
                          fullWidth
                          type={type ?? "text"}
                          value={value}
                          onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                          }
                          sx={fieldStyles}
                        />
                      </Stack>
                    );
                  })}
                </Stack>
              ))}
            </Stack>

            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
              }}
            >
              <Button
                onClick={handleCadastro}
                sx={{
                  background: "linear-gradient(90deg, #f0623e, #8a1f4a)",
                  color: "#fff",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 6,
                  py: 1.1,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #e0523a, #7a1942)",
                  },
                }}
              >
                Confirmar
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <FooterLandPage />
    </Layout>
  );
}
