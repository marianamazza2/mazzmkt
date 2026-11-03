// ============================================================================
// A3 parte 1 · Extracción de evidencia HTML (spec §6, reglas A3-04 y A3-05)
// ============================================================================
// Convierte un documento en datos planos que las reglas pueden consultar sin
// volver a recorrer el árbol. No ejecuta JavaScript ni descarga nada: solo lee
// etiquetas y atributos. Los elementos ocultos (hidden, aria-hidden, display
// none en línea, también por un ancestro) se marcan para que no cuenten como
// llamadas a la acción, y su texto no entra en el texto visible.

import { parse, type DefaultTreeAdapterTypes } from 'parse5';
import { normalizar, resolverHref } from './texto.js';

type Nodo = DefaultTreeAdapterTypes.Node;
type Elemento = DefaultTreeAdapterTypes.Element;

export interface Enlace {
  url: URL;
  /** Texto normalizado: contenido, aria-label, title y alt de imágenes. */
  texto: string;
  oculto: boolean;
}

export interface Iframe {
  url: URL;
  titulo: string;
  oculto: boolean;
}

export interface Recurso {
  url: URL;
  selector: string;
}

export interface Formulario {
  oculto: boolean;
  tieneFecha: boolean;
  tieneHora: boolean;
  tieneEnvio: boolean;
  /** Texto normalizado de los botones de envío. */
  textoEnvio: string;
}

export interface Boton {
  texto: string;
  oculto: boolean;
}

export interface DocumentoHtml {
  url: URL;
  base: URL;
  titulo: string | null;
  metaDescripcion: string | null;
  viewport: string | null;
  generadores: string[];
  enlaces: Enlace[];
  iframes: Iframe[];
  /** Scripts, hojas de estilo, imágenes y URLs absolutas en atributos data-*. */
  recursos: Recurso[];
  atributosData: Set<string>;
  clases: Set<string>;
  formularios: Formulario[];
  botones: Boton[];
  /** Texto visible normalizado de todo el documento. */
  textoVisible: string;
  /** Texto del pie (footer o role=contentinfo), sin normalizar, o null si no hay. */
  textoPie: string | null;
  contenedorAppVacio: boolean;
  numScripts: number;
  /** Tarjetas de proyecto con imagen (A3-09). */
  tarjetasProyecto: number;
}

const SIN_TEXTO = new Set(['script', 'style', 'template', 'noscript', 'svg', 'head']);
const IDS_APP = new Set(['root', 'app', '__next', '__nuxt', '___gatsby']);
const PATRON_TARJETA = /project|proyecto|projecte|portfolio|obra/i;
const PATRON_FECHA = /fecha|date|data-cita|\bdia\b|\bday\b/i;
const PATRON_HORA = /hora|time|turno|slot|horario|franja/i;

function attr(el: Elemento, nombre: string): string | null {
  const a = el.attrs.find((x) => x.name === nombre);
  return a ? a.value : null;
}

function esElemento(n: Nodo): n is Elemento {
  return 'tagName' in n;
}

function hijos(n: Nodo): Nodo[] {
  return 'childNodes' in n ? (n.childNodes as Nodo[]) : [];
}

function estaOculto(el: Elemento): boolean {
  if (attr(el, 'hidden') !== null) return true;
  if (attr(el, 'aria-hidden')?.trim().toLowerCase() === 'true') return true;
  const estilo = attr(el, 'style')?.toLowerCase().replace(/\s+/g, '') ?? '';
  return estilo.includes('display:none') || estilo.includes('visibility:hidden');
}

/** Texto de un subárbol, incluido el de imágenes (alt) y etiquetas accesibles. */
function textoDe(n: Nodo): string {
  if (n.nodeName === '#text') return (n as DefaultTreeAdapterTypes.TextNode).value;
  if (!esElemento(n) || SIN_TEXTO.has(n.tagName)) return '';
  const partes: string[] = [];
  if (n.tagName === 'img') partes.push(attr(n, 'alt') ?? '');
  for (const h of hijos(n)) partes.push(textoDe(h));
  return partes.join(' ');
}

function etiquetaAccesible(el: Elemento): string {
  return [attr(el, 'aria-label'), attr(el, 'title'), textoDe(el)].filter(Boolean).join(' ');
}

interface Contexto {
  oculto: boolean;
  enPie: boolean;
  formulario: Formulario | null;
}

