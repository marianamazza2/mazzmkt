import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { Molinillo } from "@/components/brand/molinillo";

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
    <section className="bg-dark relative">
      <div className="container mx-auto px-5 md:px-6 pt-8 pb-7 md:py-14">
        <div className="max-w-6xl">
          <p
            className="font-mono mb-2 md:mb-4 text-[10px] md:text-[13px] font-medium uppercase text-[#a1a1a1]"
            style={{ letterSpacing: "0.13em" }}
          >
            <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>05</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> QUIÉNES SOMOS
          </p>
          <h2 className="font-bold normal-case text-light mb-4 md:mb-5 text-[30px] md:text-[clamp(44px,5vw,72px)] leading-[1] md:leading-[0.95] tracking-[-0.045em]">
            {/* Los saltos de línea solo en escritorio; en móvil el titular fluye */}
            <AnimatedWords text="Desarrollamos marcas," />
            <br className="hidden md:inline" />
            <AnimatedWords text="elevamos su presencia digital" />
            <br className="hidden md:inline" />
            <AnimatedWords text="y conectamos con inteligencia." />
          </h2>
          <p className="text-body mb-7 md:mb-9 max-w-3xl text-[#a1a1a1]">
            Somos un estudio digital que diseña, programa y automatiza. Combinamos código real, diseño con criterio e inteligencia artificial en cada proyecto. El resultado: soluciones a medida que funcionan, se ven increíbles y están listas en días.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TransitionLink
            to="/contacto"
            className="group inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
            style={{ letterSpacing: "0.09em" }}
            onClick={() => trackEvent("cta_click", { location: "intro", label: "hagamos_crecer_tus_ideas" })}
          >
            HAGAMOS CRECER TUS IDEAS
            <Molinillo className="h-[14px] w-[14px]" />
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
