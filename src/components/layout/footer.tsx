import { Instagram, Linkedin, Phone } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { LogotipoReducido } from "@/components/brand/logotipo";

const socials = [
  { href: "https://instagram.com/mazzmkt", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/mazzmkt", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/34672340061", icon: Phone, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-[#ffffff]" style={{ borderTop: "0.5px solid rgba(255, 255, 255, 0.06)" }}>
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-7 pb-6">
        <div className="flex justify-between items-center mb-3">
          <LogotipoReducido className="h-[16px] w-auto text-light" />
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
                  border: "0.5px solid rgba(255, 255, 255, 0.08)",
                  color: "#a1a1a1",
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
            className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors inline-flex items-center min-h-[44px]"
          >
            AVISO LEGAL
          </TransitionLink>
          <TransitionLink
            to="/cookies"
            className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors inline-flex items-center min-h-[44px]"
          >
            COOKIES
          </TransitionLink>
          <TransitionLink
            to="/privacidad"
            className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors inline-flex items-center min-h-[44px]"
          >
            PRIVACIDAD
          </TransitionLink>
        </div>

        <div style={{ height: "0.5px", background: "rgba(255, 255, 255, 0.06)", marginBottom: "8px" }} />

        <p
          className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#a1a1a1]"
        >
          &copy; {new Date().getFullYear()} MAZZMKT. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block py-6 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-4 order-2 lg:order-1">
            <LogotipoReducido className="h-[16px] w-auto text-light self-center" />
            <p className="font-mono text-[13px] uppercase tracking-[0.13em] text-[#a1a1a1] leading-none self-center whitespace-nowrap">
              &copy; {new Date().getFullYear()} MAZZMKT. TODOS LOS DERECHOS RESERVADOS.
            </p>
          </div>
          <div className="flex items-center gap-x-6 order-1 lg:order-2 flex-wrap justify-center">
            <TransitionLink
              to="/aviso-legal"
              className="font-mono text-[13px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors min-h-[44px] inline-flex items-center"
            >
              AVISO LEGAL
            </TransitionLink>
            <TransitionLink
              to="/cookies"
              className="font-mono text-[13px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors min-h-[44px] inline-flex items-center"
            >
              POLÍTICA DE COOKIES
            </TransitionLink>
            <TransitionLink
              to="/privacidad"
              className="font-mono text-[13px] uppercase tracking-[0.13em] text-[#a1a1a1] hover:text-light transition-colors min-h-[44px] inline-flex items-center"
            >
              POLÍTICA DE PRIVACIDAD
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
