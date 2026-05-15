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
      {/* Mobile: imagen arriba, texto abajo — igual que la página de proyectos */}
      <div className="md:hidden flex flex-col gap-3">
        <TransitionLink
          to="/proyectos/$slug"
          params={{ slug: project.slug }}
          className="block aspect-[16/9] relative overflow-hidden rounded-sm"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
          )}
        </TransitionLink>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#ffffffaa] font-geist">
            {project.category}
            {!project.client.toLowerCase().startsWith("proyecto propio") && ` · ${project.client}`}
          </span>
          <h3
            className="font-bold text-[#ffffff] leading-[1.05]"
            style={{ fontSize: "clamp(18px, 5vw, 28px)" }}
          >
            {project.title}
          </h3>
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
    <section className="bg-dark py-14 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <p className="text-sm font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3 font-geist">
            NUESTRO TRABAJO
          </p>
          <h2
            className="font-bold text-[#ffffff]"
            style={{
              fontSize: "20px",
              lineHeight: "1.1",
              fontWeight: 700,
            }}
          >
            PROYECTOS{" "}
            <span style={{ color: "#ffffff" } as React.CSSProperties}>&raquo;</span>
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col gap-8 md:gap-6 mb-12">
          {latestProjects.map((project, index) => (
            <HomeProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-start"
        >
          <TransitionLink
            to="/proyectos"
            className="group inline-flex items-center gap-3 min-h-[44px] text-[#ffffff] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity font-geist"
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
