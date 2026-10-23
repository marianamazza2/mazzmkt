import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import { ProjectTile } from "@/components/projects/project-tile";
import { CardRail } from "@/components/ui/card-rail";

export function Projects() {
  const latestProjects = allProjects.slice(0, 2);
  const [activeSlide, setActiveSlide] = useState(0);

  function updateActiveSlide(event: React.UIEvent<HTMLDivElement>) {
    const rail = event.currentTarget;
    const firstSlide = rail.firstElementChild as HTMLElement | null;
    if (!firstSlide) return;

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const slideIndex = Math.round(rail.scrollLeft / (firstSlide.offsetWidth + gap));
    const nextSlide = Math.min(2, slideIndex);
    setActiveSlide((current) => (current === nextSlide ? current : nextSlide));
  }

  return (
    <section className="bg-dark py-10 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p
              className="text-[11px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
              style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
            >
              <span className="opacity-50">02 /</span> NUESTRO TRABAJO
            </p>
            <h2
              className="block normal-case text-section-title font-bold leading-none tracking-[-0.04em] text-light font-heading md:font-bold md:leading-[0.92] md:tracking-[-0.045em] md:text-[#ffffff]"
            >
              Proyectos
            </h2>
          </div>
        </motion.div>

        {/* Mobile: proyectos con snap y tarjeta final de acceso a todos. */}
        <CardRail
          columns={2}
          mobileOnlyLast
          onScroll={updateActiveSlide}
          className="md:hidden"
          ariaLabel="Proyectos destacados; desliza para ver más"
        >
          {latestProjects.map((project, index) => (
            <ProjectTile key={project.id} project={project} index={index} revealOnScroll={false} />
          ))}
          <TransitionLink
            to="/proyectos"
            aria-label="Ver todos los proyectos"
            className="group flex aspect-[4/3] flex-col justify-between rounded-sm border border-light/20 bg-[#111111] p-6 transition-colors hover:border-light/50"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-light/50">
              MAZZMKT · PROYECTOS
            </span>
            <span className="flex items-end justify-between gap-4 font-heading text-[24px] font-bold leading-[1.05] tracking-[-0.04em] text-light">
              Ver todos los proyectos
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light/30 transition-colors group-hover:border-light group-hover:bg-light group-hover:text-dark">
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </span>
          </TransitionLink>
        </CardRail>

        <div className="mt-4 flex items-center gap-3 md:hidden" aria-live="polite">
          <span className="font-mono text-[11px] text-light/55">
            {String(activeSlide + 1).padStart(2, "0")} <span className="text-light/30">/ 03</span>
          </span>
          <div
            role="progressbar"
            aria-label="Recorrido de proyectos"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={activeSlide + 1}
            className="h-px flex-1 overflow-hidden bg-light/20"
          >
            <div
              className="h-full bg-light transition-[width] duration-200"
              style={{ width: `${((activeSlide + 1) / 3) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-light/45">Desliza</span>
        </div>

        {/* Desktop mantiene su cuadrícula y el CTA inferior. */}
        <div className="hidden grid-cols-2 gap-6 md:grid">
          {latestProjects.map((project, index) => (
            <ProjectTile key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 hidden md:block md:mt-10"
        >
          <TransitionLink
            to="/proyectos"
            className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
            style={{ letterSpacing: "0.09em" }}
          >
            VER TODOS LOS PROYECTOS
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
