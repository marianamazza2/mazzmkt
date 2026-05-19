import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    title: "Marketing con IA",
    shortDescription: "Automatizacion y estrategias potenciadas por IA",
    description:
      "Implementamos soluciones de inteligencia artificial para optimizar tus campanas, automatizar procesos y obtener insights predictivos.",
    icon: "Bot",
    features: [
      "Chatbots inteligentes 24/7",
      "Generacion de contenido con IA",
      "Automatizacion de workflows",
      "Analisis predictivo de campanas",
    ],
    slug: "marketing-ia",
  },
  {
    id: "2",
    title: "Desarrollo Web",
    shortDescription: "Sitios y apps con tecnologia de vanguardia",
    description:
      "Creamos experiencias web unicas con las ultimas tecnologias. Nada de templates: codigo custom que destaca.",
    icon: "Code",
    features: [
      "Next.js / React",
      "E-commerce headless",
      "Landing pages de alta conversion",
      "Web apps a medida",
    ],
    slug: "desarrollo-web",
  },
  {
    id: "3",
    title: "Growth Marketing",
    shortDescription: "Estrategias basadas en datos para escalar",
    description:
      "Combinamos creatividad con analisis de datos para disenar estrategias que generan crecimiento sostenible.",
    icon: "TrendingUp",
    features: [
      "SEO tecnico y contenidos",
      "Paid media (Meta, Google)",
      "Email marketing automation",
      "CRO y A/B testing",
    ],
    slug: "growth-marketing",
  },
  {
    id: "4",
    title: "Analytics & Tracking",
    shortDescription: "Medicion y datos para tomar mejores decisiones",
    description:
      "Implementamos y configuramos herramientas de analitica para que entiendas el comportamiento de tus usuarios y optimices cada canal.",
    icon: "ChartBar",
    features: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Microsoft Clarity",
      "Meta Pixel y conversion tracking",
    ],
    slug: "analytics-tracking",
  },
];
