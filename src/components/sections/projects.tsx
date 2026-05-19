import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types";

function HomeProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
    >
      {/* Mobile: imagen arriba + info abajo — fondo beige */}
      <div className="md:hidden flex flex-col">
        <TransitionLink
          to="/proyectos/$slug"
          params={{ slug: project.slug }}
          className="block relative overflow-hidden rounded-sm"
          style={{ height: "180px" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#d3d1c7] to-[#b4b2a9]" />
          )}
        </TransitionLink>
        <div
          className="flex items-baseline justify-between py-2"
        >
          <div>
            <span
              className="text-[10px] font-semibold uppercase block"
              style={{ letterSpacing: "1.5px", color: "#B4B2A9" }}
            >
              {project.category}
              {!project.client.toLowerCase().startsWith("proyecto propio") && ` · ${project.client}`}
            </span>
            <h3
              className="font-medium uppercase mt-[2px]"
              style={{ fontSize: "14px", letterSpacing: "0.5px", color: "#141414" }}
            >
              {project.title}
            </h3>
          </div>
          <span className="text-[15px] ml-3 shrink-0" style={{ color: "#B4B2A9" }}>›</span>
        </div>
      </div>

      {/* Desktop: ProjectCard original */}
      <div className="hidden md:block">
        <ProjectCard project={project} index={index} size="wide" />
      </div>
    </motion.div>
  );
}

export function Projects() {
  const latestProjects = allProjects.slice(0, 3);

  return (
    <section className="bg-dark max-md:bg-light py-7 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 md:mb-9"
        >
          <p
            className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
            style={{ letterSpacing: "0.13em", color: "#B4B2A9" }}
          >
            NUESTRO TRABAJO
          </p>
          <h2
            className="block text-[24px] font-semibold leading-none text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em] md:text-[#ffffff]"
            style={{ letterSpacing: "0" }}
          >
            PROYECTOS{" "}
            <span className="hidden md:inline" style={{ color: "#ffffff" }}>&raquo;</span>
          </h2>
        </motion.div>

        {/* Projects list */}
        <div className="flex flex-col gap-3 md:gap-5 mb-5 md:mb-8">
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
            className="md:hidden inline-flex min-h-[44px] w-full items-center justify-center rounded-sm text-[11px] font-medium uppercase"
            style={{
              padding: "11px 24px",
              letterSpacing: "1px",
              border: "1px solid rgba(44,44,42,0.25)",
              color: "#141414",
            }}
          >
            VER TODOS LOS PROYECTOS →
          </TransitionLink>

          {/* Desktop: link original */}
          <TransitionLink
            to="/proyectos"
            className="hidden md:inline-flex items-center justify-center gap-3 rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
            style={{ letterSpacing: "0.09em" }}
          >
            VER TODOS LOS PROYECTOS
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
