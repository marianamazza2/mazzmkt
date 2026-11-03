// ============================================================================
// A3 parte 1 · analyze-web: entrada pública (spec §5, reglas A3-01 a A3-10)
// ============================================================================
// Recibe una URL, lee la home y como máximo dos páginas internas (citas,
// contacto o portfolio, según la configuración de sector) y devuelve señales
// con su evidencia. Lo reutilizará el auditor web de mazzmkt.com (A4) desde
// una función de Vercel: sin sistema de archivos, procesos ni estado global.
// Importar este módulo no hace peticiones ni lee variables de entorno.

import { resolverConfigSector, type ConfigResuelta, type ConfigSector } from './web/config-sector.js';
import { detectarConstructor } from './web/detectar-constructor.js';
import { detectarPortfolio } from './web/detectar-portfolio.js';
import { detectarReservas, type PaginaInspeccionada } from './web/detectar-reservas.js';
import { buscarCta, detectarSenalesHome, esDinamica } from './web/detectar-senales.js';
import { descargarDocumento, type LimitesDescarga, type Transporte } from './web/fetch-html.js';
import { analizarHtml, type DocumentoHtml } from './web/parse-html.js';
import { motivoDestinoProhibido } from './web/red.js';
import { contienePalabra, limpiarUrl, recortar, rutaContiene } from './web/texto.js';
import { crearTransporteNode } from './web/transporte-node.js';
import type { Evidencia, Limitacion, Pagina, ResultadoAnalisisWeb, RolSecundario } from './web/types.js';

export type * from './web/types.js';
export { ErrorConfigSector } from './web/types.js';
export type { ConfigSector, ProveedorReserva } from './web/config-sector.js';
export { CONFIG_GENERICA } from './web/config-sector.js';
export type { Transporte } from './web/fetch-html.js';
export { crearTransporteNode } from './web/transporte-node.js';

export interface Limites {
  maxDocumentos: number;
  maxRedirecciones: number;
  timeoutDocumentoMs: number;
  timeoutTotalMs: number;
  maxBytes: number;
}

/** Máximos del spec §5.2: las opciones solo pueden bajarlos. */
export const LIMITES_MAXIMOS: Readonly<Limites> = {
  maxDocumentos: 3,
  maxRedirecciones: 3,
  timeoutDocumentoMs: 8_000,
  timeoutTotalMs: 20_000,
  maxBytes: 1024 * 1024,
};

export interface OpcionesAnalisis {
  transporte?: Transporte;
  ahora?: () => Date;
  signal?: AbortSignal;
  sector?: ConfigSector;
  limites?: Partial<Limites>;
}

let transportePorDefecto: Transporte | null = null;

