import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transition/transition-link";
import { Molinillo } from "@/components/brand/molinillo";
import { HeroGlow } from "@/components/sections/hero-glow";

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
  compact?: boolean;
  glow?: boolean;
};

// Hero tipográfico común a todas las páginas interiores: ruta en mono, titular y subtítulo
export function PageHero({ crumbs, title, subtitle, actions, heading = "title", size = "display", compact = false, glow = true }: PageHeroProps) {
  const CrumbsTag = heading === "crumbs" ? motion.h1 : motion.p;
  const TitleTag = heading === "title" ? "h1" : "p";

  return (
    <section className={`bg-dark relative overflow-hidden ${compact ? "pt-24 pb-6 md:pt-32 md:pb-10" : "pt-28 pb-10 md:pt-40 md:pb-20"}`}>
      {/* La firma de luz de la home, más tenue */}
      {glow && <HeroGlow intensity={0.5} />}
      <div className="container mx-auto px-5 md:px-6 relative">
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
            className="font-mono text-[11px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-4 md:mb-6 flex flex-wrap items-center gap-3"
          >
            <Molinillo className="h-[0.95em] w-[0.95em] opacity-50" alasClassName="molinillo-intro" />
            <span>MAZZMKT</span>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="contents">
                <span className="opacity-30">/</span>
                {crumb.to ? (
                  <TransitionLink to={crumb.to} className="text-light hover:opacity-80 transition-opacity">
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
              className="text-body mt-5 md:mt-8 max-w-2xl lg:max-w-[60rem] text-light/67"
            >
              {subtitle}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex flex-wrap gap-[10px] md:gap-3 ${compact ? "mt-4 md:mt-5" : "mt-7 md:mt-10"}`}
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
