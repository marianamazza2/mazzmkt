import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { useState } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { FilterToggle } from "@/components/ui/filter-toggle";
import {
  Check,
  ChevronDown,
  Zap,
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
}

const faqs: FAQ[] = [
  // GENERAL
  {
    id: 17,
    category: "GENERAL",
    question: "¿Cómo es el proceso para comenzar a trabajar juntos?",
    answer:
      "Nos contactas por whatsApp o a través de la web y te enviamos un formulario inicial para conocer mejor tu proyecto y tus necesidades. Con esa información preparamos una propuesta general adaptada a lo que buscas. Si lo que ofrecemos encaja con lo que necesitas, coordinamos una reunión para conocernos, conversar y definir detalles.",
    highlight: "Contacto → formulario → propuesta → reunión. Así de simple.",
  },
  {
    id: 22,
    category: "GENERAL",
    question: "¿Cómo funciona el proceso antes de iniciar un proyecto?",
    answer:
      "Una vez aprobada la propuesta, enviamos un contrato digital junto con el primer pago de reserva. Esto nos permite alinear expectativas, definir el alcance del proyecto y comenzar el trabajo de manera organizada.",
    highlight: "Propuesta aprobada → contrato + reserva → empezamos.",
  },
   {
    id: 21,
    category: "GENERAL",
    question: "¿Se pide una señal inicial para comenzar?",
    answer:
      "Sí. Para reservar tu lugar en agenda y dar inicio al proyecto, solicitamos una señal del 50% del valor total acordado. El 50% restante se abona al finalizar y antes de la entrega. Esto nos permite planificar tiempos y dedicación real a tu proyecto desde el primer día.",
    highlight: "50% para comenzar, 50% a la entrega. Sin sorpresas.",
  },
  {
    id: 20,
    category: "GENERAL",
    question: "¿Cómo funcionan las revisiones?",
    answer:
      "Ofrecemos hasta dos rondas completas de revisiones en cada proyecto. Nuestro proceso estratégico inicial  briefing, investigación y definición de objetivos  está diseñado para alinear la dirección creativa desde el principio y asegurar que el proyecto avance con claridad y coherencia.\n\nEn caso de necesitarlo, se puede realizar una tercera ronda destinada únicamente a ajustes menores o detalles finales.",
    highlight: "Hasta 2 rondas completas + 1 de ajustes finales si se necesita.",
  },

  // WEB
  {
    id: 1,
    category: "WEB",
    question: "¿Código o No-Code? ¿Cuál es mejor para mi proyecto?",
    answer:
      "Depende de tus objetivos. El No-Code (Webflow, Framer, Wix) es ideal si necesitas una web rápida, con bajo presupuesto y planeas editarla tu mism@. El código a medida es para proyectos que buscan diferenciarse, necesitan funcionalidades específicas, máxima velocidad de carga, o escalar sin limitaciones. Si buscas hacer una página web sin templates en Barcelona, con una experiencia realmente propia y preparada para crecer, el código es el camino.",
    highlight: "Si quieres que tu web grite 'esto es premium', necesitas código.",
  },
  {
    id: 2,
    category: "WEB",
    question: "¿En cuánto tiempo puedo tener mi web lista?",
    answer:
      "Con código, una landing page de alta conversión puede estar lista en 2-3 días hábiles si ya tienes el diseño o el branding definido. Proyectos más complejos con e-commerce, integraciones o funcionalidades custom pueden tomar 1-3 semanas. El No-Code suele tomar tiempos similares pero con menos flexibilidad para cambios estructurales.",
    highlight: "2-3 días si ya tienes tu diseño listo. Sin vueltas.",
  },
  {
    id: 26,
    category: "WEB",
    question: "¿Hacéis diseño web para pequeños negocios en Barcelona?",
    answer:
      "Sí. Trabajamos diseño web para pequeños negocios en Barcelona que necesitan una presencia digital clara, profesional y orientada a convertir: restaurantes, estudios, gimnasios, profesionales independientes, proyectos locales y marcas que quieren verse más sólidas online. Como agencia de desarrollo web en Barcelona, no hacemos webs genéricas; definimos estructura, mensajes, diseño y desarrollo según el tipo de cliente y el objetivo comercial de la web.",
    highlight: "Webs para negocios reales: claras, rápidas y pensadas para vender.",
  },
  {
    id: 27,
    category: "WEB",
    question: "¿Creáis webs profesionales para autónomos en Barcelona?",
    answer:
      "Sí. Una web profesional para autónomos en Barcelona tiene que explicar rápido quién eres, qué ofreces, por qué confiar en ti y cómo contratarte. Por eso trabajamos páginas con estructura estratégica, llamadas a la acción claras, diseño cuidado, SEO básico y una experiencia simple para que el usuario llegue al contacto sin perderse.",
    highlight: "Para autónomos, la web tiene que generar confianza y consultas.",
  },
  {
    id: 28,
    category: "WEB",
    question: "¿Cuánto cuesta una página web en España?",
    answer:
      "Depende del alcance. No cuesta lo mismo una landing page que una web corporativa, una tienda online o una web con diseño, branding, SEO e integraciones. En España, el precio de una página web profesional suele variar según estrategia, número de secciones, nivel de diseño, desarrollo a medida, contenidos y mantenimiento. Por eso no damos precios cerrados sin entender antes el proyecto: primero analizamos lo que necesitas y después preparamos una propuesta clara.",
    highlight: "El precio depende del alcance, no de una tarifa genérica.",
  },
  {
    id: 29,
    category: "WEB",
    question: "¿Diseñáis landing pages de alta conversión en Barcelona?",
    answer:
      "Sí. Una landing page de alta conversión no es solo una página bonita: necesita una promesa clara, jerarquía visual, copy directo, pruebas de confianza, velocidad de carga y una llamada a la acción bien ubicada. La diseñamos y desarrollamos para campañas, lanzamientos, captación de leads, reservas, ventas o validación de una oferta concreta.",
    highlight: "Una landing debe guiar al usuario hacia una acción concreta.",
  },
  {
    id: 30,
    category: "WEB",
    question: "¿Trabajáis webs para restaurantes, psicólogos, gimnasios o inmobiliarias?",
    answer:
      "Sí. Ya trabajamos proyectos de diseño web para restaurante en Barcelona, web para psicólogo, web para gimnasio y branding para inmobiliaria independiente. Cada sector necesita una estructura distinta: un restaurante debe mostrar carta, reservas y personalidad; un psicólogo necesita confianza y claridad; un gimnasio debe transmitir energía y facilitar la conversión; una inmobiliaria independiente necesita profesionalidad, cercanía y credibilidad.",
    highlight: "Adaptamos la web al sector, no al revés.",
  },
  {
    id: 3,
    category: "WEB",
    question: "¿Voy a poder editar mi web yo mism@?",
    answer:
      "Con No-Code, sí. Plataformas como Webflow o Framer tienen editores visuales intuitivos. O si prefieres no tocar nada, ofrecemos planes de mantenimiento donde nos encargamos de todo lo que necesites.",
    highlight:
      "No-Code = lo editas tú. Código = editas contenido o lo hacemos nosotros.",
  },
  {
    id: 18,
    category: "WEB",
    question: "¿El desarrollo incluye hosting y dominio?",
    answer:
      "El dominio es tuyo y lo registras tú (te guiamos si lo necesitas). Para el hosting, en proyectos con código usamos Vercel, una plataforma de alto rendimiento que en muchos casos es gratuita. En proyectos No-Code, el hosting ya está incluido en la plataforma elegida. En todos los casos te asesoramos para que todo quede bajo tu control y no dependas de nosotros para nada crítico.",
    highlight: "Tu dominio, tu hosting, tu control. Nosotros te guiamos.",
  },
  // BRANDING
  {
    id: 19,
    category: "BRANDING",
    question: "¿Cuánto tarda el proceso de branding?",
    answer:
      "Un branding completo tarda entre 2 y 4 semanas, dependiendo de la complejidad de la marca y la velocidad de feedback de tu parte. El proceso tiene etapas claras: estrategia y brief, exploración de conceptos, desarrollo de la identidad elegida, y entrega de archivos finales con guidelines. No apuramos el proceso porque una identidad bien construida es una inversión a largo plazo.",
    highlight: "2-4 semanas para una identidad que dure años.",
  },
  {
    id: 5,
    category: "BRANDING",
    question: "¿Qué incluye el servicio de branding?",
    answer:
      "Nuestro branding cubre desde la estrategia de marca hasta la identidad visual completa: logo, paleta de colores, tipografías, sistema de iconos, guidelines de uso, aplicaciones básicas de la marca (tarjetas, redes, papelería) y la marca en vivo, es decir, mockups reales que muestran tu identidad aplicada en distintos soportes para que puedas ver cómo se ve antes de salir al mundo. Y si además contratas el servicio de aplicaciones, sumamos un set ampliado de mockups de ejemplo para mostrar tu marca en acción con mayor profundidad y variedad. No es solo un logo bonito, es construir una identidad que comunique quién sos y por qué deberían elegirte.",
    highlight: "Branding = estrategia + identidad. No solo un logo.",
  },
  {
    id: 6,
    category: "BRANDING",
    question: "¿Ya tengo logo, necesito branding completo?",
    answer:
      "Un logo solo no es branding. Si tu marca no tiene coherencia visual (colores definidos, tipografías, tono de comunicación), cada pieza que crees va a sentirse desconectada. Podemos trabajar desde tu logo existente y construir un sistema visual completo, o si el logo no está a la altura, proponer un rediseño.",
    highlight: "Logo ≠ Branding. Tu marca necesita un sistema completo.",
  },
  // SEO
  {
    id: 9,
    category: "SEO",
    question: "¿Cuánto tarda en verse resultados con SEO?",
    answer:
      "El SEO es una estrategia a mediano-largo plazo. Los primeros resultados suelen verse entre 3 y 6 meses, dependiendo de la competencia en tu sector y el estado actual de tu web. Pero una vez que posicionas, el tráfico es orgánico y sostenido. Es la inversión que más retorno da a largo plazo.",
    highlight: "3-6 meses para resultados. Después, tráfico gratis y constante.",
  },
  {
    id: 10,
    category: "SEO",
    question: "¿Qué incluye el servicio de SEO?",
    answer:
      "Auditoría técnica completa, investigación de palabras clave, optimización on-page (títulos, metas, estructura, velocidad), estrategia de contenido, link building, y reportes mensuales con métricas claras.",
    highlight: "SEO técnico + contenido + reportes. Todo medible.",
  },
  {
    id: 23,
    category: "SEO",
    question: "¿Gestionáis Google Search Console?",
    answer:
      "Sí. Google Search Console es una herramienta clave para entender cómo Google ve tu web: qué páginas indexa, por qué palabras clave apareces, qué errores detecta el rastreo y cómo evoluciona tu presencia orgánica. Lo configuramos, lo conectamos con Analytics y lo monitorizamos de forma continua para detectar caídas, errores de cobertura o oportunidades de mejora antes de que afecten tu posicionamiento.",
    highlight: "Sin Search Console no sabes cómo te ve Google. Nosotros lo vemos por ti.",
  },
  {
    id: 24,
    category: "SEO",
    question: "¿Qué es el sitemap y por qué importa para el SEO?",
    answer:
      "El sitemap es un archivo XML que le dice a los motores de búsqueda qué páginas existen en tu web y cómo están organizadas. Sin él, Google tiene que descubrir tu contenido solo, lo que puede llevar más tiempo o dejar páginas sin indexar. Nos encargamos de generarlo, mantenerlo actualizado y enviarlo a Search Console para que tu sitio se rastree de forma eficiente desde el primer día.",
    highlight: "Sitemap = hoja de ruta para que Google no se pierda nada.",
  },
  {
    id: 25,
    category: "SEO",
    question: "¿Para qué sirve el archivo robots.txt?",
    answer:
      "El robots.txt le indica a los rastreadores de Google (y otros buscadores) qué partes de tu web pueden o no pueden visitar. Mal configurado puede bloquear páginas importantes y hundir tu posicionamiento sin que te des cuenta. Auditamos y configuramos el tuyo correctamente: bloqueamos lo que no debe indexarse (páginas de administración, duplicados, parámetros de URL) y nos aseguramos de que nada relevante quede fuera del alcance de Google.",
    highlight: "Un robots.txt mal hecho puede dejar tu web invisible. Lo hacemos bien.",
  },
  // REDES SOCIALES
  {
    id: 11,
    category: "REDES SOCIALES",
    question: "¿Qué hacéis en redes sociales?",
    answer:
      "Nos centramos en el diseño: creamos la línea visual de tu feed y diseñamos las piezas que necesitas (posts, carruseles, historias y portadas), siempre coherentes con tu marca. No llevamos la gestión diaria ni la publicación; te entregamos un feed con identidad y piezas listas para que las publiques tú o tu equipo.",
    highlight: "Diseñamos tu feed y tus piezas. La publicación queda en tus manos.",
  },
  {
    id: 12,
    category: "REDES SOCIALES",
    question: "¿Me dais plantillas para seguir publicando por mi cuenta?",
    answer:
      "Sí. Además de las piezas, podemos diseñarte plantillas editables (por ejemplo en Canva o Figma) para que sigas creando contenido sin perder la coherencia visual. Así tu feed mantiene el mismo estilo aunque publiques tú, sin depender de nosotros para cada post.",
    highlight: "Plantillas editables para que tu feed siga siendo tuyo y coherente.",
  },
  // ANALYTICS
  {
    id: 15,
    category: "ANALYTICS",
    question: "¿Qué incluye el servicio de Analytics & Tracking?",
    answer:
      "Configuramos e implementamos todo el stack de medición que tu negocio necesita: GA4 para seguimiento completo de usuarios, comportamiento y conversiones; Google Tag Manager para gestionar todos los eventos y disparadores sin depender del equipo de desarrollo; Microsoft Clarity para mapas de calor, grabaciones de sesiones y análisis de experiencia; e implementamos los píxeles de Meta y TikTok para que tus campañas de publicidad pagada cuenten con datos precisos y optimización real. El objetivo es que cada decisión que tomes esté respaldada por datos reales, no suposiciones.",
    highlight: "Sin medición no hay optimización. Sin datos, no hay estrategia.",
  },
  {
    id: 16,
    category: "ANALYTICS",
    question: "¿Por qué necesito GA4 y Tag Manager bien configurados?",
    answer:
      "Muchos negocios tienen GA4 instalado pero mal configurado: eventos que no disparan, conversiones que no se registran, datos que no reflejan la realidad. Un setup correcto te permite saber exactamente de dónde vienen tus usuarios, qué hacen en tu web, dónde se pierden y cuáles son los canales que realmente convierten. Tag Manager centraliza toda la lógica de tracking en un solo lugar, sin necesidad de tocar el código cada vez que necesitas medir algo nuevo.",
    highlight: "GA4 mal configurado = decisiones mal tomadas.",
  },
  // IA
  {
    id: 13,
    category: "IA",
    question: "¿Usan inteligencia artificial? ¿Eso afecta la calidad?",
    answer:
      "Sí, y nos ayuda a ser mucho más eficientes. Herramientas como Claude Code y Codex nos permiten desarrollar más rápido, con menos errores, y explorar soluciones que antes nos llevaban días, en horas. La IA nos da una ventaja competitiva real: iteramos más rápido, entregamos mejor, y el resultado final es superior. No lo usamos para hacer lo mismo de siempre, lo usamos para hacer cosas que antes no eran posibles.",
    highlight: "IA = ventaja competitiva real. Más rápido, mejor, sin límites. IA para acelerar, humanos para decidir.",
  },
  // IA · Recepcionista IA
  {
    id: 31,
    category: "IA",
    question: "¿Tengo que cambiar mi web para instalar el Recepcionista IA?",
    answer:
      "No. Se instala en cualquier web (WordPress, Shopify, Webflow o una hecha a medida) sin tocar tu diseño. Lo instalamos nosotros.",
    highlight: "Funciona con tu web tal como está.",
  },
  {
    id: 32,
    category: "IA",
    question: "¿Qué pasa si el Recepcionista IA no sabe responder?",
    answer:
      "Te pasa la conversación a ti o a tu equipo, con lo que ha preguntado el cliente. Y lo afinamos para que la próxima vez sí sepa hacerlo.",
    highlight: "Si no sabe, te avisa. Y aprende para la próxima.",
  },
  {
    id: 33,
    category: "IA",
    question: "¿Y si mi agenda está en otra herramienta?",
    answer:
      "Conectamos el Recepcionista IA con Google Calendar, Calendly y las herramientas que ya usas. Si usas otra, la integramos.",
    highlight: "Se adapta a tu agenda, no al revés.",
  },
];

