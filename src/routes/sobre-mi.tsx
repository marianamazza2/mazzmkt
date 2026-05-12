import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { PageCTA } from "@/components/sections/page-cta";
import {
  Rocket,
  Globe,
  Users,
  Zap,
  Heart,
  Target,
  Sparkles,
  CheckCircle2,
  Headphones,
  PenTool,
  Layers,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/sobre-mi")({
  component: SobreMiPage,
});

const valores = [
  {
    icon: Rocket,
    title: "WEBSITES",
    description: "Que invitan a explorar.",
  },
  {
    icon: Users,
    title: "REDES",
    description: "Que construyen comunidad.",
  },
  {
    icon: Target,
    title: "CAMPANAS",
    description: "Que conectan y convierten.",
  },
  {
    icon: Zap,
    title: "HERRAMIENTAS",
    description: "Que simplifican y potencian.",
  },
];

const creencias = [
  {
    icon: Heart,
    text: "La autenticidad como base de cada marca.",
  },
  {
    icon: Sparkles,
    text: "Simplicidad como la estrategia mas poderosa.",
  },
  {
    icon: Users,
    text: "Cercania para construir juntos y disfrutar el proceso.",
  },
  {
    icon: Target,
    text: "Resultados reales que impulsan el crecimiento de tu marca.",
  },
];

const proceso = [
  {
    number: "01",
    icon: Headphones,
    title: "ESCUCHAMOS",
    description: "Entendemos la esencia de cada proyecto.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "DISEÑAMOS CON INTENCIÓN",
    description: "Cada accion responde a un objetivo claro.",
  },
  {
    number: "03",
    icon: Layers,
    title: "CREAMOS SISTEMAS",
    description: "Soluciones que se escalan y perduran.",
  },
  {
    number: "04",
    icon: Bot,
    title: "INTEGRAMOS INTELIGENCIA",
    description: "IA y automatizacion para que las ideas fluyan.",
  },
];

