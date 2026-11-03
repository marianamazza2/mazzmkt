// ============================================================================
// A3 parte 1 · Transporte real para Node y Vercel Functions (spec §5.3, A3-02)
// ============================================================================
// Comprobar el DNS y después dejar que fetch vuelva a resolver no sirve: entre
// una cosa y otra el dominio puede apuntar a otra IP. Aquí la resolución
// validada es la misma que usa la conexión, a través del lookup del Agent de
// undici. Se conservan hostname, SNI y validación de certificado. Sin cookies,
// credenciales ni cabeceras de autorización.

import { lookup as lookupDns } from 'node:dns/promises';
import type { LookupAddress } from 'node:dns';
import { isIP } from 'node:net';
import { Agent, fetch as fetchUndici } from 'undici';
import type { Transporte } from './fetch-html.js';
import { ErrorDestinoNoPublico, esIpPublica, hostSinCorchetes, motivoDestinoProhibido } from './red.js';

export type Resolver = (hostname: string) => Promise<LookupAddress[]>;

type CallbackLookup = (error: Error | null, direccion: string | LookupAddress[], familia?: number) => void;

const resolverPorDefecto: Resolver = (hostname) => lookupDns(hostname, { all: true, verbatim: true });

/**
 * Lookup compatible con net.connect: rechaza el conjunto entero si alguna
 * dirección no es pública y entrega solo la dirección validada.
 */
export function crearLookupSeguro(resolver: Resolver = resolverPorDefecto) {
  return (hostname: string, opciones: { all?: boolean } | number | undefined, callback: CallbackLookup): void => {
    resolver(hostname).then(
      (direcciones) => {
        if (direcciones.length === 0) {
          callback(Object.assign(new Error(`Sin direcciones para ${hostname}`), { code: 'ENOTFOUND' }), '');
          return;
        }
        if (direcciones.some((d) => !esIpPublica(d.address))) {
          callback(new ErrorDestinoNoPublico(hostname), '');
          return;
        }
        const elegida = direcciones[0]!;
        if (typeof opciones === 'object' && opciones?.all) callback(null, [elegida]);
        else callback(null, elegida.address, elegida.family);
      },
      (error: Error) => callback(error, ''),
    );
  };
}

export interface OpcionesTransporteNode {
  resolver?: Resolver;
  userAgent?: string;
}

export function crearTransporteNode(opciones: OpcionesTransporteNode = {}): Transporte {
  const agente = new Agent({
    connect: { lookup: crearLookupSeguro(opciones.resolver) as never },
  });
  const userAgent = opciones.userAgent ?? 'MAZZMKT-leads/0.1 (+https://mazzmkt.com)';

  return async (url, { signal }) => {
    // Con una IP literal net.connect no llama al lookup: se valida aquí.
    const host = hostSinCorchetes(url);
    if (isIP(host) && !esIpPublica(host)) throw new ErrorDestinoNoPublico(host);
    if (motivoDestinoProhibido(url)) throw new ErrorDestinoNoPublico(url.host);

    const respuesta = await fetchUndici(url, {
      method: 'GET',
      redirect: 'manual',
      credentials: 'omit',
      signal,
      dispatcher: agente,
      headers: {
        'user-agent': userAgent,
        accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.1',
        'accept-language': 'es-ES,es;q=0.9,ca;q=0.8,en;q=0.5',
      },
    });
    return respuesta as unknown as Response;
  };
}
