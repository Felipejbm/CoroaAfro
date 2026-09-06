import {
  Typography,
  Button,
  Container,
  Link,
  Stack,
  Box,
  alpha,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { plans } from "../../pages/LandPage/LandPage.utils";
import { fonts } from "../../styles/theme";
import { Link as RouterLink } from "react-router-dom";

export default function PricingPage() {
  return (
    <Stack
      sx={{
        backgroundColor: "secondary.light",
        py: { xs: 6, md: 10 },
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
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
                  minWidth: 0,
                  maxWidth: { md: "360px" },
                }}
              >
                <Stack
                  sx={{
                    position: "relative",
                    background: (theme) =>
                      `linear-gradient(160deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                    borderRadius: "20px",
                    color: "secondary.main",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    px: 3.5,
                    pt: highlighted ? 5 : 4,
                    pb: 4,
                    mt: highlighted ? 0 : { xs: 0, md: 2 },
                    boxShadow: highlighted
                      ? (theme) =>
                          `0 14px 30px ${alpha(theme.palette.common.black, 0.3)}`
                      : (theme) =>
                          `0 8px 18px ${alpha(theme.palette.common.black, 0.2)}`,
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
                        backgroundColor: "primary.dark",
                        color: "secondary.main",
                        fontFamily: fonts.body,
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
                      fontFamily: fonts.body,
                      fontSize: "0.95rem",
                      opacity: 0.9,
                      mb: 1,
                    }}
                  >
                    Plano
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: fonts.hero,
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
                        fontFamily: fonts.body,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      }}
                    >
                      R$
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.body,
                        fontSize: "2.6rem",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {price}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.body,
                        fontSize: "1rem",
                      }}
                    >
                      ,{cents} / mês
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{
                      borderBottom: "1px solid",
                      borderColor: (theme) =>
                        alpha(theme.palette.secondary.main, 0.4),
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
                            backgroundColor: (theme) =>
                              alpha(theme.palette.secondary.main, 0.25),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        >
                          <CheckIcon
                            sx={{ fontSize: 13, color: "secondary.main" }}
                          />
                        </Stack>
                        <Typography
                          sx={{
                            fontFamily: fonts.body,
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
                      fontFamily: fonts.button,
                      fontWeight: 700,
                      fontSize: "1rem",
                      ...(highlighted
                        ? {
                            backgroundColor: "secondary.main",
                            color: "primary.main",
                            "&:hover": {
                              backgroundColor: "secondary.light",
                            },
                          }
                        : {
                            borderColor: (theme) =>
                              alpha(theme.palette.secondary.main, 0.7),
                            color: "secondary.main",
                            "&:hover": {
                              borderColor: "secondary.main",
                              backgroundColor: (theme) =>
                                alpha(theme.palette.secondary.main, 0.08),
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
            fontFamily: fonts.body,
            fontSize: "0.95rem",
            color: "text.primary",
            mt: 5,
          }}
        >
          Não possui conta?{" "}
          <Link
            component={RouterLink}
            to="cadastro-empreendedor"
            sx={{ color: "primary.main", fontWeight: 700 }}
            underline="hover"
          >
            Cadastre-se
          </Link>
        </Typography>
      </Container>
    </Stack>
  );
}
