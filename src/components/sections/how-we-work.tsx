import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Bot, Clock } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Código real",
    description:
      "Programamos desde cero con las tecnologías más avanzadas. Tu web carga en menos de 2 segundos, es 100% tuya y no depende de ninguna plataforma.",
  },
  {
    icon: Bot,
    title: "AI en cada proyecto",
    description:
      "La inteligencia artificial no es un extra. Está en el diseño, el código, la automatización y el contenido de cada proyecto.",
  },
  {
    icon: Clock,
    title: "Días, no meses",
    description:
      "Marca completa en 2-3 días. Web profesional en 5-7 días. Webapp a medida en 2-3 semanas. Resultados rápidos sin sacrificar calidad.",
  },
];

export function HowWeWork() {
  const [selected, setSelected] = useState(0);
  const total = pillars.length;

  return (
    <section className="bg-light">
      {/* Mobile */}
      <div className="md:hidden px-5 pt-8 pb-7">
        <p
          className="text-[10px] uppercase mb-6"
          style={{ letterSpacing: "2.5px", color: "#888780" }}
        >
          CÓMO TRABAJAMOS
        </p>

        <div className="h-[200px]">
          {(() => {
            const ActiveIcon = pillars[selected].icon;
            const handleNext = () => setSelected((prev) => (prev + 1) % total);
            const handlePrev = () => setSelected((prev) => (prev - 1 + total) % total);
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="rounded-[0.25rem] p-5 h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
                style={{ background: "#e9e5d9" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) handleNext();
                  else if (info.offset.x > 50) handlePrev();
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(20, 20, 20, 0.08)" }}
                  >
                    <ActiveIcon size={20} strokeWidth={1.5} style={{ color: "#141414" }} />
                  </div>
                  <p className="text-[13px] font-semibold uppercase text-[#141414]" style={{ letterSpacing: "0.04em" }}>
                    {pillars[selected].title}
                  </p>
                </div>

                <p className="text-[13px] leading-[1.6]" style={{ color: "#5F5E5A" }}>
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
                backgroundColor: i === selected ? "#141414" : "rgba(20, 20, 20, 0.25)",
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
          className="mb-10 text-[15px] font-medium uppercase text-[#5f5e5a] font-geist"
          style={{ letterSpacing: "0.13em" }}
        >
          CÓMO TRABAJAMOS
        </p>
        <div className="grid grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="px-8 py-10 border border-[#14141420] rounded-sm"
              >
                <Icon size={32} strokeWidth={1.5} className="mb-6 text-[#141414]" />
                <h3
                  className="font-bold text-[#141414] mb-4 uppercase"
                  style={{ fontSize: "22px", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="leading-[1.65]"
                  style={{ fontSize: "17px", color: "#5F5E5A" }}
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