export async function analyzeWeb(url: string, opciones: OpcionesAnalisis = {}): Promise<ResultadoAnalisisWeb> {
  // Una configuración mala es un fallo de quien llama: se lanza, no se esconde.
  const config = resolverConfigSector(opciones.sector);
  const limites = resolverLimites(opciones.limites);
  const analizado_at = (opciones.ahora ?? (() => new Date()))();
  const transporte = opciones.transporte ?? (transportePorDefecto ??= crearTransporteNode());

  const entrada = normalizarEntrada(url);
  if (!entrada.ok) {
    return resultadoVacio({
      url_solicitada: entrada.texto,
      analizado_at,
      config,
      estado: 'entrada_invalida',
      paginas: [{ rol: 'home', url_solicitada: entrada.texto, url_final: null, http_status: null, resultado: 'error', motivo: entrada.motivo }],
      https: null,
    });
  }

  const total = AbortSignal.timeout(limites.timeoutTotalMs);
  const senales = { usuario: opciones.signal, total };
  const descarga = { ...limites } satisfies LimitesDescarga;

  const home = await descargarDocumento(entrada.url, transporte, descarga, senales);
  const paginaHome: Pagina = {
    rol: 'home',
    url_solicitada: limpiarUrl(entrada.url),
    url_final: home.url_final ? limpiarUrl(home.url_final) : null,
    http_status: home.http_status,
    resultado: home.ok ? 'ok' : 'error',
    motivo: home.ok ? null : home.motivo,
  };
  if (!home.ok) {
    return resultadoVacio({
      url_solicitada: limpiarUrl(entrada.url),
      analizado_at,
      config,
      estado: 'no_disponible',
      paginas: [paginaHome],
      // Un 403 por HTTPS prueba el transporte, no el contenido.
      https: home.url_final && home.http_status !== null ? home.url_final.protocol === 'https:' : null,
      url_final: home.url_final ? limpiarUrl(home.url_final) : null,
    });
  }

  const docHome = analizarHtml(home.html, home.url_final);
  const inspeccionadas: PaginaInspeccionada[] = [{ rol: 'home', doc: docHome }];
  const paginas: Pagina[] = [paginaHome];
  const limitaciones = new Set<Limitacion>(['visual_no_verificado']);

  // Páginas secundarias: solo enlaces visibles del mismo origen, sin adivinar rutas.
  const { elegidas, contactoExterno } = elegirSecundarias(docHome, config);
  if (contactoExterno) limitaciones.add('contacto_no_verificado');
  let intentadas = 0;
  let fallos = 0;
  let portfolioIntentadoSinExito = false;
  for (const { rol, url: destino } of elegidas) {
    if (intentadas >= limites.maxDocumentos - 1) {
      paginas.push({ rol, url_solicitada: limpiarUrl(destino), url_final: null, http_status: null, resultado: 'omitida', motivo: 'limite_documentos' });
      continue;
    }
    intentadas += 1;
    const r = await descargarDocumento(destino, transporte, descarga, senales);
    paginas.push({
      rol,
      url_solicitada: limpiarUrl(destino),
      url_final: r.url_final ? limpiarUrl(r.url_final) : null,
      http_status: r.http_status,
      resultado: r.ok ? 'ok' : 'error',
      motivo: r.ok ? null : r.motivo,
    });
    if (r.ok) {
      inspeccionadas.push({ rol, doc: analizarHtml(r.html, r.url_final) });
    } else {
      fallos += 1;
      if (rol === 'portfolio') portfolioIntentadoSinExito = true;
    }
  }
  if (fallos > 0) limitaciones.add('cobertura_parcial');

  const dinamica = esDinamica(docHome);
  const docs = inspeccionadas.map((p) => p.doc);
  const coberturaCompleta = fallos === 0;
  const evidencias: Evidencia[] = [];

  const senalesHome = detectarSenalesHome(docHome, analizado_at);
  evidencias.push(...senalesHome.evidencias);
  evidencias.push({ campo: 'https', regla: `respuesta_${home.url_final.protocol.replace(':', '')}`, url: limpiarUrl(home.url_final), selector: 'url', valor: home.url_final.protocol, metodo: 'html' });

  const reservas = detectarReservas(inspeccionadas, config, { completa: coberturaCompleta, dinamica });
  evidencias.push(...reservas.evidencias);
  reservas.limitaciones.forEach((l) => limitaciones.add(l));

  const cta = buscarCta(docs, config.palabras.citas, config.palabras.contacto);
  evidencias.push(...cta);
  const cta_html = cta.length > 0 ? true : coberturaCompleta && !dinamica ? false : null;

  const constructor = detectarConstructor(docs, !dinamica);
  evidencias.push(...constructor.evidencias);
  constructor.limitaciones.forEach((l) => limitaciones.add(l));

  const portfolio = detectarPortfolio(docs, config.palabras.portfolio, !portfolioIntentadoSinExito && !dinamica);
  evidencias.push(...portfolio.evidencias);
  portfolio.limitaciones.forEach((l) => limitaciones.add(l));

  return {
    version: 1,
    url_solicitada: limpiarUrl(entrada.url),
    url_final: limpiarUrl(home.url_final),
    analizado_at: analizado_at.toISOString(),
    sector_config: config.id,
    estado: fallos > 0 ? 'parcial' : 'completo',
    reserva_online: reservas.reserva_online,
    plataforma_reserva: reservas.plataforma_reserva,
    plataformas_detectadas: reservas.plataformas_detectadas,
    https: home.url_final.protocol === 'https:',
    responsive: senalesHome.responsive,
    responsive_visual: 'dudoso',
    copyright_anio: senalesHome.copyright_anio,
    tiene_meta_titulo: senalesHome.tiene_meta_titulo,
    tiene_meta_descripcion: senalesHome.tiene_meta_descripcion,
    cta_html,
    cta_visible: 'dudoso',
    tipo_web: constructor.tipo_web,
    constructor_web: constructor.constructor_web,
    tema_wordpress: constructor.tema_wordpress,
    portfolio: portfolio.portfolio,
    evidencias,
    paginas,
    limitaciones: [...limitaciones],
  };
}

