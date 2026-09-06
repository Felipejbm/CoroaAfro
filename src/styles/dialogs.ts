import { alpha, type Components, type Theme } from "@mui/material/styles";

// Estilos limitados aos modais: os formulários das páginas mantêm sua aparência.
export const dialogComponents: Components<Theme> = {
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiBackdrop-root": { backgroundColor: alpha(theme.palette.primary.dark, 0.48), backdropFilter: "blur(6px)" },
        "& .MuiTextField-root": { minWidth: 0 },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fffdf9", borderRadius: 12,
          transition: "box-shadow 160ms ease, background-color 160ms ease",
          "& fieldset": { borderColor: alpha(theme.palette.primary.main, 0.2) },
          "&:hover fieldset": { borderColor: alpha(theme.palette.primary.main, 0.5) },
          "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}` },
          "&.Mui-disabled": { backgroundColor: alpha(theme.palette.secondary.main, 0.4) },
        },
        "& .MuiInputLabel-root": { fontSize: "0.88rem" },
        "& .MuiFormHelperText-root": { marginLeft: 2, lineHeight: 1.5, marginTop: 6 },
        "& .MuiAlert-root": { borderRadius: 12, fontSize: "0.82rem", lineHeight: 1.6 },
        "& .MuiButton-root": { borderRadius: 12, minHeight: 44, fontWeight: 600, paddingInline: 20 },
        "& .MuiButton-containedPrimary": {
          color: theme.palette.secondary.light,
          background: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          boxShadow: `0 5px 12px ${alpha(theme.palette.primary.dark, 0.16)}`,
          "&:hover": { background: theme.palette.primary.dark },
          "&.Mui-disabled": { background: alpha(theme.palette.primary.main, 0.12), color: alpha(theme.palette.primary.dark, 0.4), boxShadow: "none" },
        },
        "& .MuiButton-root:focus-visible, & .MuiIconButton-root:focus-visible": { outline: `3px solid ${alpha(theme.palette.primary.light, 0.5)}`, outlineOffset: 3 },
        "@media (prefers-reduced-motion: reduce)": { "& *": { transition: "none !important" } },
      }),
      paper: ({ theme }) => ({
        margin: 16, maxHeight: "calc(100dvh - 32px)", borderRadius: 24,
        backgroundColor: theme.palette.secondary.light, backgroundImage: "none",
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.7)}`,
        boxShadow: `0 28px 90px ${alpha(theme.palette.primary.dark, 0.28)}`,
        "& > form": { display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" },
      }),
      paperFullWidth: { width: "calc(100% - 32px)" },
    },
  },
  MuiDialogContent: {
    styleOverrides: { root: ({ theme }) => ({
      padding: "28px", minHeight: 0, scrollbarWidth: "thin",
      scrollbarColor: `${theme.palette.secondary.dark} transparent`,
      [theme.breakpoints.down("sm")]: { padding: "24px 20px" },
    }) },
  },
  MuiDialogActions: {
    styleOverrides: { root: ({ theme }) => ({
      flexShrink: 0, gap: 8, padding: "18px 28px", borderTop: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: alpha(theme.palette.secondary.main, 0.38),
      "& > :not(style) ~ :not(style)": { marginLeft: 0 },
      [theme.breakpoints.down("sm")]: { padding: "16px 20px", "& .MuiButton-root": { flex: 1, paddingInline: 12 } },
    }) },
  },
};
