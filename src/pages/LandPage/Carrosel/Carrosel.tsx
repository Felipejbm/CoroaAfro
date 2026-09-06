import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Stack } from "@mui/material";
import { TestimonialCard } from "../Card/Card";
import { testimonials } from "../LandPage.utils";
import { useTestimonialsCarousel } from "./Carrosel.hook";

export default function TestimonialsCarousel() {
  const { ref, dragging, stopDrag, onPointerDown, onPointerMove, navigate } = useTestimonialsCarousel();

  return (
    <Stack component="section" aria-label="Depoimentos" sx={{ backgroundColor: "secondary.light", py: 6 }}>
      <Stack direction="row" sx={{ justifyContent: "flex-end", gap: 1, px: { xs: 2, md: "10vw" }, mb: 2 }}>
        <IconButton aria-label="Depoimento anterior" onClick={() => navigate(-1)} sx={{ color: "primary.main" }}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton aria-label="Próximo depoimento" onClick={() => navigate(1)} sx={{ color: "primary.main" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Stack>
      <Stack
        ref={ref}
        direction="row"
        tabIndex={0}
        aria-label="Lista de depoimentos; use as setas para navegar"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        onDragStart={(event) => event.preventDefault()}
        sx={{
          overflowX: "auto",
          px: { xs: 2, md: "10vw" },
          gap: { xs: 2, md: 4 },
          userSelect: "none",
          cursor: dragging ? "grabbing" : "grab",
          overscrollBehaviorX: "contain",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: -2 },
        }}
      >
        {testimonials.map((item, i) => (
          <Stack key={i} sx={{ flex: { xs: "0 0 85%", md: "0 0 40vw" }, minWidth: 0 }}>
            <TestimonialCard item={item} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
