import { motion } from "framer-motion";

const words = [
  "ESTRATEGIA",
  "CREATIVIDAD",
  "DEARROLLO WEB",
  "INTELIGENCIA ARTIFICIAL",
  "BRANDING",
  "REDES SOCIALES",
  "DISEÑO WEB",
  "AUTOMATIZACIÓN",
  "INNOVACIÓN",
  "PERFORMANCE",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const content = words.map((word, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="text-sm md:text-base font-semibold tracking-[0.2em] whitespace-nowrap text-white">
        {word}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />
    </span>
  ));

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex items-center gap-8 shrink-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-dark text-[#ffffff] py-6 md:py-8 border-t border-b border-[#ffffff08] overflow-hidden"
    >
      <MarqueeRow />
    </motion.section>
  );
}
