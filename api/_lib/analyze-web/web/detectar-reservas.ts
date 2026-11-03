// ============================================================================
// A3 parte 1 · Reserva online (spec §6, regla A3-03)
// ============================================================================
// No encontrar un sistema de reservas no demuestra que no exista. Por eso:
// - 'plataforma' y 'propia' necesitan evidencia directa en etiquetas y atributos;
// - 'none' necesita que la web diga expresamente que las citas son solo
//   manuales, con todas las páginas inspeccionadas y sin señales en contra;
// - todo lo demás es 'dudoso'.
// Mencionar un proveedor en un texto o en un comentario no cuenta nunca.

import type { ConfigResuelta, ProveedorReserva } from './config-sector.js';
import type { DocumentoHtml } from './parse-html.js';
import { contienePalabra, hostCoincide, limpiarUrl, recortar } from './texto.js';
import type { Evidencia, Limitacion, ReservaOnline, RolPagina } from './types.js';

/**
 * Registro base. Los hosts son los dominios públicos de cada proveedor; los de
 * Flowww y Koibox están pendientes de contrastar con webs reales (README).
 */
export const REGISTRO_PROVEEDORES: readonly ProveedorReserva[] = [
  { id: 'doctoralia', hosts: ['doctoralia.es', 'doctoralia.com', 'docplanner.com'], requiere_texto_reserva: true },
  { id: 'booksy', hosts: ['booksy.com'], requiere_texto_reserva: true },
  { id: 'treatwell', hosts: ['treatwell.es', 'treatwell.com', 'treatwell.co.uk', 'treatwell.fr', 'treatwell.it', 'treatwell.de'], requiere_texto_reserva: true },
  { id: 'fresha', hosts: ['fresha.com'], requiere_texto_reserva: true },
  { id: 'calendly', hosts: ['calendly.com'] },
  { id: 'cal.com', hosts: ['cal.com'] },
  { id: 'simplybook', hosts: ['simplybook.me', 'simplybook.it', 'simplybook.asia'] },
  { id: 'reservio', hosts: ['reservio.com'] },
  { id: 'setmore', hosts: ['setmore.com'] },
  { id: 'timify', hosts: ['timify.com'] },
  { id: 'flowww', hosts: ['flowww.net', 'flowww.es'] },
  { id: 'koibox', hosts: ['koibox.cloud', 'koibox.es'] },
];

/** Frases que declaran atención exclusivamente manual. Se aplican sobre texto normalizado. */
const FRASES_SOLO_MANUAL: readonly RegExp[] = [
  /\bcitas?\b[^.!?]{0,40}\b(unicamente|solo|solamente|exclusivamente)\b[^.!?]{0,20}\b(por|a traves de|via|mediante)\b[^.!?]{0,15}\b(telefono|whatsapp|llamada|telefonica)/,
  /\b(unicamente|solo|solamente|exclusivamente)\b[^.!?]{0,15}\b(con )?cita previa (telefonica|por telefono|por whatsapp)/,
  /\b(atendemos|damos cita|citas)\b[^.!?]{0,20}\b(unicamente|solo|solamente|exclusivamente)\b[^.!?]{0,10}\b(por telefono|por whatsapp|llamando)/,
  /\bcites?\b[^.!?]{0,40}\b(nomes|unicament|exclusivament)\b[^.!?]{0,20}\b(per|a traves de)\b[^.!?]{0,15}\b(telefon|whatsapp)/,
  /\bappointments?\b[^.!?]{0,30}\b(by phone|by telephone|via whatsapp) only\b/,
];

export interface PaginaInspeccionada {
  rol: RolPagina;
  doc: DocumentoHtml;
}

export interface CoberturaReservas {
  /** Todas las páginas que se intentaron se pudieron leer. */
  completa: boolean;
  /** La home parece montada con JavaScript y su HTML no basta. */
  dinamica: boolean;
}

export interface ResultadoReservas {
  reserva_online: ReservaOnline;
  plataforma_reserva: string | null;
  plataformas_detectadas: string[];
  evidencias: Evidencia[];
  limitaciones: Limitacion[];
}

const ORDEN_ROLES: readonly RolPagina[] = ['home', 'citas', 'contacto', 'portfolio'];

function proveedorDe(url: URL, proveedores: readonly ProveedorReserva[]): ProveedorReserva | null {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  return proveedores.find((p) => p.hosts.some((h) => hostCoincide(url.hostname, h))) ?? null;
}

function evidencia(regla: string, url: URL, selector: string, valor: string): Evidencia {
  return { campo: 'reserva_online', regla, url: limpiarUrl(url), selector, valor: recortar(valor), metodo: 'html' };
}

