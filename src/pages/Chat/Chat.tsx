import {
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
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
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";

function ConversationItem({ conv }: { conv: Conversation }) {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.2,
        cursor: "pointer",
        "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
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
              backgroundColor: "#3ddc97",
              border: "2px solid #16161d",
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
            color: "#fff",
          }}
        >
          {conv.name}
        </Typography>
        <Typography
          noWrap
          sx={{
            fontFamily: fonts.body,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
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
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {conv.time}
        </Typography>
        {conv.unread && (
          <Stack
            sx={{
              backgroundColor: "#e0523a",
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
                color: "#fff",
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
      sx={{
        display: "flex",
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
            backgroundColor: fromMe ? "#e0523a" : "#16161d",
            color: "#fff",
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
                backgroundColor: "#0c0c10",
                borderRadius: "10px",
                p: 1.5,
                mt: 1.2,
              }}
            >
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.65rem",
                      color: "#3ddc97",
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
                  color: "#fff",
                  mb: 0.4,
                }}
              >
                {highlight.title}
              </Typography>
              <Typography
                sx={{
                      fontFamily: fonts.body,
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.4,
                }}
              >
                {highlight.subtitle}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack
          sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.4 }}
        >
          {fromMe && <DoneAllIcon sx={{ fontSize: 12, color: "#3ddc97" }} />}
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.65rem",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            {time}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function Chat() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    console.log(input);
    setInput("");
  };

  return (
    <Stack>
      <NavBar />

      <Stack
        sx={{ display: "flex", height: "100vh", backgroundColor: "#f9dde0" }}
      >
        {/* Sidebar de conversas */}
        <Stack
          sx={{
            width: 280,
            backgroundColor: "#16161d",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack sx={{ p: 2.5 }}>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#fff",
                mb: 2,
              }}
            >
              Mensagens
            </Typography>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: "8px",
                px: 1.5,
                py: 0.8,
              }}
            >
              <SearchIcon
                sx={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}
              />
                <InputBase
                placeholder="Buscar conversa..."
                sx={{
                  color: "#fff",
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
                color: "rgba(255,255,255,0.4)",
                px: 2,
                mb: 0.5,
                mt: 1,
              }}
            >
              Online agora
            </Typography>
            {onlineNow.map((c) => (
              <ConversationItem key={c.id} conv={c} />
            ))}

            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.4)",
                px: 2,
                mb: 0.5,
                mt: 2,
              }}
            >
              Recentes
            </Typography>
            {recents.map((c) => (
              <ConversationItem key={c.id} conv={c} />
            ))}
          </Stack>
        </Stack>

        {/* Área do chat */}
        <Stack sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Cabeçalho do chat */}
          <Stack
            sx={{
              backgroundColor: "rgba(122,31,74,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
            }}
          >
            <Stack sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: "#8a3fae",
                  width: 38,
                  height: 38,
                  fontSize: "0.8rem",
                }}
              >
                KL
              </Avatar>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "#fff",
                  }}
                >
                  Karla Lima
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: "#3ddc97",
                  }}
                >
                  ● Online agora
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ backgroundColor: "#16161d", color: "#fff" }}
              >
                <VideocamIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ backgroundColor: "#16161d", color: "#fff" }}
              >
                <AttachFileIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ backgroundColor: "#16161d", color: "#fff" }}
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Mensagens */}
          <Stack
            sx={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: "#f9dde0",
              px: { xs: 2, md: 6 },
              py: 3,
            }}
          >
            <Stack sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Stack
                sx={{
                  backgroundColor: "#16161d",
                  borderRadius: "12px",
                  px: 1.5,
                  py: 0.4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: "#fff",
                  }}
                >
                  Hoje, 14 de maio
                </Typography>
              </Stack>
            </Stack>

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Indicador "digitando" */}
            <Stack sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "#8a3fae",
                  width: 26,
                  height: 26,
                  fontSize: "0.65rem",
                }}
              >
                KL
              </Avatar>
              <Stack
                sx={{
                  backgroundColor: "#16161d",
                  borderRadius: "12px",
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    color: "#fff",
                  }}
                >
                  •••
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Input de mensagem */}
          <Stack
            sx={{
              backgroundColor: "#16161d",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 1.5,
            }}
          >
            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
              <InsertEmoticonIcon fontSize="small" />
            </IconButton>
            <InputBase
              placeholder="Escreva uma mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                flex: 1,
                color: "#fff",
                fontFamily: fonts.body,
                fontSize: "0.85rem",
              }}
            />
            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleSend}
              sx={{
                backgroundColor: "#e0523a",
                color: "#fff",
                "&:hover": { backgroundColor: "#c43f2a" },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
