import { Children } from "react";
import { cn } from "@/lib/utils";

// Una sola maqueta para filas de cards: en móvil se deslizan en horizontal (la siguiente asoma),
// en escritorio forman una rejilla. Las cards son las mismas en los dos tamaños.
export function CardRail({
  children,
  columns = 3,
  mobileOnlyLast = false,
  onScroll,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  columns?: 2 | 3;
  /** Mantiene la última tarjeta en la fila móvil y la oculta en la cuadrícula de escritorio. */
  mobileOnlyLast?: boolean;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  className?: string;
  ariaLabel?: string;
}) {
  const childCount = Children.count(children);

  return (
    <div
      className={cn(
        "-mx-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 hide-scrollbar px-5 pb-2",
        "md:mx-0 md:grid md:gap-6 md:overflow-visible md:snap-none md:px-0 md:pb-0 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className
      )}
      onScroll={onScroll}
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
    >
      {Children.map(children, (child, index) => (
        <div
          className={cn(
            "snap-start shrink-0 w-[80vw] max-w-[340px] md:w-auto md:max-w-none",
            mobileOnlyLast && index === childCount - 1 && "md:hidden"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
