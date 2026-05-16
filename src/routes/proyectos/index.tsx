import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { TransitionLink } from "@/components/transition/transition-link";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/proyectos/")({
  component: ProyectosPage,
});

function ProyectosPage() {
  return (
    <>
      <SEOHead
        title="Proyectos | MAZZMKT"
        description="Descubre nuestros proyectos de marketing digital, branding y desarrollo web. Casos de éxito y resultados medibles."
      />

      {/* Hero Section */}
      <section
        className="pt-24 pb-5 md:pt-32 md:pb-16 overflow-hidden relative"
        style={{
          backgroundColor: "#141414",
          color: "#f1ede1",
        }}
      >
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
        <div className="container mx-auto px-6 max-md:px-5 relative">
          <div className="max-w-5xl">
            {/* Breadcrumb */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-medium flex items-center gap-3 mb-8 max-md:mb-1.5 md:mb-5 md:text-[15px] md:uppercase md:text-[#ffffffe0] md:font-geist"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {/* Mobile breadcrumb */}
              <span
                className="md:hidden"
                style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#5F5E5A", textTransform: "uppercase" }}
              >
                MAZZMKT / PROYECTOS
              </span>
              {/* Desktop breadcrumb */}
              <span className="hidden md:contents" style={{ letterSpacing: "0.14em" }}>
                <span className="opacity-50">MAZZMKT</span>
                <span className="opacity-30">/</span>
                <span>PROYECTOS</span>
              </span>
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              NUESTRO
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.035em",
              }}
            >
              TRABAJO
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl mt-8 max-md:mt-2"
              style={{ color: "#f1ede1aa" }}
            >
              {/* Mobile: short text */}
              <span
                className="md:hidden"
                style={{ fontSize: "12px", lineHeight: "1.6", color: "#888780" }}
              >
                Cada proyecto es una historia de transformación digital.
              </span>
              {/* Desktop: full text */}
              <span className="hidden md:inline" style={{ fontSize: "18px" }}>
                Cada proyecto es una historia de transformación digital.
                Diseño, tecnología de vanguardia y resultados.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden md:flex items-center gap-3 mt-9"
            >
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                VER PROYECTOS
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                CONTACTAR
              </TransitionLink>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-12 mt-12 max-md:gap-4 max-md:mt-4"
            >
              <div>
                <p
                  className="font-bold text-[#ffffff] text-[22px] md:text-5xl"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  {projects.length}+
                </p>
                <p
                  className="uppercase text-[#f1ede1aa] mt-1 font-geist text-[10px] md:text-xs md:tracking-widest"
                  style={{ letterSpacing: "1.5px" }}
                >
                  Proyectos
                </p>
              </div>
              {/* Mobile divider */}
              <div
                className="md:hidden self-stretch"
                style={{ width: "0.5px", background: "rgba(241, 239, 232, 0.08)" }}
              />
              <div>
                <p
                  className="font-bold text-[#ffffff] text-[22px] md:text-5xl"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  98%
                </p>
                <p
                  className="uppercase text-[#f1ede1aa] mt-1 font-geist text-[10px] md:text-xs md:tracking-widest"
                  style={{ letterSpacing: "1.5px" }}
                >
                  Satisfacción
                </p>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-0 right-6 hidden md:flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-[1px] h-16 bg-gradient-to-b from-[#f1ede1] to-transparent"
            />
            <span className="text-[10px] uppercase tracking-widest text-[#f1ede1aa] rotate-90 origin-center translate-y-8 font-geist">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="bg-dark pt-4 pb-7 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

    </>
  );
}
