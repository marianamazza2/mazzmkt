// ============================================================================
// A3 parte 1 · Destinos de red permitidos (spec §5.3, regla A3-02)
// ============================================================================
// El auditor de A4 aceptará URLs de visitantes: nunca se puede pedir algo a
// localhost, a la red interna de Vercel ni a direcciones privadas.

import ipaddr from 'ipaddr.js';

/** Error con código estable para distinguirlo de un fallo de red cualquiera. */
export class ErrorDestinoNoPublico extends Error {
  readonly code = 'DESTINO_NO_PUBLICO';
  constructor(destino: string) {
    super(`Destino no público: ${destino}`);
    this.name = 'ErrorDestinoNoPublico';
  }
}

/** Solo unicast global. IPv4 mapeada en IPv6 (::ffff:127.0.0.1) se evalúa como IPv4. */
export function esIpPublica(ip: string): boolean {
  if (!ipaddr.isValid(ip)) return false;
  let direccion = ipaddr.parse(ip);
  if (direccion.kind() === 'ipv6' && (direccion as ipaddr.IPv6).isIPv4MappedAddress()) {
    direccion = (direccion as ipaddr.IPv6).toIPv4Address();
  }
  return direccion.range() === 'unicast';
}

const HOSTS_LOCALES = /(^|\.)(localhost|local|internal|intranet|lan|home\.arpa|localdomain)$/i;

/** Host literal sin corchetes, para IPv6. */
export function hostSinCorchetes(url: URL): string {
  return url.hostname.replace(/^\[|\]$/g, '');
}

/**
 * Comprobación previa a cualquier petición, en cada salto de redirección:
 * http(s), puerto de serie, sin credenciales, sin hosts locales ni IP privadas.
 * La comprobación de lo que resuelve el DNS la hace el transporte.
 */
export function motivoDestinoProhibido(url: URL): 'url_invalida' | 'destino_no_publico' | null {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return 'url_invalida';
  if (url.username || url.password) return 'url_invalida';
  if (url.port !== '' && url.port !== '80' && url.port !== '443') return 'destino_no_publico';
  const host = hostSinCorchetes(url);
  if (!host || HOSTS_LOCALES.test(host) || !host.includes('.') && !ipaddr.isValid(host)) return 'destino_no_publico';
  if (ipaddr.isValid(host) && !esIpPublica(host)) return 'destino_no_publico';
  return null;
}
