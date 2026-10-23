import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { Molinillo } from "@/components/brand/molinillo";
import { HeroGlow } from "@/components/sections/hero-glow";

export function Hero() {
  return (
    <section className="bg-dark pt-[100px] pb-7 md:pt-32 md:pb-16 md:min-h-[calc(100svh-58px)] md:flex md:items-end relative overflow-hidden">
      {/* Sin imagen: un destello que sigue al cursor */}
      <HeroGlow />
      <div className="container mx-auto px-5 md:px-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono flex items-center gap-3 text-[11px] md:text-[13px] font-medium uppercase text-[#a1a1a1] mb-[14px] md:mb-5"
            style={{ letterSpacing: "0.13em" }}
          >
            <Molinillo className="h-[0.95em] w-[0.95em] opacity-50" alasClassName="molinillo-intro" />
            MAZZMKT — Digital Studio · Barcelona
          </motion.h1>

          <h2
            className="font-bold normal-case text-[#ffffff] mb-5 md:mb-6"
            style={{
              fontSize: "var(--font-display)",
              fontFamily: "var(--font-heading)",
              lineHeight: "var(--lh-display)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold text-[#ffffff]"
              style={{ display: "block", fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
            >
              Diseñamos,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold text-[#ffffff]"
              style={{ display: "block", fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
            >
              programamos y
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bold"
              style={{
                display: "block",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              }}
            >
              automatizamos
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bold"
              style={{
                display: "block",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              }}
            >
              tu negocio digital
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-body text-light/67 max-w-xl mb-6 md:mb-9"
          >
            Webs, marcas y automatización con código real e inteligencia artificial. Proyectos a medida, listos en días.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <TransitionLink
              to="/proyectos"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "ver_proyectos" })}
            >
              VER PROYECTOS
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "contactar" })}
            >
              CONTACTAR
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
