import { Stack } from "@mui/material";
import NavBarLandPage from "../../components/NavBarLandPage/NavBarLandPage";
import FooterLandPage from "../../components/FooterLandPage/FooterLandPage";
import PricingPage from "../../components/Planos/Planos";

export default function Planos() {
  return (
    <>
      <Stack>
        <NavBarLandPage />

        <PricingPage />

        <FooterLandPage />
      </Stack>
    </>
  );
}
