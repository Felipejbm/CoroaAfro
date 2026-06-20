import { Box, Typography, Container, Grid, Link } from "@mui/material";
import PlanCard from "../Planos/Planos";
import { plans } from "../LandPage.utils";

export default function PricingSection() {
  return (
    <Box sx={{ backgroundColor: "#f7dde0", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
       <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
              <PlanCard plan={plan} />
            </Grid>
          ))}
        </Grid>

        <Typography
          align="center"
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.95rem",
            color: "#2b2b2b",
            mt: 5,
          }}
        >
          Não possui conta?{" "}
          <Link
            href="#cadastro"
            sx={{ color: "#c43f2a", fontWeight: 700 }}
            underline="hover"
          >
            Cadastre-se
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
