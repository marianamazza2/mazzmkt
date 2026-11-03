// ============================================================================
// A3 parte 1 · Utilidades de texto y URL compartidas por las reglas
// ============================================================================

/** Minúsculas, sin acentos y con espacios colapsados: «Pídenos Cita» → «pidenos cita». */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Recorta para guardar como evidencia (spec §5.1: máximo 200 caracteres). */
export function recortar(texto: string, max = 200): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  return limpio.length <= max ? limpio : `${limpio.slice(0, max - 1)}…`;
}

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * ¿Aparece alguna palabra clave como palabra completa? Así «cita» no casa
 * con «felicitamos». Texto y palabras ya deben venir normalizados.
 */
export function contienePalabra(textoNormalizado: string, palabras: readonly string[]): string | null {
  for (const palabra of palabras) {
    const patron = new RegExp(`(^|[^\\p{L}\\p{N}])${escaparRegex(palabra)}($|[^\\p{L}\\p{N}])`, 'u');
    if (patron.test(textoNormalizado)) return palabra;
  }
  return null;
}

/** ¿Algún segmento de la ruta coincide con una palabra clave («pedir cita» → «pedir-cita»)? */
export function rutaContiene(url: URL, palabras: readonly string[]): string | null {
  const segmentos = url.pathname
    .split('/')
    .map((s) => normalizar(safeDecode(s)).replace(/\.(html?|php)$/, ''))
    .filter(Boolean);
  for (const palabra of palabras) {
    const slug = palabra.replace(/ /g, '-');
    if (segmentos.some((s) => s === slug || s.startsWith(`${slug}-`) || s.endsWith(`-${slug}`))) {
      return palabra;
    }
  }
  return null;
}

function safeDecode(segmento: string): string {
  try {
    return decodeURIComponent(segmento);
  } catch {
    return segmento;
  }
}

/** ¿El host es exactamente `dominio` o un subdominio suyo? `calendly.com.x.test` no lo es. */
export function hostCoincide(host: string, dominio: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, '');
  return h === dominio || h.endsWith(`.${dominio}`);
}

const PARAMETROS_SENSIBLES = /token|key|secret|pass|auth|session|sid|sig|code|email|mail|phone|tel/i;

/** URL sin fragmento ni parámetros que puedan llevar datos personales o credenciales. */
export function limpiarUrl(url: URL | string): string {
  const copia = new URL(url.toString());
  copia.hash = '';
  copia.username = '';
  copia.password = '';
  for (const nombre of [...copia.searchParams.keys()]) {
    if (PARAMETROS_SENSIBLES.test(nombre)) copia.searchParams.delete(nombre);
  }
  return copia.toString();
}

/** Resuelve un href respetando solo http(s); el resto (javascript:, data:) se descarta. */
export function resolverHref(href: string, base: URL): URL | null {
  const limpio = href.trim();
  if (!limpio) return null;
  try {
    const url = new URL(limpio, base);
    return url;
  } catch {
    return null;
  }
}
