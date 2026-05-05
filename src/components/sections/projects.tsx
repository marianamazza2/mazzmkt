import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/transition-link";
import type { Project } from "@/types";
import { projects as allProjects } from "@/data/projects";

// Mini project card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ x: 8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <TransitionLink to="/proyectos/$slug" params={{ slug: project.slug }} className="group block">
        <div className="aspect-[4/5] relative overflow-hidden bg-[#1a1a1a]">
          {/* Cursor-following glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.12) 0%, transparent 50%)`
              ),
            }}
          />

          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f]" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#141414]/50 group-hover:bg-[#141414]/40 transition-colors duration-300" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
            <span className="inline-block self-start px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#ffffff] text-[#141414] mb-3 font-geist">
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-[#ffffff] group-hover:translate-x-2 transition-transform duration-300">
              {project.title}
            </h3>
          </div>

          {/* Hover border */}
          <div className="absolute inset-0 border border-[#ffffff00] group-hover:border-[#ffffff30] transition-colors duration-300 z-30 pointer-events-none" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden z-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#ffffff] group-hover:h-12 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#ffffff] group-hover:w-12 transition-all duration-300" />
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

export function Projects() {
  const latestProjects = [...allProjects]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);

  return (
    <section className="bg-dark py-24 md:py-32 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

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
              fontSize: "clamp(40px, 7vw, 98px)",
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
