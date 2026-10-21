import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

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
    <section className="bg-dark pt-8 pb-7 md:py-20 relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 overflow-hidden" style={{ transform: "scaleX(-1)" }}>
        <div
          className="absolute -inset-x-[6%] inset-y-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-home.webp')",
            opacity: 0.14,
            animation: "tv-static 0.45s steps(1) infinite",
          }}
        />
      </div>
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        {/* Mobile: compact static CTA */}
        <div className="md:hidden text-center">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#ffffff",
              lineHeight: "1.2",
              marginBottom: "6px",
            }}
          >
            ¿TIENES UN PROYECTO?
          </h2>
          <p style={{ fontSize: "12px", color: "#5e5e5e", marginBottom: "16px" }}>
            Hablemos y hagamos algo increíble
          </p>
          <TransitionLink
            to="/contacto"
            className="font-mono inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
            style={{ padding: "11px 20px", letterSpacing: "1.5px", background: "transparent", border: "0.5px solid rgba(255, 255, 255, 0.3)", color: "#ffffff" }}
            onClick={() => trackEvent("cta_click", { location: "page_cta", label: "comenzar" })}
          >
            COMENZAR
          </TransitionLink>
        </div>

        {/* Desktop: original animated CTA */}
        <div className="hidden md:block text-center">
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
            <div className="overflow-hidden mb-10">
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
    </section>
  );
}
