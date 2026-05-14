import { createFileRoute, notFound } from "@tanstack/react-router";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { services } from "@/data/services";
import { CheckCircle2 } from "lucide-react";

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
          className="text-[#f1ede1aa] hover:text-[#f1ede1] transition-colors"
        >
          Volver a servicios
        </TransitionLink>
      </div>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();

  return (
    <>
      <SEOHead
        title={`${service.title} | MAZZMKT`}
        description={service.description}
      />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-20">
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
              className="text-base font-medium text-[#f1ede1cc] mb-8 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#f1ede1]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <TransitionLink to="/servicios" className="opacity-50 hover:opacity-80 transition-opacity">SERVICIOS</TransitionLink>
              <span className="opacity-30">/</span>
              <span className="uppercase">{service.title.toUpperCase()}</span>
            </motion.p>

            <h1
              className="font-bold text-[#ffffff] mb-6"
              style={{
                fontSize: "clamp(22px, 6vw, 80px)",
                lineHeight: "1.1",
                fontWeight: 700,
              }}
            >
              {service.title}
            </h1>
            <p className="text-xl text-[#f1ede1aa] max-w-3xl">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-light py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-base font-medium text-[#141414aa] mb-6 uppercase tracking-widest font-geist">
                Descripcion
              </h2>
              <p className="text-2xl text-[#141414] leading-relaxed">
                {service.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-base font-medium text-[#141414aa] mb-6 uppercase tracking-widest font-geist">
                Que incluye
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-6 w-6 text-[#141414] flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <span className="text-lg text-[#141414]">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-bold text-[#ffffff] mb-8"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: "1.2",
              }}
            >
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-[#f1ede1aa] mb-12 max-w-2xl mx-auto">
              Hablemos sobre como podemos ayudarte con {service.title.toLowerCase()}.
            </p>
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center gap-3 bg-[#f1ede1] text-[#141414] px-10 py-5 text-base font-semibold uppercase tracking-wide hover:bg-[#e5e1d5] transition-colors"
            >
              CONTACTAR
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </TransitionLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
