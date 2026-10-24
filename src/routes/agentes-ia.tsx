import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, BellRing, CalendarCheck, Clock, Filter, MessageCircle, Plug, Users } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { MolinilloQueMira } from "@/components/brand/molinillo-que-mira";
import { CardRail } from "@/components/ui/card-rail";
import { ReceptionistDemo } from "@/components/product/receptionist-demo";
import { receptionist } from "@/data/products";

export const Route = createFileRoute("/agentes-ia")({
  component: AgentesIAPage,
});

// Página del producto: hero y cuatro secciones numeradas (demo → historia → qué hace → proceso) + CTA.
// Cada sección: etiqueta numerada + titular de sección. El tamaño de subsección solo va dentro de una sección.
// Cada idea aparece una sola vez.

// Lo que hace (sin números: no hay un orden)
const capabilities = [
  {
    icon: Clock,
    title: "Atiende 24/7",
    description: "Responde al instante a cualquier hora, festivos incluidos, y a todos tus clientes a la vez.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda en tiempo real",
    description: "Consulta tu agenda, ofrece los huecos libres y confirma la cita sin solapes.",
  },
  {
    icon: MessageCircle,
    title: "Responde como tú",
    description: "Conoce tus servicios, precios, horarios y políticas, y habla con el tono de tu negocio.",
  },
  {
    icon: BellRing,
    title: "Recuerda las citas",
    description: "Envía recordatorios antes de cada cita para que nadie se olvide y tengas menos ausencias.",
  },
  {
    icon: Filter,
    title: "Filtra las consultas",
    description: "Distingue a quien quiere reservar de quien solo pregunta, y te deja los contactos ordenados.",
  },
  {
    icon: Users,
    title: "Pasa a tu equipo",
    description: "Cuando una conversación necesita a una persona, te la pasa con todo el contexto.",
  },
];

// El proceso (aquí sí hay orden)
const steps = [
  {
    title: "Nos cuentas tu negocio",
    description: "Tus servicios, tus horarios, cómo funciona tu agenda y las preguntas que más te hacen.",
  },
  {
    title: "Lo entrenamos y lo conectamos",
    description: "Cargamos lo que sabe, definimos su tono y lo conectamos con tu agenda y tus herramientas.",
  },
  {
    title: "Lo instalamos en tu web",
    description: "Lo dejamos funcionando en tu web y lo probamos contigo antes de que hable con tus clientes.",
  },
];

const integrations = [
  "WordPress",
  "Shopify",
  "Webflow",
  "Google Calendar",
  "Gmail",
  "Google Sheets",
  "Notion",
  "HubSpot",
  "Calendly",
  "Stripe",
  "Slack",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Recepcionista IA",
  "serviceType": "Recepcionista virtual con inteligencia artificial para webs",
  "provider": {
    "@type": "Organization",
    "name": "MAZZMKT",
    "url": "https://mazzmkt.com",
  },
  "areaServed": "ES",
  "description":
    "Recepcionista IA: un asistente que se instala en tu web, atiende a tus clientes 24/7, responde sus dudas y agenda citas por tu negocio.",
};

function CapabilityCard({ cap, index }: { cap: (typeof capabilities)[number]; index: number }) {
  const Icon = cap.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group h-full border border-light/13 p-5 md:p-8 hover:border-light hover:bg-light transition-all duration-300 rounded-sm"
    >
      <Icon
        className="mb-10 md:mb-14 h-5 w-5 text-light/50 group-hover:text-dark/60 transition-colors"
        strokeWidth={1.5}
      />
      <h3 className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-3 transition-colors">
        {cap.title}
      </h3>
      <p className="text-body text-light/80 group-hover:text-dark/80 transition-colors">{cap.description}</p>
    </motion.div>
  );
}

const ctaClass =
  "inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono";

