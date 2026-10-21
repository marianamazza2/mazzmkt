import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="bg-dark pt-[100px] pb-7 md:pt-32 md:pb-16 md:min-h-[calc(100svh-58px)] md:flex md:items-end relative overflow-hidden">
      <div
        className="absolute -inset-x-[2%] inset-y-0 bg-no-repeat opacity-50 md:opacity-85"
        style={{
          backgroundImage: `url('/images/hero-home.webp')`,
          backgroundPosition: "right center",
          backgroundSize: "cover",
          animation: "tv-static 0.45s steps(1) infinite",
        }}
      />
      {/* Degradados: titular legible a la izquierda y transición suave hacia el marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent md:via-dark/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent" />
      <div className="container mx-auto px-5 md:px-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile: h1 semántico */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono md:hidden text-[11px] font-medium uppercase mb-[14px]"
            style={{ letterSpacing: "2.5px", color: "#878787" }}
          >
            MAZZMKT — Digital Studio · Barcelona
          </motion.h1>

          {/* Desktop: h1 semántico */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block text-[13px] font-medium text-[#ffffffe0] mb-5 uppercase font-mono"
            style={{ letterSpacing: "0.14em" }}
          >
            MAZZMKT — Digital Studio · Barcelona
          </motion.h1>

          <h2
            className="font-bold normal-case text-[#ffffff] mb-5 md:mb-9"
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

          {/* Mobile: párrafo subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:hidden text-[14px] leading-[1.6] mb-6"
            style={{ color: "#878787" }}
          >
            Webs, marcas y automatización con código real e inteligencia artificial. Proyectos a medida, listos en días.
          </motion.p>

          {/* Mobile: dos CTAs en fila */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden flex gap-[10px]"
          >
            <TransitionLink
              to="/proyectos"
              className="font-mono inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
              style={{ padding: "11px 20px", letterSpacing: "1.5px", background: "transparent", border: "0.5px solid rgba(255, 255, 255, 0.3)", color: "#ffffff" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "ver_proyectos" })}
            >
              VER PROYECTOS
            </TransitionLink>
            <TransitionLink
              to="/contacto"
              className="font-mono inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
              style={{
                padding: "11px 20px",
                letterSpacing: "1.5px",
                background: "transparent",
                border: "0.5px solid rgba(255, 255, 255,0.15)",
                color: "#b3b3b3",
              }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "contactar" })}
            >
              CONTACTAR
            </TransitionLink>
          </motion.div>

          {/* Desktop: CTA original */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            <TransitionLink
              to="/proyectos"
              className="inline-flex items-center justify-center rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "ver_proyectos" })}
            >
              VER PROYECTOS
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </TransitionLink>
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "contactar" })}
            >
              CONTACTAR
            </TransitionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
