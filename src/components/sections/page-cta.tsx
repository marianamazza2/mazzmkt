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
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function PageCTA() {
  return (
    <section className="bg-dark py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" style={{ transform: "scaleX(-1)" }}>
        <div
          className="absolute -inset-x-[6%] inset-y-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-home.png')",
            opacity: 0.14,
            animation: "tv-static 0.45s steps(1) infinite",
          }}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <h2
            className="font-bold text-[#ffffff]"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: "1.1",
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
              className="inline-flex items-center gap-3 bg-[#ffffff] text-[#141414] px-10 py-5 text-base font-semibold uppercase tracking-wide hover:bg-[#ffffff] transition-colors font-geist rounded-sm"
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
