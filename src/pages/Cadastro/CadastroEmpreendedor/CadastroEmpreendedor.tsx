import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { fieldRows, initialFormData } from "./CadastroEmpreendedor.utils";
import { fieldStyles, labelStyles } from "./CadastroEmpreendedor.styles";
import type { FormData } from "./CadastroEmpreendedor.types";
import FooterLandPage from "../../../components/FooterLandPage/FooterLandPage";
import NavBarLandPage from "../../../components/NavBarLandPage/NavBarLandPage";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function CadastroEmpreendedor() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const navigate = useNavigate();

  return (
    <Layout>
      <Stack>
        <NavBarLandPage />

        <Stack sx={{ backgroundColor: "#f7dde0", py: { xs: 5, md: 7 } }}>
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

              <Stack sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {fieldRows.map((row) => (
                  <Stack
                    key={row.map((f) => f.field).join("-")}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: { xs: 2, md: 4 },
                    }}
                  >
                    {row.map(({ label, field, type }) => (
                      <Stack key={field} sx={{ flex: 1 }}>
                        <Typography sx={labelStyles}>{label}</Typography>
                        <TextField
                          fullWidth
                          type={type ?? "text"}
                          value={formData[field]}
                          onChange={handleChange(field)}
                          sx={fieldStyles}
                        />
                      </Stack>
                    ))}
                  </Stack>
                ))}
              </Stack>

              <Stack sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  onClick={() => {
                    navigate("/cadastro-empresa");
                  }}
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
      </Stack>
    </Layout>
  );
}
