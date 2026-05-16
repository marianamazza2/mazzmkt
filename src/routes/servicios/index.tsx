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
        description="Servicios de marketing digital: Marketing con IA, Desarrollo Web, Growth Marketing y Branding Digital."
      />

      {/* Hero */}
      <section className="bg-dark pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-medium text-[#f1ede1cc] mb-6 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#f1ede1]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>SERVICIOS</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
              }}
            >
              LO QUE HACEMOS <span className="text-[#ffffff50]">&raquo;</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-light py-14 md:py-24">
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
                    className="group block border border-[#14141420] p-10 hover:border-[#141414] hover:bg-[#141414] transition-all duration-300"
                  >
                    <IconComponent
                      className="h-12 w-12 text-[#141414] group-hover:text-[#ffffff] mb-8 transition-colors"
                      strokeWidth={1.5}
                    />
                    <h2
                      className="font-bold text-[#141414] group-hover:text-[#ffffff] mb-4 transition-colors"
                      style={{
                        fontSize: "clamp(24px, 3vw, 36px)",
                        lineHeight: "1.2",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-lg text-[#141414aa] group-hover:text-[#f1ede1aa] mb-6 transition-colors">
                      {service.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-[#141414cc] group-hover:text-[#f1ede1cc] transition-colors"
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
