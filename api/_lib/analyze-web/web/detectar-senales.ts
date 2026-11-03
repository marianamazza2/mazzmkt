// ============================================================================
// A3 parte 1 · Señales de la home y CTA (spec §6, reglas A3-04 y A3-05)
// ============================================================================
// Son señales técnicas, no un diagnóstico visual: un viewport no demuestra que
// la web se vea bien en el móvil y un botón en el HTML no demuestra que se vea.
// Por eso responsive_visual y cta_visible se quedan siempre en 'dudoso'.

import type { DocumentoHtml } from './parse-html.js';
import { contienePalabra, limpiarUrl, recortar } from './texto.js';
import type { CampoEvidencia, Evidencia } from './types.js';

function evidencia(campo: CampoEvidencia, regla: string, url: URL, selector: string, valor: string): Evidencia {
  return { campo, regla, url: limpiarUrl(url), selector, valor: recortar(valor), metodo: 'html' };
}

export interface SenalesHome {
  responsive: boolean;
  copyright_anio: number | null;
  tiene_meta_titulo: boolean;
  tiene_meta_descripcion: boolean;
  evidencias: Evidencia[];
}

export function detectarSenalesHome(home: DocumentoHtml, ahora: Date): SenalesHome {
  const evidencias: Evidencia[] = [];

  const responsive = /width\s*=\s*device-width/i.test(home.viewport ?? '');
  evidencias.push(evidencia('responsive', responsive ? 'viewport_device_width' : 'sin_viewport_device_width', home.url, 'meta[name=viewport]', home.viewport ?? ''));

  const tiene_meta_titulo = Boolean(home.titulo);
  if (home.titulo) evidencias.push(evidencia('tiene_meta_titulo', 'title', home.url, 'title', home.titulo));
  const tiene_meta_descripcion = Boolean(home.metaDescripcion);
  if (home.metaDescripcion) {
    evidencias.push(evidencia('tiene_meta_descripcion', 'meta_description', home.url, 'meta[name=description]', home.metaDescripcion));
  }

  // Copyright: solo en el pie. En rangos (2019-2026) manda el mayor año que no
  // sea futuro. No es el año de creación de la web.
  let copyright_anio: number | null = null;
  if (home.textoPie) {
    const anioActual = ahora.getUTCFullYear();
    for (const m of home.textoPie.matchAll(/(?:©|\(c\)|copyright)([^©]{0,80})/gi)) {
      const fragmento = m[0];
      const anios = [...fragmento.matchAll(/\b(19\d{2}|20\d{2})\b/g)].map((a) => Number(a[1]));
      if (anios.length === 0) continue;
      for (const anio of anios) {
        if (anio <= anioActual && (copyright_anio === null || anio > copyright_anio)) copyright_anio = anio;
      }
      evidencias.push(evidencia('copyright_anio', 'copyright_pie', home.url, 'footer', fragmento));
    }
  }

  return { responsive, copyright_anio, tiene_meta_titulo, tiene_meta_descripcion, evidencias };
}

const PALABRAS_CTA_EXTRA = [
  'llamar', 'llamanos', 'llama', 'llama ahora', 'whatsapp', 'escribenos', 'escribenos por whatsapp',
  'solicitar presupuesto', 'pide presupuesto', 'presupuesto', 'truca', 'truca\'ns', 'call us', 'get in touch',
];

/** ¿Hay en el HTML algún enlace, botón o formulario accionable de cita, llamada o contacto? */
export function buscarCta(docs: readonly DocumentoHtml[], palabrasCita: readonly string[], palabrasContacto: readonly string[]): Evidencia[] {
  const palabras = [...palabrasCita, ...palabrasContacto, ...PALABRAS_CTA_EXTRA];
  const evidencias: Evidencia[] = [];
  for (const doc of docs) {
    for (const e of doc.enlaces) {
      if (e.oculto) continue;
      const protocolo = e.url.protocol;
      const accion =
        protocolo === 'tel:' ? 'enlace_telefono'
        : protocolo === 'mailto:' ? 'enlace_email'
        : protocolo === 'whatsapp:' || e.url.hostname === 'wa.me' || e.url.hostname.endsWith('whatsapp.com') ? 'enlace_whatsapp'
        : contienePalabra(e.texto, palabras) ? 'enlace_cta'
        : null;
      // Del enlace solo se guarda el texto: el número o el email no hacen falta.
      if (accion) evidencias.push(evidencia('cta_html', accion, doc.url, 'a[href]', e.texto || protocolo));
    }
    for (const b of doc.botones) {
      if (!b.oculto && contienePalabra(b.texto, palabras)) evidencias.push(evidencia('cta_html', 'boton_cta', doc.url, 'button', b.texto));
    }
    for (const f of doc.formularios) {
      if (!f.oculto && f.tieneEnvio) evidencias.push(evidencia('cta_html', 'formulario', doc.url, 'form', f.textoEnvio));
    }
  }
  return evidencias;
}

/**
 * La home parece una aplicación de JavaScript: contenedor vacío o casi sin
 * texto con scripts. Su HTML no basta para concluir ausencias.
 */
export function esDinamica(home: DocumentoHtml): boolean {
  return home.contenedorAppVacio || (home.textoVisible.length < 200 && home.numScripts > 0);
}
