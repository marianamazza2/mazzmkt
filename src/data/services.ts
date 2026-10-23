import type { ServiceGroup } from "@/types";

// Catálogo completo de servicios, ordenado con los tres verbos del hero.
// Las introducciones cuentan el recorrido del cliente: marca → web → automatización.
// Lo usan la home ("Lo que hacemos" y la sección de IA) y la página /servicios.
// Los productos del estudio (como el recepcionista IA) viven aparte, en data/products.ts.
// En las introducciones, [[corchetes dobles]] marcan las frases que se subrayan solas en /servicios.
export const serviceGroups: ServiceGroup[] = [
  {
    id: "disenamos",
    verb: "Diseñamos",
    title: "Marca y contenido",
    intro:
      "Creamos [[tu marca desde cero]] o renovamos la que ya tienes: definimos su [[estrategia]], diseñamos una [[identidad visual]] reconocible y la llevamos a tus redes.",
    items: [
      {
        title: "Branding",
        subtitle: "Estrategia | Identidad visual ",
        description: "Desarrollamos la estrategia y la identidad visual de tu marca, o creamos una identidad visual alineada con la estrategia que ya tienes.",
      },
      {
        title: "Rebranding",
        subtitle: "Rediseño | Evolución de marca",
        description: "Le damos una nueva vida a tu marca: la actualizamos sin perder lo que ya te hace reconocible.",
      },
      {
        title: "Redes sociales",
        subtitle: "Diseño de feed | Piezas | Plantillas",
        description: "Diseñamos tu feed y las piezas para tus redes, coherentes con tu marca y listas para publicar.",
      },
    ],
  },
  {
    id: "programamos",
    verb: "Programamos",
    title: "Webs, apps y plataformas",
    intro:
      "Llevamos [[tu marca al mundo digital]]. Creamos tu [[web]], tu [[tienda online]], o la [[plataforma]] que tu negocio necesita, con código real y diseño a medida.",
    items: [
      {
        title: "Webs y landing pages",
        subtitle: "Sitios web | Landings",
        description: "Código real, diseño a medida, alto rendimiento.",
      },
      {
        title: "Web apps & plataformas",
        subtitle: "Webapps | CRM | SaaS | Portales",
        description: "CRM, SaaS, portales. La herramienta que tu negocio necesita, a medida.",
      },
      {
        title: "E-commerce",
        subtitle: "Tiendas online",
        description: "Tu tienda online sin las limitaciones de los templates.",
      },
    ],
  },
  {
    id: "automatizamos",
    verb: "Automatizamos",
    title: "Inteligencia artificial",
    intro:
      "Si tu [[negocio]] ya vive en digital, conectamos herramientas e incorporamos IA para automatizar tareas, atender consultas y hacer que [[trabaje por ti]].",
    items: [
      {
        title: "Automatización",
        subtitle: "Workflows | Chatbots | WhatsApp",
        description: "Flujos y chatbots a medida en WhatsApp, web y tus herramientas, para que tu negocio opere solo y sin tareas repetidas.",
      },
      {
        title: "Integraciones",
        subtitle: "CRM | Agenda | Email",
        description: "Conectamos tu CRM, agenda, email y las apps que ya usas para que la información viva en un solo sitio.",
      },
      {
        title: "IA generativa",
        subtitle: "Imagen | Vídeo | Avatares",
        description: "Imágenes, avatares, reels y vídeos. Producción de contenido visual a escala.",
      },
      {
        title: "SEO con IA",
        subtitle: "Contenido | Estructura",
        description: "Contenido y estructura optimizados con IA. Más visibilidad orgánica.",
      },
      {
        title: "SEM & publicidad Meta",
        subtitle: "Google Ads | Meta Ads",
        description: "Google Ads y Meta Ads. Campañas creadas y optimizadas con IA.",
      },
      {
        title: "Analytics & tracking",
        subtitle: "GA4 | Tag Manager | Píxeles",
        description: "GA4, Tag Manager, Clarity, píxeles. Decisiones con datos reales.",
      },
    ],
  },
];

export const getServiceGroup = (id: ServiceGroup["id"]) =>
  serviceGroups.find((group) => group.id === id)!;
