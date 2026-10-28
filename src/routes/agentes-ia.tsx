import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Check,
  ChevronDown,
  Clock,
  Plug,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { MolinilloQueMira } from "@/components/brand/molinillo-que-mira";
import { CardRail } from "@/components/ui/card-rail";
import { ReceptionistDemo } from "@/components/product/receptionist-demo";
import { BookCallButton } from "@/components/product/book-call-button";
import { receptionist } from "@/data/products";
import { capabilities, demo, faqs, plans, testimonials } from "@/data/receptionist-page";

export const Route = createFileRoute("/agentes-ia")({
  component: AgentesIAPage,
});

// Página del producto, con la misma gramática que la home y /servicios:
// hero tipográfico, secciones numeradas con titular de sección, filas separadas por líneas,
// y un único CTA ("Reservar llamada") repetido.
// Los textos están en data/receptionist-page.ts.


const steps = [
  {
    title: "Nos cuentas tu negocio",
    description: "Servicios, precios, equipo, horarios y las preguntas que más te hacen tus clientes.",
  },
  {
    title: "Lo entrenamos y lo conectamos",
    description: "Cargamos lo que sabe, definimos su tono y lo conectamos con tu agenda.",
  },
  {
    title: "Lo instalamos en tu web",
    description: "Lo probamos contigo antes de que hable con ningún cliente, y después lo afinamos cada mes.",
  },
];

const integrations = ["WordPress", "Webflow", "Google Calendar", "Calendly", "Gmail", "Google Sheets"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Recepcionista IA",
  serviceType: "Recepcionista virtual con inteligencia artificial para webs de negocios",
  provider: {
    "@type": "Organization",
    name: "MAZZMKT",
    url: "https://mazzmkt.com",
  },
  areaServed: "ES",
  description:
    "Recepcionista IA: un asistente que se instala en tu web, atiende a tus clientes 24/7, responde sus dudas y agenda citas.",
};

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// Card de capacidad, con el estilo editorial de las cards de /servicios: número en mono, sin icono.
// Sin animación de entrada: aparece dentro del acordeón, que ya se despliega.
function CapabilityCard({ cap, index }: { cap: (typeof capabilities)[number]; index: number }) {
  return (
    <div className="group h-full border border-light/13 p-5 md:p-8 hover:border-light hover:bg-light transition-all duration-300 rounded-sm">
      <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="normal-case text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-3 transition-colors">
        {cap.title}
      </h3>
      <p className="text-body text-light/80 group-hover:text-dark/80 transition-colors">{cap.description}</p>
    </div>
  );
}

