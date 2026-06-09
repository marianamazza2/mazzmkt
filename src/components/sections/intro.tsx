import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

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
  const { t } = useTranslation();
  return (
    <section className="bg-light relative">
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-8 pb-7">
        <p
          className="text-[10px] uppercase mb-2"
          style={{ letterSpacing: "2.5px", color: "#888780" }}
        >
          {t("intro.label")}
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
          {t("intro.headline_mobile")}
        </h2>
        <p
          className="text-[13px] leading-[1.7] mb-5"
          style={{ color: "#5F5E5A" }}
        >
          {t("intro.body_mobile")}
        </p>
        <TransitionLink
          to="/contacto"
          className="inline-flex items-center gap-[6px] text-[11px] font-medium uppercase"
          style={{ letterSpacing: "1.5px", color: "#141414" }}
          onClick={() => trackEvent("cta_click", { location: "intro", label: "hagamos_crecer_tus_ideas" })}
        >
          {t("intro.cta")} →
        </TransitionLink>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block py-16 container mx-auto px-6">
        <div className="max-w-6xl">
          <p
            className="mb-5 text-[15px] font-medium uppercase text-[#5f5e5a] font-geist"
            style={{ letterSpacing: "0.13em" }}
          >
            {t("intro.label")}
          </p>
          <h2
            className="font-bold text-[#141414] mb-6"
            style={{
              fontSize: "clamp(52px, 5vw, 64px)",
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            <AnimatedWords text={t("intro.headline_1")} />
            <br />
            <AnimatedWords text={t("intro.headline_2")} />
            <br />
            <span style={{ color: "#141414" } as React.CSSProperties}>
              <AnimatedWords text={t("intro.headline_3")} />
            </span>
          </h2>
          <p
            className="mb-8 max-w-3xl text-[#5F5E5A]"
            style={{ fontSize: "21px", lineHeight: 1.55 }}
          >
            {t("intro.body")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12"
          >
            <TransitionLink
              to="/contacto"
              className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#141414] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-opacity hover:opacity-85 font-geist"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "intro", label: "hagamos_crecer_tus_ideas" })}
            >
              {t("intro.cta")}
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
