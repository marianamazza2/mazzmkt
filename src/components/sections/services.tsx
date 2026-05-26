import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, MessageCircle, Bot, Zap, Sparkles, Globe, Wand2, Search, BarChart2, Share2, Target } from "lucide-react";
import { useRef, useState } from "react";
import { TransitionLink } from "@/components/transition/transition-link";

const mainServices = [
  {
    icon: Code,
    title: "TU WEB LISTA EN DIAS",
    subtitle: "SITIOS WEB | LANDINGS | E-COMMERCE",
    description: "Tu web lista en tiempo récord. Tecnología de última generación y diseño que impacta desde el primer día.",
  },
  {
    icon: Zap,
    title: "WEB APPS & PLATAFORMAS",
    subtitle: "WEBAPPS | CRM | SAAS | PORTALES",
    description: "La herramienta digital que tu negocio necesita, construida exactamente como la imaginas. CRM, SaaS o portal: a medida.",
  },
  {
    icon: Palette,
    title: "BRANDING QUE DEJA HUELLA",
    subtitle: "IDENTIDAD VISUAL | ESTRATEGIA ",
    description: "Marcas que la gente recuerda. Coherencia, carácter e identidad visual que genera confianza instantánea.",
  },
  {
    icon: BarChart2,
    title: "ANALYTICS & TRACKING",
    subtitle: "GA4 | TAG MANAGER | CLARITY | PÍXELES",
    description: "Implementamos GA4, Tag Manager y píxeles para entender a tus usuarios y tomar decisiones basadas en datos reales.",
  },
  {
    icon: Search,
    title: "SEO CON IA",
    subtitle: "POSICIONAMIENTO | KEYWORDS | AUDITORÍA",
    description: "Posicionamiento orgánico acelerado con inteligencia artificial. Auditoría técnica, keywords y contenido que Google quiere rankear.",
  },
  {
    icon: Share2,
    title: "GESTIÓN DE REDES SOCIALES",
    subtitle: "INSTAGRAM | ADS MANAGER",
    description: "Estrategia, contenido y gestión diaria. Presencia en redes que conecta con tu audiencia y genera negocio.",
  },
];

const aiServices = [
  {
    icon: Globe,
    title: "WEBS CON IA",
    description: "Tu web, landing o e-commerce lista en tiempo record. Diseno a medida, alto rendimiento tecnico y resultados desde el primer dia.",
  },
  {
    icon: Bot,
    title: "AUTOMATIZACIÓN",
    description: "Automatizamos tus procesos y creamos flujos para que tu negocio opere solo. Menos tareas repetitivas, mas tiempo para crecer.",
  },
  {
    icon: MessageCircle,
    title: "VENTAS POR WHATSAPP",
    description: "Automatiza respuestas, califica leads y cierra ventas en el canal donde tus clientes ya estan. Sin esfuerzo manual.",
  },
  {
    icon: Wand2,
    title: "IA GENERATIVA",
    description: "Imagenes de producto, avatares, reels y videos generados con IA. Produccion visual de alta calidad a escala, sin los tiempos ni costes de la produccion tradicional.",
  },
  {
    icon: Sparkles,
    title: "CONTENIDO SIN LIMITE",
    description: "30 dias de contenido en pocas horas. Videos, copys, voiceovers e imagenes con calidad profesional generados con IA.",
  },
  {
    icon: Target,
    title: "SEM & PUBLICIDAD META",
    description: "Campañas de pago que venden. Google Ads, Meta Ads y TikTok Ads gestionados con IA para maximizar tu ROAS desde el primer día.",
  },
];

const mobileAiCards = [
  { icon: Globe, title: "Webs con IA", subtitle: "En tiempo récord" },
  { icon: Bot, title: "Automatización", subtitle: "Procesos eficientes" },
  { icon: MessageCircle, title: "WhatsApp", subtitle: "Ventas en chat" },
  { icon: Sparkles, title: "IA generativa", subtitle: "Contenido a escala" },
];


