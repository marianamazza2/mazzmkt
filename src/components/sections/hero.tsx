import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { Molinillo } from "@/components/brand/molinillo";
import { HeroGlow } from "@/components/sections/hero-glow";

export function Hero() {
  return (
    <section className="bg-dark pt-[100px] pb-7 md:pt-32 md:pb-16 md:min-h-[calc(100svh-58px)] md:flex md:items-end relative overflow-hidden">
      {/* Sin imagen: un destello que sigue al cursor */}
      <HeroGlow />
      <div className="container mx-auto px-5 md:px-6 relative w-full">
        <div className="enter">
          <p
            className="enter font-mono flex items-center gap-3 text-[11px] md:text-[13px] font-medium uppercase text-light/60 mb-[14px] md:mb-5"
            style={{ letterSpacing: "0.13em", "--enter-x": "-20px", "--enter-y": "0px", "--enter-delay": "0.2s" } as React.CSSProperties}
          >
            <Molinillo className="h-[0.95em] w-[0.95em] opacity-50" alasClassName="molinillo-intro" />
            MAZZMKT — Digital Studio · Barcelona
          </p>

          <h1
            className="font-bold normal-case text-[#ffffff] mb-5 md:mb-6"
            style={{
              fontSize: "var(--font-display)",
              fontFamily: "var(--font-heading)",
              lineHeight: "var(--lh-display)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
            }}
          >
            <span
              className="enter font-bold text-[#ffffff]"
              style={{ "--enter-delay": "0.1s", display: "block", fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" } as React.CSSProperties}
            >
              Diseñamos,
            </span>
            <span
              className="enter font-bold text-[#ffffff]"
              style={{ "--enter-delay": "0.2s", display: "block", fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" } as React.CSSProperties}
            >
              programamos y
            </span>
            <span
              className="enter font-bold"
              style={{
                "--enter-delay": "0.3s",
                display: "block",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              } as React.CSSProperties}
            >
              automatizamos
            </span>
            <span
              className="enter font-bold"
              style={{
                "--enter-delay": "0.3s",
                display: "block",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                color: "#ffffff",
              } as React.CSSProperties}
            >
              tu negocio digital
            </span>
          </h1>

          <p
            className="enter text-body text-light/67 max-w-xl mb-6 md:mb-9"
            style={{ "--enter-y": "20px", "--enter-delay": "0.4s" } as React.CSSProperties}
          >
            Diseñamos webs, creamos marcas y automatizamos procesos con código e inteligencia artificial. Soluciones digitales adaptadas a lo que tu negocio necesita.
          </p>

          <div
            className="enter flex flex-wrap items-center gap-3"
            style={{ "--enter-y": "20px", "--enter-delay": "0.5s" } as React.CSSProperties}
          >
            <TransitionLink
              to="/proyectos"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "ver_proyectos" })}
            >
              VER PROYECTOS
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
              style={{ letterSpacing: "0.09em" }}
              onClick={() => trackEvent("cta_click", { location: "hero", label: "contactar" })}
            >
              CONTACTAR
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