interface Crudo {
  base: string | null;
  titulo: string | null;
  metaDescripcion: string | null;
  viewport: string | null;
  generadores: string[];
  enlaces: { href: string; texto: string; oculto: boolean }[];
  iframes: { src: string; titulo: string; oculto: boolean }[];
  recursos: { href: string; selector: string }[];
  atributosData: Set<string>;
  clases: Set<string>;
  formularios: Formulario[];
  botones: Boton[];
  textoVisible: string[];
  textoPie: string[];
  hayPie: boolean;
  contenedorAppVacio: boolean;
  numScripts: number;
  tarjetasProyecto: number;
}

export function analizarHtml(html: string, urlDocumento: URL): DocumentoHtml {
  const doc = parse(html);
  const crudo: Crudo = {
    base: null,
    titulo: null,
    metaDescripcion: null,
    viewport: null,
    generadores: [],
    enlaces: [],
    iframes: [],
    recursos: [],
    atributosData: new Set(),
    clases: new Set(),
    formularios: [],
    botones: [],
    textoVisible: [],
    textoPie: [],
    hayPie: false,
    contenedorAppVacio: false,
    numScripts: 0,
    tarjetasProyecto: 0,
  };
  recorrer(doc, { oculto: false, enPie: false, formulario: null }, crudo);

  // El primer <base href> válido manda para resolver rutas relativas.
  const base = (crudo.base && resolverHref(crudo.base, urlDocumento)) || urlDocumento;
  const resolver = (href: string): URL | null => {
    const url = resolverHref(href, base);
    return url && (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'tel:' || url.protocol === 'mailto:' || url.protocol === 'whatsapp:')
      ? url
      : null;
  };

  const enlaces: Enlace[] = [];
  for (const e of crudo.enlaces) {
    const url = resolver(e.href);
    if (url) enlaces.push({ url, texto: normalizar(e.texto), oculto: e.oculto });
  }
  const iframes: Iframe[] = [];
  for (const i of crudo.iframes) {
    const url = resolver(i.src);
    if (url) iframes.push({ url, titulo: normalizar(i.titulo), oculto: i.oculto });
  }
  const recursos: Recurso[] = [];
  for (const r of crudo.recursos) {
    const url = resolver(r.href);
    if (url) recursos.push({ url, selector: r.selector });
  }

  return {
    url: urlDocumento,
    base,
    titulo: crudo.titulo,
    metaDescripcion: crudo.metaDescripcion,
    viewport: crudo.viewport,
    generadores: crudo.generadores,
    enlaces,
    iframes,
    recursos,
    atributosData: crudo.atributosData,
    clases: crudo.clases,
    formularios: crudo.formularios,
    botones: crudo.botones,
    textoVisible: normalizar(crudo.textoVisible.join(' ')),
    textoPie: crudo.hayPie ? crudo.textoPie.join(' ').replace(/\s+/g, ' ').trim() : null,
    contenedorAppVacio: crudo.contenedorAppVacio,
    numScripts: crudo.numScripts,
    tarjetasProyecto: crudo.tarjetasProyecto,
  };
}

