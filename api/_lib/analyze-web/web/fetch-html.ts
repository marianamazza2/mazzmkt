// ============================================================================
// A3 parte 1 · Descarga acotada de un documento HTML (spec §5.2, regla A3-01)
// ============================================================================
// Un documento = una URL más sus redirecciones. Límites: redirecciones,
// tiempo por documento (DNS, conexión y cuerpo incluidos) y tamaño del cuerpo
// descomprimido medido mientras se lee. Sin reintentos. Las redirecciones se
// siguen a mano para validar cada salto y no bajar de HTTPS a HTTP.
// No depende de ningún transporte concreto: los tests inyectan uno simulado.

import { ErrorDestinoNoPublico, motivoDestinoProhibido } from './red.js';
import type { MotivoError } from './types.js';

/**
 * Hace una única petición GET sin seguir redirecciones. Debe abortar cuando
 * se aborte `signal`, también durante la lectura del cuerpo.
 */
export type Transporte = (url: URL, init: { signal: AbortSignal }) => Promise<Response>;

export interface LimitesDescarga {
  maxRedirecciones: number;
  timeoutDocumentoMs: number;
  maxBytes: number;
}

export type ResultadoDescarga =
  | { ok: true; url_final: URL; http_status: number; html: string }
  | { ok: false; motivo: MotivoError; url_final: URL | null; http_status: number | null };

export interface SenalesCancelacion {
  /** Cancelación pedida por quien llama. */
  usuario?: AbortSignal | undefined;
  /** Tiempo total del análisis agotado. */
  total: AbortSignal;
}

class LimiteTamano extends Error {}

const TIPOS_HTML = /^(text\/html|application\/xhtml\+xml)\b/i;
const MARCAS_BLOQUEO = /\/cdn-cgi\/challenge-platform\/|cf-chl-|<title>\s*just a moment|g-recaptcha|h-captcha|captcha-delivery\.com/i;

export async function descargarDocumento(
  inicial: URL,
  transporte: Transporte,
  limites: LimitesDescarga,
  senales: SenalesCancelacion,
): Promise<ResultadoDescarga> {
  const timeout = AbortSignal.timeout(limites.timeoutDocumentoMs);
  const signal = AbortSignal.any([senales.total, timeout, ...(senales.usuario ? [senales.usuario] : [])]);
  const motivoAbort = (): MotivoError => (senales.usuario?.aborted ? 'cancelado' : 'timeout');

  const vistas = new Set<string>();
  let url = inicial;
  let ultimo: URL | null = null;
  let status: number | null = null;

  for (let saltos = 0; ; saltos++) {
    const prohibido = motivoDestinoProhibido(url);
    if (prohibido) return { ok: false, motivo: prohibido, url_final: ultimo, http_status: status };
    if (signal.aborted) return { ok: false, motivo: motivoAbort(), url_final: ultimo, http_status: status };
    vistas.add(url.toString());

    let respuesta: Response;
    try {
      respuesta = await transporte(url, { signal });
    } catch (error) {
      return { ok: false, motivo: signal.aborted ? motivoAbort() : clasificarError(error), url_final: ultimo, http_status: status };
    }
    ultimo = url;
    status = respuesta.status;

    if (status >= 300 && status < 400 && status !== 304) {
      await respuesta.body?.cancel().catch(() => undefined);
      const destino = respuesta.headers.get('location');
      let siguiente: URL;
      try {
        if (!destino) throw new Error('sin location');
        siguiente = new URL(destino, url);
      } catch {
        return { ok: false, motivo: 'http_error', url_final: url, http_status: status };
      }
      siguiente.hash = '';
      if (url.protocol === 'https:' && siguiente.protocol === 'http:') {
        return { ok: false, motivo: 'redireccion_insegura', url_final: url, http_status: status };
      }
      if (saltos + 1 > limites.maxRedirecciones || vistas.has(siguiente.toString())) {
        return { ok: false, motivo: 'limite_redirecciones', url_final: url, http_status: status };
      }
      url = siguiente;
      continue;
    }

    if (status < 200 || status >= 300) {
      await respuesta.body?.cancel().catch(() => undefined);
      return { ok: false, motivo: 'http_error', url_final: url, http_status: status };
    }
    const tipo = respuesta.headers.get('content-type') ?? '';
    if (!TIPOS_HTML.test(tipo.trim())) {
      await respuesta.body?.cancel().catch(() => undefined);
      return { ok: false, motivo: 'contenido_no_html', url_final: url, http_status: status };
    }

    let html: string;
    try {
      html = await leerCuerpo(respuesta, limites.maxBytes, signal, charsetDe(tipo));
    } catch (error) {
      if (error instanceof LimiteTamano) return { ok: false, motivo: 'limite_tamano', url_final: url, http_status: status };
      return { ok: false, motivo: signal.aborted ? motivoAbort() : clasificarError(error), url_final: url, http_status: status };
    }
    if (!html.trim()) return { ok: false, motivo: 'contenido_vacio', url_final: url, http_status: status };
    if (MARCAS_BLOQUEO.test(html)) return { ok: false, motivo: 'pagina_bloqueada', url_final: url, http_status: status };
    return { ok: true, url_final: url, http_status: status, html };
  }
}

function charsetDe(contentType: string): string {
  return /charset\s*=\s*"?([\w-]+)/i.exec(contentType)?.[1] ?? 'utf-8';
}

/** Lee el cuerpo contando bytes; si pasa del límite, cancela y no devuelve un HTML truncado. */
async function leerCuerpo(respuesta: Response, maxBytes: number, signal: AbortSignal, charset: string): Promise<string> {
  if (!respuesta.body) return '';
  const lector = respuesta.body.getReader();
  const trozos: Uint8Array[] = [];
  let total = 0;
  const abortado = new Promise<never>((_, rechazar) => {
    const alAbortar = (): void => rechazar(signal.reason ?? new Error('abortado'));
    if (signal.aborted) alAbortar();
    else signal.addEventListener('abort', alAbortar, { once: true });
  });
  abortado.catch(() => undefined);
  try {
    for (;;) {
      const { done, value } = await Promise.race([lector.read(), abortado]);
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) throw new LimiteTamano();
      trozos.push(value);
    }
  } catch (error) {
    await lector.cancel().catch(() => undefined);
    throw error;
  }
  let decoder = new TextDecoder('utf-8');
  try {
    decoder = new TextDecoder(charset);
  } catch {
    // Charset desconocido: se queda UTF-8.
  }
  const unido = new Uint8Array(total);
  let pos = 0;
  for (const t of trozos) {
    unido.set(t, pos);
    pos += t.byteLength;
  }
  return decoder.decode(unido);
}

const CODIGOS_TLS = /CERT|TLS|SSL|UNABLE_TO_VERIFY|SELF_SIGNED|ERR_SSL/i;

/** Recorre la cadena de causas (fetch envuelve el error real en TypeError). */
export function clasificarError(error: unknown): MotivoError {
  let actual: unknown = error;
  for (let i = 0; i < 5 && actual; i++) {
    if (actual instanceof ErrorDestinoNoPublico || (actual as { code?: unknown }).code === 'DESTINO_NO_PUBLICO') {
      return 'destino_no_publico';
    }
    const code = String((actual as { code?: unknown }).code ?? '');
    if (CODIGOS_TLS.test(code)) return 'error_tls';
    actual = (actual as { cause?: unknown }).cause;
  }
  return 'error_red';
}
