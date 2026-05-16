import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { PageCTA } from "@/components/sections/page-cta";
import { CheckCircle2 } from "lucide-react";

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
        title="Acerca de | MAZZMKT"
        description="Somos MazzMkt, una agencia de marketing digital en Barcelona. Creamos experiencias digitales donde la estrategia, la creatividad y la tecnologia se mezclan."
      />

      {/* Hero */}
      <section className="bg-dark pt-24 pb-7 md:pt-32 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero-pattern.png')`, opacity: 0.20 }}
        />
        <div className="container mx-auto px-5 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] md:text-sm font-medium text-[#888780] md:text-[#ffffffcc] mb-2 md:mb-6 tracking-[2.5px] uppercase font-geist"
            >
              SOBRE NOSOTROS
            </motion.p>
            <h1
              className="font-bold text-[#ffffff] mb-2.5 md:mb-0"
              style={{ fontSize: "var(--font-display)", lineHeight: "var(--lh-display)", fontWeight: 700 }}
            >
              HUMANO
              <br />
              <span>Y DIGITAL &raquo;</span>
            </h1>

            {/* Mobile: subtitle */}
            <p className="md:hidden text-[13px] text-[#888780] leading-[1.7] mb-5 mt-2.5">
              Estrategia, creatividad y tecnología para que las marcas brillen con intención.
            </p>

            {/* Mobile: stats */}
            <div className="md:hidden flex gap-4 items-start">
              <div>
                <p className="text-[22px] font-medium tracking-[-0.5px] text-[#D3D1C7] leading-none">10+</p>
                <p className="text-[10px] tracking-[1.5px] text-[#888780] uppercase mt-0.5">PROYECTOS</p>
              </div>
              <div className="w-px self-stretch bg-[#ffffff]/10" />
              <div>
                <p className="text-[22px] font-medium tracking-[-0.5px] text-[#D3D1C7] leading-none">98%</p>
                <p className="text-[10px] tracking-[1.5px] text-[#888780] uppercase mt-0.5">SATISFACCIÓN</p>
              </div>
              <div className="w-px self-stretch bg-[#ffffff]/10" />
              <div>
                <p className="text-[22px] font-medium tracking-[-0.5px] text-[#D3D1C7] leading-none">5+</p>
                <p className="text-[10px] tracking-[1.5px] text-[#888780] uppercase mt-0.5">PAÍSES</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-dark py-7 md:py-24">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] md:text-sm font-medium text-[#5F5E5A] mb-2 md:mb-6 tracking-[2.5px] uppercase">
                CREEMOS EN
              </p>
              <h2 className="text-[20px] md:text-[var(--font-section)] font-medium md:font-bold text-[#ffffff] leading-[1.2] tracking-[0.3px] mb-4 md:mb-0">
                NUESTROS
                <br />
                <span className="text-[#ffffff50]">VALORES</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-0.5 md:gap-6"
            >
              {creencias.map((creencia, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2.5 md:gap-4 py-3.5 px-4 md:p-6 bg-[#F1EFE8]/[0.04] border border-[#ffffff15] hover:border-[#ffffff30] transition-colors rounded-[3px]"
                >
                  <CheckCircle2 className="h-[18px] w-[18px] md:h-6 md:w-6 text-[#5F5E5A] md:text-[#ffffff] flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-[13px] md:text-lg text-[#D3D1C7] leading-[1.5]">{creencia.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="bg-light py-7 md:py-24">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[10px] md:text-sm font-medium text-[#888780] mb-2 md:mb-6 tracking-[2.5px] uppercase font-geist">
              DETRÁS DE MAZZMKT
            </p>
            <h2 className="text-[20px] md:text-[var(--font-section)] font-medium md:font-bold text-[#141414] leading-[1.2] tracking-[0.3px] mb-3 md:mb-8">
              QUIÉNES SOMOS
            </h2>
            <p className="text-[13px] md:text-lg text-[#5F5E5A] leading-[1.7] mb-5 md:mb-8">
              Hemos pasado de RR. HH. al diseño, del código al marketing. En MazzMkt combinamos empatía, creatividad y tecnología para transformar ideas en experiencias que funcionan.
            </p>

            <div className="flex gap-2">
              <a
                href="https://instagram.com/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#14141420] text-[#5F5E5A] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-[3px]"
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-[11px] font-medium uppercase tracking-[0.5px]">INSTAGRAM</span>
              </a>
              <a
                href="https://linkedin.com/company/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#14141420] text-[#5F5E5A] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-[3px]"
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-[11px] font-medium uppercase tracking-[0.5px]">LINKEDIN</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
