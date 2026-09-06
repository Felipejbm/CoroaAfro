import { IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRef, useState, type PointerEvent } from "react";
import { testimonials } from "../LandPage.utils";
import { TestimonialCard } from "../Card/Card";

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ pointerId: number; x: number; scroll: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const stopDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = event.currentTarget;
    drag.current = { pointerId: event.pointerId, x: event.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (event.buttons === 0) {
      stopDrag();
      return;
    }
    event.currentTarget.scrollLeft = current.scroll - (event.clientX - current.x);
  };

  const navigate = (direction: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap) : el.clientWidth;
    el.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

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
