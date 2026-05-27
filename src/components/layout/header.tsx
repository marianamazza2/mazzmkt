import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Home,
  FolderOpen,
  Users,
  HelpCircle,
  Mail,
  ChevronRight,
  Instagram,
  Linkedin,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";

const navigation = [
  { title: "HOME", href: "/", icon: Home },
  { title: "PROYECTOS", href: "/proyectos", icon: FolderOpen },
  { title: "MAZZMKT", href: "/sobre-mi", icon: Users },
  { title: "FAQS", href: "/faqs", icon: HelpCircle },
  { title: "CONTACTO", href: "/contacto", icon: Mail },
];

const socials = [
  { href: "https://instagram.com/mazzmkt", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/mazzmkt", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/5491112345678", icon: Phone, label: "WhatsApp" },
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
          "fixed top-0 left-0 right-0 z-50 bg-[#141414]",
        )}
      >
        <nav className="container mx-auto pl-0 pr-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <TransitionLink to="/" className="flex items-center">
              <img
                src="/images/isotipo.webp"
                alt="MAZZMKT"
                className="h-14 md:h-16 w-auto"
                style={{ mixBlendMode: "screen", filter: "contrast(1.2)" }}
              />
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
                  style={{ fontFamily: "var(--font-geist)" }}
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
            className="md:hidden fixed inset-0 z-[999] bg-[#141414] flex flex-col pt-5 pb-8 overflow-y-auto"
          >
            {/* Header: logo + close button */}
            <div className="flex items-center justify-between mb-6 h-14 pr-6">
              <TransitionLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src="/images/isotipo.webp"
                  alt="MAZZMKT"
                  className="h-14 w-auto"
                  style={{ mixBlendMode: "screen", filter: "contrast(1.2)" }}
                />
              </TransitionLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav links as cards */}
            <nav className="flex flex-col gap-1.5 flex-1 justify-center px-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <TransitionLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-sm transition-colors",
                      isActive
                        ? "bg-[rgba(241,237,225,0.12)] border border-[rgba(241,237,225,0.2)]"
                        : "bg-[rgba(255,255,255,0.06)] border border-transparent hover:bg-[rgba(255,255,255,0.10)]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? "text-[#f1ede1]"
                            : "text-[rgba(255,255,255,0.5)]"
                        }
                      />
                      <span
                        className="text-[15px] font-medium text-white uppercase"
                        style={{
                          fontFamily: "var(--font-geist)",
                          letterSpacing: "1px",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-[rgba(255,255,255,0.25)]"
                    />
                  </TransitionLink>
                );
              })}
            </nav>

            {/* Footer: CTA + socials */}
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 mt-6 px-6">
              <TransitionLink
                to="/contacto"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackEvent("cta_click", { location: "header_mobile", label: "hablemos_de_tu_proyecto" });
                }}
                className="flex items-center justify-center w-full py-3.5 rounded-sm bg-[#f1ede1] text-[#141414] text-sm font-medium uppercase mb-3.5"
                style={{
                  fontFamily: "var(--font-geist)",
                  letterSpacing: "0.5px",
                }}
              >
                HABLEMOS DE TU PROYECTO
              </TransitionLink>
              <div className="flex justify-center gap-4">
                {socials.map(({ href, icon: SocialIcon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.10)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.30)] transition-colors"
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
