import { createTheme } from "@mui/material/styles";

export const fonts = {
  logo: '"Cinzel", serif',
  hero: '"Playfair Display", Georgia, serif',
  heading: '"Syne", sans-serif',
  subheading: '"Sora", sans-serif',
  body: '"Inter", sans-serif',
  button: '"Poppins", sans-serif',
  metrics: '"DM Sans", sans-serif',
  navbar: '"Montserrat Alternates", sans-serif',
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#71011C",
      light: "#831731",
      dark: "#4d0012",
    },
    secondary: {
      main: "#F2E1D1",
      light: "#F9F1DF",
      dark: '#b3a79b'
    },
    common: {
      black: "#FC6B52",
      white: "#970049"
    },
    background: {
      default: "#15151C",
    },
    text: {
      primary: "#3a3a3a",
    },
  },

  typography: {
    fontFamily: fonts.body,

    h1: {
      fontFamily: fonts.hero,
      fontSize: "3rem",
      fontWeight: 600,
    },

    h2: {
      fontFamily: fonts.heading,
      fontSize: "2rem",
      fontWeight: 600,
    },

    h3: {
      fontFamily: fonts.subheading,
      fontSize: "1.5rem",
      fontWeight: 500,
    },

    button: {
      fontFamily: fonts.button,
      fontWeight: 500,
      textTransform: "none",
    },

    body1: {
      fontFamily: fonts.body,
    },

    body2: {
      fontFamily: fonts.metrics,
    },
  },
});

export default theme;