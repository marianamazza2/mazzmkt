import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import {
  destinoDelInforme,
  errores,
  mensajesCarga,
  puntosDelInforme,
  veredictoLabel,
  type InformeAuditor,
  type Veredicto,
} from "@/data/auditor";

export const Route = createFileRoute("/auditor")({
  component: AuditorPage,
});

// Auditor web gratuito: el negocio pega su web y recibe un informe de seis puntos.
// Sin email y sin cookies nuevas. El análisis lo hace api/auditor.ts; los textos están en data/auditor.ts.

type Estado =
  | { fase: "inicio" }
  | { fase: "analizando" }
  | { fase: "informe"; informe: InformeAuditor }
  | { fase: "error"; mensaje: string };

const pillClass =
  "inline-flex items-center justify-center gap-3 rounded-[40px] border px-6 md:px-8 py-[15px] text-[13px] font-semibold uppercase transition-colors font-mono";

// Bien: relleno en blanco. A mejorar: borde blanco. Sin confirmar: borde discontinuo y tenue.
const veredictoClass: Record<Veredicto, string> = {
  bien: "bg-light text-dark border-light",
  mejorar: "border-light text-light",
  dudoso: "border-dashed border-light/40 text-light/60",
};

function MensajeCarga() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => Math.min(v + 1, mensajesCarga.length - 1)), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div role="status" aria-live="polite" className="border-t border-light/13 py-10 md:py-16 flex items-center gap-4">
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-light opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-light" />
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-[12px] md:text-[13px] uppercase text-light/80"
          style={{ letterSpacing: "0.13em" }}
        >
          {mensajesCarga[i]}…
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Informe({ informe, onReiniciar }: { informe: InformeAuditor; onReiniciar: () => void }) {
  const puntos = puntosDelInforme(informe);
  const destino = destinoDelInforme(informe);
  const aMejorar = puntos.filter((p) => p.veredicto === "mejorar").length;
  const porRevisar = puntos.filter((p) => p.veredicto === "dudoso").length;
  const titulo =
    aMejorar > 0
      ? aMejorar === 1
        ? "Un punto a mejorar"
        : `${aMejorar} puntos a mejorar`
      : porRevisar > 0
        ? porRevisar === 1
          ? "Bien, con un punto por revisar"
          : `Bien, con ${porRevisar} puntos por revisar`
        : "Pinta muy bien";

  return (
    <div>
      <SectionHeading
        number="02"
        label={informe.web ?? "Tu web"}
        title={titulo}
        subtitle="Esto es lo que hemos visto en tu web. Arriba lo importante, debajo qué significa para tu negocio."
      />

      <ol>
        {puntos.map((p, index) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-t border-light/13 last:border-b py-6 md:py-8 grid gap-3 md:grid-cols-[180px_1fr_auto] md:gap-8 md:items-start"
          >
            <span className="font-mono text-[12px] md:text-[13px] uppercase text-light/50" style={{ letterSpacing: "0.08em" }}>
              {String(index + 1).padStart(2, "0")} / {p.etiqueta}
            </span>
            <div className="min-w-0">
              <h3 className="normal-case text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.025em] font-bold text-light">
                {p.titular}
              </h3>
              <p className="text-body text-[#a1a1a1] mt-2 max-w-2xl">{p.texto}</p>
            </div>
            <span
              className={`order-first md:order-none justify-self-start inline-flex items-center rounded-full border px-3 py-[5px] font-mono text-[11px] md:text-[12px] uppercase ${veredictoClass[p.veredicto]}`}
              style={{ letterSpacing: "0.08em" }}
            >
              {veredictoLabel[p.veredicto]}
            </span>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 md:mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-body text-light max-w-xl">
          {destino.label === "agentes_ia"
            ? "Con una recepcionista con IA en tu web, tus clientes piden cita a cualquier hora y tú no tienes que estar pendiente del teléfono."
            : "Si quieres una web que se parezca a tu negocio y funcione sola, nos ocupamos de todo."}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <TransitionLink
            to={destino.to}
            className={`${pillClass} bg-light text-dark border-light hover:bg-light/90`}
            style={{ letterSpacing: "0.09em" }}
            onClick={() => trackEvent("cta_click", { location: "auditor", label: destino.label })}
          >
            {destino.texto}
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          </TransitionLink>
          <button
            type="button"
            onClick={onReiniciar}
            className={`${pillClass} border-light/30 text-light hover:border-light`}
            style={{ letterSpacing: "0.09em" }}
          >
            Probar otra web
            <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <p className="mt-10 md:mt-14 font-mono text-[11px] md:text-[12px] uppercase text-light/40 max-w-2xl" style={{ letterSpacing: "0.08em" }}>
        Este informe lee el código de tu web, no la ve como una persona. Si algo no cuadra, cuéntanoslo.
        {informe.restantes <= 3 && ` Te quedan ${informe.restantes} análisis hoy.`}
      </p>
    </div>
  );
}

function AuditorPage() {
  const [url, setUrl] = useState("");
  const [estado, setEstado] = useState<Estado>({ fase: "inicio" });
  const resultadoRef = useRef<HTMLDivElement>(null);

  const analizar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || estado.fase === "analizando") return;
    setEstado({ fase: "analizando" });
    requestAnimationFrame(() => resultadoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

    try {
      const res = await fetch(`/api/auditor?url=${encodeURIComponent(url.trim())}`);
      const body = await res.json().catch(() => ({ error: "fallo" }));
      if (!res.ok) {
        setEstado({ fase: "error", mensaje: errores[body.error] ?? errores.fallo });
        return;
      }
      const informe = body as InformeAuditor;
      if (informe.estado !== "ok") {
        setEstado({ fase: "error", mensaje: errores[informe.estado === "entrada_invalida" ? "url_invalida" : "no_disponible"] });
        return;
      }
      trackEvent("auditor_completado", { reserva: informe.reserva });
      setEstado({ fase: "informe", informe });
    } catch {
      setEstado({ fase: "error", mensaje: errores.fallo });
    }
  };

  const reiniciar = () => {
    setUrl("");
    setEstado({ fase: "inicio" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Auditor web gratuito | MAZZMKT"
        description="Pega la dirección de tu web y en unos segundos te contamos cómo está: móvil, seguridad, reserva online y más. Gratis y sin dejar tu email."
      />

      <PageHero
        crumbs={[{ label: "Auditor web" }]}
        title={
          <>
            ¿Tu web trabaja
            <br />
            por ti?
          </>
        }
        subtitle="Pega su dirección y en unos segundos te contamos [[cómo está]]: móvil, seguridad, reservas y más. [[Gratis y sin dejar tu email]]."
        actions={
          <form onSubmit={analizar} className="w-full max-w-2xl flex flex-col gap-3 sm:flex-row">
            <label htmlFor="auditor-url" className="sr-only">
              Dirección de tu web
            </label>
            <input
              id="auditor-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="tuweb.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={estado.fase === "analizando"}
              className="min-w-0 flex-1 rounded-[40px] border border-light/30 bg-transparent px-6 py-[14px] text-[16px] text-light placeholder:text-light/40 outline-none transition-colors focus:border-light disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!url.trim() || estado.fase === "analizando"}
              className={`${pillClass} bg-light text-dark border-light hover:bg-light/90 disabled:opacity-40 disabled:cursor-not-allowed`}
              style={{ letterSpacing: "0.09em" }}
            >
              Analizar mi web
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            </button>
          </form>
        }
      />

      <section ref={resultadoRef} className="bg-dark pb-16 md:pb-28 scroll-mt-20">
        <div className="container mx-auto px-5 md:px-6">
          {estado.fase === "inicio" && (
            <div>
              <SectionHeading
                number="01"
                label="Qué miramos"
                title="Seis cosas que tus clientes notan"
                subtitle="Sin tecnicismos: te decimos qué está bien, qué se puede mejorar y qué significa para tu negocio."
              />
              <ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {["Si está preparada para el móvil", "Si es segura", "Si tus clientes pueden reservar solos", "Si tiene botones para contactar", "Si es plantilla o a medida", "Cuándo se tocó por última vez"].map(
                  (item, index) => (
                    <li key={item} className="border-t border-light/13 py-5 flex gap-4 items-baseline">
                      <span className="font-mono text-[13px] text-light/50">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-body text-light">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {estado.fase === "analizando" && <MensajeCarga />}

          {estado.fase === "error" && (
            <div role="alert" className="border-t border-light/13 py-10 md:py-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="normal-case font-heading text-[22px] md:text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-light max-w-3xl">
                {estado.mensaje}
              </p>
              <button
                type="button"
                onClick={reiniciar}
                className={`${pillClass} self-start border-light/30 text-light hover:border-light`}
                style={{ letterSpacing: "0.09em" }}
              >
                Probar otra web
                <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {estado.fase === "informe" && <Informe informe={estado.informe} onReiniciar={reiniciar} />}
        </div>
      </section>
    </>
  );
}
