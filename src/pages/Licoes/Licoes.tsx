import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { objectives, topics } from "./Licoes.utils";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";

export default function Licoes() {
  const theme = useTheme();

  return (
    <Stack>
      <NavBar />

      <Stack sx={{ backgroundColor: theme.palette.secondary.light, minHeight: "100vh", pb: 9 }}>
        <Stack sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 3 }, py: 4 }}>
          <Stack sx={{ display: "flex", gap: 1.5, mb: 2 }}>
            <Stack
              sx={{
                backgroundColor: theme.palette.common.white,
                borderRadius: "20px",
                px: 2,
                py: 0.6,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                Lição 1 de 7
              </Typography>
            </Stack>
            <Stack
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "20px",
                px: 2,
                py: 0.6,
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: theme.palette.common.white,
                }}
              >
                🎓 Iniciante
              </Typography>
            </Stack>
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: theme.palette.text.primary,
              mb: 1.5,
            }}
          >
            O que é Identidade Visual?
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.95rem",
              color: theme.palette.text.primary,
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Entenda o conceito, a importância e como a identidade visual
            representa sua marca no mercado de forma consistente e memorável.
          </Typography>

          <Stack sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
            <Stack sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <ScheduleIcon sx={{ fontSize: 18, color: theme.palette.text.primary }} />
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.text.primary,
                }}
              >
                8 minutos
              </Typography>
            </Stack>
            <Stack sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <MenuBookIcon sx={{ fontSize: 18, color: theme.palette.text.primary }} />
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.text.primary,
                }}
              >
                Leitura e Vídeo
              </Typography>
            </Stack>
            <Stack sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <ListAltIcon sx={{ fontSize: 18, color: theme.palette.text.primary }} />
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: theme.palette.text.primary,
                }}
              >
                4 tópicos
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2.5,
              mb: 5,
            }}
          >
            <Stack
              sx={{
                flex: 1.4,
                borderRadius: "14px",
                overflow: "hidden",
                background:
                  `radial-gradient(circle at 30% 35%, ${theme.palette.primary.main}, ${theme.palette.background.default} 70%)`,
                position: "relative",
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 3,
              }}
            >
              <Stack
                sx={{
                  position: "absolute",
                  top: 40,
                  left: 130,
                  width: 90,
                  height: 70,
                  borderRadius: "10px",
                  backgroundColor: alpha(theme.palette.success.main, 0.4),
                }}
              />
              <Stack
                sx={{
                  position: "absolute",
                  top: 35,
                  left: 20,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background.default,
                }}
              />

              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: theme.palette.common.white,
                  lineHeight: 1.2,
                }}
              >
                IDENTIDADE
                <br />
                VISUAL
              </Typography>
              <Typography
                sx={{
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  color: alpha(theme.palette.common.white, 0.7),
                  mt: 1,
                  mb: 2,
                }}
              >
                Construindo a imagem
                <br />
                da sua marca
              </Typography>

              <Stack sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <IconButton size="small" sx={{ color: theme.palette.common.white }}>
                  <PlayArrowIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: alpha(theme.palette.common.white, 0.7),
                  }}
                >
                  00:00
                </Typography>
                <Stack
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.common.white, 0.25),
                    position: "relative",
                  }}
                >
                  <Stack
                    sx={{
                      width: "12%",
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: theme.palette.success.main,
                    }}
                  />
                  <Stack
                    sx={{
                      position: "absolute",
                      top: -3,
                      left: "12%",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.success.main,
                    }}
                  />
                </Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    color: alpha(theme.palette.common.white, 0.7),
                  }}
                >
                  08:25
                </Typography>
                <IconButton size="small" sx={{ color: theme.palette.common.white }}>
                  <VolumeUpIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: theme.palette.common.white }}>
                  <FullscreenIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Stack
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <Stack
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "14px",
                  p: 2.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: theme.palette.common.white,
                    mb: 0.3,
                  }}
                >
                  Conteúdo da lição
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.75rem",
                    color: alpha(theme.palette.common.white, 0.5),
                    mb: 2,
                  }}
                >
                  4 tópicos · 8 minutos no total
                </Typography>

                <Stack
                  sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}
                >
                  {topics.map((topic) => (
                    <Stack
                      key={topic.order}
                      sx={{ display: "flex", alignItems: "center", gap: 1.2 }}
                    >
                      <ChevronRightIcon
                        sx={{ fontSize: 16, color: theme.palette.success.main }}
                      />
                      <Typography
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.85rem",
                          color: alpha(theme.palette.common.white, 0.5),
                          minWidth: 14,
                        }}
                      >
                        {topic.order}.
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.85rem",
                          color: theme.palette.common.white,
                          flex: 1,
                        }}
                      >
                        {topic.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: fonts.body,
                          fontSize: "0.75rem",
                          color: alpha(theme.palette.common.white, 0.5),
                        }}
                      >
                        {topic.duration}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "14px",
                  p: 2.5,
                  position: "relative",
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: alpha(theme.palette.common.white, 0.5),
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: theme.palette.common.white }} />
                  <Typography
                    sx={{
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: theme.palette.common.white,
                    }}
                  >
                    Dica
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.8rem",
                    color: alpha(theme.palette.common.white, 0.7),
                    lineHeight: 1.5,
                  }}
                >
                  Reserve um momento para anotar suas ideias e insights durante
                  a aula. Isso ajudará na fixação do conteúdo!
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Typography
            sx={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: { xs: "1.4rem", md: "1.7rem" },
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Objetivos da lição
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              color: theme.palette.text.primary,
              mb: 2.5,
            }}
          >
            Ao final desta lição, você será capaz de:
          </Typography>

          <Stack sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {objectives.map((obj, i) => (
              <Stack
                key={i}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "12px",
                  p: 2.5,
                  width: { xs: "100%", sm: 220 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Stack
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    backgroundColor: alpha(theme.palette.common.white, 0.08),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {obj.icon}
                </Stack>
                <Typography
                  sx={{
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    color: theme.palette.common.white,
                    lineHeight: 1.4,
                  }}
                >
                  {obj.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Button
          sx={{
            position: "fixed",
            bottom: 80,
            right: 24,
            backgroundColor: theme.palette.success.main,
            color: theme.palette.text.primary,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "none",
            borderRadius: "8px",
            px: 2.5,
            py: 1,
            "&:hover": { backgroundColor: theme.palette.success.dark },
          }}
        >
          Tirar Duvidas
        </Button>

        <Stack
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.background.default,
            px: { xs: 2, md: 4 },
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.7rem",
                color: alpha(theme.palette.common.white, 0.5),
              }}
            >
              Módulo 1 · Lição 1 de 7
            </Typography>
            <Typography
              sx={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "0.9rem",
                color: theme.palette.common.white,
              }}
            >
              O que é Identidade Visual?
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", gap: 1.5 }}>
            <Button
              startIcon={<ChevronLeftIcon />}
              disabled
              sx={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                textTransform: "none",
                color: alpha(theme.palette.common.white, 0.4),
              }}
            >
              Lição anterior
            </Button>
            <Button
              endIcon={<ChevronRightIcon />}
              sx={{
                backgroundColor: theme.palette.success.main,
                color: theme.palette.text.primary,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: "6px",
                px: 2.5,
                "&:hover": { backgroundColor: theme.palette.success.dark },
              }}
            >
              Próxima lição
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
