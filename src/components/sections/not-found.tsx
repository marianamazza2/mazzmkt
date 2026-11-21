import { ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/sections/page-hero";
import { TransitionLink } from "@/components/transition/transition-link";

const buttonClass =
  "inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-6 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono";

// Página 404: la usa el router para cualquier dirección que no existe.
// En Vercel se sirve como 404.html, con código 404.
export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Página no encontrada | MAZZMKT"
        description="Esta página no existe o ha cambiado de dirección. Mira nuestros servicios o escríbenos."
        noindex
      />
      <PageHero
        crumbs={[{ label: "404" }]}
        title={<>Esta página<br />no existe</>}
        subtitle="Puede que la dirección haya cambiado o que tenga una errata. Desde aquí puedes ver lo que hacemos o escribirnos directamente."
        actions={
          <>
            <TransitionLink to="/servicios" className={buttonClass} style={{ letterSpacing: "0.09em" }}>
              VER SERVICIOS
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
            <TransitionLink to="/contacto" className={buttonClass} style={{ letterSpacing: "0.09em" }}>
              CONTACTO
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
            <TransitionLink to="/" className={buttonClass} style={{ letterSpacing: "0.09em" }}>
              IR AL INICIO
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </TransitionLink>
          </>
        }
      />
    </>
  );
}
