import { motion } from "framer-motion";

type Option<T> = { value: T; label: string };

// Filtros de la web (proyectos y FAQs): un toggle segmentado en forma de píldora.
// La opción activa lleva una píldora blanca que se desliza hasta ella.
// "layoutId" debe ser único por página para que la animación no salte entre toggles.
export function FilterToggle<T extends string | null>({
  options,
  value,
  onChange,
  layoutId,
  label,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex items-center rounded-full border border-light/30 p-1">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value ?? "todo"}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`relative rounded-full px-4 xl:px-5 py-2 font-mono text-[13px] uppercase whitespace-nowrap transition-colors duration-300 ${
              isActive ? "text-dark" : "text-light"
            }`}
            style={{ letterSpacing: "0.09em" }}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-light"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
