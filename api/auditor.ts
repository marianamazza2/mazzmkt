// Auditor web gratuito (A4 parte 1): GET /api/auditor?url=...
// Analiza la web con analyze-web (copiado de mazzmkt-leads, ver _lib/analyze-web/ORIGEN.md)
// y devuelve solo lo que pinta el informe. Sin email, sin cookies y sin guardar la URL.
// Límite: 10 auditorías por IP al día. La IP nunca se guarda: solo una huella diaria.

import { createHmac } from "node:crypto";
import { getCache, ipAddress } from "@vercel/functions";
import { analyzeWeb } from "./_lib/analyze-web/analyze-web.js";
import type { ResultadoAnalisisWeb } from "./_lib/analyze-web/analyze-web.js";

export const config = { maxDuration: 30 };

const LIMITE_DIARIO = 10;
const UN_DIA = 24 * 60 * 60;
const MAX_URL = 300;

// Una auditoría a la vez por IP en cada instancia
const enCurso = new Set<string>();

export type InformeAuditor = {
  estado: "ok" | "no_disponible" | "entrada_invalida";
  web: string | null;
  movil: boolean | null;
  https: boolean | null;
  reserva: ResultadoAnalisisWeb["reserva_online"];
  plataforma: string | null;
  cta: boolean | null;
  tipo: ResultadoAnalisisWeb["tipo_web"];
  constructor: string | null;
  anio: number | null;
  restantes: number;
};

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

// Huella de la IP con una clave secreta y la fecha: cambia cada día y no permite recuperar la IP
function huella(ip: string) {
  const dia = new Date().toISOString().slice(0, 10);
  const secreto = process.env.AUDITOR_SECRETO ?? "mazzmkt-auditor";
  return createHmac("sha256", secreto).update(`${dia}|${ip}`).digest("hex").slice(0, 32);
}

// La gente escribe "clinica.com" o "www.clinica.com": añadimos el protocolo nosotros
function normalizarUrl(texto: string) {
  const limpio = texto.trim();
  if (!limpio || limpio.length > MAX_URL) return null;
  const conProtocolo = /^https?:\/\//i.test(limpio) ? limpio : `https://${limpio}`;
  try {
    const url = new URL(conProtocolo);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function aInforme(r: ResultadoAnalisisWeb, restantes: number): InformeAuditor {
  const leida = r.estado === "completo" || r.estado === "parcial";
  return {
    estado: leida ? "ok" : r.estado === "entrada_invalida" ? "entrada_invalida" : "no_disponible",
    web: r.url_final ? new URL(r.url_final).hostname : null,
    movil: r.responsive,
    https: r.https,
    reserva: r.reserva_online,
    plataforma: r.plataforma_reserva,
    cta: r.cta_html,
    tipo: r.tipo_web,
    constructor: r.tema_wordpress ? `wordpress:${r.tema_wordpress}` : r.constructor_web,
    anio: r.copyright_anio,
    restantes,
  };
}

export async function GET(request: Request) {
  const url = normalizarUrl(new URL(request.url).searchParams.get("url") ?? "");
  if (!url) return json({ error: "url_invalida" }, 400);

  const ip = ipAddress(request) ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  const clave = huella(ip);
  const cache = getCache({ namespace: "auditor" });

  const usadas = Number((await cache.get(clave)) ?? 0);
  if (usadas >= LIMITE_DIARIO) return json({ error: "limite" }, 429);
  if (enCurso.has(clave)) return json({ error: "en_curso" }, 429);

  enCurso.add(clave);
  try {
    const resultado = await analyzeWeb(url, { signal: AbortSignal.timeout(25_000) });
    const leida = resultado.estado === "completo" || resultado.estado === "parcial";
    // Solo cuentan las webs que se han podido leer
    const total = leida ? usadas + 1 : usadas;
    if (leida) await cache.set(clave, total, { ttl: UN_DIA, name: "" });
    return json(aInforme(resultado, LIMITE_DIARIO - total));
  } catch (error) {
    console.error("auditor: fallo inesperado", error);
    return json({ error: "fallo" }, 500);
  } finally {
    enCurso.delete(clave);
  }
}
