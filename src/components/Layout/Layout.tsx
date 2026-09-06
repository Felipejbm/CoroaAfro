import { Stack } from "@mui/material";
import NavBar from "../NavBar/NavBar";

export default function Layout({
  children,
  showSidebar = true,
}: {
  children: React.ReactNode;
  showSidebar?: boolean;
}) {
  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {showSidebar && <NavBar />}
      <Stack
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
