import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="bg-dark pt-[100px] pb-7 md:pt-32 md:pb-16 relative overflow-hidden">
      <div
        className="hidden md:block absolute -inset-x-[2%] inset-y-0 bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-home.png')`,
          backgroundPosition: "center center",
          backgroundSize: "100% auto",
          opacity: 0.25,
          animation: "tv-static 0.45s steps(1) infinite",
        }}
      />
      <div className="container mx-auto px-5 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile: tag pequeño */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:hidden text-[11px] font-medium uppercase mb-[14px]"
            style={{ letterSpacing: "2.5px", color: "#888780" }}
          >
            ESTRATEGIA & CREATIVIDAD
          </motion.p>

          {/* Desktop: subtítulo original */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block text-[15px] font-medium text-[#ffffffe0] mb-5 uppercase font-geist"
            style={{ letterSpacing: "0.14em" }}
          >
            SOMOS MAZZMKT ESTRATEGIA & CREATIVIDAD
          </motion.p>

          <div
            className="font-bold text-[#ffffff] mb-5 md:mb-9"
            style={{
              fontSize: "var(--font-display)",
              lineHeight: "var(--lh-display)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold text-[#ffffff]"
              style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
            >
              CREAMOS MARCAS
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold text-[#ffffff]"
              style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
            >
              QUE SE ENTIENDEN,
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bold"
              style={{
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              }}
            >
              SE SIENTEN
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bold"
              style={{
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              }}
            >
              Y RESPONDEN
            </motion.h1>
          </div>

          {/* Mobile: párrafo subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:hidden text-[13px] leading-[1.6] mb-6"
            style={{ color: "#888780" }}
          >
            Marketing digital, diseño y desarrollo web para marcas que quieren crecer con inteligencia.
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
              className="inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
              style={{ padding: "11px 20px", letterSpacing: "1.5px", background: "#f1ede1", color: "#141414" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "ver_proyectos" })}
            >
              VER PROYECTOS
            </TransitionLink>
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
              style={{
                padding: "11px 20px",
                letterSpacing: "1.5px",
                background: "transparent",
                border: "0.5px solid rgba(241,239,232,0.15)",
                color: "#B4B2A9",
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
              className="inline-flex items-center justify-center rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
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
              className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
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
