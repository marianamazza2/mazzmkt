import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageCTA } from "@/components/sections/page-cta";
import { useState } from "react";
import {
  Plus,
  Minus,
  Code,
  Puzzle,
  Clock,
  Wrench,
  Sparkles,
  Rocket,
  MessageCircle,
  CreditCard,
  RefreshCw,
  Shield,
  Zap,
  Palette,
  Target,
  Search,
  Share2,
  TrendingUp,
  Megaphone,
  BarChart3,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
});

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  highlight?: string;
  icon: typeof Code;
}

const faqs: FAQ[] = [
  // WEB
  {
    id: 1,
    category: "WEB",
    icon: Code,
    question: "¿Codigo o No-Code? ¿Cual es mejor para mi proyecto?",
    answer:
      "Depende de tus objetivos. El No-Code (Webflow, Framer, Wix) es ideal si necesitas una web rapida, con bajo presupuesto y planeas editarla vos mism@. El codigo a medida es para proyectos que buscan diferenciarse, necesitan funcionalidades especificas, maxima velocidad de carga, o escalar sin limitaciones. Si tu marca busca destacar y transmitir innovacion, el codigo es el camino.",
    highlight: "Si queres que tu web grite 'esto es premium', necesitas codigo.",
  },
  {
    id: 2,
    category: "WEB",
    icon: Clock,
    question: "¿En cuanto tiempo puedo tener mi web lista?",
    answer:
      "Con codigo, una landing o web institucional puede estar lista en 2-3 dias habiles. Esto no incluye el diseno ni branding (si ya lo tenes, volamos). Proyectos mas complejos con e-commerce, integraciones o funcionalidades custom pueden tomar 1-3 semanas. El No-Code suele tomar tiempos similares pero con menos flexibilidad para cambios estructurales.",
    highlight: "2-3 dias si ya tenes tu diseno listo. Sin vueltas.",
  },
  {
    id: 3,
    category: "WEB",
    icon: Wrench,
    question: "¿Voy a poder editar mi web yo mism@?",
    answer:
      "Con No-Code, si. Plataformas como Webflow o Framer tienen editores visuales intuitivos. Con codigo, depende de como lo construyamos: podemos integrar un CMS headless (Sanity, Strapi) para que edites contenido facilmente, o si preferis no tocar nada, ofrecemos planes de mantenimiento mensuales donde nos encargamos de todo.",
    highlight:
      "No-Code = editas vos. Codigo = editas contenido o lo hacemos nosotros.",
  },
  {
    id: 4,
    category: "WEB",
    icon: Zap,
    question: "¿Que tecnologias usan para desarrollar?",
    answer:
      "Trabajamos con el stack mas moderno del mercado: Next.js 16, React 19, TypeScript, Tailwind CSS 4, y Framer Motion para animaciones. Usamos herramientas de AI como Claude Code para acelerar desarrollo sin perder calidad. El resultado: webs ultra rapidas, SEO-friendly, y con un codigo limpio y mantenible.",
    highlight: "Stack 2025: Next.js + React + AI = velocidad x3.",
  },
  // BRANDING
  {
    id: 5,
    category: "BRANDING",
    icon: Palette,
    question: "¿Que incluye el servicio de branding?",
    answer:
      "Nuestro branding cubre desde la estrategia de marca hasta la identidad visual completa: logo, paleta de colores, tipografias, sistema de iconos, guidelines de uso, y aplicaciones (tarjetas, redes, papeleria). No es solo un logo bonito, es construir una identidad que comunique quien sos y por que deberian elegirte.",
    highlight: "Branding = estrategia + identidad. No solo un logo.",
  },
  {
    id: 6,
    category: "BRANDING",
    icon: Sparkles,
    question: "¿Ya tengo logo, necesito branding completo?",
    answer:
      "Un logo solo no es branding. Si tu marca no tiene coherencia visual (colores definidos, tipografias, tono de comunicacion), cada pieza que crees va a sentirse desconectada. Podemos trabajar desde tu logo existente y construir un sistema visual completo, o si el logo no esta a la altura, proponer un rediseno.",
    highlight: "Logo ≠ Branding. Tu marca necesita un sistema completo.",
  },
  // PUBLICIDAD
  {
    id: 7,
    category: "PUBLICIDAD",
    icon: Megaphone,
    question: "¿Que tipo de publicidad digital manejan?",
    answer:
      "Gestionamos campanas en Meta Ads (Instagram y Facebook), Google Ads (Search, Display, YouTube), y TikTok Ads. Desde la estrategia y segmentacion hasta la creacion de piezas y la optimizacion continua. No tiramos plata en ads sin estrategia: cada peso invertido tiene un objetivo medible.",
    highlight: "Meta + Google + TikTok. Estrategia antes que presupuesto.",
  },
  {
    id: 8,
    category: "PUBLICIDAD",
    icon: Target,
    question: "¿Cuanto deberia invertir en publicidad?",
    answer:
      "No hay un minimo universal, pero recomendamos arrancar con al menos $300-500 USD/mes en ads para tener data suficiente y optimizar. Lo importante no es cuanto invertis, sino como. Con buena segmentacion, creativos fuertes y optimizacion constante, podemos lograr resultados con presupuestos accesibles. El fee de gestion es aparte de la inversion en plataformas.",
    highlight: "No se trata de cuanto, sino de como invertis.",
  },
  // SEO
  {
    id: 9,
    category: "SEO",
    icon: Search,
    question: "¿Cuanto tarda en verse resultados con SEO?",
    answer:
      "El SEO es una estrategia a mediano-largo plazo. Los primeros resultados suelen verse entre 3 y 6 meses, dependiendo de la competencia en tu sector y el estado actual de tu web. Pero una vez que posicionas, el trafico es organico y sostenido. Es la inversion que mas retorno da a largo plazo.",
    highlight: "3-6 meses para resultados. Despues, trafico gratis y constante.",
  },
  {
    id: 10,
    category: "SEO",
    icon: TrendingUp,
    question: "¿Que incluye el servicio de SEO?",
    answer:
      "Auditoria tecnica completa, investigacion de palabras clave, optimizacion on-page (titulos, metas, estructura, velocidad), estrategia de contenido, link building, y reportes mensuales con metricas claras. No vendemos humo: si algo no se puede medir, no lo hacemos.",
    highlight: "SEO tecnico + contenido + reportes. Todo medible.",
  },
  // REDES SOCIALES
  {
    id: 11,
    category: "REDES SOCIALES",
    icon: Share2,
    question: "¿Manejan redes sociales? ¿Que incluye?",
    answer:
      "Si. Ofrecemos gestion integral de redes: estrategia de contenido, calendario editorial, diseno de piezas, copywriting, publicacion, community management, y reportes mensuales. Trabajamos Instagram, TikTok, LinkedIn, y otras plataformas segun tu audiencia. No publicamos por publicar: cada post tiene un proposito.",
    highlight: "Estrategia + contenido + gestion. No solo postear.",
  },
  {
    id: 12,
    category: "REDES SOCIALES",
    icon: BarChart3,
    question: "¿Puedo ver resultados de la gestion de redes?",
    answer:
      "Por supuesto. Entregamos reportes mensuales con metricas reales: alcance, engagement, crecimiento de seguidores, clicks, y conversiones. No nos quedamos en vanity metrics (likes). Lo que importa es si tus redes estan generando comunidad, confianza y, en ultima instancia, ventas.",
    highlight: "Reportes mensuales. Metricas que importan, no vanity metrics.",
  },
  // AI
  {
    id: 13,
    category: "AI",
    icon: Bot,
    question: "¿Usan inteligencia artificial? ¿Eso afecta la calidad?",
    answer:
      "Si, usamos AI como herramienta de productividad, no como reemplazo. Herramientas como Claude Code nos ayudan a escribir codigo mas rapido y con menos errores. Pero cada linea es revisada, cada decision es humana, y la estrategia creativa siempre viene de nosotr@s. La AI potencia, no reemplaza.",
    highlight: "AI = mas rapido + misma calidad. Lo mejor de ambos mundos.",
  },
  {
    id: 14,
    category: "AI",
    icon: Sparkles,
    question: "¿Como aplican AI en marketing y contenido?",
    answer:
      "Usamos AI para acelerar investigacion de mercado, generar borradores de copy, analizar datos de campanas, crear variantes de anuncios para A/B testing, y automatizar tareas repetitivas. Pero la estrategia, la creatividad y la voz de marca siempre son humanas. La AI es el turbo, nosotros manejamos el volante.",
    highlight: "AI para acelerar. Humanos para decidir.",
  },
];

