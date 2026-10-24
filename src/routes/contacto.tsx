import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/sections/page-hero";
import { Molinillo } from "@/components/brand/molinillo";

export const Route = createFileRoute("/contacto")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const { service } = Route.useSearch();
  const whatsappUrl = `https://wa.me/34672340061?text=${encodeURIComponent(
    "Hola! Quiero hablar sobre un proyecto."
  )}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: service ? `Hola, me interesa el área de ${service}.` : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://formspree.io/f/mbdblpjq", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      trackEvent("form_submit", { location: "contacto" });
      setSubmitted(true);
    } catch {
      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contacto | MAZZMKT"
        description="Hablemos de tu proyecto. Webs, marcas, apps o automatización. Cuéntanos qué necesitas y te proponemos una solución a medida."
      />

      <PageHero
        heading="crumbs"
        crumbs={[{ label: "Contacto" }]}
        title={<>Hablemos<br />de tu proyecto</>}
        subtitle="Cuéntanos dónde está tu marca, qué necesitas mover y qué resultado quieres conseguir."
        actions={
          <>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("whatsapp_click", { location: "contacto" })}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                WHATSAPP
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:mazzmkt360@gmail.com"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("email_click", { location: "contacto" })}
              >
                ESCRIBIR MAIL
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
          </>
        }
      />

      {/* Contact Form & Info */}
      <section id="contacto-form" className="bg-dark py-5 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-20 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="border border-light/13 p-8 md:p-12 text-center rounded-sm">
                  <h2 className="text-2xl md:text-[36px] font-bold text-light mb-4">¡GRACIAS!</h2>
                  <p className="text-body text-light/67">Te responderemos lo antes posible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div>
                    <label htmlFor="contacto-nombre" className="block font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-2 md:mb-3">Nombre</label>
                    <input
                      id="contacto-nombre"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-sm border border-light/13 bg-transparent px-4 py-3 md:px-5 md:py-4 text-base text-light placeholder:text-light/40 focus:border-light focus:outline-none transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="contacto-email" className="block font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-2 md:mb-3">Email</label>
                    <input
                      id="contacto-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-sm border border-light/13 bg-transparent px-4 py-3 md:px-5 md:py-4 text-base text-light placeholder:text-light/40 focus:border-light focus:outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contacto-mensaje" className="block font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-2 md:mb-3">Mensaje</label>
                    <textarea
                      id="contacto-mensaje"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-sm border border-light/13 bg-transparent px-4 py-3 md:px-5 md:py-4 text-base text-light placeholder:text-light/40 focus:border-light focus:outline-none transition-colors resize-y min-h-[140px] md:min-h-[180px]"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light disabled:opacity-50 font-mono"
                    style={{ letterSpacing: "0.09em" }}
                  >
                    {isSubmitting ? "ENVIANDO" : "ENVIAR MENSAJE"}
                    {/* Mientras se envía, el molinillo gira como indicador de carga */}
                    {isSubmitting ? <Molinillo spinning className="h-[14px] w-[14px]" /> : <ArrowRight className="h-4 w-4" strokeWidth={1.5} />}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-2 md:mb-5">
                  Contacto directo
                </p>
                <h2 className="normal-case font-heading text-subsection-title font-bold leading-[1] md:leading-[0.92] tracking-[-0.045em] text-light mb-4 md:mb-6">
                  Información de contacto
                </h2>
                <p className="text-body text-[#a1a1a1] max-w-md">
                  Si prefieres ir directo, escríbenos por mail o agendamos una llamada para entender el proyecto.
                </p>
              </div>

              <div className="flex flex-col gap-5 md:gap-7">
                <ContactItem icon={Mail} label="Email">
                  <a
                    href="mailto:mazzmkt360@gmail.com"
                    className="hover:opacity-70 transition-opacity"
                    onClick={() => trackEvent("email_click", { location: "contacto_info" })}
                  >
                    mazzmkt360@gmail.com
                  </a>
                </ContactItem>
                <ContactItem icon={Phone} label="Teléfono">
                  <a href="tel:+34672340061" className="hover:opacity-70 transition-opacity">
                    +34 672 340 061
                  </a>
                </ContactItem>
                <ContactItem icon={MapPin} label="Ubicación">
                  Barcelona, España
                </ContactItem>
              </div>

              <div className="pt-6 md:pt-8 border-t border-light/13">
                <p className="font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-4">
                  Síguenos
                </p>
                <div className="flex gap-2 md:gap-3">
                  <a
                    href="https://instagram.com/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-sm border border-light/13 text-[#a1a1a1] transition-colors hover:border-light hover:text-light"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-sm border border-light/13 text-[#a1a1a1] transition-colors hover:border-light hover:text-light"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 md:gap-5">
      <Icon className="h-5 w-5 md:h-6 md:w-6 text-light mt-0.5 flex-shrink-0" strokeWidth={1.5} />
      <div>
        <p className="font-mono text-[10px] md:text-[13px] font-medium uppercase tracking-[0.13em] text-light mb-1">
          {label}
        </p>
        <div className="text-body text-light">{children}</div>
      </div>
    </div>
  );
}
