import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/types";
import { TransitionLink } from "@/components/transition/transition-link";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "small" | "medium" | "large";
}

export function ProjectCard({ project, index, size = "medium" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Gradient position follows cursor
  const gradientX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sizeClasses = {
    small: "aspect-square",
    medium: "aspect-[4/5]",
    large: "aspect-[4/3] md:col-span-2",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`group relative ${sizeClasses[size]}`}
    >
      <TransitionLink
        to="/proyectos/$slug"
        params={{ slug: project.slug }}
        className="block h-full w-full"
      >
        {/* Card container */}
        <div className="relative h-full w-full overflow-hidden bg-[#141414]">
          {/* Animated gradient overlay that follows cursor */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.15) 0%, transparent 50%)`
              ),
            }}
          />

          {/* Background */}
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
          )}

          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#141414]/60 group-hover:bg-[#141414]/50 transition-colors duration-300" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
            {/* Category tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
              className="mb-3"
            >
              <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#f1ede1] text-[#141414]">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h3
              className="font-bold text-[#ffffff] mb-2 group-hover:translate-x-2 transition-transform duration-300"
              style={{
                fontSize: size === "large" ? "clamp(24px, 3vw, 40px)" : "clamp(18px, 2vw, 28px)",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>

            {/* Client */}
            <p className="text-sm text-[#f1ede1aa] group-hover:text-[#f1ede1] transition-colors">
              {project.client}
            </p>

            {/* Results preview - only on large cards */}
            {size === "large" && project.results && (
              <div className="flex gap-6 mt-4 pt-4 border-t border-[#f1ede120]">
                {project.results.slice(0, 3).map((result) => (
                  <div key={result.metric}>
                    <p className="text-lg font-bold text-[#ffffff]">{result.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#f1ede1aa]">
                      {result.metric}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hover border animation */}
          <div className="absolute inset-0 border border-[#f1ede100] group-hover:border-[#f1ede130] transition-colors duration-300 z-30 pointer-events-none" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover:h-16 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover:w-16 transition-all duration-300" />
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}
