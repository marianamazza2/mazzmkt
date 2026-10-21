import { motion } from "framer-motion";
import { Molinillo } from "@/components/brand/molinillo";
import { CardRail } from "@/components/ui/card-rail";

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
  return (
    <section className="bg-dark pt-8 pb-7 md:py-16">
      <div className="container mx-auto px-5 md:px-6">
        <p
          className="font-mono text-[10px] md:text-[13px] font-medium uppercase text-[#a1a1a1] mb-6 md:mb-10"
          style={{ letterSpacing: "0.13em" }}
        >
          <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>01</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> CÓMO TRABAJAMOS
        </p>
        <CardRail>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group h-full p-5 md:p-8 border border-light/13 rounded-sm hover:border-light hover:bg-light transition-all duration-300"
            >
              <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-3 uppercase transition-colors">
                {pillar.title}
              </h3>
              <p className="text-body text-[#a1a1a1] group-hover:text-dark/80 transition-colors">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
