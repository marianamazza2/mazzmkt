import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, MessageCircle, Bot, Zap, Sparkles, Globe, Wand2, Search, Share2, TrendingUp, Shuffle } from "lucide-react";
import { useRef, useState } from "react";
import { TransitionLink } from "@/components/transition/transition-link";

const mainServices = [
  {
    icon: Code,
    title: "TU WEB LISTA EN DIAS",
    subtitle: "SITIOS WEB | LANDINGS | E-COMMERCE",
    description: "Diseñamos y desarrollamos tu web en tiempo record. Velocidad real, tecnologia de ultima generacion y diseno que impacta.",
  },
  {
    icon: Zap,
    title: "WEB APPS & PLATAFORMAS A MEDIDA",
    subtitle: "WEBAPPS | CRM | SAAS | PORTALES",
    description: "Desarrollamos la herramienta digital que tu negocio necesita. Desde un CRM propio hasta una plataforma completa, construida exactamente como la imaginas.",
  },
  {
    icon: Palette,
    title: "BRANDING QUE DEJA HUELLA",
    subtitle: "IDENTIDAD VISUAL | ESTRATEGIA | POSICIONAMIENTO",
    description: "Construimos marcas que la gente recuerda. Desde el nombre hasta cada pixel: coherencia, caracter y una identidad visual que genera confianza instantanea.",
  },
  {
    icon: Share2,
    title: "GESTION DE REDES SOCIALES",
    subtitle: "CONTENIDO | COMUNIDAD | CRECIMIENTO",
    description: "Gestionamos tus redes con estrategia y coherencia de marca. Contenido que engancha, comunidad que crece y presencia digital que convierte.",
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
    icon: Search,
    title: "SEO CON IA",
    description: "Posicionamiento organico acelerado con inteligencia artificial. Auditoria tecnica, keywords y contenido que Google quiere rankear.",
  },
];

// Grid 2×2 para sección IA en mobile
const mobileAiCards = [
  { icon: Globe, title: "WEBS CON IA", desc: "Desarrollo acelerado" },
  { icon: Bot, title: "CHATBOTS", desc: "Atención 24/7" },
  { icon: TrendingUp, title: "ANALYTICS", desc: "Datos inteligentes" },
  { icon: Shuffle, title: "FLUJOS", desc: "Procesos automáticos" },
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
  const [openMobileService, setOpenMobileService] = useState(0);

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
            <p className="text-[10px] font-medium uppercase mb-2 md:text-[15px] md:mb-5 md:flex md:items-center md:gap-3 md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#a3a199" }}>
              SERVICIOS DE MARKETING DIGITAL
            </p>
            <h2
              className="mb-4 text-[20px] font-medium leading-[1.1] text-[#ffffff] md:mb-0 md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              LO QUE HACEMOS{" "}
              <span className="hidden md:inline" style={{ color: "#ffffff" }}>&raquo;</span>
            </h2>
          </motion.div>

          {/* Mobile: lista compacta de servicios */}
          <div className="md:hidden flex flex-col gap-[2px]">
            {mainServices.map((service, index) => {
              const isOpen = openMobileService === index;

              return (
                <div
                  key={service.title}
                  className="overflow-hidden rounded-sm"
                  style={{ background: "rgba(241, 239, 232, 0.04)" }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mobile-service-${index}`}
                    onClick={() => setOpenMobileService((current) => current === index ? -1 : index)}
                    className="flex w-full items-center justify-between px-4 py-[14px] text-left"
                  >
                    <div className="flex items-center gap-[10px]">
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: "#B4B2A9", minWidth: "18px" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p
                          className="text-[13px] font-medium uppercase"
                          style={{ letterSpacing: "0.5px", color: "#f1ede1" }}
                        >
                          {service.title}
                        </p>
                        <p
                          className="mt-[1px] text-[11px]"
                          style={{ color: "#888780" }}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[14px]"
                      style={{ color: "#B4B2A9" }}
                    >
                      ›
                    </motion.span>
                  </button>

                  <motion.div
                    id={`mobile-service-${index}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-4 pb-4 pl-[52px] text-[13px] leading-[1.6]"
                      style={{ color: "#d8d4c8" }}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Desktop: carrusel horizontal de cards */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
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
            <p
              className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#77766f" }}
            >
              INTELIGENCIA ARTIFICIAL
            </p>
            <h2
              className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              TU NEGOCIO EN{" "}
              <span className="hidden md:inline text-[#141414aa]">MODO IA</span>
              <span className="md:hidden">MODO IA</span>
              <span className="hidden md:inline text-[#141414aa]"> &raquo;</span>
            </h2>

            {/* Mobile: párrafo introductorio */}
            <p
              className="md:hidden text-[13px] leading-[1.7] mt-3"
              style={{ color: "#888780" }}
            >
              Automatizamos procesos, creamos asistentes inteligentes y aceleramos tu negocio con IA.
            </p>
          </motion.div>

          {/* Mobile: grid 2×2 */}
          <div className="md:hidden grid grid-cols-2 gap-[2px] mb-5">
            {mobileAiCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="px-[14px] py-4 rounded-sm"
                  style={{ background: "rgba(44, 44, 42, 0.04)" }}
                >
                  <Icon
                    className="mb-[6px]"
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: "#5F5E5A" }}
                  />
                  <p
                    className="text-[12px] font-medium uppercase"
                    style={{ letterSpacing: "0.5px", color: "#141414" }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="text-[11px] mt-[2px] leading-[1.4]"
                    style={{ color: "#5F5E5A" }}
                  >
                    {card.desc}
                  </p>
                </div>
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
