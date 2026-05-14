import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";

const navigation = [
  { title: "HOME", href: "/" },
  { title: "PROYECTOS", href: "/proyectos" },
  { title: "MAZZMKT", href: "/sobre-mi" },
  { title: "FAQS", href: "/faqs" },
  { title: "CONTACTO", href: "/contacto" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#141414]"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <TransitionLink to="/" className="flex items-center">
            <img
              src="/images/logo-cropped.png"
              alt="MAZZMKT"
              className="h-9 w-auto"
              style={{ mixBlendMode: "screen", filter: "contrast(10)" }}
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
            className="md:hidden p-2 text-[#ffffff]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#141414] border-t border-[#ffffff15]"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navigation.map((item) => (
                <TransitionLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-lg font-bold py-2 uppercase",
                    pathname === item.href
                      ? "text-[#ffffff]"
                      : "text-[#ffffff99]"
                  )}
                  style={{ fontFamily: "var(--font-geist)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </TransitionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