const categories = [
  "TODOS",
  "ANALYTICS",
  "BRANDING",
  "GENERAL",
  "IA",
  "REDES SOCIALES",
  "SEO",
  "WEB",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredFaqs =
    activeCategory === "TODOS"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const categoryCounts = categories.map((category) => ({
    value: category,
    count: category === "TODOS" ? faqs.length : faqs.filter((faq) => faq.category === category).length,
  }));
  const activeCategoryCount =
    categoryCounts.find((category) => category.value === activeCategory)?.count ?? faqs.length;

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <SEOHead
        title="FAQs - Preguntas Frecuentes | MAZZMKT"
        description="Preguntas frecuentes sobre desarrollo web con código real, branding, web apps, automatización, IA y marketing digital en Barcelona."
        jsonLd={faqSchema}
      />

      <PageHero
        crumbs={[{ label: "FAQs" }]}
        title={<>Preguntas<br />frecuentes</>}
        subtitle="Lo que necesitas saber antes de trabajar juntos. Sin letra pequeña, sin rodeos."
      />

      {/* FAQs Section */}
      <section id="faqs" className="bg-dark pt-10 pb-8 md:pt-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          {/* Filtros de escritorio: el mismo toggle que en /proyectos y en el mismo sitio
              (arriba de la sección, alineado a la izquierda) */}
          <div className="hidden md:flex mb-9">
            <FilterToggle
              label="Filtrar preguntas por categoría"
              layoutId="faq-filter-pill"
              value={activeCategory}
              onChange={setActiveCategory}
              options={categories.map((c) => ({ value: c, label: c === "TODOS" ? "Todo" : c }))}
            />
          </div>

          {/* Dropdown filtro  solo mobile */}
          <div className="relative md:hidden mb-5">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen((open) => !open)}
              aria-expanded={isMobileFilterOpen}
              className="flex w-full items-center justify-between rounded-sm border border-dark/10 bg-light px-3 py-2.5 text-left text-dark shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors hover:border-dark/20"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dark" />
                <span className="truncate font-mono text-[12px] font-semibold uppercase tracking-[0.08em]">
                  {activeCategory}
                </span>
              </span>
              <span className="flex items-center gap-2 text-dark/60">
                <span className="font-mono text-[11px]">{activeCategoryCount}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-sm border border-dark/12 bg-[#1b1b1b] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  {categoryCounts.map((category) => {
                    const isActive = category.value === activeCategory;

                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => {
                          setActiveCategory(category.value);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-dark text-light"
                            : "text-dark/80 hover:bg-dark/5 hover:text-[#0a0a0a]"
                        }`}
                      >
                        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em]">
                          {category.value}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[11px] opacity-70">{category.count}</span>
                          {isActive && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    // Como los acordeones de /servicios: preguntas separadas por una línea, sin tarjeta
                    className="border-t border-light/13 first:border-t-0 last:border-b"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="group w-full py-6 md:py-8 flex items-center gap-4 md:gap-6 text-left"
                    >
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                          <span
                            className="font-mono text-[10px] md:text-[13px] font-medium uppercase text-[#a1a1a1]"
                            style={{ letterSpacing: "0.13em" }}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h2
                          className="normal-case text-[18px] md:text-[22px] lg:text-[24px] font-bold leading-tight text-light"
                          style={{ letterSpacing: "-0.025em" }}
                        >
                          {faq.question}
                        </h2>
                      </div>

                      {/* Toggle: el mismo círculo con flecha que los acordeones de /servicios */}
                      <div
                        className={`h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-full border transition-colors duration-300 flex-shrink-0 ${
                          isOpen
                            ? "border-light bg-light text-dark"
                            : "border-light/30 text-light group-hover:border-light"
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          strokeWidth={1.5}
                        />
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
                          <div className="pb-6 md:pb-10">
                            <div className="text-body max-w-4xl text-[#a1a1a1] mb-4 md:mb-6 space-y-4">
                              {faq.answer.split("\n\n").map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                              ))}
                            </div>
                            {faq.highlight && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 bg-light/5 border-l-2 border-light"
                              >
                                <Zap
                                  className="w-3 h-3 md:w-4 md:h-4 text-light flex-shrink-0"
                                  strokeWidth={1.5}
                                />
                                <span className="text-light text-[13px] md:text-[15px] font-medium">
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
            <p className="text-[10px] md:text-[13px] font-medium text-[#ffffffaa] mb-6 md:mb-5 uppercase tracking-[0.13em] flex items-center gap-3 font-mono">
              <span className="inline-block w-8 h-[1px] bg-[#ffffff]" />
              EN NÚMEROS
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:gap-12 justify-items-center text-center">
            {[
              { number: "50%", label: "SEÑAL INICIAL", sublabel: "para comenzar" },
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
                <p className="text-xs font-semibold text-[#ffffff] uppercase font-mono" style={{ letterSpacing: "0.09em" }}>
                  {stat.label}
                </p>
                <p className="text-xs text-[#ffffffaa]">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