// "Mientras tú trabajas": acordeón con la misma cabecera que los bloques de /servicios
// (etiqueta, titular y círculo con flecha). Al abrirlo aparecen las capacidades.
function CapabilitiesAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-dark py-10 md:py-20">
      <div className="container mx-auto px-5 md:px-6">
        <div className="border-b border-light/13">
          <div
            onClick={() => setOpen((v) => !v)}
            className={`group flex cursor-pointer items-start justify-between gap-6 transition-[padding] duration-300 ${
              open ? "pb-6 md:pb-10" : "pb-10 md:pb-16"
            }`}
          >
            <SectionHeading
              number="02"
              label="Lo que hace"
              title="Mientras tú trabajas"
              subtitle="Seis cosas que hace por tu negocio, a cualquier hora."
              className="flex-1"
            />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="capacidades"
              aria-label={open ? "Cerrar lo que hace" : "Ver lo que hace"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className={`mt-8 md:mt-14 flex h-11 w-11 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                open ? "border-light bg-light text-dark" : "border-light/30 text-light group-hover:border-light"
              }`}
            >
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="capacidades"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-10 md:pb-16">
                  <CardRail>
                    {capabilities.map((cap, index) => (
                      <CapabilityCard key={cap.title} cap={cap} index={index} />
                    ))}
                  </CardRail>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Preguntas frecuentes: el mismo acordeón que /faqs y /servicios (líneas, círculo con flecha)
function Faqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-t border-light/13 first:border-t-0 last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-4 md:gap-6 py-6 md:py-8 text-left"
            >
              <h3 className="flex-1 normal-case text-[18px] md:text-[22px] lg:text-[24px] font-bold leading-tight tracking-[-0.025em] text-light">
                {faq.question}
              </h3>
              <span
                className={`flex h-9 w-9 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isOpen ? "border-light bg-light text-dark" : "border-light/30 text-light group-hover:border-light"
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.5}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-body max-w-3xl pb-6 md:pb-10 text-[#a1a1a1]">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function AgentesIAPage() {
  // Los testimonios solo aparecen cuando los hay; la numeración se ajusta sola
  const hasTestimonials = testimonials.length > 0;
  const n = (i: number) => String(i).padStart(2, "0");
  const processNumber = hasTestimonials ? 5 : 4;

  return (
    <>
      <SEOHead
        title="Recepcionista IA para tu web | MAZZMKT"
        description="Un recepcionista con IA en la web de tu negocio: atiende a tus clientes 24/7, responde sus dudas y agenda citas mientras tú trabajas."
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[{ label: receptionist.name }]}
        title={
          <>
            Ningún cliente
            <br />
            sin respuesta
          </>
        }
        subtitle="Un [[recepcionista con IA]] que vive en la web de tu negocio: [[responde las dudas]], les [[ofrece hueco]] y les [[agenda]] la cita las 24 horas, [[mientras tú estás trabajando o descansando]]."
        actions={
          <>
            <BookCallButton location="agentes_hero" />
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-6 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
            >
              VER CÓMO FUNCIONA
              <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </>
        }
      />

      {/* 01 · Demo */}
      <ReceptionistDemo
        number="01"
        title="Así atiende"
        subtitle="[[Responde]] a cualquier hora, [[ofrece los huecos]] libres de tu agenda y [[confirma la cita]]. No son guiones rígidos: entiende a cada cliente y responde como lo haría tu mejor recepcionista."
        businessName={demo.businessName}
        conversation={demo.conversation}
        cta={<BookCallButton location="agentes_demo" />}
      />

      {/* El problema, en una banda corta: corta el ritmo entre la demo y lo que hace, sin alargar la página */}
      <section className="bg-dark py-6 md:py-10">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            {...reveal}
            className="border-t border-b border-light/13 py-8 md:py-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12"
          >
            <span className="inline-flex shrink-0 self-start lg:self-center items-center gap-2 rounded-full border border-light/18 px-3 py-[6px] text-[12px] md:text-[13px] text-light">
              <Clock size={14} strokeWidth={1.5} className="text-[#a1a1a1]" />
              21:47 · Martes
            </span>
            <p className="normal-case font-heading text-[22px] md:text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-light">
              Alguien te escribe pidiendo cita y nadie responde. A la mañana siguiente ya ha reservado en otro sitio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02 · Lo que hace: un acordeón como los de /servicios */}
      <CapabilitiesAccordion />

      {/* 03 · Opciones: qué compras, sin precio a la vista (se da en la llamada) */}
      <section className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading
            number="03"
            label="Opciones"
            title="Elige cómo empezar"
            subtitle="Dos formas de tenerlo funcionando en tu negocio. Precio cerrado y cuota fija, sin cargos por uso: te damos el precio exacto en una llamada corta."
          />

          {/* Cards que se vuelven blancas al pasar el cursor. Subgrid: etiqueta, nombre, descripción y lista
              comparten filas, así las dos opciones quedan alineadas */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-0">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col rounded-sm border border-light/13 p-6 md:p-8 transition-colors duration-300 hover:border-light hover:bg-light md:grid md:grid-rows-subgrid md:row-span-4 md:gap-y-0"
              >
                <span className="font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
                  {n(index + 1)} <span className="opacity-60">/</span>{" "}
                  <span className="uppercase" style={{ letterSpacing: "0.08em" }}>
                    Opción
                  </span>
                </span>
                <h3 className="normal-case mt-6 md:mt-10 mb-3 text-[26px] md:text-[32px] leading-[1] tracking-[-0.035em] font-bold text-light group-hover:text-dark transition-colors">
                  {plan.name}
                </h3>
                <p className="text-body text-[#a1a1a1] group-hover:text-dark/70 transition-colors max-w-md">{plan.for}</p>

                <ul className="mt-6 md:mt-8">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t border-light/13 group-hover:border-dark/13 py-3 font-mono text-[12px] md:text-[13px] uppercase text-light/80 group-hover:text-dark/80 transition-colors"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      <Check className="h-4 w-4 shrink-0 text-light group-hover:text-dark transition-colors" strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                  <li
                    className="flex items-center gap-3 border-t border-light/13 group-hover:border-dark/13 pt-3 font-mono text-[12px] md:text-[13px] uppercase text-light group-hover:text-dark transition-colors"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    <Clock className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {plan.timing}
                  </li>
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...reveal}
            className="mt-10 md:mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-body text-light max-w-xl">
              ¿No sabes cuál encaja con tu negocio? Lo vemos juntos y te damos el precio cerrado en la misma llamada.
            </p>
            <BookCallButton location="agentes_opciones" />
          </motion.div>
        </div>
      </section>

      {/* 04 · Testimonios (solo cuando los haya) */}
      {hasTestimonials && (
        <section className="bg-dark py-10 md:py-20">
          <div className="container mx-auto px-5 md:px-6">
            <SectionHeading number="04" label="Negocios que ya lo usan" title="Lo que dicen" />
            <div className="grid gap-8 md:grid-cols-2 md:gap-6">
              {testimonials.map((t) => (
                <motion.figure key={t.name} {...reveal} className="border-t border-light/13 pt-6">
                  <blockquote className="text-[18px] md:text-[22px] font-medium leading-[1.4] text-light">
                    &laquo;{t.quote}&raquo;
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[12px] uppercase text-[#a1a1a1]" style={{ letterSpacing: "0.08em" }}>
                    {t.name} · {t.role}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* El proceso, cerrado con las integraciones */}
      <section className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number={n(processNumber)} label="El proceso" title="Así lo ponemos en marcha" />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-t border-light/13 pt-5 md:pt-6"
              >
                <span className="font-mono text-[13px] text-light/50">{n(index + 1)}</span>
                <h3 className="normal-case mt-6 md:mt-10 mb-3 text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light">
                  {step.title}
                </h3>
                <p className="text-body text-[#a1a1a1]">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...reveal}
            className="mt-12 md:mt-20 border-t border-light/13 pt-10 md:pt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >
            <div className="md:max-w-xs">
              <p className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-3 md:font-medium font-mono text-light/60" style={{ letterSpacing: "0.13em" }}>
                Se conecta con
              </p>
              <p className="text-body text-[#b3b3b3]">
                Se instala en la web de tu negocio y se conecta con tu agenda. Si usas otra herramienta, la integramos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 md:justify-end md:max-w-xl">
              {integrations.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 text-[12px] md:text-[14px] px-3 py-[7px] md:px-4 md:py-[9px] rounded-full border border-light/18 text-light"
                >
                  <Plug size={13} strokeWidth={1.5} className="text-[#a1a1a1]" />
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preguntas frecuentes: las objeciones antes de decir que sí */}
      <section className="bg-dark py-10 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          {/* Misma cabecera que "Lo que hacemos" en la home: titular a la izquierda, botón a su altura a la derecha */}
          <div className="mb-6 md:mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading number={n(processNumber + 1)} label="Preguntas" title="Antes de decir que sí" className="" />
            <div className="shrink-0">
              <BookCallButton location="agentes_faqs" />
            </div>
          </div>
          <Faqs />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-dark pt-8 pb-10 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-6 relative z-10 text-center">
          <MolinilloQueMira className="mx-auto mb-6 md:mb-10 block h-[72px] w-[72px] md:h-[140px] md:w-[140px] text-light" />
          <motion.h2
            {...reveal}
            className="font-bold normal-case text-light mx-auto max-w-6xl mb-4 md:mb-6"
            style={{
              fontSize: "var(--font-cta)",
              lineHeight: "var(--lh-cta)",
              letterSpacing: "-0.045em",
            }}
          >
            Cada día que esperas, un cliente perdido
          </motion.h2>
          <motion.p {...reveal} transition={{ duration: 0.6, delay: 0.15 }} className="text-body mx-auto max-w-2xl mb-7 md:mb-9 text-[#b3b3b3]">
            Reserva una llamada corta: vemos tu negocio, te enseñamos el recepcionista funcionando y te damos el precio
            cerrado.
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.3 }}>
            <BookCallButton location="agentes_cta_final" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
