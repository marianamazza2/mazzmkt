// ============================================================================
// A3 parte 1 · Datos de ejemplo del nicho 2: estudios de arquitectura e interiorismo
// ============================================================================
// Son datos, no código: añadir un nicho es añadir un archivo como este.
// Pendiente de confirmar el 3 de noviembre de 2026.

import type { ConfigSector } from '../web/config-sector.js';

export const CONFIG_ARQUITECTURA: ConfigSector = {
  id: 'arquitectura',
  // Para vender marca y web importa el portfolio; el contacto da el resto.
  roles_prioridad: ['portfolio', 'contacto'],
  palabras_rol: {
    portfolio: ['nuestros proyectos', 'proyectos realizados', 'realizaciones', 'obra', 'galeria', 'projecte'],
    citas: ['primera reunion', 'agenda una reunion', 'reservar llamada', 'book a call'],
  },
};
