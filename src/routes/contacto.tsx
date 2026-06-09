import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/seo/SEOHead";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
});

function ContactoPage() {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(t("contact.whatsapp_message"))}`;

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
        description="Contacta con MAZZMKT. Hablemos sobre tu proyecto de marketing digital, branding o desarrollo web."
      />

      {/* Hero */}
      <section className="bg-dark pt-24 pb-6 md:pt-32 md:pb-16 relative overflow-hidden">
        <div
          className="hidden md:block absolute -inset-x-[2%] inset-y-0 bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-home.webp')`,
            backgroundPosition: "center center",
            backgroundSize: "100% auto",
            opacity: 0.25,
            animation: "tv-static 0.45s steps(1) infinite",
          }}
        />
        <div className="container mx-auto px-5 md:px-6 relative">
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
              className="font-medium flex items-center gap-3 mb-1.5 md:mb-5 md:text-[15px] md:uppercase md:text-[#ffffffe0] font-geist"
            >
              <span
                className="md:hidden"
                style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#5F5E5A", textTransform: "uppercase" }}
              >
                {t("contact.breadcrumb_mobile")}
              </span>
              <span className="hidden md:contents" style={{ letterSpacing: "0.14em" }}>
                <span className="opacity-50">MAZZMKT</span>
                <span className="opacity-30">/</span>
                <span>CONTACTO</span>
              </span>
            </motion.h1>
            {/* Tagline visual */}
            <div
              className="font-bold text-[#ffffff] md:mb-8"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-bold text-[#ffffff]"
                style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
              >
                {t("contact.headline_1")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block font-bold text-[#ffffff]"
                style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "inherit" }}
              >
                {t("contact.headline_2")}
              </motion.p>
            </div>
            {/* Subtítulo visible solo en mobile */}
            <p className="md:hidden text-[12px] text-[#888780] leading-[1.6] mt-2">
              {t("contact.subtitle_mobile")}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block max-w-xl text-[18px] text-[#f1ede1aa] mb-9"
            >
              {t("contact.subtitle_desktop")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden md:flex items-center gap-3"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("whatsapp_click", { location: "contacto" })}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                {t("contact.cta_whatsapp")}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="mailto:mazzmkt360@gmail.com"
                className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("email_click", { location: "contacto" })}
              >
                {t("contact.cta_email")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contacto-form" className="bg-light py-5 md:py-20">
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
                <div className="border border-[#14141420] p-8 md:p-12 text-center rounded-sm">
                  <h2 className="text-2xl md:text-[36px] font-bold text-[#141414] mb-4">{t("contact.form_thanks_title")}</h2>
                  <p className="text-[13px] md:text-lg text-[#141414aa]">{t("contact.form_thanks_body")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                  <div>
                    <label className="block text-[11px] md:text-[15px] font-medium text-[#888780] md:text-[#141414] mb-1 md:mb-3 uppercase tracking-[1px] md:tracking-[0.13em] font-geist">
                      {t("contact.form_name_label")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-[rgba(44,44,42,0.12)] md:border-[#14141420] bg-white md:bg-transparent px-3 py-2.5 md:px-5 md:py-4 text-[13px] md:text-lg text-[#141414] focus:border-[#141414] focus:outline-none transition-colors rounded-sm placeholder:text-[#B4B2A9] placeholder:text-[13px] md:placeholder:text-base"
                      placeholder={t("contact.form_name_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] md:text-[15px] font-medium text-[#888780] md:text-[#141414] mb-1 md:mb-3 uppercase tracking-[1px] md:tracking-[0.13em] font-geist">
                      {t("contact.form_email_label")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-[rgba(44,44,42,0.12)] md:border-[#14141420] bg-white md:bg-transparent px-3 py-2.5 md:px-5 md:py-4 text-[13px] md:text-lg text-[#141414] focus:border-[#141414] focus:outline-none transition-colors rounded-sm placeholder:text-[#B4B2A9] placeholder:text-[13px] md:placeholder:text-base"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] md:text-[15px] font-medium text-[#888780] md:text-[#141414] mb-1 md:mb-3 uppercase tracking-[1px] md:tracking-[0.13em] font-geist">
                      {t("contact.form_message_label")}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[rgba(44,44,42,0.12)] md:border-[#14141420] bg-white md:bg-transparent px-3 py-2.5 md:px-5 md:py-4 text-[13px] md:text-lg text-[#141414] focus:border-[#141414] focus:outline-none transition-colors resize-y md:resize-none rounded-sm min-h-[100px] md:min-h-[180px] placeholder:text-[#B4B2A9] placeholder:text-[13px] md:placeholder:text-base"
                      placeholder={t("contact.form_message_placeholder")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2C2C2A] text-[#F1EFE8] py-3 md:py-5 font-medium md:font-semibold text-[12px] md:text-sm uppercase tracking-[1.5px] md:tracking-[0.09em] hover:bg-[#3a3a38] transition-colors disabled:opacity-50 rounded-sm mt-1 font-geist"
                  >
                    {isSubmitting ? t("contact.form_submitting") : t("contact.form_submit")}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Divisor visible solo en mobile entre form e info */}
            <div className="md:hidden h-[0.5px] bg-[rgba(44,44,42,0.06)] -mx-5" />

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-8"
            >
              <div>
                <p
                  className="hidden md:block text-[15px] uppercase mb-5 font-medium font-geist"
                  style={{ letterSpacing: "0.13em", color: "#B4B2A9" }}
                >
                  {t("contact.info_label")}
                </p>
                <h2 className="text-[10px] md:text-[clamp(42px,4vw,56px)] font-bold md:leading-[0.98] text-[#141414] mb-3 md:mb-8 uppercase tracking-[2.5px] md:tracking-[-0.03em]">
                  {t("contact.info_title")}
                </h2>
                {/* Subtítulo oculto en mobile (aparece en el hero) */}
                <p className="hidden md:block text-lg text-[#5F5E5A] leading-[1.7] mb-10 max-w-md">
                  {t("contact.info_subtitle")}
                </p>
              </div>

              <div className="flex flex-col gap-0.5 md:gap-7">
                <div className="flex items-center md:items-start gap-2.5 md:gap-5 px-3.5 py-3 md:px-0 md:py-0 bg-[rgba(44,44,42,0.03)] md:bg-transparent rounded-[3px] md:rounded-none">
                  <Mail className="h-4 w-4 md:h-6 md:w-6 text-[#888780] md:text-[#141414] mt-0 md:mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] md:text-sm font-medium text-[#B4B2A9] md:text-[#141414aa] uppercase tracking-[1px] md:tracking-[0.13em] mb-0.5 md:mb-1 font-geist">
                      {t("contact.email_label")}
                    </p>
                    <a
                      href="mailto:mazzmkt360@gmail.com"
                      className="inline-flex items-center min-h-[44px] text-[13px] md:text-lg font-medium md:font-normal text-[#141414] hover:opacity-70 transition-opacity uppercase md:normal-case"
                      onClick={() => trackEvent("email_click", { location: "contacto_info" })}
                    >
                      mazzmkt360@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center md:items-start gap-2.5 md:gap-5 px-3.5 py-3 md:px-0 md:py-0 bg-[rgba(44,44,42,0.03)] md:bg-transparent rounded-[3px] md:rounded-none">
                  <Phone className="h-4 w-4 md:h-6 md:w-6 text-[#888780] md:text-[#141414] mt-0 md:mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] md:text-sm font-medium text-[#B4B2A9] md:text-[#141414aa] uppercase tracking-[1px] md:tracking-[0.13em] mb-0.5 md:mb-1 font-geist">
                      {t("contact.phone_label")}
                    </p>
                    <a
                      href="tel:+34123456789"
                      className="inline-flex items-center min-h-[44px] text-[13px] md:text-lg font-medium md:font-normal text-[#141414] hover:opacity-70 transition-opacity"
                    >
                      +34 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-center md:items-start gap-2.5 md:gap-5 px-3.5 py-3 md:px-0 md:py-0 bg-[rgba(44,44,42,0.03)] md:bg-transparent rounded-[3px] md:rounded-none">
                  <MapPin className="h-4 w-4 md:h-6 md:w-6 text-[#888780] md:text-[#141414] mt-0 md:mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] md:text-sm font-medium text-[#B4B2A9] md:text-[#141414aa] uppercase tracking-[1px] md:tracking-[0.13em] mb-0.5 md:mb-1 font-geist">
                      {t("contact.location_label")}
                    </p>
                    <p className="text-[13px] md:text-lg font-medium md:font-normal text-[#141414] uppercase md:normal-case leading-[44px] md:leading-normal">
                      {t("contact.location_value")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 md:pt-8 border-t border-[#14141420]">
                <p className="text-[10px] md:text-sm font-medium text-[#141414aa] uppercase tracking-[1px] md:tracking-[0.13em] mb-3.5 md:mb-4 font-geist">
                  {t("contact.follow_label")}
                </p>
                <div className="flex gap-2 md:gap-4">
                  <a
                    href="https://instagram.com/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 md:w-12 md:h-12 md:px-0 md:justify-center border border-[rgba(44,44,42,0.12)] md:border-[#14141430] text-[#5F5E5A] md:text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-[3px]"
                  >
                    <svg className="w-[15px] h-[15px] md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-[11px] font-medium uppercase tracking-[0.5px] md:hidden">
                      INSTAGRAM
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com/company/mazzmkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 md:w-12 md:h-12 md:px-0 md:justify-center border border-[rgba(44,44,42,0.12)] md:border-[#14141430] text-[#5F5E5A] md:text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] transition-all rounded-[3px]"
                  >
                    <svg className="w-[15px] h-[15px] md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="text-[11px] font-medium uppercase tracking-[0.5px] md:hidden">
                      LINKEDIN
                    </span>
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
