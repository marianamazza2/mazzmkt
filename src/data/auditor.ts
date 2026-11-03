// Textos del auditor web (/auditor). El informe sale de api/auditor.ts.
// Regla de honestidad del módulo analyze-web: no afirmar lo que no se ha comprobado.
// Por eso se dice "preparada para el móvil" y no "se ve bien", y "el pie dice 2019" y no "es de 2019".

export type Reserva = "none" | "plataforma" | "propia" | "dudoso";

export type InformeAuditor = {
  estado: "ok" | "no_disponible" | "entrada_invalida";
  web: string | null;
  movil: boolean | null;
  https: boolean | null;
  reserva: Reserva;
  plataforma: string | null;
  cta: boolean | null;
  tipo: "plantilla" | "a_medida" | "dudoso";
  constructor: string | null;
  anio: number | null;
  restantes: number;
};

export type Veredicto = "bien" | "mejorar" | "dudoso";

export type Punto = {
  id: string;
  etiqueta: string;
  veredicto: Veredicto;
  titular: string;
  texto: string;
};

export const veredictoLabel: Record<Veredicto, string> = {
  bien: "Bien",
  mejorar: "A mejorar",
  dudoso: "Sin confirmar",
};

export const mensajesCarga = [
  "Abriendo tu web",
  "Mirando cómo se ve en el móvil",
  "Buscando cómo se reserva",
  "Contando los botones de contacto",
  "Leyendo el pie de página",
  "Casi está",
];

export const errores: Record<string, string> = {
  url_invalida: "Esa dirección no parece una web. Prueba con algo como tuclinica.com.",
  no_disponible: "No hemos podido abrir tu web. Revisa que la dirección esté bien escrita o prueba en un rato.",
  limite: "Has hecho 10 análisis hoy, que es el máximo. Vuelve mañana o escríbenos y lo vemos contigo.",
  en_curso: "Ya estamos analizando una web tuya. Espera a que termine y prueba otra.",
  fallo: "Algo ha fallado por nuestra parte. Prueba de nuevo en un momento.",
};

const plataformas: Record<string, string> = {
  doctoralia: "Doctoralia",
  booksy: "Booksy",
  treatwell: "Treatwell",
  fresha: "Fresha",
  calendly: "Calendly",
  "cal.com": "Cal.com",
  simplybook: "SimplyBook",
  reservio: "Reservio",
  setmore: "Setmore",
  timify: "Timify",
  flowww: "Flowww",
  koibox: "Koibox",
};

const constructores: Record<string, string> = {
  wix: "Wix",
  squarespace: "Squarespace",
  framer: "Framer",
  webflow: "Webflow",
  wordpress: "WordPress",
};

function nombreConstructor(valor: string | null) {
  if (!valor) return null;
  const [base, tema] = valor.split(":");
  const nombre = constructores[base] ?? base;
  return tema ? `${nombre} con el tema ${tema.charAt(0).toUpperCase()}${tema.slice(1)}` : nombre;
}

const noComprobado = "No hemos podido comprobarlo desde aquí. Escríbenos y la miramos contigo.";

