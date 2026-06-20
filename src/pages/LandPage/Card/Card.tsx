import { Avatar, Stack, Typography } from "@mui/material";
import { type Testemunhos } from "../LandPage.types";

type Props = {
  item: Testemunhos;
};

export function TestimonialCard({ item }: Props) {
  return (
    <Stack
      sx={{
        backgroundColor: "#FC6B52",
        borderRadius: "16px",
        color: "#fff",

        width: "100%",
        minHeight: 200, // 🔥 aumentou bastante a altura
        maxHeight: 360,

        px: 4,
        py: 4,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* 👤 PERFIL */}
      <Stack
        sx={{
          minWidth: 160,
          alignItems: "center",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Avatar src={item.photo ?? undefined} sx={{ width: 78, height: 78 }} />

        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
          {item.name ?? "Anônimo"}
        </Typography>

        <Typography sx={{ fontSize: "0.8rem", opacity: 0.85 }}>
          {item.role ?? "Cliente"}
        </Typography>
      </Stack>

      {/* 💬 DEPOIMENTO */}
      <Typography
        sx={{
          flex: 1,
          fontSize: "1.05rem",
          lineHeight: 1.7,

          // 🔥 ESSENCIAL: permite quebra real de linha
          whiteSpace: "normal",
          wordBreak: "break-word",

          // 🔥 limita mas permite múltiplas linhas
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {item.text}
      </Typography>
    </Stack>
  );
}
