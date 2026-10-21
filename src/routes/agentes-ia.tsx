import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Clock,
  Plug,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/sections/page-hero";
import { Molinillo } from "@/components/brand/molinillo";
import { MolinilloQueMira } from "@/components/brand/molinillo-que-mira";
import { CardRail } from "@/components/ui/card-rail";

export const Route = createFileRoute("/agentes-ia")({
  component: AgentesIAPage,
});

const capabilities = [
  {
    title: "AGENTES IA",
    description:
      "Asistentes que entienden lenguaje natural, conocen tu negocio y actúan: responden, agendan, derivan y venden. Sin guiones rígidos.",
  },
  {
    title: "AUTOMATIZACIÓN DE FLUJOS",
    description:
      "Conectamos tus herramientas para que las tareas repetitivas ocurran solas: reservas, seguimientos, altas, avisos y reporting.",
  },
  {
    title: "ATENCIÓN 24/7",
    description:
      "Un recepcionista digital que no duerme ni falla. Atiende cada consulta al instante, festivos y madrugadas incluidas.",
  },
  {
    title: "INTEGRACIONES",
    description:
      "Tu agente vive donde ya trabajas: WhatsApp, agenda, CRM, email y hojas de cálculo. Todo conectado.",
  },
  {
    title: "IA CON TU CONOCIMIENTO",
    description:
      "Entrenamos al agente con el conocimiento de tu negocio (precios, servicios, políticas) para que responda con precisión, como lo harías tú.",
  },
];

const agentSkills = [
  { title: "Agenda citas", description: "Programa y reprograma citas sin solapar." },
  { title: "Respuestas", description: "Resuelve las dudas frecuentes sin que nadie tenga que esperar." },
  { title: "Filtra leads", description: "Califica cada consulta antes de compartir la lista para cerrar." },
  { title: "Menos ausencias", description: "Envía recordatorios automáticos antes de cada cita." },
  { title: "Humano", description: "Pasa la conversación a tu equipo cuando de verdad hace falta." },
  { title: "Activo 24/7", description: "Trabaja sin descanso, sin errores y sin días libres." },
  { title: "Sin esperas", description: "Atiende todas las conversaciones a la vez." },
  { title: "Cuota fija", description: "Precio predecible, sin cargas por uso ni sorpresas." },
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu negocio y detectamos qué conversaciones y tareas se pueden automatizar con más impacto.",
  },
  {
    step: "02",
    title: "El agente",
    description:
      "Lo configuramos, cargamos lo que sabe (precios, servicios, políticas), definimos su tono y cuándo debe pasar el testigo a una persona.",
  },
  {
    step: "03",
    title: "Integración",
    description:
      "Lo conectamos con WhatsApp, tu agenda, calendario, CRM y las herramientas que ya usas.",
  },
  {
    step: "04",
    title: "Optimización",
    description:
      "Medimos, afinamos las respuestas y ampliamos capacidades para que cada mes trabaje mejor.",
  },
];

const integrations = [
  "WhatsApp",
  "Instagram",
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
  "name": "Agentes de IA y automatizaciones a medida",
  "serviceType": "Inteligencia artificial, agentes IA y automatización de procesos",
  "provider": {
    "@type": "Organization",
    "name": "MAZZMKT",
    "url": "https://mazzmkt.com",
  },
  "areaServed": "ES",
  "description":
    "Creación de agentes de IA a medida, recepcionistas virtuales, chatbots inteligentes y automatización de flujos de trabajo para negocios y clínicas.",
};

