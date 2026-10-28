import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { bookingUrl } from "@/data/receptionist-page";

// El único CTA de la página del Recepcionista IA: "Reservar llamada", siempre igual.
// Abre Calendly (bookingUrl) o, mientras no haya enlace, lleva a /contacto.
// "onLight": versión para el bloque blanco (borde y texto en negro).
export function BookCallButton({ location, onLight = false }: { location: string; onLight?: boolean }) {
  const className = `inline-flex items-center justify-center gap-3 rounded-[40px] border px-6 md:px-8 py-[15px] text-[13px] font-semibold uppercase transition-colors font-mono ${
    onLight ? "border-dark/30 text-dark hover:border-dark" : "border-light/30 text-light hover:border-light"
  }`;
  const track = () => trackEvent("cta_click", { location, label: "reservar_llamada" });
  const content = (
    <>
      RESERVAR LLAMADA
      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
    </>
  );

  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ letterSpacing: "0.09em" }}
        onClick={track}
      >
        {content}
      </a>
    );
  }

  return (
    <TransitionLink to="/contacto" className={className} style={{ letterSpacing: "0.09em" }} onClick={track}>
      {content}
    </TransitionLink>
  );
}
