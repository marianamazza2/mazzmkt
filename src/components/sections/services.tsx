import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, MessageCircle, Bot, Zap, Sparkles, Globe, Wand2, Search, Share2 } from "lucide-react";
import { useRef } from "react";
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
    title: "APPS & PLATAFORMAS A MEDIDA",
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
    title: "ASISTENTES IA",
    description: "Un asistente que conoce tu negocio al 100%, atiende a tus clientes 24/7 y nunca deja escapar una oportunidad de venta.",
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

// Service card with cursor-following glow effect
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
      className="group relative"
    >
      <div className="relative border border-[#14141420] h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 overflow-hidden rounded-sm">
        {/* Cursor-following glow */}
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

        <div className={`relative z-10 ${isMain ? "p-5 md:p-10" : "p-5 md:p-8"}`}>
          {/* Number index */}
          <div className="flex items-start justify-between mb-6">
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
            style={{
              fontSize: "20px",
              lineHeight: "1.1",
              fontWeight: 700,
            }}
          >
            {service.title}
          </h3>

          {"subtitle" in service && (
            <p className="text-xs font-medium text-[#141414aa] group-hover:text-[#f1ede1aa] mb-4 tracking-wide transition-colors">
              {(service as (typeof mainServices)[0]).subtitle}
            </p>
          )}

          <p
            className={`${isMain ? "text-base" : "text-sm"} text-[#141414cc] group-hover:text-[#f1ede1cc] leading-relaxed transition-colors`}
          >
            {service.description}
          </p>
        </div>

        {/* Corner accent on hover */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

// Service card for dark background
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
        {/* Cursor-following glow */}
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

        <div className="relative z-10 p-5 md:p-10">
          {/* Number index */}
          <div className="flex items-start justify-between mb-6">
            <Icon
              className="h-10 w-10 text-[#f1ede1] group-hover:text-[#141414] transition-colors"
              strokeWidth={1.5}
            />
            <span className="text-4xl md:text-5xl font-bold text-[#ffffff15] group-hover:text-[#14141420] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="font-bold text-[#f1ede1] group-hover:text-[#141414] mb-3 transition-colors"
            style={{
              fontSize: "20px",
              lineHeight: "1.1",
              fontWeight: 700,
            }}
          >
            {service.title}
          </h3>

          <p className="text-xs font-medium text-[#f1ede1aa] group-hover:text-[#141414aa] mb-4 tracking-wide transition-colors">
            {service.subtitle}
          </p>

          <p className="text-base text-[#f1ede1cc] group-hover:text-[#141414cc] leading-relaxed transition-colors">
            {service.description}
          </p>
        </div>

        {/* Corner accent on hover */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#141414] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#141414] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <>
      {/* Main Services - Dark Section */}
      <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-20"
          >
            <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3 font-geist">
              SERVICIOS DE MARKETING DIGITAL
            </p>
            <h2
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-section)",
                lineHeight: "var(--lh-section)",
                fontWeight: 700,
              }}
            >
              LO QUE HACEMOS{" "}
              <span
                style={{
                  color: "#ffffff",
                } as React.CSSProperties}
              >
                &raquo;
              </span>
            </h2>
          </motion.div>

          {/* Main Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {mainServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Services - Light Section */}
      <section className="bg-light py-14 md:py-24">
        <div className="container mx-auto px-6">
          {/* AI Services Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <p className="text-base font-medium text-[#141414aa] mb-6 tracking-widest flex items-center gap-3 font-geist">
            INTELIGENCIA ARTIFICIAL
          </p>
          <h2
            className="font-bold text-[#141414]"
            style={{
              fontSize: "var(--font-section)",
              lineHeight: "var(--lh-section)",
              fontWeight: 700,
            }}
          >
            TU NEGOCIO EN{" "}
            <span className="text-[#141414aa]">MODO IA</span>{" "}
            <span className="text-[#141414aa]">&raquo;</span>
          </h2>
        </motion.div>

        {/* AI Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
          {aiServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index + 3} variant="ai" />
          ))}
        </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TransitionLink
              to="/contacto"
              className="group inline-flex items-center gap-3 min-h-[44px] text-[#141414] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity font-geist"
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
