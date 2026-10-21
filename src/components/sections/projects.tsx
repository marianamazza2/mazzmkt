import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import { Molinillo } from "@/components/brand/molinillo";
import { Isotipo } from "@/components/brand/isotipo";

function HomeProjectCard({ project, index }: { project: Project; index: number }) {
  const isOwnProject = project.client.toLowerCase().startsWith("proyecto propio");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <TransitionLink to="/proyectos/$slug" params={{ slug: project.slug }} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#1a1a1a]">
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} — ${project.category} para ${project.client}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
          <Isotipo className="absolute bottom-4 right-4 h-[26px] w-[28px] text-light/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]" />
        </div>
        <div className="flex items-baseline justify-between gap-4 pt-3 md:pt-4">
          <h3 className="text-[16px] md:text-[20px] font-bold tracking-[-0.02em] text-light">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.1em] text-light/50 group-hover:text-light transition-colors text-right">
            {project.category}
            {!isOwnProject && ` · ${project.client}`}
          </span>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

export function Projects() {
  const latestProjects = allProjects.slice(0, 2);

  return (
    <section className="bg-dark py-7 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 md:mb-9"
        >
          <h2
            className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
            style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
          >
            <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>06</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> NUESTRO TRABAJO
          </h2>
          <p
            className="block text-[30px] font-bold leading-none tracking-[-0.04em] text-light font-heading md:text-[clamp(56px,6vw,88px)] md:font-bold md:leading-[0.92] md:tracking-[-0.045em] md:text-[#ffffff]"
          >
            Proyectos
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-10">
          {latestProjects.map((project, index) => (
            <HomeProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-md:justify-center md:justify-start"
        >
          {/* Mobile: botón con borde */}
          <TransitionLink
            to="/proyectos"
            className="md:hidden inline-flex min-h-[44px] w-full items-center justify-center rounded-sm text-[11px] font-medium uppercase border border-light/30 hover:border-light transition-colors font-mono"
            style={{
              padding: "11px 24px",
              letterSpacing: "0.09em",
              color: "#ffffff",
            }}
          >
            VER TODOS LOS PROYECTOS
            <Molinillo className="h-[12px] w-[12px] ml-2.5" />
          </TransitionLink>

          {/* Desktop: link original */}
          <TransitionLink
            to="/proyectos"
            className="hidden md:inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
            style={{ letterSpacing: "0.09em" }}
          >
            VER TODOS LOS PROYECTOS
            <Molinillo className="h-[14px] w-[14px]" />
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
