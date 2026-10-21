import { cn } from "@/lib/utils";

// Firma gráfica: la cara. Identifica; siempre quieta y nunca dentro de un botón.
export function Isotipo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 628 574"
      fill="currentColor"
      role="img"
      aria-label="MAZZMKT"
      className={cn("inline-block shrink-0", className)}
    >
      <polygon points="0,0 115,26 144,46 212,160 71,128" />
      <polygon points="628,0 513,26 484,46 416,160 557,128" />
      <circle cx="251" cy="128" r="28" />
      <circle cx="376" cy="128" r="28" />
      <polygon points="104,212 151,205 239,205 316,361 385,205 477,205 525,212 318,574" />
    </svg>
  );
}
