import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { PageCTA } from "@/components/sections/page-cta";
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
      <section className="bg-dark pt-32 pb-20 overflow-hidden relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#f1ede1 1px, transparent 1px), linear-gradient(90deg, #f1ede1 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 border border-[#f1ede110] rotate-45"
          animate={{
            rotate: [45, 50, 45],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-20 h-20 bg-[#f1ede105]"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl">
            {/* Breadcrumb */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-medium text-[#f1ede1cc] mb-8 tracking-widest flex items-center gap-3"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#f1ede1]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>PROYECTOS</span>
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.08",
                fontWeight: 700,
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
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.08",
                fontWeight: 700,
                WebkitTextStroke: "1px #ffffff",
                WebkitTextFillColor: "transparent",
              }}
            >
              TRABAJO
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#f1ede1aa] mt-8 max-w-xl"
              style={{ fontSize: "18px" }}
            >
              Cada proyecto es una historia de transformación digital.
              Resultados medibles, diseño impecable, tecnología de vanguardia.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-12 mt-12"
            >
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#ffffff]">
                  {projects.length}+
                </p>
                <p className="text-xs uppercase tracking-widest text-[#f1ede1aa] mt-1">
                  Proyectos
                </p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#ffffff]">
                  98%
                </p>
                <p className="text-xs uppercase tracking-widest text-[#f1ede1aa] mt-1">
                  Satisfacción
                </p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#ffffff]">
                  3.5x
                </p>
                <p className="text-xs uppercase tracking-widest text-[#f1ede1aa] mt-1">
                  ROI Promedio
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
            <span className="text-[10px] uppercase tracking-widest text-[#f1ede1aa] rotate-90 origin-center translate-y-8">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-light py-20 md:py-32">
        <div className="container mx-auto px-6">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
