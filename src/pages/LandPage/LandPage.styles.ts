import { default as theme } from "../../styles/theme";

export const styles = {
  page: {
    background: theme.palette.secondary.light,
    minHeight: "100vh",
    flexShrink: 0,
  },

  /* NAVBAR */
  navbar: {
    background: theme.palette.common.white,
    boxShadow: "none",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  logo: {
    fontWeight: 800,
    color: theme.palette.primary.dark,
    fontSize: "20px",
  },

  navBtn: {
    color: theme.palette.text.primary,
    textTransform: "none",
  },

  /* HERO */
  section: {
    padding: "60px 0",
  },

  hero: {
    paddingTop: "80px",
  },

  title: {
    fontSize: "42px",
    fontWeight: 800,
  },

  subtitle: {
    marginTop: "12px",
    color: theme.palette.text.primary,
  },

  cta: {
    marginTop: "24px",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: "20px",
    padding: "10px 20px",
  },

  heroMock: {
    height: "260px",
    background: theme.palette.secondary.main,
    borderRadius: "16px",
  },

  /* SEÇÕES */
  sectionTitle: {
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "30px",
  },

  /* CARDS */
  cardsRow: {
    marginTop: "20px",
  },

  card: {
    borderRadius: "16px",
    boxShadow: "none",
  },

  /* PROPOSTA SOCIAL */
  social: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: "60px 20px",
    textAlign: "center",
  },

  socialTitle: {
    fontSize: "28px",
    fontWeight: 800,
    marginBottom: "20px",
  },

  /* TESTEMUNHOS */
  avatar: {
    marginBottom: "10px",
  },

  textMuted: {
    color: theme.palette.text.primary,
  },

  /* PLANOS */
  plans: {
    background: theme.palette.secondary.light,
    padding: "60px 0",
  },

  planCard: {
    textAlign: "center",
  },

  price: {
    fontWeight: 800,
    color: theme.palette.primary.main,
    margin: "10px 0",
  },

  ctaSmall: {
    marginTop: "10px",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: "12px",
  },
};
