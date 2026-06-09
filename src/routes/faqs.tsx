import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/seo/SEOHead";
import { TransitionLink } from "@/components/transition/transition-link";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  Plus,
  Minus,
  Code,
  Clock,
  Wrench,
  Sparkles,
  Zap,
  Palette,
  Search,
  Share2,
  TrendingUp,
  BarChart3,
  Bot,
  Activity,
  MousePointerClick,
  MessageSquare,
  Globe,
  FileText,
  Map,
} from "lucide-react";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
});

interface FAQBase {
  id: number;
  category: string;
  icon: typeof Code;
}

const faqBases: FAQBase[] = [
  { id: 17, category: "GENERAL", icon: MessageSquare },
  { id: 22, category: "GENERAL", icon: Check },
  { id: 21, category: "GENERAL", icon: Check },
  { id: 20, category: "GENERAL", icon: MessageSquare },
  { id: 1,  category: "WEB", icon: Code },
  { id: 2,  category: "WEB", icon: Clock },
  { id: 26, category: "WEB", icon: Globe },
  { id: 27, category: "WEB", icon: MousePointerClick },
  { id: 28, category: "WEB", icon: BarChart3 },
  { id: 29, category: "WEB", icon: Zap },
  { id: 30, category: "WEB", icon: Search },
  { id: 3,  category: "WEB", icon: Wrench },
  { id: 18, category: "WEB", icon: Globe },
  { id: 19, category: "BRANDING", icon: Clock },
  { id: 5,  category: "BRANDING", icon: Palette },
  { id: 6,  category: "BRANDING", icon: Sparkles },
  { id: 9,  category: "SEO", icon: Search },
  { id: 10, category: "SEO", icon: TrendingUp },
  { id: 23, category: "SEO", icon: Search },
  { id: 24, category: "SEO", icon: Map },
  { id: 25, category: "SEO", icon: FileText },
  { id: 11, category: "REDES SOCIALES", icon: Share2 },
  { id: 12, category: "REDES SOCIALES", icon: BarChart3 },
  { id: 15, category: "ANALYTICS", icon: Activity },
  { id: 16, category: "ANALYTICS", icon: MousePointerClick },
  { id: 13, category: "IA", icon: Bot },
];

const categoryKeys = ["TODOS", "ANALYTICS", "BRANDING", "GENERAL", "IA", "REDES SOCIALES", "SEO", "WEB"];

