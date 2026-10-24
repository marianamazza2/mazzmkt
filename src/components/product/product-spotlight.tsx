import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowRight } from "lucide-react";
import { Molinillo } from "@/components/brand/molinillo";
import { receptionist } from "@/data/products";

// Tarjeta destacada de nuestro producto. Siempre contrasta con su fondo:
// blanca sobre el negro (home y /servicios); negra si algún día va sobre fondo blanco.
// "detailed" añade la descripción larga y las ventajas (versión de la home; en escritorio ancho comparte fila
// con el titular del bloque, por eso su nombre y su padding se reducen un poco ahí).
// "wide" la reparte en dos columnas y suma la frase de instalación (versión de /servicios).
export function ProductSpotlight({
  onLight = false,
  detailed = false,
  wide = false,
}: {
  onLight?: boolean;
  detailed?: boolean;
  wide?: boolean;
}) {
  const muted = onLight ? "text-light/70" : "text-dark/70";

  const features = (
    <ul className={`grid gap-x-6 gap-y-3 ${wide ? "" : "mt-6 sm:grid-cols-2"}`}>
      {receptionist.features.map((feature) => (
        <li
          key={feature}
          className={`flex items-center gap-2.5 border-t pt-3 font-mono text-[11px] md:text-[12px] uppercase ${
            onLight ? "border-light/13 text-light" : "border-dark/13 text-dark"
          }`}
          style={{ letterSpacing: "0.08em" }}
        >
          {feature}
        </li>
      ))}
    </ul>
  );

  return (
    <TransitionLink
      to={receptionist.href}
      className={`group flex flex-col gap-6 rounded-sm p-6 md:p-8 ${
        wide
          ? "md:p-10 lg:p-14 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:items-stretch"
          : detailed
            ? "md:p-10 xl:p-8"
            : "md:flex-row md:items-end md:justify-between"
      } ${
        onLight ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className={wide ? "lg:flex lg:h-full lg:flex-col" : undefined}>
        <p
          className={`mb-3 inline-flex items-center gap-2 font-mono text-[10px] md:text-[13px] font-medium uppercase ${
            onLight ? "text-light" : "text-dark"
          }`}
          style={{ letterSpacing: "0.13em" }}
        >
          <Molinillo className="h-[0.9em] w-[0.9em]" />
          {receptionist.label}
        </p>
        <h3
          className={`flex items-center gap-3 md:gap-4 font-heading text-[28px] md:text-[40px] font-bold uppercase leading-[0.95] tracking-[-0.03em] ${
            detailed && !wide ? "xl:text-[32px]" : ""
          }`}
        >
          {receptionist.name}
          {/* "Ver más": la misma flecha en círculo que las columnas de servicios de la home */}
          <span
            className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              onLight
                ? "border-light/30 group-hover:border-light group-hover:bg-light group-hover:text-dark"
                : "border-dark/30 group-hover:border-dark group-hover:bg-dark group-hover:text-light"
            }`}
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
          </span>
        </h3>

        {wide ? (
          <>
            <p className={`text-body mt-4 max-w-xl lg:mt-auto ${muted}`}>{receptionist.description}</p>
            <p className={`text-body mt-3 max-w-xl ${muted}`}>{receptionist.setup}</p>
          </>
        ) : (
          <p className={`text-body mt-3 max-w-xl ${muted}`}>
            {detailed ? receptionist.description : receptionist.tagline}
          </p>
        )}

        {detailed && !wide && features}
      </div>

      {wide && (
        <div className="lg:flex lg:h-full lg:flex-col">
          <p className="mb-6 max-w-xl font-heading text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] md:text-[22px]">
            {receptionist.tagline}
          </p>
          <div className="lg:mt-auto">{features}</div>
        </div>
      )}
    </TransitionLink>
  );
}
