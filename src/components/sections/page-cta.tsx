import { useRef } from "react";
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
          initial={{ y: 80, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
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
    <section className="bg-dark py-14 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        {/* Molinillo grande ("te mira") junto al titular: encima en móvil, al lado en escritorio */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 text-center md:text-left">
          <MolinilloQueMira className="block shrink-0 h-[96px] w-[96px] md:h-[150px] md:w-[150px] lg:h-[190px] lg:w-[190px] text-light" />
          <div>
            <h2
              className="font-bold normal-case text-[#ffffff]"
              style={{
                fontSize: "var(--font-cta)",
                fontFamily: "var(--font-heading)",
                lineHeight: "var(--lh-cta)",
                letterSpacing: "-0.045em",
              }}
            >
              <div className="overflow-hidden">
                <AnimatedText text="Hagamos crecer" delay={0} />
              </div>
              <div className="overflow-hidden mb-7 md:mb-10">
                <AnimatedText text="tus ideas" delay={0.4} />
              </div>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("cta_click", { location: "page_cta", label: "comenzar" })}
              >
                COMENZAR
              </TransitionLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
