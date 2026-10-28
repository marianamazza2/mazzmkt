// Contenido de la página del Recepcionista IA (/agentes-ia), pensado para cualquier negocio que
// reciba reservas o preguntas: clínicas, centros de estética, peluquerías, estudios, academias…
// Todo el texto vive aquí para poder ajustar plazos o añadir testimonios sin tocar la maqueta.

// Enlace de "Reservar llamada" (Calendly). Mientras esté vacío, el botón lleva a /contacto.
export const bookingUrl = "";

// Demo del chat: una conversación de ejemplo
export const demo = {
  businessName: "Estudio Lúa · Estética y peluquería",
  conversation: [
    { from: "user" as const, text: "Hola, ¿tenéis hueco esta semana para corte y color? 💇‍♀️" },
    {
      from: "agent" as const,
      text: "¡Hola! Claro 😊 Tengo el miércoles a las 18:30 o el jueves a las 10:00 con Laura. ¿Cuál te va mejor?",
    },
    { from: "user" as const, text: "El miércoles 18:30 perfecto" },
    {
      from: "agent" as const,
      text: "¡Reservado! ✅ Miércoles 18:30 con Laura. Te mando un recordatorio el día antes. ¿Necesitas algo más?",
    },
  ],
};

// Lo que hace
export const capabilities = [
  {
    title: "Atiende mientras trabajas",
    description: "Responde al instante aunque estés con otro cliente, de noche o en festivo, y a varios a la vez.",
  },
  {
    title: "Agenda sin llamadas",
    description: "Consulta tu agenda, ofrece los huecos libres y confirma la cita sin solapes ni idas y vueltas.",
  },
  {
    title: "Conoce tu negocio",
    description: "Servicios, precios, horarios, equipo y cómo llegar. Responde con el tono de tu negocio.",
  },
  {
    title: "Menos ausencias",
    description: "Envía recordatorios antes de cada cita para que tus clientes no se olviden.",
  },
  {
    title: "Filtra las consultas",
    description: "Distingue a quien quiere reservar de quien solo pregunta, y te deja los contactos ordenados.",
  },
  {
    title: "Te pasa lo delicado",
    description: "Si un cliente necesita a una persona, te pasa la conversación con todo el contexto.",
  },
];

// Opciones de contratación. Plazos orientativos: revisar antes de publicar.
// El precio no se muestra: es cerrado y se da en la llamada.
export const plans = [
  {
    name: "Recepcionista IA",
    for: "Para negocios que ya tienen web y quieren que atienda y agende sola.",
    includes: [
      "Instalación en tu web actual",
      "Entrenamiento con tus servicios y precios",
      "Conexión con tu agenda",
      "Recordatorios de cita",
      "Ajustes mensuales según sus conversaciones",
    ],
    timing: "En marcha en unas 2 semanas",
  },
  {
    name: "Web + Recepcionista IA",
    for: "Para negocios sin web o con una web que no trae clientes.",
    includes: [
      "Web a medida, con código real",
      "Pensada para que tus clientes reserven",
      "El Recepcionista IA ya integrado",
      "Conexión con tu agenda y recordatorios",
      "Ajustes mensuales según sus conversaciones",
    ],
    timing: "En marcha en unas 4 a 6 semanas",
  },
];

// Preguntas frecuentes: las objeciones antes de decir que sí
export const faqs = [
  {
    question: "Ya uso una plataforma de reservas, ¿para qué lo necesito?",
    answer:
      "Las plataformas como Doctoralia, Booksy o Treatwell te traen clientes desde su directorio. El Recepcionista IA atiende a los que llegan a tu propia web y a tus redes, que ya te han elegido a ti, y además resuelve sus dudas. No compiten: una te da visibilidad y el otro hace que nadie se quede sin respuesta. En la llamada vemos cómo encaja con tu agenda actual.",
  },
  {
    question: "No me fío de dejar a mis clientes en manos de una IA",
    answer:
      "No decide nada por ti: responde con la información que tú le das y con el tono de tu negocio. Lo probamos contigo antes de que hable con nadie, y cuando una conversación necesita a una persona (una queja, un caso especial, algo delicado) te la pasa con todo el contexto.",
  },
  {
    question: "¿No es caro?",
    answer:
      "Tiene un precio cerrado y una cuota fija, sin cargos por uso. Para hacerte una idea: si cada mes recupera solo un par de clientes que antes se iban sin respuesta, normalmente ya se ha pagado. En la llamada te damos el precio exacto para tu negocio.",
  },
  {
    question: "¿Y si se equivoca o no sabe responder?",
    answer:
      "Si no tiene la respuesta, no se la inventa: te pasa la conversación a ti o a tu equipo. Cada mes revisamos lo que ha respondido y lo afinamos para que la próxima vez sí sepa hacerlo.",
  },
  {
    question: "¿Qué pasa con los datos de mis clientes?",
    answer:
      "Lo configuramos para pedir solo lo necesario para atender la consulta o gestionar la cita. Revisamos contigo cómo queda reflejado en el aviso de privacidad de tu web.",
  },
  {
    question: "¿Tengo que cambiar mi web?",
    answer:
      "No. Se instala en tu web actual (WordPress, Webflow o una hecha a medida) sin tocar tu diseño. Y si no tienes web o no te convence, la opción Web + Recepcionista IA incluye una nueva.",
  },
];

// Testimonios de clientes. La sección solo aparece cuando haya al menos uno.
export const testimonials: { quote: string; name: string; role: string }[] = [];
