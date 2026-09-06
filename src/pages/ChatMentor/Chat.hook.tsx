import DoneAllIcon from "@mui/icons-material/DoneAll";
import { alpha, Avatar, Stack, Typography } from "@mui/material";
import { useState } from "react";
import theme, { fonts } from "../../styles/theme";
import type { Conversation, Message } from "./Chat.types";
import { messages, onlineNow, recents } from "./Chat.utils";

export default function useChatMentor() {
  function ConversationItem({
    conv,
    isActive,
    onClick,
  }: {
    conv: Conversation;
    isActive: boolean;
    onClick: () => void;
  }) {
    return (
      <Stack
        direction="row"
        onClick={onClick}
        sx={{
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.2,
          cursor: "pointer",
          backgroundColor: isActive
            ? alpha(theme.palette.common.white, 0.08)
            : "transparent",
          "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.04),
          },
        }}
      >
        <Stack sx={{ position: "relative" }}>
          <Avatar
            sx={{
              bgcolor: conv.color,
              width: 38,
              height: 38,
              fontSize: "0.8rem",
            }}
          >
            {conv.initials}
          </Avatar>
          {conv.online && (
            <Stack
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: theme.palette.success.main,
                border: `2px solid ${theme.palette.background.default}`,
              }}
            />
          )}
        </Stack>
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.85rem",
              color: theme.palette.common.white,
            }}
          >
            {conv.name}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.75rem",
              color: alpha(theme.palette.common.white, 0.5),
            }}
          >
            {conv.lastMessage}
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.7rem",
              color: alpha(theme.palette.common.white, 0.4),
            }}
          >
            {conv.time}
          </Typography>
          {conv.unread && !isActive && (
            <Stack
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "10px",
                minWidth: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.65rem",
                  color: theme.palette.common.white,
                  fontWeight: 700,
                }}
              >
                {conv.unread}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  }

  function MessageBubble({ message }: { message: Message }) {
    const { fromMe, text, time, highlight } = message;

    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: fromMe ? "flex-end" : "flex-start",
          mb: 1.5,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: fromMe ? "flex-end" : "flex-start",
            maxWidth: "60%",
          }}
        >
          <Stack
            sx={{
              backgroundColor: fromMe
                ? theme.palette.primary.main
                : theme.palette.background.default,
              color: theme.palette.common.white,
              borderRadius: "14px",
              px: 2,
              py: 1.3,
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              {text}
            </Typography>

            {highlight && (
              <Stack
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  borderRadius: "10px",
                  p: 1.5,
                  mt: 1.2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.65rem",
                    color: theme.palette.success.main,
                    mb: 0.5,
                  }}
                >
                  {highlight.tag}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: theme.palette.common.white,
                    mb: 0.4,
                  }}
                >
                  {highlight.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.72rem",
                    color: alpha(theme.palette.common.white, 0.6),
                    lineHeight: 1.4,
                  }}
                >
                  {highlight.subtitle}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", gap: 0.4, mt: 0.4 }}
          >
            {fromMe && (
              <DoneAllIcon
                sx={{ fontSize: 12, color: theme.palette.success.main }}
              />
            )}
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.65rem",
                color: alpha(theme.palette.common.black, 0.4),
              }}
            >
              {time}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  const [input, setInput] = useState("");
  const [activeConversation, setActiveConversation] = useState<Conversation>(
    onlineNow[0] || recents[0],
  );


  const currentMessages =
    messages.filter((msg) => msg.id === activeConversation.id) || [];

  const handleSend = () => {
    if (!input.trim()) return;
    console.log(`Enviando para ${activeConversation.name}:`, input);
    setInput("");
  };

  return {
    ConversationItem,
    MessageBubble,
    setActiveConversation,
    currentMessages,
    handleSend,
    activeConversation,
    input,
    setInput,
  };
}