function FAQsPage() {
  const { t } = useTranslation();

  const faqs = faqBases.map((base) => ({
    ...base,
    question: t(`faqs_page.items.${base.id}.question`),
    answer: t(`faqs_page.items.${base.id}.answer`),
    highlight: t(`faqs_page.items.${base.id}.highlight`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };

  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredFaqs =
    activeCategory === "TODOS"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const categoryCounts = categoryKeys.map((key) => ({
    value: key,
    label: t(`faqs_page.categories.${key}`),
    count: key === "TODOS" ? faqs.length : faqs.filter((faq) => faq.category === key).length,
  }));
  const activeCategoryCount =
    categoryCounts.find((c) => c.value === activeCategory)?.count ?? faqs.length;

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <SEOHead
        title="FAQs - Preguntas Frecuentes | MAZZMKT"
        description="Preguntas frecuentes sobre diseño web en Barcelona, desarrollo web, landings de alta conversión, webs para autónomos, branding, SEO y marketing digital."
        jsonLd={faqSchema}
      />

      {/* Hero */}
      <section className="bg-dark pt-28 pb-[18px] md:pt-32 md:pb-16 relative overflow-hidden">
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
            className="max-w-5xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] md:text-[15px] font-medium text-[#888780] md:text-[#ffffffe0] mb-1.5 md:mb-5 tracking-[1.5px] md:tracking-[0.14em] uppercase flex items-center gap-3 font-geist"
            >
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>FAQS</span>
            </motion.p>
            <h1
              className="faqs-hero-title font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              {t("faqs_page.hero_title_1")}
              <br />
              <span className="text-[#ffffff]">{t("faqs_page.hero_title_2")} <span className="hidden md:inline">&raquo;</span></span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="faqs-hero-subtitle text-[#f1ede1aa] leading-relaxed mt-8 max-w-xl"
              style={{ fontSize: "18px" }}
            >
              {t("faqs_page.hero_subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden md:flex items-center gap-3 mt-9"
            >
              <a
                href="#faqs"
                className="inline-flex items-center justify-center rounded-sm bg-[#f1ede1] px-8 py-[15px] text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                {t("faqs_page.cta_see")}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center rounded-sm border border-[#f1ede14d] px-8 py-[15px] text-sm font-semibold uppercase text-[#f1ede1] transition-colors hover:border-[#f1ede1] font-geist"
                style={{ letterSpacing: "0.09em" }}
              >
                {t("faqs_page.cta_contact")}
              </TransitionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter  oculto en mobile, visible en desktop */}
      <section className="hidden md:block bg-light py-7 border-b border-[#14141410]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {categoryCounts.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`rounded-sm px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 font-geist ${
                  activeCategory === value
                    ? "bg-[#141414] text-[#ffffff]"
                    : "bg-transparent text-[#141414aa] border border-[#14141420] hover:border-[#141414] hover:text-[#141414]"
                }`}
                style={{ letterSpacing: "0.09em" }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="bg-light py-8 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          {/* Dropdown filtro  solo mobile */}
          <div className="relative md:hidden mb-5">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen((open) => !open)}
              aria-expanded={isMobileFilterOpen}
              className="flex w-full items-center justify-between rounded-sm border border-[#f1ede11a] bg-[#141414] px-3 py-2.5 text-left text-[#f1ede1] shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors hover:border-[#f1ede133]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f1ede1]" />
                <span className="truncate font-geist text-[12px] font-semibold uppercase tracking-[0.08em]">
                  {t(`faqs_page.categories.${activeCategory}`)}
                </span>
              </span>
              <span className="flex items-center gap-2 text-[#f1ede199]">
                <span className="font-geist text-[11px]">{activeCategoryCount}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-sm border border-[#f1ede11f] bg-[#1b1b1b] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  {categoryCounts.map((category) => {
                    const isActive = category.value === activeCategory;

                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => {
                          setActiveCategory(category.value);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-[#f1ede1] text-[#141414]"
                            : "text-[#f1ede1cc] hover:bg-[#f1ede10d] hover:text-[#ffffff]"
                        }`}
                      >
                        <span className="font-geist text-[12px] font-semibold uppercase tracking-[0.08em]">
                          {category.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="font-geist text-[11px] opacity-70">{category.count}</span>
                          {isActive && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-0.5 md:space-y-5"
            >
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const IconComponent = faq.icon;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`rounded-sm border transition-all duration-500 ${
                      isOpen
                        ? "border-[#141414] bg-[#141414]"
                        : "border-[#14141420] bg-transparent hover:border-[#14141460]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full py-3.5 px-4 md:p-7 lg:p-8 flex items-start gap-3 md:gap-5 lg:gap-6 text-left"
                    >
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                          <IconComponent
                            className={`w-3 h-3 md:w-5 md:h-5 transition-colors duration-300 ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                            strokeWidth={1.5}
                          />
                          <span
                            className={`text-[10px] md:text-xs font-semibold tracking-[1.5px] md:tracking-widest transition-colors duration-300 font-geist ${
                              isOpen ? "text-[#ffffffaa]" : "text-[#141414aa]"
                            }`}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h2
                          className={`text-sm md:text-[22px] lg:text-[24px] font-bold leading-tight transition-colors duration-300 ${
                            isOpen ? "text-[#ffffff]" : "text-[#141414]"
                          }`}
                          style={{ letterSpacing: "-0.025em" }}
                        >
                          {faq.question}
                        </h2>
                      </div>

                      {/* Toggle Icon */}
                      <div
                        className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                          isOpen
                            ? "border-[#ffffff30] text-[#ffffff]"
                            : "border-[#14141420] text-[#141414]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-7 lg:px-8 pb-4 md:pb-8 lg:pb-10">
                            <div className="faqs-answer-text max-w-4xl text-[#ffffffaa] md:text-[17px] leading-relaxed mb-3 md:mb-6 space-y-4">
                              {faq.answer.split("\n\n").map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                              ))}
                            </div>
                            {faq.highlight && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 bg-[#ffffff10] border-l-2 border-[#ffffff]"
                              >
                                <Zap
                                  className="w-3 h-3 md:w-4 md:h-4 text-[#ffffff] flex-shrink-0"
                                  strokeWidth={1.5}
                                />
                                <span className="text-[#ffffff] text-[11px] md:text-[15px] font-medium">
                                  {faq.highlight}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-dark py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-12"
          >
            <p className="text-[10px] md:text-[15px] font-medium text-[#ffffffaa] mb-6 md:mb-5 uppercase tracking-[0.13em] flex items-center gap-3 font-geist">
              <span className="inline-block w-8 h-[1px] bg-[#ffffff]" />
              {t("faqs_page.stats_label")}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 md:gap-12 justify-items-center text-center">
            {(t("faqs_page.stats", { returnObjects: true }) as { number: string; label: string; sublabel: string }[]).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p
                  className="font-bold text-[#ffffff] mb-2"
                  style={{ fontSize: "var(--font-stat)" }}
                >
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-[#ffffff] uppercase font-geist" style={{ letterSpacing: "0.09em" }}>
                  {stat.label}
                </p>
                <p className="text-xs text-[#ffffffaa]">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
