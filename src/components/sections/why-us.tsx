import { motion } from "framer-motion";
import { SectionHeading } from "@/components/sections/section-heading";

// Home · 01 Por qué MAZZMKT: el diferencial, todo el recorrido con un solo estudio.
// Una comparación compacta en un bloque blanco (lo habitual frente a MAZZMKT), sin iconos.
const comparison = [
  { usual: "Diseñador + agencia web + técnico", us: "Un solo estudio, de la marca a la automatización" },
  { usual: "Webs con plantilla", us: "Código propio, a medida" },
  { usual: "La web no respeta la marca", us: "La marca que diseñamos es la que programamos" },
  { usual: "Al entregar, se acaba", us: "Tu negocio sigue funcionando solo" },
];

const label = "font-mono text-[11px] md:text-[13px] font-medium uppercase";

export function WhyUs() {
  return (
    <section className="bg-dark pt-12 pb-10 md:pt-30 md:pb-18">
      <div className="container mx-auto px-5 md:px-6">
        <SectionHeading
          number="01"
          label="Por qué MAZZMKT"
          title="Todo en un mismo lugar"
          subtitle="[[Para tener una marca, una web y un negocio]] que funcione solo, [[lo normal es contratar]] a tres equipos distintos: [[un estudio]] de branding que cree tu marca, [[una agencia]] que la lleve a una web o una tienda online y, cuando ya está en digital, [[alguien técnico]] que automatice tus procesos. [[Tres presupuestos]], [[tres calendarios]] y [[volver a explicarle tu marca]] [[a cada uno]] desde cero. En mazzmkt comprendemos tu negocio, [[creamos tu marca]], la [[programamos]], la [[llevamos al mundo digital]] y luego la [[automatizamos]]."
          className="mb-8 md:mb-12"
        />

        {/* Comparación en un bloque blanco compacto: filas cortas, "lo habitual" en gris y MAZZMKT en negro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-sm bg-light text-dark px-5 py-6 md:px-10 md:py-8"
        >
          <div className="hidden md:grid grid-cols-2 gap-6 pb-3">
            <p className={`${label} text-[#6b6b6b]`} style={{ letterSpacing: "0.13em" }}>
              Lo habitual
            </p>
            <p className={`${label} text-dark`} style={{ letterSpacing: "0.13em" }}>
              Con MAZZMKT
            </p>
          </div>

          {comparison.map((row, index) => (
            <div
              key={row.usual}
              className={`grid gap-1 md:grid-cols-2 md:gap-6 md:items-baseline border-dark/13 py-3 md:py-4 ${
                // En móvil no hay cabecera: la primera fila no lleva línea arriba
                index === 0 ? "pt-0 md:pt-4 md:border-t" : "border-t"
              }`}
            >
              <p className="text-body text-[#6b6b6b]">
                <span className={`${label} md:hidden block mb-0.5 text-[10px]`} style={{ letterSpacing: "0.13em" }}>
                  Lo habitual
                </span>
                {row.usual}
              </p>
              <p className="normal-case font-heading text-[17px] md:text-[20px] font-bold leading-[1.2] tracking-[-0.025em] text-dark">
                {row.us}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
