import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { BlinkingCursor } from "@/components/ui/blinking-cursor";

function AnimatedText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={undefined}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export function PageCTA() {
  return (
    <section className="bg-dark py-7 md:py-20 relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 overflow-hidden" style={{ transform: "scaleX(-1)" }}>
        <div
          className="absolute -inset-x-[6%] inset-y-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-home.png')",
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
              color: "#f1ede1",
              lineHeight: "1.2",
              marginBottom: "6px",
            }}
          >
            ¿TENÉS UN PROYECTO?
          </h2>
          <p style={{ fontSize: "12px", color: "#5F5E5A", marginBottom: "16px" }}>
            Hablemos y hagamos algo increíble
          </p>
          <TransitionLink
            to="/contacto"
            className="inline-flex items-center gap-1.5 rounded-sm"
            style={{
              padding: "12px 28px",
              background: "#f1ede1",
              color: "#141414",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              minHeight: "unset",
            }}
          >
            COMENZAR PROYECTO →
          </TransitionLink>
        </div>

        {/* Desktop: original animated CTA */}
        <div className="hidden md:block text-center">
          <h2
            className="font-bold text-[#ffffff]"
            style={{
              fontSize: "var(--font-cta)",
              lineHeight: "var(--lh-cta)",
              letterSpacing: "-0.035em",
            }}
          >
            <div className="overflow-hidden">
              <AnimatedText text="HAGAMOS CRECER" delay={0} />
            </div>
            <div className="overflow-hidden mb-10">
              <AnimatedText text="TUS IDEAS" delay={0.4} /><BlinkingCursor className="text-[#ffffff60]" />
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
              className="inline-flex items-center justify-center gap-3 bg-[#ffffff] text-[#141414] px-10 py-5 text-sm font-semibold uppercase hover:bg-[#ffffff] hover:opacity-85 transition-opacity font-geist rounded-sm"
              style={{ letterSpacing: "0.09em" }}
            >
              COMENZAR PROYECTO
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
