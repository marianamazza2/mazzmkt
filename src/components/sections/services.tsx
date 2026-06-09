import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Palette, MessageCircle, Bot, Zap, Sparkles, Globe, Wand2, Search, BarChart2, Share2, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransitionLink } from "@/components/transition/transition-link";

type MainServiceItem = { icon: LucideIcon; title: string; subtitle: string; description: string };
type AiServiceItem = { icon: LucideIcon; title: string; description: string };
type MobileAiItem = { icon: LucideIcon; title: string; subtitle: string };

const mainServiceIcons: LucideIcon[] = [Code, Zap, Palette, BarChart2, Search, Share2];
const aiServiceIcons: LucideIcon[] = [Globe, Bot, MessageCircle, Wand2, Sparkles, Target];
const mobileAiIconList: LucideIcon[] = [Globe, Bot, MessageCircle, Sparkles];


function ServiceCard({
  service,
  index,
  variant = "main",
}: {
  service: MainServiceItem | AiServiceItem;
  index: number;
  variant?: "main" | "ai";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isMain = variant === "main";
  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div className="relative border border-[#14141420] h-full hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.08) 0%, transparent 50%)`
            ),
          }}
        />

        <div className={`relative z-10 ${isMain ? "p-5 md:p-8" : "p-5 md:p-7"}`}>
          <div className="flex items-start justify-between mb-6 md:mb-7">
            <Icon
              className={`${isMain ? "h-10 w-10" : "h-8 w-8"} text-[#141414] group-hover:text-[#ffffff] transition-colors`}
              strokeWidth={1.5}
            />
            <span className="text-4xl md:text-5xl font-bold text-[#14141415] group-hover:text-[#ffffff20] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="font-bold text-[#141414] group-hover:text-[#ffffff] mb-3 transition-colors"
            style={{ fontSize: "24px", lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            {service.title}
          </h3>

          {"subtitle" in service && (
            <p className="text-[13px] font-medium text-[#141414b8] group-hover:text-[#f1ede1cc] mb-4 uppercase transition-colors"
              style={{ letterSpacing: "0.08em" }}>
              {(service as MainServiceItem).subtitle}
            </p>
          )}

          <p className={`${isMain ? "text-[17px]" : "text-base"} text-[#141414cc] group-hover:text-[#f1ede1cc] leading-[1.55] transition-colors`}>
            {service.description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCardDark({
  service,
  index,
}: {
  service: MainServiceItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="relative border border-[#ffffff20] h-full hover:border-[#f1ede1] hover:bg-[#f1ede1] transition-all duration-300 overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(20, 20, 20, 0.08) 0%, transparent 50%)`
            ),
          }}
        />

        <div className="relative z-10 p-5 md:p-8">
          <div className="flex items-start justify-between mb-6 md:mb-7">
            <Icon className="h-10 w-10 text-[#f1ede1] group-hover:text-[#141414] transition-colors" strokeWidth={1.5} />
            <span className="text-4xl md:text-5xl font-bold text-[#ffffff15] group-hover:text-[#14141420] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="font-bold text-[#f1ede1] group-hover:text-[#141414] mb-3 transition-colors"
            style={{ fontSize: "24px", lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            {service.title}
          </h3>

          <p className="text-[13px] font-medium uppercase text-[#f1ede1c2] group-hover:text-[#141414b8] mb-4 transition-colors"
            style={{ letterSpacing: "0.08em" }}>
            {service.subtitle}
          </p>

          <p className="text-[17px] text-[#f1ede1cc] group-hover:text-[#141414cc] leading-[1.55] transition-colors">
            {service.description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#141414] group-hover:h-12 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#141414] group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [selectedMobileService, setSelectedMobileService] = useState(0);
  const { t } = useTranslation();

  const mainServices = mainServiceIcons.map((icon, i) => ({
    icon,
    ...(t("services.main_items", { returnObjects: true }) as Array<Omit<MainServiceItem, "icon">>)[i],
  }));
  const aiServices = aiServiceIcons.map((icon, i) => ({
    icon,
    ...(t("services.ai_items", { returnObjects: true }) as Array<Omit<AiServiceItem, "icon">>)[i],
  }));
  const mobileAiCards = mobileAiIconList.map((icon, i) => ({
    icon,
    ...(t("services.mobile_ai_items", { returnObjects: true }) as Array<Omit<MobileAiItem, "icon">>)[i],
  }));

  const toTagCase = (tag: string) =>
    tag.toLowerCase().charAt(0).toUpperCase() + tag.toLowerCase().slice(1);

  return (
    <>
      {/* Main Services — Dark Section */}
      <section className="bg-dark py-7 md:py-18">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-10"
          >
            <h2 className="text-[10px] font-medium uppercase mb-2 md:text-[15px] md:mb-5 md:flex md:items-center md:gap-3 md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#a3a199" }}>
              {t("services.main_label")}
            </h2>
            <p
              className="mb-4 text-[20px] font-medium leading-[1.1] text-[#ffffff] md:mb-0 md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              {t("services.main_headline")}{" "}
              <span className="hidden md:inline" style={{ color: "#ffffff" }}>&raquo;</span>
            </p>
          </motion.div>

          {/* Mobile: slider */}
          <div className="md:hidden">
            <div className="h-[210px]">
              {(() => {
                const ActiveIcon = mainServices[selectedMobileService].icon;
                const total = mainServices.length;
                const handleNext = () => setSelectedMobileService((prev) => (prev + 1) % total);
                const handlePrev = () => setSelectedMobileService((prev) => (prev - 1 + total) % total);
                return (
                  <motion.div
                    key={selectedMobileService}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="rounded-[0.25rem] p-5 h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
                    style={{ background: "rgba(255, 255, 255, 0.06)" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.08}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) handleNext();
                      else if (info.offset.x > 50) handlePrev();
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <ActiveIcon size={20} strokeWidth={1.5} style={{ color: "#f1ede1" }} />
                      </div>
                      <p className="text-[13px] font-semibold uppercase text-[#f1ede1]" style={{ letterSpacing: "0.04em" }}>
                        {mainServices[selectedMobileService].title}
                      </p>
                    </div>

                    <p className="text-[13px] leading-[1.6] mb-4" style={{ color: "#c8c4b8" }}>
                      {mainServices[selectedMobileService].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {mainServices[selectedMobileService].subtitle.split("|").map(tag => (
                        <span
                          key={tag}
                          className="text-[12px] px-3 py-[5px] rounded-full border"
                          style={{ borderColor: "rgba(255, 255, 255, 0.18)", color: "#a3a199" }}
                        >
                          {toTagCase(tag.trim())}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Dots navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", paddingTop: "18px" }}>
              {mainServices.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedMobileService(i)}
                  style={{
                    display: "block",
                    width: i === selectedMobileService ? "18px" : "4px",
                    height: "4px",
                    borderRadius: "9999px",
                    backgroundColor: i === selectedMobileService ? "#F1EDE1" : "rgba(241,237,225,0.32)",
                    transition: "width 300ms ease-out, background-color 300ms ease-out",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: carrusel horizontal de cards */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {mainServices.map((service, index) => (
              <ServiceCardDark key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Services — Light Section */}
      <section className="bg-light py-7 md:py-16">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 md:mb-10"
          >
            <h2
              className="text-[10px] uppercase mb-2 md:text-[15px] md:mb-5 md:font-medium md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#77766f" }}
            >
              {t("services.ai_label")}
            </h2>
            <p
              className="text-[20px] font-medium leading-[1.1] text-[#141414] md:text-[clamp(52px,5vw,64px)] md:font-bold md:leading-[0.95] md:tracking-[-0.03em]"
            >
              {t("services.ai_headline")}{" "}
              <span className="hidden md:inline text-[#141414aa]">{t("services.ai_headline_sub")}</span>
              <span className="md:hidden">{t("services.ai_headline_sub")}</span>
              <span className="hidden md:inline text-[#141414aa]"> &raquo;</span>
            </p>

            {/* Mobile: párrafo introductorio */}
            <p
              className="md:hidden text-[13px] leading-[1.7] mt-3"
              style={{ color: "#888780" }}
            >
              {t("services.ai_intro")}
            </p>
          </motion.div>

          {/* Mobile: grid 2x2 de cards IA */}
          <div className="md:hidden grid grid-cols-2 gap-[2px] mb-5">
            {mobileAiCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="rounded-sm p-5"
                  style={{ background: "#e9e5d9" }}
                >
                  <Icon size={20} strokeWidth={1.5} className="mb-4" style={{ color: "#5F5E5A" }} />
                  <p
                    className="text-[13px] font-semibold uppercase text-[#141414] mb-1"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {card.title}
                  </p>
                  <p className="text-[12px] text-[#888780] leading-[1.4]">
                    {card.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: carrusel horizontal de cards */}
          <div className="hidden md:flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 mb-10 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0 md:gap-5 md:mb-10">
            {aiServices.map((service, index) => (
              <div key={service.title} className="snap-center flex-shrink-0 w-[85vw] md:w-auto h-full">
                <ServiceCard service={service} index={index + 3} variant="ai" />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TransitionLink
              to="/contacto"
              className="inline-flex items-center gap-[6px] text-[11px] font-medium uppercase md:gap-3 md:rounded-sm md:border md:border-[#1414144d] md:px-8 md:py-[15px] md:text-sm md:font-semibold md:text-[#141414] md:transition-colors md:hover:border-[#141414] md:font-geist"
              style={{ letterSpacing: "0.09em", color: "#141414" }}
            >
              {t("services.ai_cta")}
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
