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
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {showSidebar && <Stack
        component="aside"
        sx={{
          width: 260,
          minWidth: 260,
          maxWidth: 260,
          height: "100%",
          flexShrink: 0,
        }}
      >
        <NavBar />
      </Stack>}
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
