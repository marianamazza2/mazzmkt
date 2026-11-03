// ============================================================================
// A3 parte 1 · Plantilla o a medida (spec §6, regla A3-08)
// ============================================================================
// Útil sobre todo para el nicho 2 (marca y web): una web de Wix o con un tema
// comercial de WordPress es un buen argumento para proponer una a medida.
// Solo cuentan huellas técnicas: meta generator, hosts exactos de recursos y
// atributos propios del constructor. «Hecho con Wix» en un texto no cuenta.
// 'a_medida' es una inferencia: significa «sin ninguna huella conocida».

import type { DocumentoHtml } from './parse-html.js';
import { hostCoincide, limpiarUrl, normalizar, recortar } from './texto.js';
import type { Evidencia, Limitacion, TipoWeb } from './types.js';

interface HuellaConstructor {
  id: string;
  generador: RegExp;
  hosts: readonly string[];
  atributo?: (nombre: string) => boolean;
}

export const REGISTRO_CONSTRUCTORES: readonly HuellaConstructor[] = [
  { id: 'wix', generador: /\bwix\b/i, hosts: ['wixstatic.com', 'parastorage.com', 'wixsite.com'] },
  { id: 'squarespace', generador: /squarespace/i, hosts: ['squarespace.com', 'squarespace-cdn.com', 'sqspcdn.com'] },
  { id: 'framer', generador: /\bframer\b/i, hosts: ['framerusercontent.com', 'framer.com', 'framer.website'], atributo: (n) => n.startsWith('data-framer-') },
  { id: 'webflow', generador: /webflow/i, hosts: ['website-files.com', 'webflow.com', 'webflow.io'], atributo: (n) => n === 'data-wf-site' || n === 'data-wf-page' },
];

/**
 * Temas de WordPress comerciales o gratuitos de uso masivo. Un tema hijo
 * (`divi-child`) cuenta como el padre. Los twentyNN de WordPress, por prefijo.
 */
export const TEMAS_WORDPRESS_ESTANDAR: readonly string[] = [
  'astra', 'divi', 'avada', 'oceanwp', 'generatepress', 'kadence', 'hello-elementor',
  'flatsome', 'betheme', 'enfold', 'neve', 'blocksy', 'storefront', 'salient', 'the7', 'bridge',
];

const CONSTRUCTORES_PAGINA: readonly { id: string; patron: RegExp }[] = [
  { id: 'elementor', patron: /\/wp-content\/plugins\/elementor/ },
  { id: 'wpbakery', patron: /\/wp-content\/plugins\/js_composer/ },
];

export interface ResultadoConstructor {
  tipo_web: TipoWeb;
  constructor_web: string | null;
  tema_wordpress: string | null;
  evidencias: Evidencia[];
  limitaciones: Limitacion[];
}

function decodificar(segmento: string): string {
  try {
    return decodeURIComponent(segmento);
  } catch {
    return segmento;
  }
}

function temaEstandar(slug: string): string | null {
  const base = slug.replace(/[-_]child(-theme)?$/, '').replace(/-hijo$/, '');
  if (TEMAS_WORDPRESS_ESTANDAR.includes(base)) return base;
  if (/^twenty[a-z]+$/.test(base)) return base;
  return null;
}

function evidencia(regla: string, url: URL, selector: string, valor: string): Evidencia {
  return { campo: 'tipo_web', regla, url: limpiarUrl(url), selector, valor: recortar(valor), metodo: 'html' };
}

/**
 * @param homeLegible la home se leyó y su HTML tiene contenido propio; sin eso
 *   la ausencia de huellas no permite inferir nada.
 */
export function detectarConstructor(docs: readonly DocumentoHtml[], homeLegible: boolean): ResultadoConstructor {
  const evidencias: Evidencia[] = [];
  const encontrados = new Set<string>();
  let wordpress = false;
  const temas: string[] = [];

  for (const doc of docs) {
    for (const g of doc.generadores) {
      for (const h of REGISTRO_CONSTRUCTORES) {
        if (h.generador.test(g)) {
          encontrados.add(h.id);
          evidencias.push(evidencia(`generator_${h.id}`, doc.url, 'meta[name=generator]', g));
        }
      }
      if (/wordpress/i.test(g)) {
        wordpress = true;
        evidencias.push(evidencia('generator_wordpress', doc.url, 'meta[name=generator]', g));
      }
    }

    for (const r of doc.recursos) {
      if (r.url.protocol !== 'http:' && r.url.protocol !== 'https:') continue;
      for (const h of REGISTRO_CONSTRUCTORES) {
        if (h.hosts.some((d) => hostCoincide(r.url.hostname, d))) {
          if (!encontrados.has(h.id)) evidencias.push(evidencia(`recurso_${h.id}`, doc.url, r.selector, r.url.toString()));
          encontrados.add(h.id);
        }
      }
      const ruta = r.url.pathname;
      if (/\/wp-(content|includes)\//.test(ruta)) {
        if (!wordpress) evidencias.push(evidencia('ruta_wordpress', doc.url, r.selector, r.url.toString()));
        wordpress = true;
        const tema = /\/wp-content\/themes\/([^/]+)\//.exec(ruta)?.[1];
        if (tema) {
          const slug = normalizar(decodificar(tema));
          if (!temas.includes(slug)) {
            temas.push(slug);
            evidencias.push(evidencia('tema_wordpress', doc.url, r.selector, slug));
          }
        }
      }
      for (const b of CONSTRUCTORES_PAGINA) {
        if (b.patron.test(ruta)) evidencias.push(evidencia(`maquetador_${b.id}`, doc.url, r.selector, b.id));
      }
    }

    for (const nombre of doc.atributosData) {
      for (const h of REGISTRO_CONSTRUCTORES) {
        if (h.atributo?.(nombre)) {
          if (!encontrados.has(h.id)) evidencias.push(evidencia(`atributo_${h.id}`, doc.url, `[${nombre}]`, nombre));
          encontrados.add(h.id);
        }
      }
    }
    if ([...doc.clases].some((c) => c.startsWith('et_pb_'))) {
      evidencias.push(evidencia('maquetador_divi', doc.url, '[class^=et_pb_]', 'et_pb_'));
    }
  }

  const limitaciones: Limitacion[] = [];
  const alojados = [...encontrados];
  const total = alojados.length + (wordpress ? 1 : 0);

  if (total > 1) {
    limitaciones.push('senales_contradictorias');
    return { tipo_web: 'dudoso', constructor_web: null, tema_wordpress: null, evidencias, limitaciones };
  }
  if (alojados.length === 1) {
    return { tipo_web: 'plantilla', constructor_web: alojados[0] ?? null, tema_wordpress: null, evidencias, limitaciones };
  }
  if (wordpress) {
    const estandar = temas.map(temaEstandar).find((t) => t !== null) ?? null;
    return {
      // WordPress con tema propio o desconocido puede ser cualquier cosa.
      tipo_web: estandar ? 'plantilla' : 'dudoso',
      constructor_web: 'wordpress',
      tema_wordpress: estandar ?? temas[0] ?? null,
      evidencias,
      limitaciones,
    };
  }
  if (homeLegible) {
    limitaciones.push('a_medida_inferido');
    return { tipo_web: 'a_medida', constructor_web: null, tema_wordpress: null, evidencias, limitaciones };
  }
  return { tipo_web: 'dudoso', constructor_web: null, tema_wordpress: null, evidencias, limitaciones };
}