function ServiceCard({
  service,
  index,
  variant = "main",
}: {
  service: (typeof mainServices)[0] | (typeof aiServices)[0];
  index: number;
  variant?: "main" | "ai";
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

  const isMain = variant === "main";
  const Icon = service.icon;

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
      <div className="relative border border-[#14141420] h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.08) 0%, transparent 50%)`
            ),
          }}
        />

        <div className={`relative z-10 ${isMain ? "p-5 md:p-8" : "p-5 md:p-7"}`}>
          <div className="flex items-start justify-between mb-6 md:mb-7">
            <Icon
              className={`${isMain ? "h-10 w-10" : "h-8 w-8"} text-[#141414] group-hover:text-[#ffffff] transition-colors`}
              strokeWidth={1.5}
            />
            <span className="text-4xl md:text-5xl font-bold text-[#14141415] group-hover:text-[#ffffff20] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="font-bold text-[#141414] group-hover:text-[#ffffff] mb-3 transition-colors"
            style={{ fontSize: "24px", lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            {service.title}
          </h3>

          {"subtitle" in service && (
            <p className="text-[13px] font-medium text-[#141414b8] group-hover:text-[#f1ede1cc] mb-4 uppercase transition-colors"
              style={{ letterSpacing: "0.08em" }}>
              {(service as (typeof mainServices)[0]).subtitle}
            </p>
          )}

          <p className={`${isMain ? "text-[17px]" : "text-base"} text-[#141414cc] group-hover:text-[#f1ede1cc] leading-[1.55] transition-colors`}>
            {service.description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCardDark({
  service,
  index,
}: {
  service: (typeof mainServices)[0];
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

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="relative border border-[#ffffff20] h-full hover:border-[#f1ede1] hover:bg-[#f1ede1] transition-all duration-300 overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(20, 20, 20, 0.08) 0%, transparent 50%)`
            ),
          }}
        />

        <div className="relative z-10 p-5 md:p-8">
          <div className="flex items-start justify-between mb-6 md:mb-7">
            <Icon className="h-10 w-10 text-[#f1ede1] group-hover:text-[#141414] transition-colors" strokeWidth={1.5} />
            <span className="text-4xl md:text-5xl font-bold text-[#ffffff15] group-hover:text-[#14141420] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="font-bold text-[#f1ede1] group-hover:text-[#141414] mb-3 transition-colors"
            style={{ fontSize: "24px", lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            {service.title}
          </h3>

          <p className="text-[13px] font-medium uppercase text-[#f1ede1c2] group-hover:text-[#141414b8] mb-4 transition-colors"
            style={{ letterSpacing: "0.08em" }}>
            {service.subtitle}
          </p>

          <p className="text-[17px] text-[#f1ede1cc] group-hover:text-[#141414cc] leading-[1.55] transition-colors">
            {service.description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#141414] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#141414] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [selectedMobileService, setSelectedMobileService] = useState(0);

  const toTagCase = (tag: string) =>
    tag.toLowerCase().charAt(0).toUpperCase() + tag.toLowerCase().slice(1);

  return (
    <>
      {/* Main Services — Dark Section */}
      <section className="bg-dark py-7 md:py-18">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-10"
          >
            <h2 className="text-[10px] font-medium uppercase mb-2 md:text-[15px] md:mb-5 md:flex md:items-center md:gap-3 md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#a3a199" }}>
              Servicios de Marketing Digital en Barcelona
            </h2>
            <p
              className="mb-4 text-[20px] font-medium leading-[1.1] text-[#ffffff] md:mb-0 md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              LO QUE HACEMOS{" "}
              <span className="hidden md:inline" style={{ color: "#ffffff" }}>&raquo;</span>
            </p>
          </motion.div>

          {/* Mobile: slider */}
          <div className="md:hidden">
            <div className="h-[210px]">
              {(() => {
                const ActiveIcon = mainServices[selectedMobileService].icon;
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
                    style={{ background: "rgba(255, 255, 255, 0.06)" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.08}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) handleNext();
                      else if (info.offset.x > 50) handlePrev();
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <ActiveIcon size={20} strokeWidth={1.5} style={{ color: "#f1ede1" }} />
                      </div>
                      <p className="text-[13px] font-semibold uppercase text-[#f1ede1]" style={{ letterSpacing: "0.04em" }}>
                        {mainServices[selectedMobileService].title}
                      </p>
                    </div>

                    <p className="text-[13px] leading-[1.6] mb-4" style={{ color: "#c8c4b8" }}>
                      {mainServices[selectedMobileService].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {mainServices[selectedMobileService].subtitle.split("|").map(tag => (
                        <span
                          key={tag}
                          className="text-[12px] px-3 py-[5px] rounded-full border"
                          style={{ borderColor: "rgba(255, 255, 255, 0.18)", color: "#a3a199" }}
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
                    backgroundColor: i === selectedMobileService ? "#F1EDE1" : "rgba(241,237,225,0.32)",
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
        </div>
      </section>

      {/* AI Services — Light Section */}
      <section className="bg-light py-7 md:py-16">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 md:mb-10"
          >
            <h2
              className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#77766f" }}
            >
              Marketing con Inteligencia Artificial
            </h2>
            <p
              className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              TU NEGOCIO EN{" "}
              <span className="hidden md:inline text-[#141414aa]">MODO IA</span>
              <span className="md:hidden">MODO IA</span>
              <span className="hidden md:inline text-[#141414aa]"> &raquo;</span>
            </p>

            {/* Mobile: párrafo introductorio */}
            <p
              className="md:hidden text-[13px] leading-[1.7] mt-3"
              style={{ color: "#888780" }}
            >
              Automatizamos procesos, creamos asistentes inteligentes y aceleramos tu negocio con IA.
            </p>
          </motion.div>

          {/* Mobile: grid 2x2 de cards IA */}
          <div className="md:hidden grid grid-cols-2 gap-[2px] mb-5">
            {mobileAiCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="rounded-sm p-5"
                  style={{ background: "#e9e5d9" }}
                >
                  <Icon size={20} strokeWidth={1.5} className="mb-4" style={{ color: "#5F5E5A" }} />
                  <p
                    className="text-[13px] font-semibold uppercase text-[#141414] mb-1"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {card.title}
                  </p>
                  <p className="text-[12px] text-[#888780] leading-[1.4]">
                    {card.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: carrusel horizontal de cards */}
          <div className="hidden md:flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 mb-10 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0 md:gap-5 md:mb-10">
            {aiServices.map((service, index) => (
              <div key={service.title} className="snap-center flex-shrink-0 w-[85vw] md:w-auto h-full">
                <ServiceCard service={service} index={index + 3} variant="ai" />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center gap-[6px] text-[11px] font-medium uppercase md:gap-3 md:rounded-sm md:border md:border-[#1414144d] md:px-8 md:py-[15px] md:text-sm md:font-semibold md:text-[#141414] md:transition-colors md:hover:border-[#141414] md:font-geist"
              style={{ letterSpacing: "0.09em", color: "#141414" }}
            >
              QUIERO MI NEGOCIO CON IA
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
