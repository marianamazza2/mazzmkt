import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { Isotipo } from "@/components/brand/isotipo";
import type { Project } from "@/types";

// Tarjeta de proyecto única para toda la web: imagen limpia firmada con el isotipo
// y, debajo, el nombre y la categoría.
export function ProjectTile({
  project,
  index,
  wide = false,
  revealOnScroll = true,
}: {
  project: Project;
  index: number;
  /** Un proyecto por fila a todo el ancho: imagen apaisada */
  wide?: boolean;
  /** Anima la tarjeta al entrar en pantalla; se desactiva para previews parciales en carruseles. */
  revealOnScroll?: boolean;
}) {
  const isOwnProject = project.client.toLowerCase().startsWith("proyecto propio");
  const imageRef = useRef<HTMLDivElement>(null);
  // La tarjeta flotante aparece cuando el proyecto llega al centro de la pantalla
  const isCentered = useInView(imageRef, { once: false, margin: "-25% 0px -25% 0px" });

  return (
    <motion.div
      initial={revealOnScroll ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
    >
      <TransitionLink to="/proyectos/$slug" params={{ slug: project.slug }} className="group block">
        <div ref={imageRef} className={cn("relative overflow-hidden rounded-sm bg-[#1a1a1a]", wide ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]")}>
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} — ${project.category} para ${project.client}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
          {/* Vista ancha en escritorio: la misma imagen en pequeño, flotando en el centro,
              con un velo oscuro sobre el fondo para que destaque */}
          <AnimatePresence>
            {wide && isCentered && project.image && (
              <motion.div
                key="velo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-dark/50 pointer-events-none hidden md:block"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {wide && isCentered && project.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[65%] h-[65%] shadow-xl overflow-hidden rounded-sm pointer-events-none hidden md:block"
              >
                <img src={project.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
          <Isotipo className="absolute bottom-4 right-4 h-[26px] w-[28px] text-light/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]" />
        </div>
        <div className="flex flex-col gap-1 pt-3 md:flex-row md:items-baseline md:justify-between md:gap-4 md:pt-4">
          <h3 className="normal-case text-[18px] md:text-[20px] font-bold tracking-[-0.02em] text-light">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-left text-light/50 group-hover:text-light transition-colors md:text-right">
            {project.category}
            {!isOwnProject && ` · ${project.client}`}
          </span>
        </div>
      </TransitionLink>
    </motion.div>
  );
}