function SobreMiPage() {
  return (
    <>
      <SEOHead
        title="Acerca de | MAZZMKT"
        description="Somos MazzMkt, una agencia de marketing digital en Barcelona. Creamos experiencias digitales donde la estrategia, la creatividad y la tecnologia se mezclan."
      />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20"
        style={{
          backgroundColor: "#141414",
          color: "#f1ede1",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.09) 1px, #141414 1px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-medium text-[#ffffffcc] mb-6 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#ffffff]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span>SOBRE NOSOTROS</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              HUMANO
              <br />
              <span className="text-[#ffffff50]">Y DIGITAL &raquo;</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-bold text-[#141414] mb-12 uppercase"
              style={{
                fontSize: "48px",
                lineHeight: "1.15",
                fontWeight: 700,
              }}
            >
              SOMOS MAZZMKT,
              <br />
              ESTRATEGIA, CREATIVIDAD Y TECNOLOGIA
              <br />
              <span style={{ color: "#141414" } as React.CSSProperties}>
                PARA QUE LAS MARCAS BRILLEN CON INTENCION.
              </span>
            </motion.h2>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-dark py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)", backgroundSize: "24px 24px", opacity: 0.35 }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3 font-geist">
              <span className="inline-block w-8 h-[1px] bg-[#ffffff]" />
              ACERCA DE MAZZMKT!
            </p>
            <h2
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 7vw, 98px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              MAS QUE UNA
              <br />
              <span className="text-[#ffffff50]">AGENCIA</span> <span className="text-[#ffffff50]">&raquo;</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-[#ffffff20] p-8 md:p-12 hover:border-[#ffffff40] transition-colors"
            >
              <Globe className="h-10 w-10 text-[#ffffff] mb-8" strokeWidth={1.5} />
              <h3
                className="font-bold text-[#ffffff] mb-4 uppercase"
                style={{
                  fontSize: "20px",
                  lineHeight: "1.1",
                  fontWeight: 700,
                }}
              >
                Laboratorio Creativo
              </h3>
              <p className="text-[#ffffffaa] text-lg leading-relaxed">
                Un espacio donde exploramos, probamos, fallamos y volvemos a crear hasta que todo
                encaje. Nos gusta lo que fluye, lo que conecta y lo que deja huella.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[#ffffff20] p-8 md:p-12 hover:border-[#ffffff40] transition-colors"
            >
              <Heart className="h-10 w-10 text-[#ffffff] mb-8" strokeWidth={1.5} />
              <h3
                className="font-bold text-[#ffffff] mb-4 uppercase"
                style={{
                  fontSize: "20px",
                  lineHeight: "1.1",
                  fontWeight: 700,
                }}
              >
                Autenticidad
              </h3>
              <p className="text-[#ffffffaa] text-lg leading-relaxed">
                Trabajamos con personas y marcas que buscan crecer, pero sin perder autenticidad.
                Cada proyecto es unico y merece un enfoque personalizado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="bg-light py-24 md:py-40 border-t border-[#14141410]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-base font-medium text-[#141414aa] mb-6 tracking-widest flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-[#141414]" />
              MANIFIESTO
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <blockquote
              className="font-bold text-[#141414] mb-12"
              style={{
                fontSize: "clamp(24px, 4vw, 56px)",
                lineHeight: "1.2",
                fontWeight: 600,
              }}
            >
              <span className="text-[#141414aa]">&ldquo;</span>
              Somos curios@s, estrategic@s y creativ@s. Nos motiva lo simple, lo que tiene sentido
              y lo que genera impacto. Amamos las ideas que nacen de una charla, un cafe o una
              locura de medianoche.
              <span className="text-[#141414aa]">&rdquo;</span>
            </blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-lg text-[#141414cc] leading-relaxed max-w-3xl"
            >
              <p>
                Creemos en los proyectos con alma, en las marcas que comunican con intencion y en
                el poder de la inteligencia (humana y artificial).
              </p>
              <p>
                <strong className="text-[#141414]">MazzMkt esta donde hay ganas de construir</strong>
                , de crear y de avanzar. Donde una marca encuentra su voz y un equipo la acompana
                a escalar.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nosotrxs Section */}
      <section className="bg-dark py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#ffffff08_0%,transparent_60%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3 font-geist">
                <span className="inline-block w-8 h-[1px] bg-[#ffffff]" />
                NOSOTRXS
              </p>
              <h2
                className="font-bold text-[#ffffff] mb-8"
                style={{
                  fontSize: "clamp(40px, 7vw, 98px)",
                  lineHeight: "1.08",
                  fontWeight: 700,
                }}
              >
                EL EQUIPO
                <br />
                <span className="text-[#ffffff50]">DETRAS</span>
              </h2>
              <p className="text-[#ffffffcc] leading-relaxed mb-8" style={{ fontSize: "18px" }}>
                Hemos pasado de RR. HH. al diseno, del codigo al marketing. En MazzMkt combinamos
                empatia, creatividad y tecnologia para transformar ideas en experiencias que
                funcionan.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/mazzmkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[#ffffff30] flex items-center justify-center text-[#ffffff] hover:bg-[#ffffff] hover:text-[#141414] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/mazzmkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[#ffffff30] flex items-center justify-center text-[#ffffff] hover:bg-[#ffffff] hover:text-[#141414] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-[#ffffff10] border border-[#ffffff20] flex items-center justify-center">
                <div className="text-center p-8">
                  <p
                    className="font-bold text-[#ffffff] uppercase"
                    style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
                  >
                    Bienvenidx al sitio
                    <br />
                    donde las ideas
                    <br />
                    <span className="text-[#ffffff50]">se convierten en</span>
                    <br />
                    experiencias.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lo que nos mueve Section */}
      <section className="bg-light py-24 md:py-32 border-t border-[#14141410]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-base font-medium text-[#141414aa] mb-6 tracking-widest flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-[#141414]" />
              LO QUE NOS MUEVE
            </p>
            <h2
              className="font-bold text-[#141414]"
              style={{
                fontSize: "clamp(40px, 7vw, 98px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              IMPULSAR MARCAS
              <br />
              <span className="text-[#141414aa]">PARA CRECER</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="border border-[#14141420] p-8 h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300">
                  <valor.icon
                    className="h-8 w-8 text-[#141414] group-hover:text-[#ffffff] mb-6 transition-colors"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-lg font-bold text-[#141414] group-hover:text-[#ffffff] mb-2 transition-colors">
                    {valor.title}
                  </h3>
                  <p className="text-[#141414aa] group-hover:text-[#ffffffaa] transition-colors" style={{ fontSize: "18px" }}>
                    {valor.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creemos en Section */}
      <section className="bg-dark py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest">
                CREEMOS EN
              </p>
              <h2
                className="font-bold text-[#ffffff]"
                style={{
                  fontSize: "clamp(40px, 7vw, 98px)",
                  lineHeight: "1.08",
                  fontWeight: 700,
                }}
              >
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
              className="space-y-6"
            >
              {creencias.map((creencia, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-4 p-6 border border-[#ffffff15] hover:border-[#ffffff30] transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6 text-[#ffffff] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-lg text-[#ffffffcc]">{creencia.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como trabajamos Section */}
      <section className="bg-light py-24 md:py-32 border-t border-[#14141410]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-base font-medium text-[#141414aa] mb-6 tracking-widest flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-[#141414]" />
              COMO TRABAJAMOS
            </p>
            <h2
              className="font-bold text-[#141414]"
              style={{
                fontSize: "clamp(40px, 7vw, 98px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              NUESTRO
              <br />
              <span className="text-[#141414aa]">PROCESO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proceso.map((paso, index) => (
              <motion.div
                key={paso.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="border border-[#14141420] p-8 h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300">
                  <span className="text-6xl font-bold text-[#14141410] group-hover:text-[#ffffff10] absolute top-4 right-4 transition-colors">
                    {paso.number}
                  </span>
                  <paso.icon
                    className="h-8 w-8 text-[#141414] group-hover:text-[#ffffff] mb-6 transition-colors relative z-10"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-lg font-bold text-[#141414] group-hover:text-[#ffffff] mb-3 transition-colors relative z-10">
                    {paso.title}
                  </h3>
                  <p className="text-[#141414aa] group-hover:text-[#ffffffaa] transition-colors relative z-10" style={{ fontSize: "18px" }}>
                    {paso.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