/** Devuelve si el subárbol contiene una tarjeta de proyecto, para no contar contenedores. */
function recorrer(n: Nodo, ctx: Contexto, c: Crudo): { tarjeta: boolean; img: boolean } {
  if (n.nodeName === '#text') {
    const valor = (n as DefaultTreeAdapterTypes.TextNode).value;
    if (!ctx.oculto) c.textoVisible.push(valor);
    if (ctx.enPie && !ctx.oculto) c.textoPie.push(valor);
    return { tarjeta: false, img: false };
  }
  if (!esElemento(n)) {
    let tarjeta = false;
    let img = false;
    for (const h of hijos(n)) {
      const r = recorrer(h, ctx, c);
      tarjeta ||= r.tarjeta;
      img ||= r.img;
    }
    return { tarjeta, img };
  }

  const el = n;
  const tag = el.tagName;
  const oculto = ctx.oculto || estaOculto(el);

  for (const a of el.attrs) {
    if (a.name.startsWith('data-')) {
      c.atributosData.add(a.name);
      if (/^https?:\/\//i.test(a.value.trim())) c.recursos.push({ href: a.value, selector: `[${a.name}]` });
    }
    if (a.name === 'class') for (const cl of a.value.split(/\s+/)) if (cl) c.clases.add(cl);
  }

  switch (tag) {
    case 'base':
      if (c.base === null && attr(el, 'href')) c.base = attr(el, 'href');
      break;
    case 'title':
      if (c.titulo === null) c.titulo = textoDe(el).replace(/\s+/g, ' ').trim();
      return { tarjeta: false, img: false };
    case 'meta': {
      const nombre = attr(el, 'name')?.trim().toLowerCase();
      const contenido = attr(el, 'content') ?? '';
      if (nombre === 'description' && c.metaDescripcion === null) c.metaDescripcion = contenido.replace(/\s+/g, ' ').trim();
      if (nombre === 'viewport' && c.viewport === null) c.viewport = contenido;
      if (nombre === 'generator' && contenido.trim()) c.generadores.push(contenido.trim());
      break;
    }
    case 'script':
      c.numScripts += 1;
      if (attr(el, 'src')) c.recursos.push({ href: attr(el, 'src')!, selector: 'script[src]' });
      return { tarjeta: false, img: false };
    case 'link':
      if (attr(el, 'href')) c.recursos.push({ href: attr(el, 'href')!, selector: `link[rel=${attr(el, 'rel') ?? ''}]` });
      break;
    case 'img':
    case 'source': {
      const src = attr(el, 'src') ?? attr(el, 'srcset')?.trim().split(/[\s,]+/)[0];
      if (src) c.recursos.push({ href: src, selector: `${tag}[src]` });
      break;
    }
    case 'a':
    case 'area':
      if (attr(el, 'href')) c.enlaces.push({ href: attr(el, 'href')!, texto: etiquetaAccesible(el), oculto });
      break;
    case 'iframe':
      if (attr(el, 'src')) c.iframes.push({ src: attr(el, 'src')!, titulo: attr(el, 'title') ?? '', oculto });
      break;
    case 'footer':
      c.hayPie = true;
      break;
    case 'div':
      if (IDS_APP.has(attr(el, 'id') ?? '') && !el.childNodes.some((h) => esElemento(h) || ('value' in h && String(h.value).trim()))) {
        c.contenedorAppVacio = true;
      }
      break;
  }
  if (attr(el, 'role') === 'contentinfo') c.hayPie = true;
  const enPie = ctx.enPie || tag === 'footer' || attr(el, 'role') === 'contentinfo';

  // Formularios: se mira si piden fecha, hora o turno y cómo se envían.
  let formulario = ctx.formulario;
  if (tag === 'form') {
    formulario = { oculto, tieneFecha: false, tieneHora: false, tieneEnvio: false, textoEnvio: '' };
    c.formularios.push(formulario);
  }
  if (formulario && (tag === 'input' || tag === 'select' || tag === 'textarea')) {
    const tipo = (attr(el, 'type') ?? (tag === 'input' ? 'text' : tag)).toLowerCase();
    const nombre = `${attr(el, 'name') ?? ''} ${attr(el, 'id') ?? ''}`;
    if (tipo === 'date' || tipo === 'datetime-local' || PATRON_FECHA.test(nombre)) formulario.tieneFecha = true;
    if (tipo === 'time' || tipo === 'datetime-local' || PATRON_HORA.test(nombre)) formulario.tieneHora = true;
    if (tipo === 'submit') {
      formulario.tieneEnvio = true;
      formulario.textoEnvio += ` ${normalizar(attr(el, 'value') ?? '')}`;
    }
  }
  if (tag === 'button' || attr(el, 'role') === 'button') {
    const texto = normalizar(etiquetaAccesible(el));
    const tipo = (attr(el, 'type') ?? 'submit').toLowerCase();
    if (formulario && tag === 'button' && tipo === 'submit') {
      formulario.tieneEnvio = true;
      formulario.textoEnvio += ` ${texto}`;
    } else if (!formulario) {
      c.botones.push({ texto, oculto });
    }
  }

  const ctxHijo: Contexto = { oculto, enPie, formulario };
  let tarjetaDentro = false;
  let imgDentro = tag === 'img';
  if (!SIN_TEXTO.has(tag) || tag === 'head') {
    for (const h of hijos(el)) {
      const r = recorrer(h, ctxHijo, c);
      tarjetaDentro ||= r.tarjeta;
      imgDentro ||= r.img;
    }
  }

  // Tarjeta de proyecto: clase o id de proyecto con una imagen dentro. Solo se
  // cuenta la más interna, para que la sección que las agrupa no sume otra.
  const marca = `${attr(el, 'class') ?? ''} ${attr(el, 'id') ?? ''}`;
  const esTarjeta = !oculto && imgDentro && PATRON_TARJETA.test(marca);
  if (esTarjeta && !tarjetaDentro) c.tarjetasProyecto += 1;
  return { tarjeta: tarjetaDentro || esTarjeta, img: imgDentro };
}