function CapabilityCard({ cap, index }: { cap: (typeof capabilities)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group h-full border border-light/13 p-5 md:p-8 hover:border-light hover:bg-light transition-all duration-300 rounded-sm"
    >
      <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-[#0a0a0a] mb-3 transition-colors">
        {cap.title}
      </h3>
      <p className="text-body text-light/80 group-hover:text-dark/80 transition-colors">
        {cap.description}
      </p>
    </motion.div>
  );
}

// Lo que construimos: carrusel deslizable en móvil y rejilla en escritorio, como en la home
function BuildShowcase() {
  return (
    <section className="bg-dark py-9 md:py-20">
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-6 md:mb-10">
          <p
            className="font-mono text-[10px] md:text-[13px] font-medium uppercase text-[#a1a1a1] mb-2 md:mb-5"
            style={{ letterSpacing: "0.13em" }}
          >
            Lo que construimos
          </p>
          <h2 className="text-[30px] font-bold leading-[1] tracking-[-0.04em] text-light normal-case font-heading md:text-[clamp(56px,6vw,88px)] md:leading-[0.92] md:tracking-[-0.045em]">
            IA lista para tu negocio
          </h2>
        </div>
        <CardRail>
          {capabilities.map((cap, index) => (
            <CapabilityCard key={cap.title} cap={cap} index={index} />
          ))}
        </CardRail>
      </div>
    </section>
  );
}

function AgentesIAPage() {
  return (
    <>
      <SEOHead
        title="Agentes de IA y Automatizaciones a Medida | MAZZMKT"
        description="Creamos agentes de IA a medida, recepcionistas virtuales 24/7 y automatización de flujos de trabajo. IA que agenda citas, responde y vende por ti. Barcelona."
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[{ label: "IA & Automatización" }]}
        title={<>IA que trabaja<br />por ti</>}
        subtitle="Un asistente que atiende, agenda y responde por tu negocio las 24 horas. Cada mensaje respondido al instante es una cita más. Y un cliente que no se va a la competencia."
        actions={
          <>
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("cta_click", { location: "agentes_hero", label: "quiero_mi_agente" })}
              >
                QUIERO MI AGENTE IA
                <Molinillo className="h-[14px] w-[14px]" />
              </TransitionLink>
              <a
                href="#casos"
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
              >
                VER CASOS DE USO
              </a>
          </>
        }
      />

      {/* Recepcionista IA — qué sabe hacer */}
      <section id="casos" className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-8 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
                style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
              >
                El caso estrella
              </p>
              <h2 className="text-[30px] font-bold leading-[1] tracking-[-0.04em] text-[#ffffff] normal-case font-heading md:text-[clamp(44px,5vw,72px)] md:leading-[0.92] md:tracking-[-0.045em] mb-4 md:mb-6">
                Un recepcionista que no duerme
              </h2>
              <p className="text-body max-w-xl" style={{ color: "#b3b3b3" }}>
                El producto ideal para cualquier negocio con agenda. Atiende cada
                mensaje, ofrece los huecos libres, confirma la cita y avisa antes para
                que nadie falte. Todo mientras te dedicas a lo que importa.
              </p>
            </motion.div>

            {/* Cita + nota */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:pt-2"
            >
              <div
                className="p-5 md:p-7 rounded-sm border"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
              >
                <p className="text-[15px] md:text-[19px] font-medium text-light leading-[1.5]">
                  &laquo;Cada consulta atendida al instante es una cita más y un cliente
                  que no se va a la competencia.&raquo;
                </p>
              </div>

              <div className="mt-4 md:mt-6 p-5 md:p-6 rounded-sm border-l-2 border-light">
                <p className="text-body" style={{ color: "#b3b3b3" }}>
                  No sustituye a tu equipo, lo libera. Tus profesionales dejan de perder
                  el día respondiendo &laquo;¿qué horario tenéis?&raquo; y se centran en
                  lo que de verdad importa: las conversaciones delicadas, donde el trato
                  humano marca la diferencia.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Capacidades — rejilla con divisorias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#ffffff14]">
            {agentSkills.map((skill, index) => {
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                  className="border-r border-b border-[#ffffff14] p-6 md:p-8"
                >
                  <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[24px] font-bold text-[#ffffff] mb-3"
                    style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
                  >
                    {skill.title}
                  </h3>
                  <p className="text-body" style={{ color: "#888888" }}>
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qué construimos */}
      <BuildShowcase />

      {/* Mientras dormías */}
      <section className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] uppercase mb-3 md:text-[13px] md:mb-5 md:font-medium font-mono"
              style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
            >
              Mientras dormías
            </p>
            <h2 className="text-[30px] font-bold leading-[1] tracking-[-0.04em] text-[#ffffff] normal-case font-heading md:text-[clamp(44px,5vw,72px)] md:leading-[0.92] md:tracking-[-0.045em] mb-5 md:mb-7">
              La última cita de hoy la agendaste durmiendo
            </h2>

            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-[6px] mb-6 text-[12px] md:text-[13px]"
              style={{ borderColor: "rgba(255,255,255,0.18)", color: "#d4d4d4" }}
            >
              <Clock size={14} strokeWidth={1.5} style={{ color: "#a1a1a1" }} />
              23:41 · Martes
            </span>

            <p className="text-body mb-4" style={{ color: "#b3b3b3" }}>
              Alguien entró a tu WhatsApp buscando hora para el jueves. No había nadie
              despierto en tu negocio, pero tu asistente respondió al instante, revisó
              la agenda, ofreció el único hueco libre y lo confirmó.
            </p>
            <p className="text-body mb-7 md:mb-8" style={{ color: "#b3b3b3" }}>
              Tú te enteraste a la mañana, con el café. Una cita más, sin que movieras
              un dedo.
            </p>

            <p className="text-[16px] md:text-[24px] font-medium leading-[1.4] text-light">
              Mientras tu competencia tiene el móvil en silencio, el tuyo sigue
              trabajando.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-dark py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-12"
          >
            <p
              className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
              style={{ letterSpacing: "0.13em", color: "#8f8f8f" }}
            >
              Cómo lo hacemos
            </p>
            <h2 className="text-[30px] font-bold leading-[1] tracking-[-0.04em] text-light normal-case font-heading md:text-[clamp(56px,6vw,88px)] md:font-bold md:leading-[0.92] md:tracking-[-0.045em]">
              De la idea al agente en marcha
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 md:p-7 border border-light/13 rounded-sm"
              >
                <span className="text-4xl md:text-5xl font-bold text-light/9">{item.step}</span>
                <h3
                  className="font-bold text-light mt-4 mb-2 uppercase"
                  style={{ fontSize: "18px", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
                <p className="text-body text-[#a1a1a1]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="bg-dark py-9 md:py-16">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >
            <div className="md:max-w-xs">
              <p
                className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-3 md:font-medium font-mono"
                style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
              >
                Se conecta con
              </p>
              <p className="text-body" style={{ color: "#b3b3b3" }}>
                Tu agente vive donde ya trabajas. Y si usas otra herramienta, la
                integramos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 md:justify-end md:max-w-xl">
              {integrations.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 text-[12px] md:text-[14px] px-3 py-[7px] md:px-4 md:py-[9px] rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "#d4d4d4" }}
                >
                  <Plug size={13} strokeWidth={1.5} style={{ color: "#a1a1a1" }} />
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
            className="font-bold normal-case text-[#ffffff] mx-auto max-w-4xl mb-4 md:mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
            }}
          >
            Cada día que esperas es otra semana de citas perdidas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body mx-auto max-w-2xl mb-7 md:mb-9"
            style={{ color: "#b3b3b3" }}
          >
            Monta tu asistente esta semana y deja de perder lo que ya estabas por ganar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-light/30 px-8 py-[15px] text-[12px] md:text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "agentes_cta_final", label: "comenzar" })}
            >
              COMENZAR
              <Molinillo className="h-[14px] w-[14px]" />
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
