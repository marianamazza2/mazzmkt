import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, Megaphone, MessageCircle, Bot, Zap, BarChart3, Sparkles, Globe } from "lucide-react";
import { useRef } from "react";
import { TransitionLink } from "@/components/transition/transition-link";

const mainServices = [
  {
    icon: Code,
    title: "DISENO Y DESARROLLO WEB",
    subtitle: "SITIOS WEB | LANDINGS",
    description: "Sitios web modernos, rapidos y disenados para convertir.",
  },
  {
    icon: Palette,
    title: "BRANDING",
    subtitle: "ESTRATEGIA | IDENTIDAD DE MARCA",
    description: "Creamos marcas con proposito, coherencia e identidad visual que conecta.",
  },
  {
    icon: Megaphone,
    title: "PUBLICIDAD DIGITAL",
    subtitle: "SEO | SEM | GOOGLE & META ADS | SOCIAL MEDIA",
    description: "Disenamos estrategias que generan alcance, trafico y resultados medibles.",
  },
];

const aiServices = [
  {
    icon: MessageCircle,
    title: "FLUJOS DE WHATSAPP",
    description: "Creamos flujos y entrenamos tu WhatsApp Business.",
  },
  {
    icon: Bot,
    title: "ASISTENTES AI",
    description: "Bots personalizados que hablan con tu tono de marca.",
  },
  {
    icon: Zap,
    title: "MKT AUTOMATIZADO",
    description: "Integraciones para conectar tus canales, CRM y campanas.",
  },
  {
    icon: BarChart3,
    title: "OPTIMIZACION CON AI",
    description: "Analizamos datos y mejoramos resultados con inteligencia.",
  },
  {
    icon: Sparkles,
    title: "CONTENIDO AI",
    description: "Videos, voces, textos e imagenes creados con IA.",
  },
  {
    icon: Globe,
    title: "WEBS CON AI",
    description: "Sitios webs y landings creados en tiempo record.",
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
      <div className="relative border border-[#14141420] h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 overflow-hidden">
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

        <div className={`relative z-10 ${isMain ? "p-8 md:p-10" : "p-8"}`}>
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
      <div className="relative border border-[#ffffff20] h-full hover:border-[#f1ede1] hover:bg-[#f1ede1] transition-all duration-300 overflow-hidden">
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

        <div className="relative z-10 p-8 md:p-10">
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
      <section className="bg-dark py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3">
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#ffffff]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
              SERVICIOS DE MARKETING DIGITAL
            </p>
            <h2
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 7vw, 98px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              LO QUE HACEMOS{" "}
              <span
                style={{
                  WebkitTextStroke: "1.5px #ffffff",
                  WebkitTextFillColor: "transparent",
                } as React.CSSProperties}
              >
                &raquo;
              </span>
            </h2>
          </motion.div>

          {/* Main Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {mainServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Services - Light Section */}
      <section className="bg-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* AI Services Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-base font-medium text-[#141414aa] mb-6 tracking-widest flex items-center gap-3">
            <motion.span
              className="inline-block w-8 h-[1px] bg-[#141414]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
            Y ADEMAS...
          </p>
          <h2
            className="font-bold text-[#141414]"
            style={{
              fontSize: "clamp(40px, 7vw, 98px)",
              lineHeight: "1.08",
              fontWeight: 700,
            }}
          >
            SERVICIOS{" "}
            <span
              style={{
                WebkitTextStroke: "1.5px #141414",
                WebkitTextFillColor: "transparent",
              } as React.CSSProperties}
            >
              AI
            </span>{" "}
            <span className="text-[#141414aa]">&raquo;</span>
          </h2>
        </motion.div>

        {/* AI Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
              className="group inline-flex items-center gap-3 text-[#141414] text-base font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity"
            >
              QUIERO AUTOMATIZAR MI NEGOCIO
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
