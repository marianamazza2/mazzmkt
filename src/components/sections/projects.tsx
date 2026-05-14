import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects as allProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";

export function Projects() {
  const latestProjects = allProjects.slice(0, 3);

  return (
    <section
      className="bg-dark py-24 md:py-32 relative overflow-hidden"
    >

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3 font-geist">
            <motion.span
              className="inline-block w-8 h-[1px] bg-[#ffffff]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
            NUESTRO TRABAJO
          </p>
          <h2
            className="font-bold text-[#ffffff]"
            style={{
              fontSize: "clamp(22px, 3.5vw, 56px)",
              lineHeight: "1.08",
              fontWeight: 700,
            }}
          >
            PROYECTOS{" "}
            <span
              style={{
                color: "#ffffff",
              } as React.CSSProperties}
            >
              &raquo;
            </span>
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col gap-6 mb-12">
          {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} size="wide" />
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
            className="group inline-flex items-center gap-3 text-[#ffffff] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity font-geist"
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
