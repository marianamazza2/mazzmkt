import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { Isotipo } from "@/components/brand/isotipo";
import { receptionist } from "@/data/products";

const navigation = [
  { title: "HOME", href: "/" },
  { title: "SERVICIOS", href: "/servicios" },
  { title: receptionist.name.toUpperCase(), href: receptionist.href },
  { title: "PROYECTOS", href: "/proyectos" },
  { title: "MAZZMKT", href: "/sobre-mi" },
  { title: "FAQS", href: "/faqs" },
  { title: "CONTACTO", href: "/contacto" },
];

const socials = [
  { href: "https://instagram.com/mazzmkt", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/mazzmkt", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/34672340061", icon: Phone, label: "WhatsApp" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-dark",
        )}
      >
        <nav className="container mx-auto px-5 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <TransitionLink to="/" className="flex items-center">
              <Isotipo className="h-[26px] w-[28px] md:h-[28px] md:w-[31px] text-light" />
            </TransitionLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navigation.map((item) => (
                <TransitionLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm font-bold transition-colors tracking-wide uppercase",
                    pathname === item.href
                      ? "text-[#ffffff]"
                      : "text-[#ffffffcc] hover:text-[#ffffff]"
                  )}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.title}
                  {pathname === item.href && (
                    <span className="block h-[1px] bg-[#ffffff] mt-1" />
                  )}
                </TransitionLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[#ffffff]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[999] bg-dark flex flex-col pb-8 overflow-y-auto"
          >
            {/* Header: logo + close button */}
            <div className="flex items-center justify-between mb-6 h-20 px-5">
              <TransitionLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                <Isotipo className="h-[26px] w-[28px] text-light" />
              </TransitionLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Enlaces: número en mono y nombre grande, como el índice de la web */}
            <nav className="flex flex-col flex-1 justify-center px-5">
              {navigation.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <TransitionLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-4 border-b border-light/13 first:border-t transition-colors",
                      isActive ? "text-light" : "text-light/60 hover:text-light"
                    )}
                  >
                    <span className="font-mono text-[11px] tracking-[0.13em] text-[#a1a1a1]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-[30px] font-bold leading-none tracking-[-0.03em] uppercase">
                      {item.title}
                    </span>
                  </TransitionLink>
                );
              })}
            </nav>

            {/* Pie del menú: botón y redes */}
            <div className="pt-6 mt-6 px-5">
              <TransitionLink
                to="/contacto"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackEvent("cta_click", { location: "header_mobile", label: "hablemos_de_tu_proyecto" });
                }}
                className="flex w-full items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono mb-5"
                style={{ letterSpacing: "0.09em" }}
              >
                HABLEMOS DE TU PROYECTO
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </TransitionLink>
              <div className="flex justify-center gap-2">
                {socials.map(({ href, icon: SocialIcon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-light/13 text-[#a1a1a1] transition-colors hover:border-light hover:text-light"
                    onClick={label === "WhatsApp" ? () => trackEvent("whatsapp_click", { location: "header" }) : undefined}
                  >
                    <SocialIcon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
