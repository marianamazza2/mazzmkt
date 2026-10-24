import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ServiceItem } from "@/types";

// Card de servicio: número en mono, título, etiquetas y descripción. Se invierte a blanco al pasar el ratón.
export function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(10, 10, 10, 0.08) 0%, transparent 50%)`
  );

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

  const body = (
    <div className="relative border border-light/13 h-full hover:border-light hover:bg-light transition-all duration-300 overflow-hidden rounded-sm">
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: glow }}
      />

      <div className="relative z-10 flex h-full flex-col p-5 md:p-8">
        <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light group-hover:text-dark transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-3 transition-colors">
          {service.title}
        </h3>

        <p
          className="font-mono text-[13px] font-medium uppercase text-light group-hover:text-dark mb-4 transition-colors"
          style={{ letterSpacing: "0.08em" }}
        >
          {service.subtitle}
        </p>

        <p className="text-body max-w-[32ch] text-light/80 group-hover:text-dark/80 transition-colors">
          {service.description}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      {body}
    </motion.div>
  );
}
