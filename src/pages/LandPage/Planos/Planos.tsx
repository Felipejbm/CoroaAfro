import { Typography, Button, Container, Link, Stack, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { plans } from "../LandPage.utils";

export default function PricingPage() {
  return (
    <Stack
      sx={{
        backgroundColor: "#f7dde0",
        py: { xs: 6, md: 10 },
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Modernização com Box Flex: distribui os cards perfeitamente */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {plans.map((plan) => {
            const { name, price, cents, features, cta, highlighted, badge } =
              plan;

            return (
              <Stack
                key={name}
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", md: "300px" },
                  maxWidth: { md: "360px" },
                }}
              >
                <Stack
                  sx={{
                    position: "relative",
                    background: "linear-gradient(160deg, #f0623e, #e0523a)",
                    borderRadius: "20px",
                    color: "#fff",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    px: 3.5,
                    pt: highlighted ? 5 : 4,
                    pb: 4,
                    mt: highlighted ? 0 : { xs: 0, md: 2 },
                    boxShadow: highlighted
                      ? "0 14px 30px rgba(0,0,0,0.3)"
                      : "0 8px 18px rgba(0,0,0,0.2)",
                    transform: { md: highlighted ? "scale(1.05)" : "none" },
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  {badge && (
                    <Stack
                      sx={{
                        position: "absolute",
                        top: -16,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#2b2b2b",
                        color: "#fff",
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        px: 2,
                        py: 0.6,
                        borderRadius: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {badge}
                    </Stack>
                  )}

                  <Typography
                    sx={{
                      fontFamily: "'Comfortaa', sans-serif",
                      fontSize: "0.95rem",
                      opacity: 0.9,
                      mb: 1,
                    }}
                  >
                    Plano
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                      mb: 2,
                    }}
                  >
                    {name}
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "baseline",
                      gap: 0.5,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      }}
                    >
                      R$
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "2.6rem",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {price}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      ,{cents} / mês
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{
                      borderBottom: "1px solid rgba(255,255,255,0.4)",
                      mb: 2.5,
                    }}
                  />

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {features.map((feature) => (
                      <Stack
                        key={feature}
                        direction="row"
                        sx={{
                          alignItems: "flex-start",
                          gap: 1.2,
                        }}
                      >
                        <Stack
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 13, color: "#fff" }} />
                        </Stack>
                        <Typography
                          sx={{
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: "0.9rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant={highlighted ? "contained" : "outlined"}
                    sx={{
                      mt: 4,
                      py: 1.2,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontFamily: "'Comfortaa', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      ...(highlighted
                        ? {
                            backgroundColor: "#fff",
                            color: "#e0523a",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.7)",
                            color: "#fff",
                            "&:hover": {
                              borderColor: "#fff",
                              backgroundColor: "rgba(255,255,255,0.08)",
                            },
                          }),
                    }}
                  >
                    {cta}
                  </Button>
                </Stack>
              </Stack>
            );
          })}
        </Box>

        <Typography
          align="center"
          sx={{
            fontFamily: "'Comfortaa', sans-serif",
            fontSize: "0.95rem",
            color: "#2b2b2b",
            mt: 5,
          }}
        >
          Não possui conta?{" "}
          <Link
            href="#cadastro"
            sx={{ color: "#c43f2a", fontWeight: 700 }}
            underline="hover"
          >
            Cadastre-se
          </Link>
        </Typography>
      </Container>
    </Stack>
  );
}