const categories = [
  "TODOS",
  "WEB",
  "BRANDING",
  "PUBLICIDAD",
  "SEO",
  "REDES SOCIALES",
  "AI",
];

function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState("TODOS");

  const filteredFaqs =
    activeCategory === "TODOS"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <SEOHead
        title="FAQs - Preguntas Frecuentes | MAZZMKT"
        description="Resolvemos tus dudas sobre desarrollo web, branding y marketing digital. Codigo vs No-Code, tiempos de entrega, precios y mas."
      />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-medium text-[#ffffffcc] mb-6 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#ffffff]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>FAQS</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              PREGUNTAS
              <br />
              <span className="text-[#ffffff50]">FRECUENTES &raquo;</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#ffffffcc] leading-relaxed mt-8 max-w-2xl"
              style={{ fontSize: "18px" }}
            >
              Lo que necesitas saber antes de trabajar juntos. Sin letra chica,
              sin vueltas.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-light py-8 border-b border-[#14141410]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#141414] text-[#ffffff]"
                    : "bg-transparent text-[#141414aa] border border-[#14141420] hover:border-[#141414] hover:text-[#141414]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const IconComponent = faq.icon;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`border transition-all duration-500 ${
                      isOpen
                        ? "border-[#141414] bg-[#141414]"
                        : "border-[#14141420] bg-transparent hover:border-[#14141460]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 md:p-8 flex items-start gap-4 md:gap-6 text-left"
                    >
                      {/* Number */}
                      <span
                        className={`text-4xl md:text-5xl font-bold transition-colors duration-300 ${
                          isOpen ? "text-[#ffffff20]" : "text-[#14141415]"
                        }`}
                      >
                        {String(faq.id).padStart(2, "0")}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                            strokeWidth={1.5}
                          />
                          <span
                            className={`text-xs font-semibold tracking-widest transition-colors duration-300 font-geist ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h3
                          className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                            isOpen ? "text-[#ffffff]" : "text-[#141414]"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Toggle Icon */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                          isOpen
                            ? "border-[#ffffff30] text-[#ffffff]"
                            : "border-[#14141420] text-[#141414]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-5 h-5" strokeWidth={1.5} />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-8 md:pb-10 pl-[72px] md:pl-[104px]">
                            <p className="text-[#ffffffaa] leading-relaxed mb-6" style={{ fontSize: "18px" }}>
                              {faq.answer}
                            </p>
                            {faq.highlight && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-4 py-3 bg-[#ffffff10] border-l-2 border-[#ffffff]"
                              >
                                <Zap
                                  className="w-4 h-4 text-[#ffffff] flex-shrink-0"
                                  strokeWidth={1.5}
                                />
                                <span className="text-[#ffffff] text-sm font-medium">
                                  {faq.highlight}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-dark py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-base font-medium text-[#ffffffaa] mb-6 tracking-widest flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-[#ffffff]" />
              EN NUMEROS
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "2-3", label: "DIAS DESARROLLO", sublabel: "con codigo" },
              { number: "50%", label: "SENA INICIAL", sublabel: "para arrancar" },
              { number: "15", label: "DIAS SOPORTE", sublabel: "post-lanzamiento" },
              { number: "24H", label: "RESPUESTA", sublabel: "garantizada" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p
                  className="font-bold text-[#ffffff] mb-2"
                  style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
                >
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-[#ffffff] tracking-wide">
                  {stat.label}
                </p>
                <p className="text-xs text-[#ffffffaa]">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
