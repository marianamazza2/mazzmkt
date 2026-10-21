import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/transition-link";
import { Molinillo } from "@/components/brand/molinillo";
import { CardRail } from "@/components/ui/card-rail";

const mainServices = [
  {
    title: "WEBS Y LANDING PAGES",
    subtitle: "SITIOS WEB | LANDINGS",
    description: "Código real, diseño a medida, alto rendimiento. Lista en días.",
  },
  {
    title: "WEB APPS & PLATAFORMAS",
    subtitle: "WEBAPPS | CRM | SAAS | PORTALES",
    description: "CRM, SaaS, portales. La herramienta que tu negocio necesita, a medida.",
  },
  {
    title: "E-COMMERCE",
    subtitle: "TIENDAS ONLINE | E-COMMERCE",
    description: "Tu tienda online sin las limitaciones de los templates.",
  },
];

const alsoServices = ["Branding", "Redes Sociales", "Analytics & Tracking"];

const aiServices = [
  {
    title: "AGENTES IA",
    description: "Atienden y venden por ti en WhatsApp y web, a cualquier hora. Los viste en acción más arriba.",
  },
  {
    title: "AUTOMATIZACIÓN",
    description: "Flujos que conectan tus herramientas y hacen que tu negocio opere solo, sin tareas manuales repetidas.",
  },
  {
    title: "INTEGRACIONES",
    description: "Conectamos tu CRM, agenda, email y las apps que ya usas para que la información viva en un solo sitio.",
  },
  {
    title: "IA GENERATIVA",
    description: "Imágenes, avatares, reels y vídeos. Producción de contenido visual a escala.",
  },
  {
    title: "SEO CON IA",
    description: "Contenido Y ESTRUCTURA optimizada con IA. Más visibilidad orgánica.",
  },
  {
    title: "SEM & PUBLICIDAD META",
    description: "Google Ads y Meta Ads. Campañas creadas y optimizadas con IA.",
  },
];

function ServiceCardDark({
  service,
  index,
}: {
  service: (typeof mainServices)[0] | (typeof aiServices)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div className="relative border border-[#ffffff20] h-full hover:border-light hover:bg-light transition-all duration-300 overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(10, 10, 10, 0.08) 0%, transparent 50%)`
            ),
          }}
        />

        <div className="relative z-10 p-5 md:p-8">
          <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3
            className="text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light group-hover:text-dark mb-3 transition-colors"
          >
            {service.title}
          </h3>

          {"subtitle" in service && (
            <p className="font-mono text-[13px] font-medium uppercase text-light/76 group-hover:text-dark/72 mb-4 transition-colors"
              style={{ letterSpacing: "0.08em" }}>
              {(service as (typeof mainServices)[0]).subtitle}
            </p>
          )}

          <p className="text-body text-light/80 group-hover:text-dark/80 transition-colors">
            {service.description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-dark group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-dark group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

function AiHeader() {
  return (
    <>
      <h2
        className="text-[10px] uppercase mb-2 md:text-[13px] md:mb-5 md:font-medium font-mono"
        style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}
      >
        <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>04</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> Servicios con Inteligencia Artificial
      </h2>
      <p className="text-[30px] font-bold leading-[1] tracking-[-0.04em] text-[#ffffff] font-heading md:text-[clamp(56px,6vw,88px)] md:font-bold md:leading-[0.92] md:tracking-[-0.045em]">
        Tu negocio en{" "}
        <span className="text-[#a1a1a1]">modo IA</span>
      </p>
      <p
        className="text-body mt-3 md:mt-6 md:max-w-2xl"
        style={{ color: "#b3b3b3" }}
      >
        Más allá del agente: la IA automatiza tus procesos, conecta tus herramientas y produce tu contenido. Tu negocio funcionando solo, de fondo.
      </p>
    </>
  );
}

function AiShowcase() {
  return (
    <section className="bg-dark pt-7 md:pt-18 md:pb-10">
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-6 md:mb-10">
          <AiHeader />
        </div>
        <CardRail>
          {aiServices.map((service, index) => (
            <ServiceCardDark key={service.title} service={service} index={index} />
          ))}
        </CardRail>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <>
      {/* Main Services — Light Section */}
      <section className="bg-dark py-7 md:py-18">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-10"
          >
            <h2 className="text-[10px] font-medium uppercase mb-2 md:text-[13px] md:mb-5 md:flex md:items-center md:gap-3 font-mono"
              style={{ letterSpacing: "0.13em", color: "#a1a1a1" }}>
              <span className="inline-flex items-center gap-2 align-middle opacity-50"><span>03</span><Molinillo className="h-[0.9em] w-[0.9em]" /></span> Soluciones digitales en Barcelona
            </h2>
            <p
              className="mb-4 text-[30px] font-bold leading-[1] tracking-[-0.04em] text-light md:mb-0 font-heading md:text-[clamp(56px,6vw,88px)] md:font-bold md:leading-[0.92] md:tracking-[-0.045em]"
            >
              Lo que hacemos
            </p>
          </motion.div>

          <CardRail>
            {mainServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </CardRail>

          {/* También */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 md:mt-12 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span
              className="font-mono text-[13px] font-medium uppercase text-light/72"
              style={{ letterSpacing: "0.08em" }}
            >
              También
            </span>
            <div className="flex flex-wrap gap-2">
              {alsoServices.map((svc) => (
                <span
                  key={svc}
                  className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] px-3.5 py-[6px] rounded-full border border-light/30 text-light"
                >
                  {svc}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Services — Dark Section (scroll horizontal / carrusel) */}
      <AiShowcase />

      {/* CTA IA */}
      <section className="bg-dark -mt-px pt-7 pb-7 md:pt-0 md:pb-16">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center gap-3 rounded-sm border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
            >
              QUIERO MI NEGOCIO CON IA
              <Molinillo className="h-[14px] w-[14px]" />
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
