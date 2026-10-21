import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    title: "Marketing con IA",
    shortDescription: "Automatización y estrategias potenciadas por IA",
    description:
      "Implementamos soluciones de inteligencia artificial para optimizar tus campañas, automatizar procesos y obtener insights predictivos.",
    features: [
      "Chatbots inteligentes 24/7",
      "Generación de contenido con IA",
      "Automatización de workflows",
      "Análisis predictivo de campañas",
    ],
    slug: "marketing-ia",
  },
  {
    id: "2",
    title: "Desarrollo Web",
    shortDescription: "Sitios y apps con tecnología de vanguardia",
    description:
      "Creamos experiencias web únicas con las últimas tecnologías. Nada de templates: código custom que destaca.",
    features: [
      "Next.js / React",
      "E-commerce headless",
      "Landing pages de alta conversión",
      "Web apps a medida",
    ],
    slug: "desarrollo-web",
  },
  {
    id: "3",
    title: "Growth Marketing",
    shortDescription: "Estrategias basadas en datos para escalar",
    description:
      "Combinamos creatividad con análisis de datos para diseñar estrategias que generan crecimiento sostenible.",
    features: [
      "SEO técnico y de contenidos",
      "Google Search Console y Search Ads 360",
      "Paid media (Meta, Google)",
      "Email marketing automation",
      "CRO y A/B testing",
    ],
    slug: "growth-marketing",
  },
  {
    id: "4",
    title: "Analytics & Tracking",
    shortDescription: "Medición y datos para tomar mejores decisiones",
    description:
      "Implementamos y configuramos herramientas de analítica para que entiendas el comportamiento de tus usuarios y optimices cada canal.",
    features: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Microsoft Clarity",
      "Meta Pixel y conversion tracking",
    ],
    slug: "analytics-tracking",
  },
];
