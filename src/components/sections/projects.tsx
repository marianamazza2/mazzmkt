import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/transition-link";

const projects = [
  {
    id: 1,
    title: "PROYECTO 01",
    category: "BRANDING & WEB",
    image: "/images/projects/project-1.jpg",
    slug: "proyecto-1",
  },
  {
    id: 2,
    title: "PROYECTO 02",
    category: "DESARROLLO WEB",
    image: "/images/projects/project-2.jpg",
    slug: "proyecto-2",
  },
  {
    id: 3,
    title: "PROYECTO 03",
    category: "MARKETING DIGITAL",
    image: "/images/projects/project-3.jpg",
    slug: "proyecto-3",
  },
];

// Mini project card with 3D tilt
function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
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

          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f]" />

          {/* Large number */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span
              className="text-[#ffffff] font-bold select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.08]"
              style={{ fontSize: "clamp(80px, 15vw, 200px)", opacity: 0.04 }}
            >
              0{project.id}
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
            <span className="inline-block self-start px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#ffffff] text-[#141414] mb-3">
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
          <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3">
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
                WebkitTextStroke: "1.5px #ffffff",
                WebkitTextFillColor: "transparent",
              } as React.CSSProperties}
            >
              &raquo;
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
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
            className="group inline-flex items-center gap-3 text-[#ffffff] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity"
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
