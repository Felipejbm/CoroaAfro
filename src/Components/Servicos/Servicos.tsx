import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fonts } from "../../styles/theme";
import { formatarPreco, servicos } from "./Servicos.utils";

export default function Servicos() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <Stack component="section" id="servicos-avulsos" sx={{ bgcolor: "secondary.light", py: { xs: 6, md: 9 }, scrollMarginTop: "110px", flexShrink: 0 }}>
      <Container maxWidth="lg">
        <Stack sx={{ alignItems: "center", textAlign: "center", gap: 2, mb: 5 }}>
          <Chip label="Para cada momento do seu negócio" sx={{ bgcolor: "secondary.main", color: "primary.dark" }} />
          <Typography component="h2" sx={{ fontFamily: fonts.hero, fontSize: { xs: "2rem", md: "3rem" }, color: "primary.main" }}>
            Serviços avulsos
          </Typography>
          <Typography sx={{ maxWidth: 600, color: "text.primary", lineHeight: 1.7 }}>
            Escolha o serviço que combina com a sua necessidade: fortaleça sua marca,
            desenvolva sua presença digital ou invista em conhecimento.
          </Typography>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>
          {servicos.map((servico) => (
            <Stack component="article" id={servico.id} key={servico.id} sx={{
              p: 3.5, gap: 2, borderRadius: 4, bgcolor: "secondary.light",
              border: "1px solid", borderColor: "secondary.main",
              boxShadow: "0 6px 20px rgba(80, 0, 24, 0.06)", scrollMarginTop: "110px",
              "&:target": { borderColor: "primary.main", boxShadow: "0 0 0 2px rgba(128, 15, 45, 0.2)" },
            }}>
              <Typography sx={{ color: "primary.main", fontSize: "0.8rem", fontWeight: 700, letterSpacing: 0.5 }}>
                {servico.categoria}
              </Typography>
              <Typography component="h3" sx={{ fontFamily: fonts.body, fontWeight: 600, fontSize: "1.15rem", lineHeight: 1.5 }}>
                {servico.nome}
              </Typography>
              <Typography sx={{ mt: "auto", pt: 2, color: "primary.main", fontSize: "1.8rem", fontWeight: 700 }}>
                {formatarPreco(servico.preco)}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Stack>
  );
}
