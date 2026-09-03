import { Stack } from "@mui/material";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import PricingPage from "../../components/Planos/Planos";
import Layout from "../../components/Layout/Layout";

export default function Planos() {
  return (
    <Layout>
      <Stack>
        <NavBarLandPage />

        <PricingPage />

        <FooterLandPage />
      </Stack>
    </Layout>
  );
}
