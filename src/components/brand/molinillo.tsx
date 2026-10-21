import { cn } from "@/lib/utils";

type MolinilloProps = {
  className?: string;
  /** Gira sin parar: indicador de carga */
  spinning?: boolean;
  /** Para los ojos que siguen al cursor (momento "te mira") */
  eyesStyle?: React.CSSProperties;
  alasClassName?: string;
};

// Firma gráfica: el gesto. Toma el color del texto que acompaña (currentColor).
// Las alas giran media vuelta al pasar el cursor sobre el enlace o botón que lo contiene.
export function Molinillo({ className, spinning, eyesStyle, alasClassName }: MolinilloProps) {
  return (
    <svg
      viewBox="-136 -136 272 272"
      fill="currentColor"
      aria-hidden="true"
      className={cn("molinillo inline-block shrink-0", spinning && "molinillo-spin", className)}
    >
      <g className={cn("molinillo-alas", alasClassName)}>
        <polygon points="30,0 100.5,-16 136,-80 78.5,-67 64,-57" />
        <polygon points="0,30 16,100.5 80,136 67,78.5 57,64" />
        <polygon points="-30,0 -100.5,16 -136,80 -78.5,67 -64,57" />
        <polygon points="0,-30 -16,-100.5 -80,-136 -67,-78.5 -57,-64" />
      </g>
      <g className="molinillo-ojos" style={eyesStyle}>
        <circle cx="-12" cy="0" r="8.5" />
        <circle cx="12" cy="0" r="8.5" />
      </g>
    </svg>
  );
}
