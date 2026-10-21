import { useEffect, useRef, useState } from "react";
import { Molinillo } from "./molinillo";

// Desplazamiento máximo de los ojos, en unidades del viewBox del molinillo
const MAX_OFFSET = 7;

// Momento "te mira": molinillo grande, alas girando despacio y ojos que siguen al cursor.
// Solo uno por página.
export function MolinilloQueMira({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Cuanto más lejos el cursor, más se acercan los ojos al borde
        const reach = Math.min(distance / 300, 1) * MAX_OFFSET;
        setOffset({ x: (dx / distance) * reach, y: (dy / distance) * reach });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      <Molinillo
        className="h-full w-full"
        alasClassName="molinillo-idle"
        eyesStyle={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </span>
  );
}
