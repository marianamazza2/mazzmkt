// ============================================================================
// A3 parte 1 · Portfolio (spec §6, regla A3-09)
// ============================================================================
// true con un enlace interno a proyectos, con tres o más fichas o tarjetas de
// proyecto, o con un enlace a Behance o Pinterest. false solo si la home (y la
// página de portfolio, si se intentó) se leyeron sin nada de eso. No se juzga
// la calidad: eso es trabajo de la puntuación en la parte 2.

import type { DocumentoHtml } from './parse-html.js';
import { contienePalabra, hostCoincide, limpiarUrl, recortar, rutaContiene } from './texto.js';
import type { Evidencia, Limitacion } from './types.js';

const HOSTS_PORTFOLIO_EXTERNO = ['behance.net', 'pinterest.com', 'pinterest.es', 'archdaily.com', 'houzz.es', 'houzz.com'];
/** Instagram está enlazado en casi todas las webs: solo cuenta si el enlace habla de proyectos. */
const HOSTS_REDES = ['instagram.com'];
const MIN_FICHAS = 3;

export interface ResultadoPortfolio {
  portfolio: boolean | null;
  evidencias: Evidencia[];
  limitaciones: Limitacion[];
}

function evidencia(regla: string, url: URL, selector: string, valor: string): Evidencia {
  return { campo: 'portfolio', regla, url: limpiarUrl(url), selector, valor: recortar(valor), metodo: 'html' };
}

/**
 * @param concluyente se leyeron la home y, si se intentó, la página de portfolio.
 */
export function detectarPortfolio(
  docs: readonly DocumentoHtml[],
  palabras: readonly string[],
  concluyente: boolean,
): ResultadoPortfolio {
  const evidencias: Evidencia[] = [];
  let interno = false;
  let externo = false;

  for (const doc of docs) {
    const fichas = new Set<string>();
    for (const e of doc.enlaces) {
      if (e.oculto || (e.url.protocol !== 'http:' && e.url.protocol !== 'https:')) continue;
      if (e.url.origin === doc.url.origin) {
        const palabra = contienePalabra(e.texto, palabras) ?? rutaContiene(e.url, palabras);
        if (!palabra) continue;
        // /proyectos/casa-gracia: una ficha concreta, no el índice.
        const segmentos = e.url.pathname.split('/').filter(Boolean);
        if (segmentos.length >= 2 && rutaContiene(new URL(`/${segmentos[0]}`, e.url), palabras)) {
          fichas.add(e.url.pathname.replace(/\/$/, ''));
        } else if (!interno) {
          interno = true;
          evidencias.push(evidencia('enlace_portfolio', doc.url, 'a[href]', `${e.texto} → ${e.url.pathname}`));
        }
      } else if (HOSTS_PORTFOLIO_EXTERNO.some((h) => hostCoincide(e.url.hostname, h))
        || (HOSTS_REDES.some((h) => hostCoincide(e.url.hostname, h)) && contienePalabra(e.texto, palabras))) {
        if (!externo) evidencias.push(evidencia('enlace_portfolio_externo', doc.url, 'a[href]', e.url.toString()));
        externo = true;
      }
    }
    if (fichas.size >= MIN_FICHAS) {
      interno = true;
      evidencias.push(evidencia('fichas_proyecto', doc.url, 'a[href]', `${fichas.size} fichas`));
    }
    if (doc.tarjetasProyecto >= MIN_FICHAS) {
      interno = true;
      evidencias.push(evidencia('tarjetas_proyecto', doc.url, '[class*=project]', `${doc.tarjetasProyecto} tarjetas`));
    }
  }

  if (interno) return { portfolio: true, evidencias, limitaciones: [] };
  if (externo) return { portfolio: true, evidencias, limitaciones: ['portfolio_externo'] };
  return { portfolio: concluyente ? false : null, evidencias, limitaciones: [] };
}
