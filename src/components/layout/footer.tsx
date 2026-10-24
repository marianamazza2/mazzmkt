import { Instagram, Linkedin, Phone } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { LogotipoReducido } from "@/components/brand/logotipo";

const socials = [
  { href: "https://instagram.com/mazzmkt", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/mazzmkt", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/34672340061", icon: Phone, label: "WhatsApp" },
];

const legalLinks = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/cookies", label: "Cookies" },
  { to: "/privacidad", label: "Privacidad" },
];

const label = "font-mono text-[13px] uppercase tracking-[0.08em] text-light";

export function Footer() {
  return (
    <footer className="bg-dark text-light border-t border-light/6">
      <div className="container mx-auto flex flex-col gap-5 px-5 py-7 md:px-6 md:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <LogotipoReducido className="h-[16px] w-auto shrink-0 text-light" />

        <nav className="flex flex-wrap gap-x-5 md:gap-x-6">
          {legalLinks.map(({ to, label: name }) => (
            <TransitionLink
              key={to}
              to={to}
              className={`${label} inline-flex min-h-[44px] items-center whitespace-nowrap hover:text-light transition-colors`}
            >
              {name}
            </TransitionLink>
          ))}
        </nav>

        <p className={`${label} whitespace-nowrap`}>&copy; {new Date().getFullYear()} MAZZMKT. Todos los derechos reservados.</p>

        <div className="flex shrink-0 gap-2">
            {socials.map(({ href, icon: Icon, label: name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-sm border border-light/13 text-[#a1a1a1] transition-colors hover:border-light hover:text-light"
                onClick={name === "WhatsApp" ? () => trackEvent("whatsapp_click", { location: "footer" }) : undefined}
              >
                <Icon size={14} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
