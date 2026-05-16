import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageCTA } from "@/components/sections/page-cta";
import { TransitionLink } from "@/components/transition/transition-link";
import { useState } from "react";
import {
  Plus,
  Minus,
  Code,
  Clock,
  Wrench,
  Sparkles,
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
      "Trabajamos con el stack mas moderno del mercado: Next.js 16, React 19, TypeScript, Tailwind CSS 4, y Framer Motion para animaciones. Usamos herramientas de IA como Claude Code para acelerar desarrollo sin perder calidad. El resultado: webs ultra rapidas, SEO-friendly, y con un codigo limpio y mantenible.",
    highlight: "Stack 2025: Next.js + React + IA = velocidad x3.",
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
  // IA
  {
    id: 13,
    category: "IA",
    icon: Bot,
    question: "¿Usan inteligencia artificial? ¿Eso afecta la calidad?",
    answer:
      "Si, usamos IA como herramienta de productividad, no como reemplazo. Herramientas como Claude Code nos ayudan a escribir codigo mas rapido y con menos errores. Pero cada linea es revisada, cada decision es humana, y la estrategia creativa siempre viene de nosotr@s. La IA potencia, no reemplaza.",
    highlight: "IA = mas rapido + misma calidad. Lo mejor de ambos mundos.",
  },
  {
    id: 14,
    category: "IA",
    icon: Sparkles,
    question: "¿Como aplican IA en marketing y contenido?",
    answer:
      "Usamos IA para acelerar investigacion de mercado, generar borradores de copy, analizar datos de campanas, crear variantes de anuncios para A/B testing, y automatizar tareas repetitivas. Pero la estrategia, la creatividad y la voz de marca siempre son humanas. La IA es el turbo, nosotros manejamos el volante.",
    highlight: "IA para acelerar. Humanos para decidir.",
  },
];

const categories = [
  "TODOS",
  "WEB",
  "BRANDING",
  "PUBLICIDAD",
  "SEO",
  "REDES SOCIALES",
  "IA",
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
      <section className="bg-dark pt-5 pb-[18px] md:pt-32 md:pb-16 relative overflow-hidden">
        <div
          className="hidden md:block absolute -inset-x-[2%] inset-y-0 bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-home.png')`,
            backgroundPosition: "center center",
            backgroundSize: "100% auto",
            opacity: 0.25,
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
              className="text-[10px] md:text-[15px] font-medium text-[#888780] md:text-[#ffffffe0] mb-1.5 md:mb-5 tracking-[1.5px] md:tracking-[0.14em] uppercase flex items-center gap-3 font-geist"
            >
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>FAQS</span>
            </motion.p>
            <h1
              className="faqs-hero-title font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              PREGUNTAS
              <br />
              <span className="text-[#ffffff]">FRECUENTES <span className="hidden md:inline">&raquo;</span></span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="faqs-hero-subtitle text-[#f1ede1aa] leading-relaxed mt-8 max-w-xl"
              style={{ fontSize: "18px" }}
            >
              Lo que necesitas saber antes de trabajar juntos. Sin letra chica,
              sin vueltas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden md:flex items-center gap-3 mt-9"
            >
              <a
                href="#faqs"
                className="inline-flex items-center justify-center rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                VER PREGUNTAS
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                CONTACTAR
              </TransitionLink>
            </motion.div>

            {/* Dropdown filtro — solo mobile */}
            <div className="md:hidden mt-3">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none cursor-pointer focus:outline-none"
                style={{
                  padding: "9px 36px 9px 12px",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "3px",
                  background: "transparent",
                  color: "#F1EFE8",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%235F5E5A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#141414", color: "#F1EFE8" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter — oculto en mobile, visible en desktop */}
      <section className="hidden md:block bg-light py-7 border-b border-[#14141410]">
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
                className={`rounded-sm px-6 py-3 text-sm font-semibold uppercase transition-all duration-300 font-geist ${
                  activeCategory === category
                    ? "bg-[#141414] text-[#ffffff]"
                    : "bg-transparent text-[#141414aa] border border-[#14141420] hover:border-[#141414] hover:text-[#141414]"
                }`}
                style={{ letterSpacing: "0.09em" }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="bg-light py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-0.5 md:space-y-5"
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
                    className={`rounded-sm border transition-all duration-500 ${
                      isOpen
                        ? "border-[#141414] bg-[#141414]"
                        : "border-[#14141420] bg-transparent hover:border-[#14141460]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full py-3.5 px-4 md:p-7 lg:p-8 flex items-start gap-3 md:gap-5 lg:gap-6 text-left"
                    >
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                          <IconComponent
                            className={`w-3 h-3 md:w-5 md:h-5 transition-colors duration-300 ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                            strokeWidth={1.5}
                          />
                          <span
                            className={`text-[10px] md:text-xs font-semibold tracking-[1.5px] md:tracking-widest transition-colors duration-300 font-geist ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h3
                          className={`text-sm md:text-[22px] lg:text-[26px] font-bold leading-tight transition-colors duration-300 ${
                            isOpen ? "text-[#ffffff]" : "text-[#141414]"
                          }`}
                          style={{ letterSpacing: "-0.025em" }}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Toggle Icon */}
                      <div
                        className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                          isOpen
                            ? "border-[#ffffff30] text-[#ffffff]"
                            : "border-[#14141420] text-[#141414]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
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
                          <div className="px-4 md:px-7 lg:px-8 pb-4 md:pb-8 lg:pb-10">
                            <p className="faqs-answer-text max-w-4xl text-[#ffffffaa] md:text-[17px] leading-relaxed mb-3 md:mb-6">
                              {faq.answer}
                            </p>
                            {faq.highlight && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 bg-[#ffffff10] border-l-2 border-[#ffffff]"
                              >
                                <Zap
                                  className="w-3 h-3 md:w-4 md:h-4 text-[#ffffff] flex-shrink-0"
                                  strokeWidth={1.5}
                                />
                                <span className="text-[#ffffff] text-[11px] md:text-[15px] font-medium">
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
      <section className="bg-dark py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-12"
          >
            <p className="text-[10px] md:text-[15px] font-medium text-[#ffffffaa] mb-6 md:mb-5 uppercase tracking-[0.13em] flex items-center gap-3 font-geist">
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
                  style={{ fontSize: "var(--font-stat)" }}
                >
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-[#ffffff] uppercase font-geist" style={{ letterSpacing: "0.09em" }}>
                  {stat.label}
                </p>
                <p className="text-xs text-[#ffffffaa]">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA mobile — contextual FAQs */}
      <section className="md:hidden bg-[#141414] py-7 px-5 text-center">
        <h2
          className="font-bold text-[#F1EFE8] mb-1.5"
          style={{ fontSize: "18px", lineHeight: 1.2, letterSpacing: "0.3px" }}
        >
          ¿MÁS DUDAS?
        </h2>
        <p className="text-[#5F5E5A] text-xs mb-4">
          Escribinos y te respondemos en 24h
        </p>
        <a
          href="/contacto"
          className="inline-flex items-center gap-1.5 bg-[#F1EFE8] text-[#141414] font-medium uppercase rounded-[3px]"
          style={{ padding: "12px 28px", fontSize: "11px", letterSpacing: "1.5px" }}
        >
          CONTACTAR →
        </a>
      </section>

      <div className="hidden md:block">
        <PageCTA />
      </div>
    </>
  );
}
