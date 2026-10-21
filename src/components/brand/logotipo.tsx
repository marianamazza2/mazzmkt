import { cn } from "@/lib/utils";

// Logotipo reducido (public/images/logotipo-reducido.svg): versión con más aire entre letras,
// pensada para tamaños pequeños. Toma el color del texto (currentColor).
export function LogotipoReducido({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1858 285"
      fill="currentColor"
      role="img"
      aria-label="MAZZMKT"
      className={cn("inline-block shrink-0", className)}
    >
      <polygon points="1,0 52,0 89,74 0,73" />
      <polygon points="221,0 273,0 273,75 184,74" />
      <polygon points="423,0 471,0 499,76 456,76 447,53 437,76 395,75" />
      <polygon points="614,0 786,0 787,35 759,77 711,77 734,37 613,37" />
      <polygon points="842,0 1015,0 1016,34 986,79 938,78 962,37 842,37" />
      <polygon points="1079,0 1130,0 1170,79 1078,79" />
      <polygon points="1299,0 1351,0 1351,80 1260,80" />
      <polygon points="1422,0 1466,1 1466,81 1422,81" />
      <polygon points="1566,0 1620,1 1545,81 1492,81" />
      <polygon points="1659,0 1857,0 1857,36 1781,36 1780,82 1736,82 1736,37 1659,36" />
      <polygon points="1,129 44,130 44,284 0,284" />
      <polygon points="61,130 106,130 137,191 168,130 212,133 155,247 119,247" />
      <polygon points="229,131 273,131 273,284 229,284" />
      <polygon points="382,132 426,132 408,188 485,188 467,132 512,132 567,284 521,284 498,222 395,222 373,284 327,284" />
      <polygon points="688,133 736,135 663,246 788,247 788,284 612,284 613,248" />
      <polygon points="916,134 964,136 892,246 1016,247 1017,284 841,284 841,250" />
      <polygon points="1078,135 1122,135 1122,284 1078,284" />
      <polygon points="1142,136 1187,136 1215,191 1243,136 1288,136 1233,247 1197,247" />
      <polygon points="1308,136 1351,137 1351,284 1307,284" />
      <polygon points="1422,137 1531,138 1622,284 1569,284 1492,161 1466,189 1466,284 1422,284" />
      <polygon points="1736,139 1780,139 1780,284 1736,284" />
      <circle cx="1190.5" cy="22.5" r="20" />
      <circle cx="1242" cy="22.5" r="20" />
    </svg>
  );
}