function AgentesIAPage() {
  return (
    <>
      <SEOHead
        title="Recepcionista IA para tu web | MAZZMKT"
        description="Recepcionista IA: un asistente que se instala en tu web, atiende 24/7, responde dudas y agenda citas por tu negocio. Nuestro producto, creado por MAZZMKT en Barcelona."
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[{ label: receptionist.name }]}
        title={<>Ninguna consulta<br />sin respuesta</>}
        subtitle="Un asistente que vive en tu web y atiende, agenda y responde por tu negocio las 24 horas. Sin esperas, sin consultas perdidas y sin que tengas que estar pendiente del móvil."
        actions={
          <>
            <TransitionLink
              to="/contacto"
              className={ctaClass}
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "agentes_hero", label: "pide_una_demo" })}
            >
              PIDE UNA DEMO
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
            <a href="#demo" className={ctaClass} style={{ letterSpacing: "0.09em" }}>
              VER CÓMO FUNCIONA
              <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </>
        }
      />

      {/* Demostración: el chat animado */}
      <ReceptionistDemo />

      {/* Por qué importa: la historia */}
      <section className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <SectionHeading
              number="02"
              label="Mientras dormías"
              title="La última cita la agendó él"
              className="mb-5 md:mb-7"
            />

            <span className="inline-flex items-center gap-2 rounded-full border border-light/18 px-3 py-[6px] mb-6 text-[12px] md:text-[13px] text-light">
              <Clock size={14} strokeWidth={1.5} className="text-[#a1a1a1]" />
              23:41 · Martes
            </span>

            <p className="text-body mb-4 text-[#b3b3b3]">
              Alguien entró a tu web buscando hora para el jueves. No había nadie despierto en tu negocio, pero tu
              recepcionista respondió al instante, revisó la agenda, ofreció el único hueco libre y lo confirmó.
            </p>
            <p className="text-body mb-7 md:mb-8 text-[#b3b3b3]">
              Tú te enteraste por la mañana, con el café. Una cita más, sin que movieras un dedo.
            </p>

            <p className="text-[18px] md:text-[24px] font-medium leading-[1.4] text-light">
              Mientras tu competencia cierra a las ocho, tu web sigue atendiendo. Y cada consulta atendida al instante
              es un cliente que no se va.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 03 · Qué hace, cerrado con la frase sobre el equipo */}
      <section className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number="03" label="Lo que hace" title="Mientras tú trabajas" />
          <CardRail>
            {capabilities.map((cap, index) => (
              <CapabilityCard key={cap.title} cap={cap} index={index} />
            ))}
          </CardRail>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 md:mt-20 border-t border-light/13 pt-10 md:pt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:items-end"
          >
            <h3 className="normal-case font-heading text-subsection-title font-bold leading-[1] md:leading-[0.92] tracking-[-0.04em] md:tracking-[-0.045em] text-light">
              No sustituye a tu equipo, lo libera.
            </h3>
            <p className="text-body text-[#b3b3b3]">
              Tu equipo deja de perder el día respondiendo &laquo;¿qué horario tenéis?&raquo; y se centra en lo que de
              verdad importa: las conversaciones donde el trato humano marca la diferencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 04 · El proceso, cerrado con las integraciones */}
      <section className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <SectionHeading number="04" label="El proceso" title="Así lo ponemos en marcha" />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-t border-light/13 pt-5 md:pt-6"
              >
                <span className="font-mono text-[13px] text-light">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 md:mt-10 mb-3 text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light">
                  {step.title}
                </h3>
                <p className="text-body text-[#a1a1a1]">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 md:mt-20 border-t border-light/13 pt-10 md:pt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >
            <div className="md:max-w-xs">
              <p
                className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-3 md:font-medium font-mono text-light"
                style={{ letterSpacing: "0.13em" }}
              >
                Se conecta con
              </p>
              <p className="text-body text-[#b3b3b3]">
                Se instala en cualquier web y se conecta con las herramientas que ya usas. Y si usas otra, la
                integramos.
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

      {/* CTA final */}
      <section className="bg-dark pt-8 pb-10 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-6 relative z-10 text-center">
          <MolinilloQueMira className="mx-auto mb-6 md:mb-10 block h-[72px] w-[72px] md:h-[140px] md:w-[140px] text-light" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold normal-case text-light mx-auto max-w-6xl mb-4 md:mb-6"
            style={{
              fontSize: "var(--font-cta)",
              lineHeight: "var(--lh-cta)",
              letterSpacing: "-0.045em",
            }}
          >
            Cada día que esperas, una cita perdida
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body mx-auto max-w-2xl mb-7 md:mb-9 text-[#b3b3b3]"
          >
            Monta tu asistente esta semana y deja de perder lo que ya estabas por ganar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-left md:text-center"
          >
            <TransitionLink
              to="/contacto"
              className={ctaClass}
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "agentes_cta_final", label: "pide_una_demo" })}
            >
              PIDE UNA DEMO
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
