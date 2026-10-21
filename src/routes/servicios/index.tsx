import { createFileRoute } from "@tanstack/react-router";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { services } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";

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

      <PageHero
        heading="crumbs"
        crumbs={[{ label: "Servicios" }]}
        title="Lo que hacemos"
        subtitle="Webs, web apps, branding, automatización e IA. Soluciones digitales a medida con código real."
      />

      {/* Services Grid */}
      <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
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
                    <span className="block mb-10 md:mb-14 font-mono text-[13px] text-light/50 group-hover:text-dark/60 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="font-bold text-light group-hover:text-[#0a0a0a] mb-4 transition-colors"
                      style={{
                        fontSize: "clamp(24px, 3vw, 36px)",
                        lineHeight: "1.2",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-body text-light/67 group-hover:text-dark/67 mb-6 transition-colors">
                      {service.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-body text-light/80 group-hover:text-dark/80 transition-colors"
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
