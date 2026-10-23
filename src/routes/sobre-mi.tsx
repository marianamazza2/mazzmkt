import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Molinillo } from "@/components/brand/molinillo";

export const Route = createFileRoute("/sobre-mi")({
  component: SobreMiPage,
});

const creencias = [
  { text: "La autenticidad como base de cada marca." },
  { text: "Simplicidad como la estrategia mas poderosa." },
  { text: "Cercania para construir juntos y disfrutar el proceso." },
  { text: "Resultados reales que impulsan el crecimiento de tu marca." },
];

function SobreMiPage() {
  return (
    <>
      <SEOHead
        title="Sobre nosotros | MAZZMKT"
        description="Somos MAZZMKT, un estudio digital en Barcelona. Diseñamos, programamos y automatizamos tu negocio digital con código real e inteligencia artificial."
      />

      <PageHero
        heading="crumbs"
        crumbs={[{ label: "Quiénes somos" }]}
        title={<>Humano<br />y digital</>}
        subtitle="Estrategia, creatividad y tecnología para que las marcas brillen con intención."
      />

      {/* Valores */}
      <section className="bg-dark py-7 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[10px] uppercase mb-1 md:text-[13px] md:mb-5 md:font-medium font-mono"
                style={{ letterSpacing: "0.13em", color: "#b3b3b3" }}
              >
                CREEMOS EN
              </p>
              <h2 className="text-section-title font-bold leading-[1] tracking-[-0.04em] text-[#ffffff] normal-case font-heading md:font-bold md:leading-[0.92] md:tracking-[-0.045em]">
                Nuestros
                <br />
                valores
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3 md:gap-5"
            >
              {creencias.map((creencia, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2.5 md:gap-4 py-3.5 px-4 md:p-6 border border-light/30 hover:border-light transition-colors rounded-sm"
                >
                  <CheckCircle2 className="h-[18px] w-[18px] md:h-6 md:w-6 text-[#b3b3b3] md:text-light flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-body text-light/67">{creencia.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section id="quienes-somos" className="bg-dark py-7 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] uppercase mb-1 md:text-[13px] md:mb-5 md:font-medium font-mono"
              style={{ letterSpacing: "0.13em", color: "#b3b3b3" }}
            >
              DETRÁS DE MAZZMKT
            </p>
            <h2 className="text-section-title font-bold leading-[1] tracking-[-0.04em] text-light normal-case font-heading md:font-bold md:leading-[0.92] md:tracking-[-0.045em] mb-3 md:mb-8">
              Nuestra historia
            </h2>
            <p className="text-body text-[#a1a1a1] mb-4 md:mb-6">
              MazzMkt nació de una combinación poco usual: recursos humanos, código, diseño y marketing. Venimos de entender a las personas antes que a los píxeles, y eso lo cambió todo. Aprendimos que el marketing que realmente funciona, escucha, entiende y conecta.
            </p>
            <p className="text-body text-[#a1a1a1] mb-5 md:mb-8">
              Hoy somos una agencia pequeña con propósito grande. Trabajamos con marcas que quieren más que visibilidad: quieren crecer, diferenciarse y ser recordadas. Combinamos estrategia, creatividad e inteligencia artificial para construir identidades que se ven bien, se sienten bien y convierten. Sin fórmulas copiadas, sin promesas vacías.
              <Molinillo className="ml-2 h-[0.7em] w-[0.7em] align-baseline" />
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>INSTAGRAM</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/company/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LINKEDIN</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
