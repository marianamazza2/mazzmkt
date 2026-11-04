# Spec A4 parte 1 · Auditor web gratuito en /auditor

Estado: **borrador, pendiente de aprobación de Mariana.** No se programa nada hasta su OK.
Rama: `claude/a4-auditor-d64be4`. Fecha: 3 de noviembre de 2026.

## 1. Qué es

Una página nueva, `mazzmkt.com/auditor`. El negocio pega la dirección de su web, pulsa un botón y en unos 10 o 20 segundos ve un informe de seis puntos, escrito para alguien que no es técnico. Al final hay un único botón que le lleva a `/agentes-ia` o a la home.

Sin email, sin píxel de Meta y sin cookies nuevas (informe A8, apartado 3.B).

## 2. La página

Mismo lenguaje visual que `/agentes-ia` y `/servicios`: `PageHero` con ruta en mono, secciones numeradas con `SectionHeading`, filas separadas por líneas finas, blanco y negro, Inter Tight, DM Sans e IBM Plex Mono.

1. **Hero.** Titular propuesto: «¿Tu web trabaja por ti?». Subtítulo: «Pega su dirección y en unos segundos te contamos cómo está: móvil, seguridad, reservas y más. Gratis y sin dejar tu email.»
2. **Formulario.** Un campo («tuweb.com») y el botón «Analizar mi web». Acepta la dirección sin `https://`; se lo añadimos nosotros.
3. **Mientras analiza.** Mensajes que cambian cada pocos segundos («Abriendo tu web», «Buscando cómo se reserva», «Mirando el pie de página»). Sin barra de progreso falsa.
4. **Informe.** Seis filas. Cada una tiene un estado (bien / a mejorar / sin confirmar), un titular corto y una frase que explica qué significa para su negocio.
5. **Botón final** (apartado 4) y una nota pequeña: «Este informe lee el código de tu web, no la ve como una persona. Si algo no cuadra, cuéntanoslo.»

En el móvil todo va en una columna, el campo y el botón ocupan el ancho completo y el informe se lee sin hacer zoom.

## 3. Qué dice el informe

El módulo de A3 tiene un contrato de honestidad: no puede afirmar lo que no ha comprobado. Lo respeto, pero en lenguaje de cliente. Los términos técnicos se explican en la misma frase.

| Punto | Bien | A mejorar | Sin confirmar |
| --- | --- | --- | --- |
| **Móvil** (`responsive`) | «Tu web está preparada para el móvil. Le dice al teléfono que se adapte a la pantalla (eso es el *viewport*). Ábrela en tu móvil para ver cómo queda.» | «Tu web no está preparada para el móvil. En el teléfono se verá en pequeño y habrá que hacer zoom.» | «No hemos podido comprobarlo.» |
| **Seguridad** (`https`) | «Tu web es segura: tiene el candado (*https*) y los navegadores no avisan de nada raro.» | «Tu web no tiene candado. Algunos navegadores avisan de que no es segura y eso espanta a los clientes.» | «No hemos podido comprobarlo.» |
| **Reserva online** (`reserva_online`) | `plataforma` o `propia`: «Tus clientes pueden reservar desde la web» (+ el nombre de la plataforma si se detecta). | `none`: «No tienes reserva online. Tu web dice que las citas son por teléfono o WhatsApp.» | `dudoso`: «No hemos encontrado ninguna forma de reservar desde la web.» Si la web se monta con JavaScript: «No lo hemos podido ver», sin insinuar que no hay reserva. |
| **Llamadas a la acción** (`cta_html`) | «Hemos encontrado botones o enlaces para pedir cita o contactar. Comprueba que se vean nada más entrar.» | «No hemos encontrado ningún botón para pedir cita o contactar. Quien entra no sabe qué hacer después.» | «No hemos podido comprobarlo.» |
| **Plantilla o a medida** (`tipo_web`) | `a_medida`: «No hemos encontrado huella de ningún constructor conocido. Todo apunta a una web hecha a medida.» | `plantilla`: «Tu web está hecha con [Wix / WordPress con tema estándar…]. Funciona, pero se parece a otras miles.» | «No lo tenemos claro.» |
| **Año de la web** (`copyright_anio`) | Año actual o el anterior: «El pie de tu web dice [2026]. Señal de que está al día.» | Más antiguo: «El pie de tu web dice [2019]. Es el año del *copyright*: si no se ha cambiado, la web lleva años sin tocarse.» | Sin año: «No hemos encontrado el año en el pie.» Si la web se monta con JavaScript (limitación `contenido_dinamico`): «No hemos podido leer el pie», nunca «sin año». |

