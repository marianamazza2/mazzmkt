import { createFileRoute, notFound } from "@tanstack/react-router";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { services } from "@/data/services";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#ffffff] mb-4">Servicio no encontrado</h1>
        <TransitionLink
          to="/servicios"
          className="text-light/67 hover:text-light transition-colors"
        >
          Volver a servicios
        </TransitionLink>
      </div>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "url": `https://mazzmkt.com/servicios/${service.slug}`,
    "provider": {
      "@type": "Organization",
      "@id": "https://mazzmkt.com/#organization",
      "name": "MAZZMKT",
    },
    "areaServed": "ES",
  };

  return (
    <>
      <SEOHead
        title={`${service.title} | MAZZMKT`}
        description={service.description}
        jsonLd={serviceSchema}
      />

      <PageHero
        size="cta"
        crumbs={[{ label: "Servicios", to: "/servicios" }, { label: service.title }]}
        title={service.title}
        subtitle={service.shortDescription}
      />

      {/* Description */}
      <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[13px] font-medium text-light/67 mb-6 uppercase tracking-widest font-mono">
                Descripción
              </h2>
              <p className="text-body text-light">
                {service.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-[13px] font-medium text-light/67 mb-6 uppercase tracking-widest font-mono">
                Qué incluye
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-6 w-6 text-light flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <span className="text-lg text-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