export function detectarReservas(
  paginas: readonly PaginaInspeccionada[],
  config: ConfigResuelta,
  cobertura: CoberturaReservas,
): ResultadoReservas {
  const proveedores = [...REGISTRO_PROVEEDORES, ...config.proveedores_extra];
  const palabrasCita = config.palabras.citas;
  const evidencias: Evidencia[] = [];
  const limitaciones = new Set<Limitacion>();
  const plataformas: string[] = [];
  let propia = false;
  let soloManual = false;
  let externaDesconocida = false;

  const ordenadas = [...paginas].sort((a, b) => ORDEN_ROLES.indexOf(a.rol) - ORDEN_ROLES.indexOf(b.rol));
  for (const { doc } of ordenadas) {
    const origen = doc.url.origin;
    const anotar = (p: ProveedorReserva): void => {
      if (!plataformas.includes(p.id)) plataformas.push(p.id);
    };

    for (const e of doc.enlaces) {
      if (e.oculto) continue;
      const hablaDeReservar = contienePalabra(e.texto, palabrasCita) !== null;
      const p = proveedorDe(e.url, proveedores);
      if (p) {
        if (p.requiere_texto_reserva && !hablaDeReservar) continue;
        anotar(p);
        evidencias.push(evidencia(`enlace_${p.id}`, doc.url, 'a[href]', e.url.toString()));
      } else if (hablaDeReservar && (e.url.protocol === 'https:' || e.url.protocol === 'http:') && e.url.origin !== origen) {
        // Un «Reservar» que lleva a un dominio que no conocemos: puede ser un
        // proveedor nuevo o nada. No se descarga, y deja la respuesta en duda.
        externaDesconocida = true;
        evidencias.push(evidencia('enlace_reserva_externo_desconocido', doc.url, 'a[href]', e.url.toString()));
      }
    }

    for (const i of doc.iframes) {
      if (i.oculto) continue;
      const p = proveedorDe(i.url, proveedores);
      if (p) {
        anotar(p);
        evidencias.push(evidencia(`iframe_${p.id}`, doc.url, 'iframe[src]', i.url.toString()));
      } else if (i.url.origin !== origen) {
        const contexto = `${i.titulo} ${i.url.pathname}`;
        if (contienePalabra(contexto, palabrasCita) || /agenda|calendar|booking|reserv/.test(contexto)) {
          externaDesconocida = true;
          evidencias.push(evidencia('iframe_reserva_desconocido', doc.url, 'iframe[src]', i.url.toString()));
        }
      }
    }

    // Widgets cargados por script o declarados en atributos data-* (data-url…).
    for (const r of doc.recursos) {
      const p = proveedorDe(r.url, proveedores);
      if (!p || p.requiere_texto_reserva) continue;
      anotar(p);
      evidencias.push(evidencia(`widget_${p.id}`, doc.url, r.selector, r.url.toString()));
    }

    // Agenda propia: un formulario visible con fecha, hora o turno y un envío
    // que dice reservar o confirmar. Pedir cita con texto libre no basta.
    for (const f of doc.formularios) {
      if (f.oculto || !f.tieneFecha || !f.tieneHora || !f.tieneEnvio) continue;
      if (/\b(reservar|reserva|confirmar|confirma|book|pedir cita|solicitar cita|demanar)\b/.test(f.textoEnvio)) {
        propia = true;
        evidencias.push(evidencia('formulario_reserva_propio', doc.url, 'form', f.textoEnvio));
      }
    }

    for (const frase of FRASES_SOLO_MANUAL) {
      const m = frase.exec(doc.textoVisible);
      if (m) {
        soloManual = true;
        evidencias.push(evidencia('declara_citas_solo_manual', doc.url, 'texto', m[0]));
        break;
      }
    }
  }

  if (externaDesconocida) limitaciones.add('reserva_externa_no_reconocida');
  if (cobertura.dinamica) limitaciones.add('contenido_dinamico');

  let reserva: ReservaOnline;
  if (plataformas.length > 0) {
    reserva = 'plataforma';
    if (soloManual) limitaciones.add('senales_contradictorias');
  } else if (propia) {
    reserva = 'propia';
    if (soloManual) limitaciones.add('senales_contradictorias');
  } else if (soloManual && cobertura.completa && !cobertura.dinamica && !externaDesconocida) {
    reserva = 'none';
  } else {
    reserva = 'dudoso';
    limitaciones.add('sin_evidencia_concluyente');
  }

  return {
    reserva_online: reserva,
    plataforma_reserva: reserva === 'plataforma' ? (plataformas[0] ?? null) : null,
    plataformas_detectadas: plataformas,
    evidencias,
    limitaciones: [...limitaciones],
  };
}