function resolverLimites(parciales: Partial<Limites> = {}): Limites {
  const limites = { ...LIMITES_MAXIMOS };
  for (const clave of Object.keys(LIMITES_MAXIMOS) as (keyof Limites)[]) {
    const valor = parciales[clave];
    if (valor === undefined) continue;
    if (!Number.isInteger(valor) || valor < (clave === 'maxRedirecciones' ? 0 : 1)) {
      throw new RangeError(`Límite no válido: ${clave}`);
    }
    limites[clave] = Math.min(valor, LIMITES_MAXIMOS[clave]);
  }
  return limites;
}

type Entrada = { ok: true; url: URL } | { ok: false; texto: string; motivo: 'url_invalida' | 'destino_no_publico' };

/** URL absoluta http(s), sin credenciales. No se añade el protocolo en silencio: eso es cosa de A4. */
function normalizarEntrada(texto: string): Entrada {
  const recortado = recortar(String(texto ?? ''), 200);
  let url: URL;
  try {
    url = new URL(String(texto ?? '').trim());
  } catch {
    return { ok: false, texto: recortado, motivo: 'url_invalida' };
  }
  const motivo = motivoDestinoProhibido(url);
  // Nunca se devuelve la entrada con credenciales, ni siquiera al rechazarla.
  if (motivo) return { ok: false, texto: recortar(limpiarUrlSegura(url), 200), motivo };
  url.hash = '';
  return { ok: true, url };
}

function limpiarUrlSegura(url: URL): string {
  try {
    return limpiarUrl(url);
  } catch {
    return '';
  }
}

function elegirSecundarias(home: DocumentoHtml, config: ConfigResuelta): {
  elegidas: { rol: RolSecundario; url: URL }[];
  contactoExterno: boolean;
} {
  const sinFragmento = (u: URL): string => {
    const c = new URL(u.toString());
    c.hash = '';
    return c.toString();
  };
  const usadas = new Set<string>([sinFragmento(home.url)]);
  const elegidas: { rol: RolSecundario; url: URL }[] = [];
  let contactoExterno = false;

  for (const rol of config.roles_prioridad) {
    const palabras = config.palabras[rol];
    let mejor: { url: URL; puntos: number } | null = null;
    for (const e of home.enlaces) {
      if (e.oculto || (e.url.protocol !== 'http:' && e.url.protocol !== 'https:')) continue;
      const porTexto = contienePalabra(e.texto, palabras) !== null;
      const porRuta = rutaContiene(e.url, palabras) !== null;
      if (!porTexto && !porRuta) continue;
      if (e.url.origin !== home.url.origin) {
        if (rol === 'contacto') contactoExterno = true;
        continue;
      }
      const clave = sinFragmento(e.url);
      if (usadas.has(clave)) continue;
      // Texto accionable y ruta específica pesan más; en empate, orden del documento.
      const puntos = (porTexto ? 2 : 0) + (porRuta ? 1 : 0);
      if (!mejor || puntos > mejor.puntos) mejor = { url: new URL(clave), puntos };
    }
    if (mejor) {
      usadas.add(mejor.url.toString());
      elegidas.push({ rol, url: mejor.url });
    }
  }
  return { elegidas, contactoExterno };
}

interface DatosVacio {
  url_solicitada: string;
  analizado_at: Date;
  config: ConfigResuelta;
  estado: 'entrada_invalida' | 'no_disponible';
  paginas: Pagina[];
  https: boolean | null;
  url_final?: string | null;
}

/** Sin home legible no hay señales de contenido: todo null o dudoso. */
function resultadoVacio(d: DatosVacio): ResultadoAnalisisWeb {
  return {
    version: 1,
    url_solicitada: d.url_solicitada,
    url_final: d.url_final ?? null,
    analizado_at: d.analizado_at.toISOString(),
    sector_config: d.config.id,
    estado: d.estado,
    reserva_online: 'dudoso',
    plataforma_reserva: null,
    plataformas_detectadas: [],
    https: d.https,
    responsive: null,
    responsive_visual: 'dudoso',
    copyright_anio: null,
    tiene_meta_titulo: null,
    tiene_meta_descripcion: null,
    cta_html: null,
    cta_visible: 'dudoso',
    tipo_web: 'dudoso',
    constructor_web: null,
    tema_wordpress: null,
    portfolio: null,
    evidencias: [],
    paginas: d.paginas,
    limitaciones: ['visual_no_verificado', 'sin_evidencia_concluyente'],
  };
}
