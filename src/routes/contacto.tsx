import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
});

function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Ejemplo con Formspree - reemplazar YOUR_ID con tu ID
    try {
      await fetch("https://formspree.io/f/YOUR_ID", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
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
        description="Contacta con MAZZMKT. Hablemos sobre tu proyecto de marketing digital, branding o desarrollo web."
      />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-20 relative overflow-hidden min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-pattern.png')`,
            opacity: 0.20,
          }}
        />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-medium text-[#ffffffcc] mb-6 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#ffffff]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>CONTACTO</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              HABLEMOS <span className="text-[#ffffff50]">&raquo;</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-light py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="border border-[#14141420] p-12 text-center rounded-sm">
                  <h3 className="text-2xl font-bold text-[#141414] mb-4">¡GRACIAS!</h3>
                  <p className="text-[#141414aa]">Te responderemos lo antes posible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#141414] mb-2 uppercase tracking-wide">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-[#14141420] bg-transparent p-4 text-[#141414] focus:border-[#141414] focus:outline-none transition-colors rounded-sm"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#141414] mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-[#14141420] bg-transparent p-4 text-[#141414] focus:border-[#141414] focus:outline-none transition-colors rounded-sm"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#141414] mb-2 uppercase tracking-wide">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[#14141420] bg-transparent p-4 text-[#141414] focus:border-[#141414] focus:outline-none transition-colors resize-none rounded-sm"
                      placeholder="Cuentanos sobre tu proyecto..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#141414] text-[#ffffff] py-4 font-semibold uppercase tracking-wide hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 rounded-sm"
                  >
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
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
                <h3 className="text-2xl font-bold text-[#141414] mb-6 uppercase">
                  Informacion de Contacto
                </h3>
                <p className="text-lg text-[#141414aa] mb-8">
                  ¿Tienes un proyecto en mente? Nos encantaria escucharte.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#141414] mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-[#141414aa] uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:mazzmkt360@gmail.com"
                      className="text-lg text-[#141414] hover:opacity-70 transition-opacity"
                    >
                      mazzmkt360@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#141414] mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-[#141414aa] uppercase tracking-wide mb-1">
                      Telefono
                    </p>
                    <a
                      href="tel:+34123456789"
                      className="text-lg text-[#141414] hover:opacity-70 transition-opacity"
                    >
                      +34 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#141414] mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-[#141414aa] uppercase tracking-wide mb-1">
                      Ubicacion
                    </p>
                    <p className="text-lg text-[#141414]">Barcelona, Espana</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[#14141420]">
                <p className="text-sm font-medium text-[#141414aa] uppercase tracking-wide mb-4">
                  Siguenos
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-[#14141430] flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-[#14141430] flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-sm"
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
