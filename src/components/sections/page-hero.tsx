import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { Molinillo } from "@/components/brand/molinillo";

type Crumb = { label: string; to?: string };

type PageHeroProps = {
  crumbs: Crumb[];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  /** Qué elemento lleva el h1: el titular (por defecto) o la ruta */
  heading?: "title" | "crumbs";
  /** "cta" para títulos dinámicos largos (fichas de proyecto y servicio) */
  size?: "display" | "cta";
};

// Hero tipográfico común a todas las páginas interiores: ruta en mono, titular y subtítulo
export function PageHero({ crumbs, title, subtitle, actions, heading = "title", size = "display" }: PageHeroProps) {
  const CrumbsTag = heading === "crumbs" ? motion.h1 : motion.p;
  const TitleTag = heading === "title" ? "h1" : "p";

  return (
    <section className="bg-dark pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="container mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <CrumbsTag
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[11px] md:text-[13px] font-medium uppercase tracking-[0.14em] text-light/80 mb-4 md:mb-6 flex flex-wrap items-center gap-3"
          >
            <Molinillo className="h-[0.95em] w-[0.95em] opacity-50" alasClassName="molinillo-intro" />
            <span className="opacity-50">MAZZMKT</span>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="contents">
                <span className="opacity-30">/</span>
                {crumb.to ? (
                  <TransitionLink to={crumb.to} className="opacity-50 hover:opacity-80 transition-opacity">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </CrumbsTag>

          <TitleTag
            className="normal-case font-bold text-light"
            style={{
              fontSize: size === "cta" ? "var(--font-cta)" : "var(--font-display)",
              fontFamily: "var(--font-heading)",
              lineHeight: size === "cta" ? "var(--lh-cta)" : "var(--lh-display)",
              letterSpacing: "-0.045em",
            }}
          >
            {title}
          </TitleTag>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-5 md:mt-8 max-w-2xl text-[14px] md:text-[19px] leading-[1.6] text-light/67"
            >
              {subtitle}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 md:mt-10 flex flex-wrap gap-[10px] md:gap-3"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
