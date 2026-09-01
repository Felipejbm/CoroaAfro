import { Toolbar } from "@mui/material";
import NavBarLandPage from "../NavBarLandPage/NavBarLandPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarLandPage />
      <Toolbar />
      <main>{children}</main>
    </>
  );
}
