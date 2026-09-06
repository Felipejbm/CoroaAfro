import {
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import VideocamIcon from "@mui/icons-material/Videocam";
import { onlineNow, recents } from "./Chat.utils";
import NavBar from "../../components/NavBar/NavBar";
import theme, { fonts } from "../../styles/theme";
import useChat from "./Chat.hook";

export default function Chat() {
  const {
    ConversationItem,
    MessageBubble,
    currentMessages,
    handleSend,
    setActiveConversation,
    activeConversation,
    input,
    setInput,
  } = useChat();

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <NavBar />

      <Stack
        direction={"row"}
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          backgroundColor: theme.palette.secondary.light,
        }}
      >
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
              <SearchIcon
                sx={{
                  fontSize: 18,
                  color: alpha(theme.palette.common.white, 0.5),
                }}
              />
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
              <ConversationItem
                key={c.id}
                conv={c}
                isActive={activeConversation.id === c.id}
                onClick={() => setActiveConversation(c)}
              />
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
              <ConversationItem
                key={c.id}
                conv={c}
                isActive={activeConversation.id === c.id}
                onClick={() => setActiveConversation(c)}
              />
            ))}
          </Stack>
        </Stack>

        <Stack
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            sx={{
              backgroundColor: theme.palette.primary.dark,
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor:
                    activeConversation.color || theme.palette.primary.light,
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
                    color: activeConversation.online
                      ? theme.palette.success.main
                      : alpha(theme.palette.common.white, 0.5),
                  }}
                >
                  {activeConversation.online ? "● Online agora" : "Offline"}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                  color: theme.palette.secondary.light,
                }}
              >
                <VideocamIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                  color: theme.palette.secondary.light,
                }}
              >
                <AttachFileIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                  color: theme.palette.secondary.light,
                }}
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            sx={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: theme.palette.secondary.light,
              px: { xs: 2, md: 6 },
              py: 3,
            }}
          >
            <Stack direction="row" sx={{ justifyContent: "center", mb: 3 }}>
              <Stack
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "12px",
                  px: 1.5,
                  py: 0.4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: theme.palette.common.white,
                  }}
                >
                  Hoje
                </Typography>
              </Stack>
            </Stack>

            {currentMessages.length > 0 ? (
              currentMessages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  color: alpha(theme.palette.common.black, 0.4),
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  mt: 4,
                }}
              >
                Nenhuma mensagem por aqui ainda. Comece a conversar!
              </Typography>
            )}

            {activeConversation.online && currentMessages.length > 0 && (
              <Stack
                direction="row"
                sx={{ alignItems: "center", gap: 1, mt: 1 }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      activeConversation.color || theme.palette.primary.light,
                    width: 26,
                    height: 26,
                    fontSize: "0.65rem",
                  }}
                >
                  {activeConversation.initials}
                </Avatar>
                <Stack
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "12px",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontSize: "0.9rem",
                      color: theme.palette.common.white,
                    }}
                  >
                    •••
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>

          <Stack
            direction="row"
            sx={{
              backgroundColor: theme.palette.background.default,
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 1.5,
            }}
          >
            <IconButton
              size="small"
              sx={{ color: alpha(theme.palette.common.white, 0.6) }}
            >
              <InsertEmoticonIcon fontSize="small" />
            </IconButton>
            <InputBase
              placeholder={`Enviar mensagem para ${activeConversation.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              sx={{
                flex: 1,
                color: theme.palette.common.white,
                fontFamily: fonts.body,
                fontSize: "0.85rem",
              }}
            />
            <IconButton
              size="small"
              sx={{ color: alpha(theme.palette.common.white, 0.6) }}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: alpha(theme.palette.common.white, 0.6) }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleSend}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
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