Lo que no se dice nunca: «se ve bien en el móvil», «tus botones se ven», «tu web se creó en…» ni «no tienes reserva» si el dato es `dudoso`.

**Si la web no se puede leer** (no existe, tarda demasiado, bloquea robots o no es una web pública): «No hemos podido abrir tu web. Revisa que la dirección esté bien escrita o prueba en un rato.» No cuenta para el límite de uso.

## 4. Botón final

| Resultado de reserva | Texto | Destino |
| --- | --- | --- |
| `none` o `dudoso` (no hemos encontrado reserva) | «Que tus clientes reserven solos» | `/agentes-ia` |
| `plataforma` o `propia` | «Ver qué podemos hacer por tu web» | home |
| Web no leída | Sin botón de destino; solo «Probar otra web» | |

El texto del botón no afirma nada, por eso también vale para `dudoso`. **Es la decisión 1 que te pido.**

Clic registrado como el resto del sitio: `trackEvent("cta_click", { location: "auditor", label: "agentes_ia" | "home" })`. Además, `trackEvent("auditor_completado", { reserva: "none" | "dudoso" | "plataforma" | "propia" })`, sin la URL del negocio. `trackEvent` solo envía algo si la persona ya aceptó las cookies de analítica en el banner actual: no se añade nada nuevo.

## 5. Función serverless

- `api/auditor.ts`, Vercel Functions con runtime Node (no Edge), `GET /api/auditor?url=…`.
- Llama a `analyzeWeb` con la configuración genérica (sin preguntar el sector) y devuelve solo lo que pinta el informe, no las evidencias completas.
- **Módulo copiado, no compartido.** Copio `src/analyze-web.ts`, `src/web/` y `src/sectores/` de `mazzmkt-leads` (commit `0f91d6c`) a `api/_lib/analyze-web/`, sin tocar una línea, con un `ORIGEN.md` que dice de qué commit salen y cómo actualizarlo. Añado sus tres dependencias (`parse5`, `undici`, `ipaddr.js`). Por qué: es lo que pide el propio spec de A3; compartirlo como paquete obligaría a dar a Vercel acceso al repo privado de `mazzmkt-leads` y a publicar versiones, demasiado para 1.500 líneas que cambian poco. Para actualizar basta con volver a copiar la carpeta.

## 6. Límite de uso: 10 auditorías por IP al día

- La IP no se guarda tal cual: se guarda una huella (hash con una clave secreta que cambia cada día) y un contador que caduca a las 24 horas. Así no se guarda ningún dato personal reconocible.
- Al llegar a 10: «Has hecho 10 análisis hoy, que es el máximo. Vuelve mañana o escríbenos y lo vemos juntas.»
- **Dónde se guarda el contador. Es la decisión 2 que te pido:**
  - **A (recomendada): Runtime Cache de Vercel.** Ya viene con Vercel, no hay que crear cuentas ni pagar nada. Es aproximado: si dos peticiones llegan a la vez, o en regiones distintas, alguien podría hacer 11 o 12. Para frenar abusos basta.
  - **B: Upstash Redis** desde el Marketplace de Vercel. Exacto, plan gratis, pero es una cuenta y un proveedor más (con su DPA para /privacidad).
- Además, límite de una auditoría a la vez por IP, y la función corta a los 25 segundos.

## 7. Lo que no entra en esta versión

Email, guardar leads en Supabase, píxel de Meta, cookies nuevas, guardar el `utm_source` (llega en la parte 3, cuando haya leads) e informe en PDF. Tampoco se cambia `/privacidad`: no se recoge ningún dato personal.

## 8. Cómo se comprueba

1. `npm run lint` y `npm run build` sin errores.
2. En la vista previa de Vercel, tres webs reales: una clínica de medicina estética de Barcelona, un estudio de interiorismo o arquitectura y una web antigua (copyright de hace años). Captura de cada informe.
3. Recorrido completo en el móvil (375 px) y comprobación de que no se crean cookies nuevas.
4. La IP número 11 recibe el aviso del límite.
5. Pull request con el enlace a la vista previa. No se fusiona sin tu OK.

## 9. Decisiones que necesito

1. **`dudoso` lleva a `/agentes-ia`.** Recomiendo que sí: casi ninguna web dice expresamente «solo por teléfono», así que con solo `none` el botón a `/agentes-ia` casi nunca saldría.
2. **Contador del límite:** A (Runtime Cache, recomendada) o B (Upstash).
3. **Textos:** ¿te valen el titular «¿Tu web trabaja por ti?» y los de la tabla del apartado 3, o quieres cambiar algo?
