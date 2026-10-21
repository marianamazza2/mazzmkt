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
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-8 pb-7">
        <p
          className="font-mono text-[10px] uppercase mb-2"
          style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
        >
          <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>05</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> QUIÉNES SOMOS
        </p>
        <h2
          className="normal-case mb-3"
          style={{
            fontSize: "30px",
            lineHeight: "1",
            letterSpacing: "-0.04em",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Desarrollamos marcas, elevamos su presencia digital
        </h2>
        <p
          className="text-[14px] leading-[1.7] mb-6"
          style={{ color: "#a1a1a1" }}
        >
          Somos un estudio digital que diseña, programa y automatiza. Combinamos código real, diseño con criterio e inteligencia artificial en cada proyecto. El resultado: soluciones a medida que funcionan, se ven increíbles y están listas en días.
        </p>

        <TransitionLink
          to="/contacto"
          className="font-mono inline-flex items-center gap-[6px] text-[11px] font-medium uppercase"
          style={{ letterSpacing: "1.5px", color: "#ffffff" }}
          onClick={() => trackEvent("cta_click", { location: "intro", label: "hagamos_crecer_tus_ideas" })}
        >
          HAGAMOS CRECER TUS IDEAS
          <Molinillo className="h-[12px] w-[12px] ml-1" />
        </TransitionLink>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block py-14 container mx-auto px-6">
        <div className="max-w-6xl">
          <p
            className="mb-4 text-[13px] font-medium uppercase text-[#a1a1a1] font-mono"
            style={{ letterSpacing: "0.13em" }}
          >
            <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>05</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> QUIÉNES SOMOS
          </p>
          <h2
            className="font-bold normal-case text-light mb-5"
            style={{
              fontSize: "clamp(44px, 5vw, 72px)",
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.045em",
            }}
          >
            <AnimatedWords text="Desarrollamos marcas," />
            <br />
            <AnimatedWords text="elevamos su presencia digital" />
            <br />
            <span style={{ color: "#ffffff" } as React.CSSProperties}>
              <AnimatedWords text="y conectamos con inteligencia." />
            </span>
          </h2>
          <p
            className="mb-9 max-w-3xl text-[#a1a1a1]"
            style={{ fontSize: "18px", lineHeight: 1.55 }}
          >
            Somos un estudio digital que diseña, programa y automatiza. Combinamos código real, diseño con criterio e inteligencia artificial en cada proyecto. El resultado: soluciones a medida que funcionan, se ven increíbles y están listas en días.
          </p>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-12"
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
