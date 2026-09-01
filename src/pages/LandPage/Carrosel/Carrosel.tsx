import { Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { testimonials } from "../LandPage.utils";
import { TestimonialCard } from "../Card/Card";

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isDown = useRef(false);

  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  let momentumFrame: number;

  const fullList = [...testimonials, ...testimonials];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 2;
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;

    isDown.current = true;

    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;

    lastX.current = e.pageX;
    lastTime.current = performance.now();

    cancelAnimationFrame(momentumFrame);
  };

  const onMouseUp = () => {
    isDown.current = false;
    applyMomentum();
  };

  const onMouseLeave = () => {
    isDown.current = false;
    applyMomentum();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;

    e.preventDefault();

    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;

    ref.current.scrollLeft = scrollLeft.current - walk;

    const now = performance.now();
    const dt = now - lastTime.current;

    if (dt > 0) {
      velocity.current = (e.pageX - lastX.current) / dt;
    }

    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const applyMomentum = () => {
    const el = ref.current;
    if (!el) return;

    let v = velocity.current * 18;
    const decay = 0.94;

    const animate = () => {
      if (!ref.current) return;

      const el = ref.current;

      el.scrollLeft -= v;
      v *= decay;

      const half = el.scrollWidth / 2;

      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }

      if (el.scrollLeft <= 0) {
        el.scrollLeft += half;
      }

      if (Math.abs(v) > 0.5) {
        momentumFrame = requestAnimationFrame(animate);
      }
    };

    momentumFrame = requestAnimationFrame(animate);
  };

  return (
    <Stack sx={{ backgroundColor: "#f7dde0", py: 6 }}>
      <Stack
        ref={ref}
        direction="row"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        sx={{
          overflowX: "auto",
          display: "flex",

          px: "10vw",
          gap: 12,

          userSelect: "none",
          cursor: "grab",

          scrollSnapType: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {fullList.map((item, i) => (
          <Stack
            key={i}
            sx={{
              flex: "0 0 40vw",
              minWidth: "320px",
            }}
          >
            <TestimonialCard item={item} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
