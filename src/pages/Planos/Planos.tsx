import { Stack } from "@mui/material";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import PricingPage from "../../components/Planos/Planos";
import Layout from "../../components/Layout/Layout";
import Servicos from "../../components/Servicos/Servicos";

export default function Planos() {
  return (
    <Layout showSidebar={false}>
      <Stack>
        <NavBarLandPage />

        <PricingPage />
        <Servicos />
        <FooterLandPage />
      </Stack>
    </Layout>
  );
}
