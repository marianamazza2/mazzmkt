import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { MolinilloQueMira } from "@/components/brand/molinillo-que-mira";

function AnimatedText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          // Empieza por debajo de la máscara (más alta ahora por el margen de los trazos)
          initial={{ y: "130%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "130%", opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export function PageCTA() {
  return (
    <section className="relative overflow-hidden bg-dark py-6 md:py-20">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-0">
          {/* En móvil, icono y titular quedan centrados como una sola unidad. */}
          <div className="flex items-center gap-2.5 md:contents">
            <MolinilloQueMira className="hidden h-[36px] w-[36px] shrink-0 text-light md:mr-12 md:block md:h-[150px] md:w-[150px] lg:mr-16 lg:h-[190px] lg:w-[190px]" />
            <div className="min-w-0 text-center md:text-left">
              <h2 className="sr-only">Hagamos crecer tus ideas</h2>
              <div
                aria-hidden
                className="font-bold normal-case text-[#ffffff]"
                style={{
                  fontSize: "var(--font-cta)",
                  fontFamily: "var(--font-heading)",
                  lineHeight: "var(--lh-cta)",
                  letterSpacing: "-0.045em",
                }}
              >
                <div className="overflow-hidden pb-[0.16em] -mb-[0.16em] pr-[0.08em] -mr-[0.08em]">
                  <AnimatedText text="Hagamos crecer" delay={0} />
                </div>
              </div>
              <div
                aria-hidden
                className="overflow-hidden pb-[0.16em] -mb-[0.16em] pr-[0.08em] -mr-[0.08em] font-bold normal-case text-[#ffffff]"
                style={{
                  fontSize: "var(--font-cta)",
                  fontFamily: "var(--font-heading)",
                  lineHeight: "var(--lh-cta)",
                  letterSpacing: "-0.045em",
                }}
              >
                <AnimatedText text="tus ideas" delay={0.4} />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="shrink-0 md:ml-8 md:translate-y-[calc(var(--font-cta)*0.09)] lg:ml-10"
          >
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono md:px-8"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "page_cta", label: "comenzar" })}
            >
              COMENZAR
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
