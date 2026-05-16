import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";

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
    <section className="bg-light relative">
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-8 pb-7">
        <p
          className="text-[10px] uppercase mb-2"
          style={{ letterSpacing: "2.5px", color: "#888780" }}
        >
          QUIÉNES SOMOS
        </p>
        <h2
          className="uppercase mb-3"
          style={{
            fontSize: "20px",
            lineHeight: "1.2",
            letterSpacing: "0.3px",
            fontWeight: 500,
            color: "#141414",
          }}
        >
          DESARROLLAMOS MARCAS, ELEVAMOS SU PRESENCIA DIGITAL
        </h2>
        <p
          className="text-[13px] leading-[1.7] mb-5"
          style={{ color: "#5F5E5A" }}
        >
          Conectamos con inteligencia. Cada proyecto empieza entendiendo quién sos, qué necesitás y a quién le hablás.
        </p>
        <TransitionLink
          to="/contacto"
          className="inline-flex items-center gap-[6px] text-[11px] font-medium uppercase"
          style={{ letterSpacing: "1.5px", color: "#141414" }}
        >
          HAGAMOS CRECER TUS IDEAS →
        </TransitionLink>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block py-24 container mx-auto px-6">
        <div className="max-w-6xl">
          <h2
            className="font-bold text-[#141414] mb-10"
            style={{
              fontSize: "var(--font-h2)",
              lineHeight: "var(--lh-h2)",
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
              className="group inline-flex items-center gap-3 min-h-[44px] text-[#141414] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity"
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
