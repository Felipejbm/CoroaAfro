import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    cssVariables: true,  
    palette: {
        primary: {
            main: "#e0523a",
            light: "#f06a52",
            dark: "#c43f2a",
        },
        background: {
            default: "#beb0ae",
        },
        text: {
            primary: "#3a3a3a",
        },
    },
    typography: {
        fontFamily: '"Lora", Georgia, serif',
        h1: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "2.5rem",
            fontWeight: 600,
        },
        h2: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "2rem",
            fontWeight: 600,
        },
        h3: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.5rem",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default theme;