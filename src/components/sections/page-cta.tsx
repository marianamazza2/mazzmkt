import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";

function AnimatedText({
  text,
  delay = 0,
  hollow = false,
}: {
  text: string;
  delay?: number;
  hollow?: boolean;
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
    <section className="bg-dark py-24 md:py-32">
      <div className="container mx-auto px-6">
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
              <AnimatedText text="TUS IDEAS" delay={0.4} hollow />
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
              EMPEZAR PROYECTO
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
