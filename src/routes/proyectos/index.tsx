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
      <section
        className="pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden relative"
        style={{
          backgroundColor: "#141414",
          color: "#f1ede1",
        }}
      >
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-pattern.png')`,
            opacity: 0.20,
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl">
            {/* Breadcrumb */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-medium text-[#f1ede1cc] mb-8 tracking-widest flex items-center gap-3"
              style={{ fontFamily: "var(--font-geist)" }}
            >
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
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
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
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                color: "#ffffff",
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
              Diseño, tecnología de vanguardia y resultados.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-12 mt-12"
            >
              <div>
                <p className="text-3xl md:text-5xl font-bold text-[#ffffff]">
                  {projects.length}+
                </p>
                <p className="text-xs uppercase tracking-widest text-[#f1ede1aa] mt-1 font-geist">
                  Proyectos
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-5xl font-bold text-[#ffffff]">
                  98%
                </p>
                <p className="text-xs uppercase tracking-widest text-[#f1ede1aa] mt-1 font-geist">
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
      <section className="bg-light py-14 md:py-24">
        <div className="container mx-auto px-6">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
