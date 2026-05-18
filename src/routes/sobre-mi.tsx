import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { TransitionLink } from "@/components/transition/transition-link";
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
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:hidden text-[11px] font-medium uppercase mb-[14px]"
              style={{ letterSpacing: "2.5px", color: "#888780" }}
            >
              MAZZMKT / SOBRE MI
            </motion.p>

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
                HUMANO
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-bold text-[#ffffff]"
                style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
              >
                Y DIGITAL
              </motion.h1>
            </div>

            {/* Mobile: subtitle */}
            <p className="md:hidden text-[13px] text-[#888780] leading-[1.6] mb-6">
              Estrategia, creatividad y tecnología para que las marcas brillen con intención.
            </p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block max-w-xl text-[18px] text-[#f1ede1aa] mb-9"
            >
              Estrategia, creatividad y tecnología para que las marcas brillen con intención.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="md:hidden flex gap-[10px] mb-6"
            >
              <a
                href="#quienes-somos"
                className="inline-flex items-center justify-center rounded-sm text-[11px] font-medium uppercase"
                style={{ padding: "11px 20px", letterSpacing: "1.5px", background: "#f1ede1", color: "#141414" }}
              >
                CONÓCENOS
              </a>
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
              >
                CONTACTAR
              </TransitionLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:flex items-center gap-3"
            >
              <a
                href="#quienes-somos"
                className="inline-flex items-center justify-center rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                CONÓCENOS
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

            {/* Mobile: stats */}
            <div className="flex items-start gap-12 mt-12 max-md:gap-4 max-md:mt-0">
              <div>
                <p className="font-bold text-[#ffffff] text-[22px] md:text-5xl" style={{ letterSpacing: "-0.5px" }}>10+</p>
                <p className="uppercase text-[#f1ede1aa] mt-1 font-geist text-[10px] md:text-xs md:tracking-widest" style={{ letterSpacing: "1.5px" }}>Proyectos</p>
              </div>
              <div className="md:hidden self-stretch w-px bg-[#f1ede1]/10" />
              <div>
                <p className="font-bold text-[#ffffff] text-[22px] md:text-5xl" style={{ letterSpacing: "-0.5px" }}>98%</p>
                <p className="uppercase text-[#f1ede1aa] mt-1 font-geist text-[10px] md:text-xs md:tracking-widest" style={{ letterSpacing: "1.5px" }}>Satisfacción</p>
              </div>
              <div className="md:hidden self-stretch w-px bg-[#f1ede1]/10" />
              <div>
                <p className="font-bold text-[#ffffff] text-[22px] md:text-5xl" style={{ letterSpacing: "-0.5px" }}>5+</p>
                <p className="uppercase text-[#f1ede1aa] mt-1 font-geist text-[10px] md:text-xs md:tracking-widest" style={{ letterSpacing: "1.5px" }}>Países</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                className="text-[10px] uppercase mb-1 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
                style={{ letterSpacing: "0.13em", color: "#B4B2A9" }}
              >
                CREEMOS EN
              </p>
              <h2 className="text-[20px] font-medium leading-[1.1] text-[#ffffff] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]">
                NUESTROS
                <br />
                VALORES <span className="hidden md:inline">&raquo;</span>
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
                  className="flex items-center gap-2.5 md:gap-4 py-3.5 px-4 md:p-6 border border-[#f1ede14d] hover:border-[#f1ede1] transition-colors rounded-sm"
                >
                  <CheckCircle2 className="h-[18px] w-[18px] md:h-6 md:w-6 text-[#B4B2A9] md:text-[#f1ede1] flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-[13px] md:text-lg text-[#f1ede1aa] leading-[1.5]">{creencia.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section id="quienes-somos" className="bg-light py-7 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] uppercase mb-1 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#B4B2A9" }}
            >
              DETRÁS DE MAZZMKT
            </p>
            <h2 className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em] mb-3 md:mb-8">
              NUESTRA HISTORIA <span className="hidden md:inline">&raquo;</span>
            </h2>
            <p className="text-[13px] md:text-lg text-[#5F5E5A] leading-[1.7] mb-4 md:mb-6">
              MazzMkt nació de una combinación poco usual: recursos humanos, código y diseño. Venimos de entender a las personas antes que a los píxeles, y eso lo cambió todo. Aprendimos que el marketing que realmente funciona, escucha, entiende y conecta.
            </p>
            <p className="text-[13px] md:text-lg text-[#5F5E5A] leading-[1.7] mb-5 md:mb-8">
              Hoy somos una agencia pequeña con propósito grande. Trabajamos con marcas que quieren más que visibilidad: quieren crecer, diferenciarse y ser recordadas. Combinamos estrategia, creatividad e inteligencia artificial para construir identidades que se ven bien, se sienten bien y convierten. Sin fórmulas copiadas, sin promesas vacías.
            </p>

            <div className="flex flex-wrap gap-[10px] md:gap-3">
              <a
                href="https://instagram.com/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#14141426] px-5 py-[11px] text-[11px] md:px-8 md:py-[15px] md:text-sm font-semibold uppercase text-[#141414] transition-colors hover:bg-[#141414] hover:text-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>INSTAGRAM</span>
              </a>
              <a
                href="https://linkedin.com/company/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#14141426] px-5 py-[11px] text-[11px] md:px-8 md:py-[15px] md:text-sm font-semibold uppercase text-[#141414] transition-colors hover:bg-[#141414] hover:text-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LINKEDIN</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
