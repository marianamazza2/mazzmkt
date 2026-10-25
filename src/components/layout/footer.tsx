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

const label = "font-mono text-[10px] uppercase tracking-[0.08em] text-light md:text-[13px]";

export function Footer() {
  return (
    <footer className="bg-dark text-light border-t border-light/6">
      <div className="container mx-auto grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-5 md:px-6 md:py-8 lg:flex lg:items-center lg:justify-between lg:gap-6">
        <LogotipoReducido className="h-[14px] w-auto shrink-0 text-light lg:h-[16px]" />

        <div className="flex justify-end gap-2 lg:order-last">
          {socials.map(({ href, icon: Icon, label: name }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-light/13 text-[#a1a1a1] transition-colors hover:border-light hover:text-light lg:h-8 lg:w-8"
              onClick={name === "WhatsApp" ? () => trackEvent("whatsapp_click", { location: "footer" }) : undefined}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <nav className="col-span-2 flex flex-wrap justify-center gap-x-3 lg:col-span-1 lg:justify-start lg:gap-x-6">
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

        <p className={`${label} col-span-2 mx-auto max-w-[280px] text-center leading-relaxed text-light/65 lg:col-span-1 lg:mx-0 lg:max-w-none lg:whitespace-nowrap lg:text-left lg:text-light`}>
          &copy; {new Date().getFullYear()} MAZZMKT.<br className="lg:hidden" />{" "}
          <span>Todos los derechos reservados.</span>
        </p>
      </div>
    </footer>
  );
}
