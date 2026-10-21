import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import { Molinillo } from "@/components/brand/molinillo";
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
            <ProjectTile key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="flex"
        >
          <TransitionLink
            to="/proyectos"
            className="inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
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
