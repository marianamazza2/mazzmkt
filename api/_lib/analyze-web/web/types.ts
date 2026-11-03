// ============================================================================
// A3 parte 1 · Contrato JSON de analyze-web (spec §5.1)
// ============================================================================
// Todo lo que devuelve analyzeWeb está aquí. Los campos siempre existen: lo
// desconocido es null o 'dudoso', nunca undefined ni un false inventado.

export type ReservaOnline = 'none' | 'plataforma' | 'propia' | 'dudoso';
export type TipoWeb = 'plantilla' | 'a_medida' | 'dudoso';
export type EstadoAnalisis = 'completo' | 'parcial' | 'no_disponible' | 'entrada_invalida';

export type RolSecundario = 'citas' | 'contacto' | 'portfolio';
export type RolPagina = 'home' | RolSecundario;
export const ROLES_SECUNDARIOS: readonly RolSecundario[] = ['citas', 'contacto', 'portfolio'];

/** Por qué no se pudo usar un documento. */
export type MotivoError =
  | 'url_invalida'
  | 'destino_no_publico'
  | 'timeout'
  | 'cancelado'
  | 'error_red'
  | 'error_tls'
  | 'http_error'
  | 'contenido_no_html'
  | 'contenido_vacio'
  | 'pagina_bloqueada'
  | 'limite_tamano'
  | 'limite_redirecciones'
  | 'redireccion_insegura'
  | 'limite_documentos';

/** Incertidumbres que acompañan al resultado. */
export type Limitacion =
  | 'visual_no_verificado'
  | 'contenido_dinamico'
  | 'contacto_no_verificado'
  | 'sin_evidencia_concluyente'
  | 'reserva_externa_no_reconocida'
  | 'senales_contradictorias'
  | 'cobertura_parcial'
  | 'a_medida_inferido'
  | 'portfolio_externo';

export type CampoEvidencia =
  | 'reserva_online'
  | 'https'
  | 'responsive'
  | 'copyright_anio'
  | 'tiene_meta_titulo'
  | 'tiene_meta_descripcion'
  | 'cta_html'
  | 'tipo_web'
  | 'portfolio';

export interface Evidencia {
  campo: CampoEvidencia;
  /** Código estable de la regla que la produce. */
  regla: string;
  url: string;
  selector: string;
  /** Fragmento de texto o valor de atributo, máximo 200 caracteres. */
  valor: string;
  metodo: 'html';
}

export interface Pagina {
  rol: RolPagina;
  url_solicitada: string;
  url_final: string | null;
  http_status: number | null;
  resultado: 'ok' | 'error' | 'omitida';
  motivo: MotivoError | null;
}

export interface ResultadoAnalisisWeb {
  version: 1;
  url_solicitada: string;
  url_final: string | null;
  analizado_at: string;
  sector_config: string;
  estado: EstadoAnalisis;
  reserva_online: ReservaOnline;
  plataforma_reserva: string | null;
  plataformas_detectadas: string[];
  https: boolean | null;
  responsive: boolean | null;
  responsive_visual: 'dudoso';
  copyright_anio: number | null;
  tiene_meta_titulo: boolean | null;
  tiene_meta_descripcion: boolean | null;
  cta_html: boolean | null;
  cta_visible: 'dudoso';
  tipo_web: TipoWeb;
  constructor_web: string | null;
  tema_wordpress: string | null;
  portfolio: boolean | null;
  evidencias: Evidencia[];
  paginas: Pagina[];
  limitaciones: Limitacion[];
}

/** Configuración de sector mal formada: es un error de quien llama, no de la web. */
export class ErrorConfigSector extends Error {
  readonly codigo = 'config_sector_invalida';
  constructor(mensaje: string) {
    super(`Configuración de sector no válida: ${mensaje}`);
    this.name = 'ErrorConfigSector';
  }
}
