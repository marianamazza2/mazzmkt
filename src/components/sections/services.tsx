import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { TransitionLink } from "@/components/transition/transition-link";
import { Molinillo } from "@/components/brand/molinillo";

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

          <p className="text-[17px] text-light/80 group-hover:text-dark/80 leading-[1.55] transition-colors">
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
        <span className="hidden md:inline text-[#a1a1a1]">modo IA</span>
        <span className="md:hidden">modo IA</span>
      </p>
      <p
        className="text-[14px] leading-[1.7] mt-3 md:text-[19px] md:leading-[1.55] md:mt-6 md:max-w-2xl"
        style={{ color: "#b3b3b3" }}
      >
        Más allá del agente: la IA automatiza tus procesos, conecta tus herramientas y produce tu contenido. Tu negocio funcionando solo, de fondo.
      </p>
    </>
  );
}

function AiShowcase() {
  const [selectedAiService, setSelectedAiService] = useState(0);

  return (
    <>
      {/* Desktop: rejilla de cards */}
      <section className="hidden md:block bg-dark pt-18 pb-10">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <AiHeader />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Móvil: slider (mismo estilo que "Lo que hacemos", en dark) */}
      <section className="md:hidden bg-dark pt-7">
        <div className="container mx-auto px-5 mb-6">
          <AiHeader />
        </div>
        <div className="px-5">
          <div className="h-[190px]">
            {(() => {
              const active = aiServices[selectedAiService];
              const total = aiServices.length;
              const handleNext = () => setSelectedAiService((prev) => (prev + 1) % total);
              const handlePrev = () => setSelectedAiService((prev) => (prev - 1 + total) % total);
              return (
                <motion.div
                  key={selectedAiService}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-[0.25rem] p-5 h-full overflow-hidden select-none cursor-grab active:cursor-grabbing border border-[#ffffff20]"
                  style={{ background: "#1a1a1a" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) handleNext();
                    else if (info.offset.x > 50) handlePrev();
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[11px] text-light/50 flex-shrink-0">{String(selectedAiService + 1).padStart(2, "0")}</span>
                    <p className="text-[13px] font-semibold uppercase text-light" style={{ letterSpacing: "0.04em" }}>
                      {active.title}
                    </p>
                  </div>

                  <p className="text-[13px] leading-[1.6]" style={{ color: "#b3b3b3" }}>
                    {active.description}
                  </p>
                </motion.div>
              );
            })()}
          </div>

          {/* Dots navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", paddingTop: "18px" }}>
            {aiServices.map((_, i) => (
              <span
                key={i}
                onClick={() => setSelectedAiService(i)}
                style={{
                  display: "block",
                  width: i === selectedAiService ? "18px" : "4px",
                  height: "4px",
                  borderRadius: "9999px",
                  backgroundColor: i === selectedAiService ? "#ffffff" : "rgba(255, 255, 255,0.25)",
                  transition: "width 300ms ease-out, background-color 300ms ease-out",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Services() {
  const [selectedMobileService, setSelectedMobileService] = useState(0);

  const toTagCase = (tag: string) =>
    tag.toLowerCase().charAt(0).toUpperCase() + tag.toLowerCase().slice(1);

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

          {/* Mobile: slider */}
          <div className="md:hidden">
            <div className="h-[210px]">
              {(() => {
                const total = mainServices.length;
                const handleNext = () => setSelectedMobileService((prev) => (prev + 1) % total);
                const handlePrev = () => setSelectedMobileService((prev) => (prev - 1 + total) % total);
                return (
                  <motion.div
                    key={selectedMobileService}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="rounded-[0.25rem] p-5 h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
                    style={{ background: "#1a1a1a" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.08}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) handleNext();
                      else if (info.offset.x > 50) handlePrev();
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[11px] text-light/50 flex-shrink-0">{String(selectedMobileService + 1).padStart(2, "0")}</span>
                      <p className="text-[13px] font-semibold uppercase text-light" style={{ letterSpacing: "0.04em" }}>
                        {mainServices[selectedMobileService].title}
                      </p>
                    </div>

                    <p className="text-[13px] leading-[1.6] mb-4" style={{ color: "#a1a1a1" }}>
                      {mainServices[selectedMobileService].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {mainServices[selectedMobileService].subtitle.split("|").map(tag => (
                        <span
                          key={tag}
                          className="text-[12px] px-3 py-[5px] rounded-full border"
                          style={{ borderColor: "rgba(255, 255, 255, 0.18)", color: "#8f8f8f" }}
                        >
                          {toTagCase(tag.trim())}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Dots navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", paddingTop: "18px" }}>
              {mainServices.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedMobileService(i)}
                  style={{
                    display: "block",
                    width: i === selectedMobileService ? "18px" : "4px",
                    height: "4px",
                    borderRadius: "9999px",
                    backgroundColor: i === selectedMobileService ? "#ffffff" : "rgba(255, 255, 255,0.25)",
                    transition: "width 300ms ease-out, background-color 300ms ease-out",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: carrusel horizontal de cards */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {mainServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </div>

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
              className="inline-flex items-center gap-[6px] text-[11px] font-medium uppercase md:gap-3 md:rounded-sm md:border md:border-light/30 md:px-8 md:py-[15px] md:text-[13px] md:font-semibold md:text-light md:transition-colors md:hover:border-light font-mono"
              style={{ letterSpacing: "0.09em", color: "#ffffff" }}
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
