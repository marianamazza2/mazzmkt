import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";

// Word-by-word reveal animation
function AnimatedWords({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const words = text.split(" ");

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Intro() {
  return (
    <section className="bg-light py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl">
          {/* Animated line accent */}
          <motion.div
            className="w-16 h-[2px] bg-[#141414] mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />

          <h2
            className="font-bold text-[#141414] mb-12"
            style={{
              fontSize: "48px",
              lineHeight: "1.15",
              fontWeight: 700,
            }}
          >
            <AnimatedWords text="DESARROLLAMOS MARCAS," />
            <br />
            <AnimatedWords text="ELEVAMOS SU PRESENCIA DIGITAL" />
            <br />
            <span style={{ color: "#141414" } as React.CSSProperties}>
              <AnimatedWords text="Y CONECTAMOS CON INTELIGENCIA." />
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12"
          >
            <TransitionLink
              to="/contacto"
              className="group inline-flex items-center gap-3 text-[#141414] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity"
            >
              HAGAMOS CRECER TUS IDEAS
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
      </div>
    </section>
  );
}
