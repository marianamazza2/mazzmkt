import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { services } from "@/data/services";
import { Bot, Code, TrendingUp, Palette } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Bot,
  Code,
  TrendingUp,
  Palette,
};

export const Route = createFileRoute("/servicios/")({
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <>
      <SEOHead
        title="Servicios | MAZZMKT"
        description="Desarrollo web, web apps, branding, automatización e IA. Soluciones digitales a medida con código real."
      />

      {/* Hero */}
      <section className="bg-dark pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb — h1 semántico */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] md:text-[13px] font-medium text-light/80 mb-6 tracking-widest flex items-center gap-3 font-mono"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-light"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>SERVICIOS</span>
            </motion.h1>
            {/* Tagline visual */}
            <p
              className="normal-case font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.045em",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
              }}
            >
              Lo que hacemos <span className="text-[#ffffff50]">&raquo;</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Bot;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TransitionLink
                    to="/servicios/$slug"
                    params={{ slug: service.slug }}
                    className="group block border border-light/13 p-10 hover:border-light hover:bg-light transition-all duration-300"
                  >
                    <IconComponent
                      className="h-12 w-12 text-light group-hover:text-[#0a0a0a] mb-8 transition-colors"
                      strokeWidth={1.5}
                    />
                    <h2
                      className="font-bold text-light group-hover:text-[#0a0a0a] mb-4 transition-colors"
                      style={{
                        fontSize: "clamp(24px, 3vw, 36px)",
                        lineHeight: "1.2",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-lg text-light/67 group-hover:text-dark/67 mb-6 transition-colors">
                      {service.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-light/80 group-hover:text-dark/80 transition-colors"
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </TransitionLink>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