export function puntosDelInforme(r: InformeAuditor, anioActual = new Date().getFullYear()): Punto[] {
  const constructor = nombreConstructor(r.constructor);
  const plataforma = r.plataforma ? plataformas[r.plataforma] ?? r.plataforma : null;

  return [
    {
      id: "movil",
      etiqueta: "Móvil",
      ...(r.movil === true
        ? {
            veredicto: "bien" as const,
            titular: "Preparada para el móvil",
            texto:
              "Tu web le pide al teléfono que la adapte a su pantalla (eso es el «viewport»). Lo que no podemos ver desde aquí es cómo queda: ábrela en tu móvil y compruébalo.",
          }
        : r.movil === false
          ? {
              veredicto: "mejorar" as const,
              titular: "No está preparada para el móvil",
              texto:
                "En el teléfono se verá en pequeño y habrá que hacer zoom. La mayoría de tus clientes te buscan desde el móvil.",
            }
          : { veredicto: "dudoso" as const, titular: "No lo sabemos", texto: noComprobado }),
    },
    {
      id: "https",
      etiqueta: "Seguridad",
      ...(r.https === true
        ? {
            veredicto: "bien" as const,
            titular: "Tiene el candado",
            texto: "Tu web usa «https», la conexión segura del candado. Los navegadores no avisan de nada raro.",
          }
        : r.https === false
          ? {
              veredicto: "mejorar" as const,
              titular: "No tiene el candado",
              texto:
                "Tu web no usa «https», la conexión segura. Algunos navegadores avisan de que no es segura, y eso espanta a cualquiera.",
            }
          : { veredicto: "dudoso" as const, titular: "No lo sabemos", texto: noComprobado }),
    },
    {
      id: "reserva",
      etiqueta: "Reserva online",
      ...(r.reserva === "plataforma" || r.reserva === "propia"
        ? {
            veredicto: "bien" as const,
            titular: "Tus clientes pueden reservar solos",
            texto: plataforma
              ? `Hemos encontrado reserva online con ${plataforma}. Nadie tiene que esperar a que contestes para pedir cita.`
              : "Hemos encontrado una forma de reservar desde la web. Nadie tiene que esperar a que contestes para pedir cita.",
          }
        : r.reserva === "none"
          ? {
              veredicto: "mejorar" as const,
              titular: "No tienes reserva online",
              texto:
                "Tu web dice que las citas son por teléfono o WhatsApp. Quien te escribe a las 11 de la noche tiene que esperar a mañana, y a veces reserva en otro sitio.",
            }
          : {
              veredicto: "dudoso" as const,
              titular: "No hemos encontrado cómo reservar",
              texto:
                "No vemos ninguna forma de pedir cita desde la web. Si la tienes, puede que esté escondida: tus clientes tampoco la encontrarán fácil.",
            }),
    },
    {
      id: "cta",
      etiqueta: "Llamadas a la acción",
      ...(r.cta === true
        ? {
            veredicto: "bien" as const,
            titular: "Tiene botones para contactar",
            texto:
              "Hemos encontrado botones o enlaces para pedir cita o escribirte (las «llamadas a la acción»). Comprueba que se vean nada más entrar, sin tener que buscarlos.",
          }
        : r.cta === false
          ? {
              veredicto: "mejorar" as const,
              titular: "No hay botones para contactar",
              texto:
                "No hemos encontrado ningún botón para pedir cita o escribirte. Quien entra no sabe qué hacer después, y se va.",
            }
          : { veredicto: "dudoso" as const, titular: "No lo sabemos", texto: noComprobado }),
    },
    {
      id: "tipo",
      etiqueta: "Plantilla o a medida",
      ...(r.tipo === "a_medida"
        ? {
            veredicto: "bien" as const,
            titular: "Todo apunta a una web a medida",
            texto:
              "No hemos encontrado la huella de ningún constructor conocido, como Wix o Squarespace. Lo más probable es que esté hecha solo para ti.",
          }
        : r.tipo === "plantilla"
          ? {
              veredicto: "mejorar" as const,
              titular: "Hecha con plantilla",
              texto: `Tu web está hecha con ${constructor ?? "una plantilla"}. Funciona, pero se parece a otras miles y cuesta que transmita lo que vale tu negocio.`,
            }
          : {
              veredicto: "dudoso" as const,
              titular: "No lo tenemos claro",
              texto: constructor
                ? `Está hecha con ${constructor}, que se puede usar con plantilla o a medida. Desde aquí no lo sabemos.`
                : "No hemos podido saber cómo está hecha.",
            }),
    },
    {
      id: "anio",
      etiqueta: "Año de la web",
      ...(r.anio === null
        ? {
            veredicto: "dudoso" as const,
            titular: "Sin año a la vista",
            texto: "No hemos encontrado el año en el pie de tu web, ese «© 2024» que suele ir abajo del todo.",
          }
        : r.anio >= anioActual - 1
          ? {
              veredicto: "bien" as const,
              titular: `El pie dice ${r.anio}`,
              texto: "Es el año del «copyright», abajo del todo. Señal de que alguien la mantiene al día.",
            }
          : {
              veredicto: "mejorar" as const,
              titular: `El pie dice ${r.anio}`,
              texto: `Es el año del «copyright», abajo del todo. Si nadie lo ha cambiado desde ${r.anio}, lo más probable es que la web tampoco se haya tocado.`,
            }),
    },
  ];
}

// Regla de destino del plan: sin reserva online, a /agentes-ia; en cualquier otro caso, a la home
export function destinoDelInforme(r: InformeAuditor) {
  return r.reserva === "none" || r.reserva === "dudoso"
    ? { to: "/agentes-ia", texto: "Que tus clientes reserven solos", label: "agentes_ia" }
    : { to: "/", texto: "Ver qué podemos hacer por tu web", label: "home" };
}
