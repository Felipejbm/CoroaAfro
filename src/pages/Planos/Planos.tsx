import { Stack } from "@mui/material";
import NavBarLandPage from "../../Components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../Components/FooterLandPage/FooterLandPage";
import PricingPage from "../../Components/Planos/Planos";
import Layout from "../../Components/Layout/Layout";

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
