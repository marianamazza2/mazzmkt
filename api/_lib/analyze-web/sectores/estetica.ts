// ============================================================================
// A3 parte 1 · Datos de ejemplo del nicho 1: clínicas de estética y medicina estética
// ============================================================================
// Son datos, no código: añadir un nicho es añadir un archivo como este.
// Pendiente de confirmar el 3 de noviembre de 2026.

import type { ConfigSector } from '../web/config-sector.js';

export const CONFIG_ESTETICA: ConfigSector = {
  id: 'estetica',
  // Para vender el agente importa sobre todo cómo se piden las citas.
  roles_prioridad: ['citas', 'contacto'],
  palabras_rol: {
    citas: ['primera visita', 'primera consulta', 'valoracion gratuita', 'consulta gratuita', 'diagnostico gratuito'],
    portfolio: ['antes y despues', 'resultados', 'casos reales'],
  },
};
