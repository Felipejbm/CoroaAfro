import { useRef, useState, type PointerEvent } from "react";
import type { ArrasteCarrosel } from "./Carrosel.types";

export function useTestimonialsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);

  const drag = useRef<ArrasteCarrosel | null>(null);

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

  return { ref, dragging, stopDrag, onPointerDown, onPointerMove, navigate };
}
