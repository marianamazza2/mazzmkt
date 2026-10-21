import { Children } from "react";
import { cn } from "@/lib/utils";

// Una sola maqueta para filas de cards: en móvil se deslizan en horizontal (la siguiente asoma),
// en escritorio forman una rejilla. Las cards son las mismas en los dos tamaños.
export function CardRail({ children, columns = 3 }: { children: React.ReactNode; columns?: 2 | 3 }) {
  return (
    <div
      className={cn(
        "-mx-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 hide-scrollbar px-5 pb-2",
        "md:mx-0 md:grid md:gap-6 md:overflow-visible md:snap-none md:px-0 md:pb-0 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3"
      )}
    >
      {Children.map(children, (child) => (
        <div className="snap-start shrink-0 w-[80vw] max-w-[340px] md:w-auto md:max-w-none">{child}</div>
      ))}
    </div>
  );
}
