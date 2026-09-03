import { fonts, default as theme } from "../../../styles/theme";

export const fieldStyles = {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "6px",
    "& .MuiOutlinedInput-root": { borderRadius: "6px" },
};

export const labelStyles = {
    fontFamily: fonts.hero,
    fontSize: "0.95rem",
    color: theme.palette.text.primary,
    mb: 0.8,
};