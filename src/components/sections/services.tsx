import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Mark } from "@/components/ui/underline-mark";
import { serviceGroups } from "@/data/services";
import type { ServiceGroup } from "@/types";

// Home · 01 Lo que hacemos: el recorrido de punta a punta en tres pasos (marca → web → automatización).
// Tres pasos en columnas.
// Los títulos son los mismos que en /servicios (group.title), para que las dos páginas hablen igual.
const journey: Record<ServiceGroup["id"], { text: string }> = {
  disenamos: {
    text: "Estrategia e identidad visual para que tu marca se reconozca y se recuerde.",
  },
  programamos: {
    text: "Webs, tiendas online y plataformas a medida para llevar tu negocio al mundo digital.",
  },
  automatizamos: {
    text: "Conectamos herramientas y automatizamos procesos para que tu negocio crezca sin sumar tareas.",
  },
};

// Tres columnas separadas por una línea arriba, como los pasos del proceso en /agentes-ia:
// un resumen ligero (el detalle vive en /servicios). Cada columna enlaza con su bloque.
function JourneyStep({ group, index }: { group: ServiceGroup; index: number }) {
  const step = journey[group.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TransitionLink to="/servicios" hash={group.id} className="group block border-t border-light/13 pt-5 md:pt-6">
        <span className="block font-mono text-[13px] text-light/50">
          {String(index + 1).padStart(2, "0")} <span className="opacity-60">/</span>{" "}
          <span className="uppercase" style={{ letterSpacing: "0.08em" }}>
            {group.title}
          </span>
        </span>
        <h3 className="normal-case mt-4 md:mt-10 mb-2 md:mb-3 flex items-center gap-3 text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light">
          {group.verb}
          {/* "Ver más": flecha en círculo junto al verbo; al pasar el cursor el círculo se rellena de blanco
              (la flecha no se desplaza, para que no parezca que cambia de tamaño) */}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-light/30 transition-colors duration-300 group-hover:border-light group-hover:bg-light group-hover:text-dark">
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </h3>
        <p className="text-body text-[#a1a1a1] max-w-[340px]">{step.text}</p>
      </TransitionLink>
    </motion.div>
  );
}

export function Services() {
  return (
    // Mantiene un margen amplio antes del recorrido de servicios en la home.
    <section className="bg-dark pt-12 pb-10 md:pt-30 md:pb-18">
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-8 md:mb-20 grid gap-6 md:grid-cols-[1fr_auto] md:gap-x-10 md:gap-y-0">
          <SectionHeading number="01" label="Soluciones digitales en Barcelona" title="Lo que hacemos" className="" />

          <motion.p
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.8 }}
            className="text-body text-[#a1a1a1] max-w-2xl lg:max-w-[60rem] -mt-3 md:col-start-1 md:mt-6"
          >
            Creamos <Mark step={0}>tu marca</Mark>, desarrollamos <Mark step={1}>tu web o plataforma</Mark> y{" "}
            <Mark step={2}>automatizamos procesos</Mark> para que tu negocio funcione mejor. Un solo equipo, de la
            estrategia al código.
          </motion.p>

        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {serviceGroups.map((group, index) => (
            <JourneyStep key={group.id} group={group} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex justify-start md:mt-10 md:justify-end"
        >
          <TransitionLink
            to="/servicios"
            className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] font-mono text-[13px] font-semibold uppercase text-light transition-colors hover:border-light"
            style={{ letterSpacing: "0.09em" }}
          >
            VER TODOS LOS SERVICIOS
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
