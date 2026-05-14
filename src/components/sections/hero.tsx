import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { BlinkingCursor } from "@/components/ui/blinking-cursor";

export function Hero() {
  return (
    <section className="bg-dark pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
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
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-medium text-[#ffffffcc] mb-5 tracking-widest font-geist"
          >
            SOMOS MAZZMKT ESTRATEGIA & CREATIVIDAD
          </motion.p>

          <div
            className="font-bold text-[#ffffff] mb-8"
            style={{
              fontSize: "clamp(22px, 8vw, 100px)",
              lineHeight: "1.08",
              fontWeight: 700,
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
              Y RESPONDEN<BlinkingCursor className="text-[#ffffff60]" />
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-6"
          >
            <TransitionLink
              to="/proyectos"
              className="group inline-flex items-center gap-3 text-[#ffffff] text-base font-semibold uppercase tracking-wide font-geist"
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
            <motion.div
              className="hidden md:block h-[1px] bg-[#ffffff30] flex-1 max-w-[200px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
