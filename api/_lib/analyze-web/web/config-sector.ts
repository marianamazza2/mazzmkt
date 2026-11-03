// ============================================================================
// A3 parte 1 · Configuración por sector (spec §5.4, regla A3-10)
// ============================================================================
// Las reglas de src/web/ no conocen ningún sector. Lo que cambia entre una
// clínica y un estudio de arquitectura (qué páginas visitar primero, qué
// palabras cuentan, proveedores de reserva extra) llega en un ConfigSector.
// Las señales se calculan siempre todas: la configuración elige páginas y
// palabras, no qué campos se devuelven.

import { ErrorConfigSector, ROLES_SECUNDARIOS, type RolSecundario } from './types.js';
import { normalizar } from './texto.js';

export interface ProveedorReserva {
  /** Identificador normalizado que se devuelve en plataforma_reserva. */
  id: string;
  /** Dominios propios del proveedor; se aceptan también sus subdominios. */
  hosts: string[];
  /**
   * Marketplaces (Doctoralia, Booksy…) enlazan también a fichas y opiniones:
   * solo cuentan como reserva si el enlace habla de reservar o pedir cita.
   * Los proveedores que solo hacen agendas (Calendly…) no lo necesitan.
   */
  requiere_texto_reserva?: boolean;
}

export interface ConfigSector {
  id: string;
  /** Orden en que se buscan páginas secundarias. */
  roles_prioridad: RolSecundario[];
  /** Palabras extra por rol; se suman a las genéricas, no las sustituyen. */
  palabras_rol?: Partial<Record<RolSecundario, string[]>>;
  /** Proveedores extra; nunca sustituyen al registro base. */
  proveedores_extra?: ProveedorReserva[];
}

/** Configuración ya validada y mezclada con las palabras genéricas. */
export interface ConfigResuelta {
  id: string;
  roles_prioridad: RolSecundario[];
  palabras: Record<RolSecundario, string[]>;
  proveedores_extra: ProveedorReserva[];
}

/** Palabras genéricas por rol, en español, catalán e inglés. */
export const PALABRAS_BASE: Readonly<Record<RolSecundario, readonly string[]>> = {
  citas: [
    'reservar', 'reserva', 'reservas', 'reserva online', 'reserva ya', 'reserva tu cita',
    'pedir cita', 'pide cita', 'pide tu cita', 'cita previa', 'cita online', 'citas',
    'pedir hora', 'demanar cita', 'demana cita', 'reserva ara', 'cita',
    'book', 'book now', 'booking', 'appointment', 'appointments',
  ],
  contacto: [
    'contacto', 'contacta', 'contactar', 'contactanos', 'contacta con nosotros',
    'contacte', 'contacta amb nosaltres', 'contact', 'contact us',
  ],
  portfolio: [
    'proyectos', 'portfolio', 'portafolio', 'obras', 'trabajos',
    'projectes', 'treballs', 'projects', 'work', 'our work',
  ],
};

export const CONFIG_GENERICA: ConfigSector = {
  id: 'generico',
  roles_prioridad: ['citas', 'contacto', 'portfolio'],
};

const PATRON_ID = /^[a-z0-9][a-z0-9_-]{0,39}$/;
const PATRON_HOST = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,62}$/;

/** Valida y mezcla. Sin configuración aplica la genérica. */
export function resolverConfigSector(config: ConfigSector = CONFIG_GENERICA): ConfigResuelta {
  if (typeof config !== 'object' || config === null) {
    throw new ErrorConfigSector('se esperaba un objeto');
  }
  if (typeof config.id !== 'string' || !PATRON_ID.test(config.id)) {
    throw new ErrorConfigSector('el id debe ser minúsculas, números, guion o guion bajo');
  }

  const roles = config.roles_prioridad;
  if (!Array.isArray(roles) || roles.length === 0) {
    throw new ErrorConfigSector('roles_prioridad necesita al menos un rol');
  }
  for (const rol of roles) {
    if (!ROLES_SECUNDARIOS.includes(rol)) throw new ErrorConfigSector(`rol desconocido «${String(rol)}»`);
  }
  if (new Set(roles).size !== roles.length) throw new ErrorConfigSector('roles_prioridad tiene roles repetidos');

  const palabras = {} as Record<RolSecundario, string[]>;
  for (const rol of ROLES_SECUNDARIOS) palabras[rol] = PALABRAS_BASE[rol].map(normalizar);
  for (const [rol, extra] of Object.entries(config.palabras_rol ?? {})) {
    if (!ROLES_SECUNDARIOS.includes(rol as RolSecundario)) {
      throw new ErrorConfigSector(`palabras_rol usa un rol desconocido «${rol}»`);
    }
    if (!Array.isArray(extra) || extra.some((p) => typeof p !== 'string' || !normalizar(p))) {
      throw new ErrorConfigSector(`palabras_rol.${rol} debe ser una lista de textos no vacíos`);
    }
    // Las frases largas primero, para que la evidencia cite la más específica.
    const mezcla = new Set([...extra.map(normalizar), ...palabras[rol as RolSecundario]]);
    palabras[rol as RolSecundario] = [...mezcla].sort((a, b) => b.length - a.length);
  }
  for (const rol of ROLES_SECUNDARIOS) palabras[rol].sort((a, b) => b.length - a.length);

  const proveedores = config.proveedores_extra ?? [];
  if (!Array.isArray(proveedores)) throw new ErrorConfigSector('proveedores_extra debe ser una lista');
  for (const p of proveedores) {
    if (typeof p?.id !== 'string' || !PATRON_ID.test(p.id.replace('.', '-'))) {
      throw new ErrorConfigSector('cada proveedor necesita un id válido');
    }
    if (!Array.isArray(p.hosts) || p.hosts.length === 0 || p.hosts.some((h) => typeof h !== 'string' || !PATRON_HOST.test(h))) {
      throw new ErrorConfigSector(`el proveedor «${p.id}» necesita hosts válidos, sin protocolo ni ruta`);
    }
  }

  return {
    id: config.id,
    roles_prioridad: [...roles],
    palabras,
    proveedores_extra: proveedores.map((p) => ({ ...p, hosts: [...p.hosts] })),
  };
}
