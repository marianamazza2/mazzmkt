import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import { ProjectTile } from "@/components/projects/project-tile";

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
          className="mb-4 md:mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2
              className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
              style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
            >
              <span className="opacity-50">02 /</span> NUESTRO TRABAJO
            </h2>
            <p
              className="block text-section-title font-bold leading-none tracking-[-0.04em] text-light font-heading md:font-bold md:leading-[0.92] md:tracking-[-0.045em] md:text-[#ffffff]"
            >
              Proyectos
            </p>
          </div>

          {/* Como en "Lo que hacemos": el botón a la derecha del titular */}
          <div className="shrink-0">
            <TransitionLink
              to="/proyectos"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
            >
              VER TODOS LOS PROYECTOS
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </div>
        </motion.div>

        {/* Projects list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestProjects.map((project, index) => (
            <ProjectTile key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
