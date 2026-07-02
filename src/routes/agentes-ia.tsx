import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bot,
  Workflow,
  Clock,
  MessageCircle,
  Plug,
  BrainCircuit,
  CalendarCheck,
  Filter,
  Bell,
  Users,
  Layers,
  CreditCard,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/agentes-ia")({
  component: AgentesIAPage,
});

const capabilities = [
  {
    icon: Bot,
    title: "AGENTES IA",
    description:
      "Asistentes que entienden lenguaje natural, conocen tu negocio y actúan: responden, agendan, derivan y venden. Sin guiones rígidos.",
  },
  {
    icon: Workflow,
    title: "AUTOMATIZACIÓN DE FLUJOS",
    description:
      "Conectamos tus herramientas para que las tareas repetitivas ocurran solas: reservas, seguimientos, altas, avisos y reporting.",
  },
  {
    icon: Clock,
    title: "ATENCIÓN 24/7",
    description:
      "Un recepcionista digital que no duerme ni falla. Atiende cada consulta al instante, festivos y madrugadas incluidas.",
  },
  {
    icon: Plug,
    title: "INTEGRACIONES",
    description:
      "Tu agente vive donde ya trabajas: WhatsApp, agenda, CRM, email y hojas de cálculo. Todo conectado.",
  },
  {
    icon: BrainCircuit,
    title: "IA CON TU CONOCIMIENTO",
    description:
      "Entrenamos al agente con el conocimiento de tu negocio (precios, servicios, políticas) para que responda con precisión, como lo harías tú.",
  },
];

