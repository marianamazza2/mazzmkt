import { motion } from "framer-motion";

// Cabecera de sección: "01 / ETIQUETA", titular grande y subtítulo opcional.
export function SectionHeading({
  number,
  label,
  title,
  subtitle,
  className = "mb-6 md:mb-10",
  onLight = false,
  brightLabel = false,
  titleSize = "text-section-title",
}: {
  number?: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  /** Sobre fondo blanco: textos en oscuro */
  onLight?: boolean;
  /** Mantiene la etiqueta en blanco puro en los encabezados del catálogo de servicios. */
  brightLabel?: boolean;
  /** Tamaño del titular, por si la sección necesita uno distinto */
  titleSize?: string;
}) {
  const muted = onLight ? "text-[#6b6b6b]" : "text-light/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <p
        className={`font-mono text-[11px] md:text-[13px] font-medium uppercase ${brightLabel && !onLight ? "text-light" : muted} mb-2 md:mb-5`}
        style={{ letterSpacing: "0.13em" }}
      >
        {number && (
          <>
            <span>{number} /</span>{" "}
          </>
        )}
        {label}
      </p>
      <h2 className={`normal-case font-heading ${titleSize} font-bold leading-[1] md:leading-[0.92] tracking-[-0.04em] md:tracking-[-0.045em] ${onLight ? "text-dark" : "text-light"}`}>
        {title}
      </h2>
      {subtitle && <p className={`text-body ${muted} mt-3 md:mt-6 max-w-2xl lg:max-w-[60rem]`}>{subtitle}</p>}
    </motion.div>
  );
}
