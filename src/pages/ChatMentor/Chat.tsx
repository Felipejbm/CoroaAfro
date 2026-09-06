import {
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import type { Conversation, Message } from "./Chat.types";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useState } from "react";
import { messages, onlineNow, recents } from "./Chats.utils";
import NavBarMentor from "../../components/NavMentor/NavBar";
import { fonts } from "../../styles/theme";

function ConversationItem({
  conv,
  isActive,
  onClick,
  theme,
}: {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
  theme: Theme;
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
        backgroundColor: isActive ? alpha(theme.palette.common.white, 0.08) : "transparent",
        "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.04) },
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

function MessageBubble({ message, theme }: { message: Message; theme: Theme }) {
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
            backgroundColor: fromMe ? theme.palette.primary.main : theme.palette.background.default,
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
        <Stack direction="row" sx={{ alignItems: "center", gap: 0.4, mt: 0.4 }}>
          {fromMe && <DoneAllIcon sx={{ fontSize: 12, color: theme.palette.success.main }} />}
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

export default function ChatMentor() {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [activeConversation, setActiveConversation] = useState<Conversation>(
    onlineNow[0] || recents[0],
  );

  const currentMessages = messages.filter((msg) => msg.id === activeConversation.id) || [];

  const handleSend = () => {
    if (!input.trim()) return;
    console.log(`Enviando para ${activeConversation.name}:`, input);
    setInput("");
  };

  return (
    <Stack direction="row" sx={{ width: "100%", maxWidth: "100%", height: "100vh", overflow: "hidden" }}>
      <NavBarMentor />

      <Stack direction="row" sx={{ flex: 1, minWidth: 0, height: "100vh", backgroundColor: theme.palette.secondary.light }}>
        <Stack
          sx={{
            width: 280,
            minWidth: 280,
            backgroundColor: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack sx={{ p: 2.5 }}>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "1.2rem",
                color: theme.palette.common.white,
                mb: 2,
              }}
            >
              Mensagens
            </Typography>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1,
                backgroundColor: alpha(theme.palette.common.white, 0.06),
                borderRadius: "8px",
                px: 1.5,
                py: 0.8,
              }}
            >
              <SearchIcon sx={{ fontSize: 18, color: alpha(theme.palette.common.white, 0.5) }} />
              <InputBase
                placeholder="Buscar conversa..."
                sx={{
                  color: theme.palette.common.white,
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  flex: 1,
                }}
              />
            </Stack>
          </Stack>

          <Stack sx={{ overflowY: "auto", flex: 1 }}>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.7rem",
                color: alpha(theme.palette.common.white, 0.4),
                px: 2,
                mb: 0.5,
                mt: 1,
              }}
            >
              Online agora
            </Typography>
            {onlineNow.map((c) => (
              <ConversationItem key={c.id} conv={c} isActive={activeConversation.id === c.id} onClick={() => setActiveConversation(c)} theme={theme} />
            ))}

            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.7rem",
                color: alpha(theme.palette.common.white, 0.4),
                px: 2,
                mb: 0.5,
                mt: 2,
              }}
            >
              Recentes
            </Typography>
            {recents.map((c) => (
              <ConversationItem key={c.id} conv={c} isActive={activeConversation.id === c.id} onClick={() => setActiveConversation(c)} theme={theme} />
            ))}
          </Stack>
        </Stack>

        <Stack sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <Stack direction="row" sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.5), alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: activeConversation.color || theme.palette.primary.light,
                  width: 38,
                  height: 38,
                  fontSize: "0.8rem",
                }}
              >
                {activeConversation.initials}
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: theme.palette.common.white,
                  }}
                >
                  {activeConversation.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: activeConversation.online ? theme.palette.success.main : alpha(theme.palette.common.white, 0.5),
                  }}
                >
                  {activeConversation.online ? "● Online agora" : "Offline"}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ gap: 1 }}>
              <IconButton size="small" sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.common.white }}>
                <VideocamIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.common.white }}>
                <AttachFileIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.common.white }}>
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack sx={{ flex: 1, overflowY: "auto", backgroundColor: theme.palette.secondary.light, px: { xs: 2, md: 6 }, py: 3 }}>
            <Stack direction="row" sx={{ justifyContent: "center", mb: 3 }}>
              <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "12px", px: 1.5, py: 0.4 }}>
                <Typography sx={{ fontFamily: fonts.body, fontSize: "0.7rem", color: theme.palette.common.white }}>
                  Hoje
                </Typography>
              </Stack>
            </Stack>

            {currentMessages.length > 0 ? (
              currentMessages.map((msg) => <MessageBubble key={msg.id} message={msg} theme={theme} />)
            ) : (
              <Typography sx={{ textAlign: "center", color: alpha(theme.palette.common.black, 0.4), fontFamily: fonts.body, fontSize: "0.85rem", mt: 4 }}>
                Nenhuma mensagem por aqui ainda. Comece a conversar!
              </Typography>
            )}

            {activeConversation.online && currentMessages.length > 0 && (
              <Stack direction="row" sx={{ alignItems: "center", gap: 1, mt: 1 }}>
                <Avatar sx={{ bgcolor: activeConversation.color, width: 26, height: 26, fontSize: "0.65rem" }}>
                  {activeConversation.initials}
                </Avatar>
                <Stack sx={{ backgroundColor: theme.palette.background.default, borderRadius: "12px", px: 2, py: 1 }}>
                  <Typography sx={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.palette.common.white }}>
                    •••
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" sx={{ backgroundColor: theme.palette.background.default, alignItems: "center", gap: 1.5, px: 2.5, py: 1.5 }}>
            <IconButton size="small" sx={{ color: alpha(theme.palette.common.white, 0.6) }}>
              <InsertEmoticonIcon fontSize="small" />
            </IconButton>
            <InputBase
              placeholder={`Enviar mensagem para ${activeConversation.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              sx={{ flex: 1, color: theme.palette.common.white, fontFamily: fonts.body, fontSize: "0.85rem" }}
            />
            <IconButton size="small" sx={{ color: alpha(theme.palette.common.white, 0.6) }}>
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: alpha(theme.palette.common.white, 0.6) }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleSend} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white, "&:hover": { backgroundColor: theme.palette.primary.dark } }}>
              <SendIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
