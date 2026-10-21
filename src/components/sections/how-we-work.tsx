import { motion } from "framer-motion";
import { useState } from "react";
import { Molinillo } from "@/components/brand/molinillo";

const pillars = [
  {
    title: "Código real",
    description:
      "Programamos desde cero con las tecnologías más avanzadas. Tu web carga en menos de 2 segundos, es 100% tuya y no depende de ninguna plataforma.",
  },
  {
    title: "AI en cada proyecto",
    description:
      "La inteligencia artificial no es un extra. Está en el diseño, el código, la automatización y el contenido de cada proyecto.",
  },
  {
    title: "Días, no meses",
    description:
      "Marca completa en 2-3 días. Web profesional en 5-7 días. Webapp a medida en 2-3 semanas. Resultados rápidos sin sacrificar calidad.",
  },
];

export function HowWeWork() {
  const [selected, setSelected] = useState(0);
  const total = pillars.length;

  return (
    <section className="bg-dark">
      {/* Mobile */}
      <div className="md:hidden px-5 pt-8 pb-7">
        <p
          className="font-mono text-[10px] uppercase mb-6"
          style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
        >
          <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>01</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> CÓMO TRABAJAMOS
        </p>

        <div className="h-[200px]">
          {(() => {
            const handleNext = () => setSelected((prev) => (prev + 1) % total);
            const handlePrev = () => setSelected((prev) => (prev - 1 + total) % total);
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="rounded-[0.25rem] p-5 h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
                style={{ background: "#1a1a1a" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) handleNext();
                  else if (info.offset.x > 50) handlePrev();
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] text-light/50 flex-shrink-0">{String(selected + 1).padStart(2, "0")}</span>
                  <p className="text-[13px] font-semibold uppercase text-light" style={{ letterSpacing: "0.04em" }}>
                    {pillars[selected].title}
                  </p>
                </div>

                <p className="text-[13px] leading-[1.6]" style={{ color: "#a1a1a1" }}>
                  {pillars[selected].description}
                </p>
              </motion.div>
            );
          })()}
        </div>

        {/* Dots navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", paddingTop: "18px" }}>
          {pillars.map((_, i) => (
            <span
              key={i}
              onClick={() => setSelected(i)}
              style={{
                display: "block",
                width: i === selected ? "18px" : "4px",
                height: "4px",
                borderRadius: "9999px",
                backgroundColor: i === selected ? "#ffffff" : "rgba(255, 255, 255, 0.25)",
                transition: "width 300ms ease-out, background-color 300ms ease-out",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block py-16 container mx-auto px-6">
        <p
          className="mb-10 text-[13px] font-medium uppercase text-[#a1a1a1] font-mono"
          style={{ letterSpacing: "0.13em" }}
        >
          <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>01</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> CÓMO TRABAJAMOS
        </p>
        <div className="grid grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group px-8 py-10 border border-light/13 rounded-sm hover:border-light hover:bg-light transition-all duration-300"
              >
                <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-4 uppercase transition-colors"
                >
                  {pillar.title}
                </h3>
                <p
                  className="leading-[1.65] text-[#a1a1a1] group-hover:text-dark/80 transition-colors"
                  style={{ fontSize: "17px" }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
