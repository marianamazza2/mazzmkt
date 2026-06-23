import { Instagram, Linkedin, Phone } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

const socials = [
  { href: "https://instagram.com/mazzmkt", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/mazzmkt", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/34672340061", icon: Phone, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="bg-[#141414] text-[#ffffff]" style={{ borderTop: "0.5px solid rgba(241, 239, 232, 0.06)" }}>
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-5 pb-6">
        <div className="flex justify-between items-center mb-3">
          <img
            src="/images/logo-cropped.webp"
            alt="MAZZMKT"
            className="h-20 w-auto"
            style={{ mixBlendMode: "screen", filter: "contrast(10)" }}
          />
          <div className="flex gap-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center rounded-sm"
                style={{
                  width: "28px",
                  height: "28px",
                  border: "0.5px solid rgba(241, 239, 232, 0.08)",
                  color: "#5F5E5A",
                }}
                onClick={label === "WhatsApp" ? () => trackEvent("whatsapp_click", { location: "footer" }) : undefined}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <TransitionLink
            to="/aviso-legal"
            className="text-[11px] uppercase inline-flex items-center min-h-[44px]"
            style={{ color: "#444441", letterSpacing: "0.5px" }}
          >
            AVISO LEGAL
          </TransitionLink>
          <TransitionLink
            to="/cookies"
            className="text-[11px] uppercase inline-flex items-center min-h-[44px]"
            style={{ color: "#444441", letterSpacing: "0.5px" }}
          >
            COOKIES
          </TransitionLink>
          <TransitionLink
            to="/privacidad"
            className="text-[11px] uppercase inline-flex items-center min-h-[44px]"
            style={{ color: "#444441", letterSpacing: "0.5px" }}
          >
            PRIVACIDAD
          </TransitionLink>
        </div>

        <div style={{ height: "0.5px", background: "rgba(241, 239, 232, 0.06)", marginBottom: "8px" }} />

        <p
          className="text-[11px] uppercase"
          style={{ letterSpacing: "0.5px", color: "#444441" }}
        >
          &copy; {new Date().getFullYear()} MAZZMKT. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block py-3 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <img
              src="/images/logo-cropped.webp"
              alt="MAZZMKT"
              className="h-20 w-auto block self-center"
              style={{ mixBlendMode: "screen", filter: "contrast(10)" }}
            />
            <p className="text-xs text-[#ffffffaa] leading-none self-center">
              &copy; {new Date().getFullYear()} MAZZMKT. TODOS LOS DERECHOS RESERVADOS.
            </p>
          </div>
          <div className="flex items-center gap-4 order-1 md:order-2 flex-wrap">
            <TransitionLink
              to="/aviso-legal"
              className="text-xs text-[#ffffffaa] hover:text-[#ffffff] transition-colors min-h-[44px] inline-flex items-center"
            >
              AVISO LEGAL
            </TransitionLink>
            <TransitionLink
              to="/cookies"
              className="text-xs text-[#ffffffaa] hover:text-[#ffffff] transition-colors min-h-[44px] inline-flex items-center"
            >
              POLITICA DE COOKIES
            </TransitionLink>
            <TransitionLink
              to="/privacidad"
              className="text-xs text-[#ffffffaa] hover:text-[#ffffff] transition-colors min-h-[44px] inline-flex items-center"
            >
              POLITICA DE PRIVACIDAD
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