const agentSkills = [
  { icon: CalendarCheck, title: "Agenda citas", description: "Programa y reprograma citas sin solapar." },
  { icon: MessageCircle, title: "Respuestas", description: "Resuelve las dudas frecuentes sin que nadie tenga que esperar." },
  { icon: Filter, title: "Filtra leads", description: "Califica cada consulta antes de compartir la lista para cerrar." },
  { icon: Bell, title: "Menos ausencias", description: "Envía recordatorios automáticos antes de cada cita." },
  { icon: Users, title: "Humano", description: "Pasa la conversación a tu equipo cuando de verdad hace falta." },
  { icon: Clock, title: "Activo 24/7", description: "Trabaja sin descanso, sin errores y sin días libres." },
  { icon: Layers, title: "Sin esperas", description: "Atiende todas las conversaciones a la vez." },
  { icon: CreditCard, title: "Cuota fija", description: "Precio predecible, sin cargas por uso ni sorpresas." },
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

function BuildShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const [maxX, setMaxX] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const Header = () => (
    <>
      <p
        className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
        style={{ letterSpacing: "0.13em", color: "#77766f" }}
      >
        Lo que construimos
      </p>
      <h2 className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]">
        IA LISTA PARA TU NEGOCIO <span className="hidden md:inline">&raquo;</span>
      </h2>
    </>
  );

  const Card = ({ cap }: { cap: (typeof capabilities)[number] }) => {
    const Icon = cap.icon;
    return (
      <div className="group h-full border border-[#14141420] p-5 md:p-8 hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 rounded-sm">
        <Icon
          className="h-9 w-9 md:h-10 md:w-10 text-[#141414] group-hover:text-[#ffffff] mb-5 md:mb-7 transition-colors"
          strokeWidth={1.5}
        />
        <h3
          className="font-bold text-[#141414] group-hover:text-[#ffffff] mb-3 transition-colors"
          style={{ fontSize: "20px", lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {cap.title}
        </h3>
        <p className="text-[14px] md:text-[16px] text-[#141414cc] group-hover:text-[#f1ede1cc] leading-[1.55] transition-colors">
          {cap.description}
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Desktop: scroll horizontal fijado */}
      <div ref={targetRef} className="hidden md:block relative h-[220vh] bg-light">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container mx-auto px-6 w-full mb-10">
            <Header />
          </div>
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-6 w-max">
            {capabilities.map((cap) => (
              <div key={cap.title} className="shrink-0 w-[calc((100vw-96px)/3)]">
                <Card cap={cap} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Móvil: carrusel deslizable */}
      <section className="md:hidden bg-light py-9">
        <div className="container mx-auto px-5 mb-6">
          <Header />
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 pb-2">
          {capabilities.map((cap) => (
            <div key={cap.title} className="snap-start shrink-0 w-[80vw]">
              <Card cap={cap} />
            </div>
          ))}
        </div>
      </section>
    </>
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

      {/* Hero */}
      <section className="bg-dark pt-[100px] pb-9 md:pt-32 md:pb-20 relative overflow-hidden">
        <div
          className="hidden md:block absolute -inset-x-[2%] inset-y-0 bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-home.webp')`,
            backgroundPosition: "center center",
            backgroundSize: "100% auto",
            opacity: 0.22,
            animation: "tv-static 0.45s steps(1) infinite",
          }}
        />
        <div className="container mx-auto px-5 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] md:text-[15px] font-medium text-[#888780] md:text-[#ffffffe0] mb-3 md:mb-5 tracking-[1.5px] md:tracking-[0.14em] uppercase flex items-center gap-3 font-geist"
            >
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>IA &amp; AUTOMATIZACIÓN</span>
            </motion.p>

            <h1
              className="font-bold text-[#ffffff] mb-5 md:mb-8"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              IA QUE TRABAJA
              <br />
              POR TI <span className="text-[#a3a199]">&raquo;</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[14px] md:text-[20px] leading-[1.6] mb-8 md:mb-9 max-w-2xl"
              style={{ color: "#b4b2a9" }}
            >
              Un asistente que atiende, agenda y responde por tu negocio las 24 horas.
              Cada mensaje respondido al instante es una cita más. Y un cliente que no
              se va a la competencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-[10px] md:gap-3"
            >
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#f1ede1] px-6 py-[12px] text-[11px] md:px-8 md:py-[15px] md:text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("cta_click", { location: "agentes_hero", label: "quiero_mi_agente" })}
              >
                QUIERO MI AGENTE IA
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </TransitionLink>
              <a
                href="#casos"
                className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-6 py-[12px] text-[11px] md:px-8 md:py-[15px] md:text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                VER CASOS DE USO
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
                style={{ letterSpacing: "0.13em", color: "#a3a199" }}
              >
                El caso estrella
              </p>
              <h2 className="text-[20px] font-medium leading-[1.1] text-[#ffffff] md:text-[clamp(44px,5vw,60px)] md:font-bold md:leading-[0.98] md:tracking-[-0.03em] mb-4 md:mb-6">
                UN RECEPCIONISTA QUE NO DUERME
              </h2>
              <p className="text-[14px] md:text-[18px] leading-[1.6] max-w-xl" style={{ color: "#b4b2a9" }}>
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
                <p className="text-[15px] md:text-[19px] font-medium text-[#f1ede1] leading-[1.5]">
                  &laquo;Cada consulta atendida al instante es una cita más y un cliente
                  que no se va a la competencia.&raquo;
                </p>
              </div>

              <div className="mt-4 md:mt-6 p-5 md:p-6 rounded-sm border-l-2 border-[#f1ede1]">
                <p className="text-[13px] md:text-[16px] leading-[1.6]" style={{ color: "#b4b2a9" }}>
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
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                  className="border-r border-b border-[#ffffff14] p-6 md:p-8"
                >
                  <Icon size={30} strokeWidth={1.5} style={{ color: "#f1ede1" }} className="mb-6 md:mb-8" />
                  <h3
                    className="text-[24px] font-bold text-[#ffffff] mb-3"
                    style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
                  >
                    {skill.title}
                  </h3>
                  <p className="text-[17px] leading-[1.5]" style={{ color: "#8a8880" }}>
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
              className="text-[10px] uppercase mb-3 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#a3a199" }}
            >
              Mientras dormías
            </p>
            <h2 className="text-[20px] font-medium leading-[1.1] text-[#ffffff] md:text-[clamp(40px,5vw,56px)] md:font-bold md:leading-[1] md:tracking-[-0.03em] mb-5 md:mb-7">
              LA ÚLTIMA CITA DE HOY LA AGENDASTE DURMIENDO <span className="hidden md:inline">&raquo;</span>
            </h2>

            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-[6px] mb-6 text-[12px] md:text-[13px]"
              style={{ borderColor: "rgba(255,255,255,0.18)", color: "#d5d1c5" }}
            >
              <Clock size={14} strokeWidth={1.5} style={{ color: "#a3a199" }} />
              23:41 · Martes
            </span>

            <p className="text-[14px] md:text-[19px] leading-[1.7] mb-4" style={{ color: "#b4b2a9" }}>
              Alguien entró a tu WhatsApp buscando hora para el jueves. No había nadie
              despierto en tu negocio, pero tu asistente respondió al instante, revisó
              la agenda, ofreció el único hueco libre y lo confirmó.
            </p>
            <p className="text-[14px] md:text-[19px] leading-[1.7] mb-7 md:mb-8" style={{ color: "#b4b2a9" }}>
              Tú te enteraste a la mañana, con el café. Una cita más, sin que movieras
              un dedo.
            </p>

            <p className="text-[16px] md:text-[24px] font-medium leading-[1.4] text-[#f1ede1]">
              Mientras tu competencia tiene el móvil en silencio, el tuyo sigue
              trabajando.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-light py-9 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-12"
          >
            <p
              className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#77766f" }}
            >
              Cómo lo hacemos
            </p>
            <h2 className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]">
              DE LA IDEA AL AGENTE EN MARCHA <span className="hidden md:inline">&raquo;</span>
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
                className="p-5 md:p-7 border border-[#14141420] rounded-sm"
              >
                <span className="text-4xl md:text-5xl font-bold text-[#14141418]">{item.step}</span>
                <h3
                  className="font-bold text-[#141414] mt-4 mb-2 uppercase"
                  style={{ fontSize: "18px", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[15px] leading-[1.55] text-[#5F5E5A]">{item.description}</p>
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
                className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-3 md:font-medium md:font-geist"
                style={{ letterSpacing: "0.13em", color: "#a3a199" }}
              >
                Se conecta con
              </p>
              <p className="text-[15px] md:text-[18px] leading-[1.5]" style={{ color: "#b4b2a9" }}>
                Tu agente vive donde ya trabajas. Y si usas otra herramienta, la
                integramos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 md:justify-end md:max-w-xl">
              {integrations.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 text-[12px] md:text-[14px] px-3 py-[7px] md:px-4 md:py-[9px] rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "#d5d1c5" }}
                >
                  <Plug size={13} strokeWidth={1.5} style={{ color: "#a3a199" }} />
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-dark pt-8 pb-10 md:py-24 relative overflow-hidden">
        <div className="hidden md:block absolute inset-0 overflow-hidden" style={{ transform: "scaleX(-1)" }}>
          <div
            className="absolute -inset-x-[6%] inset-y-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-home.webp')",
              opacity: 0.14,
              animation: "tv-static 0.45s steps(1) infinite",
            }}
          />
        </div>
        <div className="container mx-auto px-5 md:px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold text-[#ffffff] mx-auto max-w-4xl mb-4 md:mb-6"
            style={{
              fontSize: "clamp(24px, 4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            CADA DÍA QUE ESPERAS ES OTRA SEMANA DE CITAS PERDIDAS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[14px] md:text-[19px] leading-[1.6] mx-auto max-w-2xl mb-7 md:mb-9"
            style={{ color: "#b4b2a9" }}
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
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#f1ede1] px-8 py-[15px] text-[12px] md:text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "agentes_cta_final", label: "comenzar" })}
            >
              COMENZAR
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
