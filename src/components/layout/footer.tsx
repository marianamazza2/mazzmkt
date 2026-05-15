import { TransitionLink } from "@/components/transition/transition-link";

export function Footer() {
  return (
    <footer className="bg-[#141414] text-[#ffffff] py-8 border-t border-[#ffffff15]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-xs text-[#ffffffaa] order-2 md:order-1">
            &copy; {new Date().getFullYear()} MAZZMKT. TODOS LOS DERECHOS RESERVADOS.
          </p>

          {/* Legal Links */}
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
