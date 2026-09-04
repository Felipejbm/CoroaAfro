import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { type Testemunhos } from "../LandPage.types";

type Props = {
  item: Testemunhos;
};

export function TestimonialCard({ item }: Props) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: "16px",
        color: theme.palette.secondary.light,

        width: "100%",
        minHeight: 200,
        maxHeight: 360,

        px: 4,
        py: 4,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
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

      <Typography
        sx={{
          flex: 1,
          fontSize: "1.05rem",
          lineHeight: 1.7,
          whiteSpace: "normal",
          wordBreak: "break-word",
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
