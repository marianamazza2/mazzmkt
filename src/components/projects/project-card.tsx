import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/types";
import { TransitionLink } from "@/components/transition/transition-link";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "small" | "medium" | "large" | "wide";
  showFloatingImage?: boolean;
  onMouseEnter?: (project: Project) => void;
  onMouseLeave?: () => void;
}

export function ProjectCard({ project, index, size = "medium", showFloatingImage = true, onMouseEnter, onMouseLeave }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: false, margin: "-25% 0px -25% 0px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const gradientX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    onMouseLeave?.();
  };

  const sizeClasses = {
    small: "aspect-video md:aspect-square",
    medium: "aspect-video md:aspect-[4/5]",
    large: "aspect-[4/3] md:col-span-2",
    wide: "aspect-[16/9]",
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
      onMouseEnter={() => { setIsHovered(true); onMouseEnter?.(project); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`group relative overflow-hidden ${sizeClasses[size]}`}
    >
      <TransitionLink
        to="/proyectos/$slug"
        params={{ slug: project.slug }}
        className="block h-full w-full"
      >
        <div className="relative h-full w-full overflow-hidden bg-[#141414] rounded-sm">

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.15) 0%, transparent 50%)`
              ),
            }}
          />

          {/* Image */}
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — ${project.category} para ${project.client}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 max-md:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#141414]/60 group-hover:bg-[#141414]/50 max-md:bg-[#141414]/50 transition-colors duration-300" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
              className="mb-3"
            >
              <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#f1ede1] text-[#141414] font-geist">
                {project.category}
              </span>
            </motion.div>
            <h3 className="font-bold text-[#ffffff] mb-2" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.1 }}>
              {project.title}
            </h3>
            <p className="text-sm text-[#f1ede1aa] group-hover:text-[#f1ede1] max-md:text-[#f1ede1] transition-colors">
              {project.client}
            </p>
            {size === "large" && project.results && (
              <div className="flex gap-6 mt-4 pt-4 border-t border-[#f1ede120]">
                {project.results.slice(0, 3).map((result) => (
                  <div key={result.metric}>
                    <p className="text-lg font-bold text-[#ffffff]">{result.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#f1ede1aa]">{result.metric}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hover border */}
          <div className="absolute inset-0 border border-[#f1ede100] group-hover:border-[#f1ede130] max-md:border-[#f1ede130] transition-colors duration-300 z-30 pointer-events-none" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover:h-16 max-md:h-16 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover:w-16 max-md:w-16 transition-all duration-300" />
          </div>
        </div>
      </TransitionLink>

      {/* Floating card — showcase view, mobile */}
      {showFloatingImage && project.image && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[65%] h-[65%] shadow-xl border border-[#14141410] overflow-hidden rounded-sm pointer-events-none md:hidden">
          <img src={project.image} alt={`${project.title} — ${project.category} para ${project.client}`} className="w-full h-full object-cover" />
        </div>
      )}
      <AnimatePresence>
        {showFloatingImage && isInView && project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[65%] h-[65%] shadow-xl border border-[#14141010] overflow-hidden rounded-sm pointer-events-none hidden md:block"
          >
            <img src={project.image} alt={`${project.title} — ${project.category} para ${project.client}`} className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
