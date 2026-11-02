import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Molinillo } from "@/components/brand/molinillo";

export const Route = createFileRoute("/sobre-mi")({
  component: SobreMiPage,
});

// Los cuatro valores, cada uno con cómo se nota en la práctica
const valores = [
  {
    title: "Claridad",
    text: "Siempre sabes en qué estamos trabajando y por qué. Sin tecnicismos, y si se nos escapa uno, te lo explicamos.",
  },
  {
    title: "Cercanía",
    text: "Te escuchamos de verdad y hablamos como personas, no como una agencia.",
  },
  {
    title: "Autenticidad",
    text: "Nada de plantillas ni fórmulas copiadas: tu marca se parece a ti, no a la de al lado.",
  },
  {
    title: "Calidad que se ve",
    text: "No te la prometemos, te la enseñamos en cada entrega.",
  },
];

// Cómo trabajamos: el orden de trabajo, con los límites claros desde el principio
const pasos = [
  { title: "Escuchamos", text: "Una reunión para entender tu negocio, lo que quieres y a quién le vendes." },
  { title: "Creamos", text: "Marca y web a medida, con fechas claras y rondas de cambios pactadas desde el principio." },
  { title: "Automatizamos", text: "Ponemos tu negocio a funcionar solo: citas, respuestas, procesos." },
  { title: "Te acompañamos", text: "Después de entregar seguimos ahí, con mantenimiento si lo necesitas." },
];

// La persona detrás. Foto en public/images; mientras "photo" esté vacío se muestra un hueco reservado.
const fundadora = {
  name: "Hola, soy Mariana",
  role: "Fundadora · Diseño, código y automatización",
  photo:"/images/IMG_7931.webp",
  bio: "Vengo de recursos humanos, me enamoré del diseño y acabé programando. Creé mazzmkt para hacer las cosas como me hubiera gustado que me las hicieran a mí: con alguien que escucha, que explica y que se ocupa de todo, de la marca al código.",
  equipo:
    "Cuando un proyecto lo necesita, se suman manos, especialistas de confianza (fotografía, copy, desarrollo, diseño, publicidad etc) que trabajan con el mismo método. En equipo, siempre es mejor.",
};

// Fila de columnas separadas por una línea arriba (número en mono, titular y texto),
// la misma pieza que los pasos del proceso en /agentes-ia y "Lo que hacemos" en la home
function Columnas({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border-t border-light/13 pt-5 md:pt-6"
        >
          <span className="font-mono text-[13px] text-light/50">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="normal-case mt-6 md:mt-10 mb-3 text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light">
            {item.title}
          </h3>
          <p className="text-body text-[#a1a1a1] max-w-[340px]">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

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
        subtitle="Creamos tu marca, la llevamos a lo digital y la ponemos a funcionar sola. Todo en uno, y tú tranquila."
      />

      {/* 01 · Valores */}
      <section className="bg-dark pt-10 pb-10 md:pt-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number="01" label="Creemos en" title="Valores" />
          <Columnas items={valores} />
        </div>
      </section>

      {/* 02 · Historia */}
      <section id="quienes-somos" className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number="02" label="Detrás de MAZZMKT" title="Historia" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-body text-[#a1a1a1] mb-4 md:mb-6">
              MAZZMKT nació de las ganas de tener algo propio, de divertirnos trabajando y de estar a la vanguardia de
              todo lo que hoy permite la inteligencia artificial. Detrás hay una mezcla poco habitual: recursos humanos,
              diseño y código. Primero entendemos a las personas; después, los píxeles.
            </p>
            <p className="text-body text-[#a1a1a1] mb-4 md:mb-6">
              Somos un estudio pequeño, y eso juega a tu favor: quien diseña tu marca es quien la programa y quien
              automatiza tu negocio. Sin plantillas, sin intermediarios y sin teléfono escacharrado. Llegas sin marca y
              te vas con una identidad que te representa, una web que no se parece a ninguna otra y procesos que
              funcionan solos.
            </p>
            <p className="text-body text-[#a1a1a1] mb-5 md:mb-8">
              Trabajamos con negocios que quieren verse y funcionar a la altura de lo que valen. Nuestro trabajo es
              darles movimiento.
              <Molinillo className="ml-2 h-[0.7em] w-[0.7em] align-baseline" />
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/mazzmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
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
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
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

      {/* 03 · La persona detrás: el único bloque en primera persona */}
      <section className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number="03" label="La fundadora" title="Quién está detrás" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-16 md:items-center"
          >
            <div className="aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-sm border border-light/13 bg-light/[0.03]">
              {fundadora.photo ? (
                <img
                  src={fundadora.photo}
                  alt={`${fundadora.name}, fundadora de MAZZMKT`}
                  className="h-full w-full object-cover grayscale"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Molinillo className="h-12 w-12 text-light/20" />
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 md:mb-5 font-mono text-[11px] md:text-[13px] font-medium uppercase text-light/60" style={{ letterSpacing: "0.13em" }}>
                {fundadora.role}
              </p>
              <h3 className="normal-case font-heading text-subsection-title font-bold leading-[1] md:leading-[0.92] tracking-[-0.04em] md:tracking-[-0.045em] text-light">
                {fundadora.name}
              </h3>
              <p className="text-body text-[#a1a1a1] mt-5 md:mt-8 max-w-xl">{fundadora.bio}</p>
              <p className="text-body text-light mt-6 md:mt-8 pt-6 md:pt-8 border-t border-light/13 max-w-xl">
                {fundadora.equipo}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04 · Cómo trabajamos */}
      <section className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading
            number="04"
            label="Cómo trabajamos"
            title="Paso a paso, sin sorpresas"
            subtitle="Un orden claro de principio a fin, con fechas y rondas de cambios pactadas desde el primer día."
          />
          <Columnas items={pasos} />
        </div>
      </section>
    </>
  );
}
