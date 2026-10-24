import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { projects } from "@/data/projects";
import { useState, useRef, useEffect, useCallback } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { Molinillo } from "@/components/brand/molinillo";

export const Route = createFileRoute("/proyectos/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#ffffff] mb-4">Proyecto no encontrado</h1>
        <TransitionLink
          to="/proyectos"
          className="text-light transition-colors hover:opacity-80"
        >
          Volver a proyectos
        </TransitionLink>
      </div>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const images = project.images ?? [];

  const openSlider = (index: number) => {
    setSliderIndex(index);
    setSliderOpen(true);
  };

  const closeSlider = () => setSliderOpen(false);

  const prev = useCallback(() => setSliderIndex(i => Math.max(i - 1, 0)), []);
  const next = useCallback(() => setSliderIndex(i => Math.min(i + 1, images.length - 1)), [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
  };

  useEffect(() => {
    if (!sliderOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeSlider();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sliderOpen, prev, next]);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Organization",
      name: "MAZZMKT",
      url: "https://mazzmkt.com",
    },
    ...(project.image && { image: `https://mazzmkt.com${project.image}` }),
    ...(project.url && { url: project.url }),
    keywords: project.services.join(", "),
  };

  return (
    <>
      <SEOHead
        title={`${project.title} | MAZZMKT`}
        description={project.description}
        jsonLd={projectSchema}
      />

      <PageHero
        size="cta"
        compact
        glow={false}
        crumbs={[{ label: "Proyectos", to: "/proyectos" }, { label: project.category }]}
        title={project.title}
      />

      <section className="bg-dark pb-10 md:pb-16">
        <div className="container mx-auto px-5 md:px-6">
          <div className="border-b border-light/13 [&>div:first-child]:border-t-0">
            <ProjectAccordion
              id="project"
              title="El proyecto"
              isOpen={openDetail === "project"}
              onToggle={() => setOpenDetail(openDetail === "project" ? null : "project")}
              contentClassName="max-w-none"
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="max-w-4xl space-y-4">
                  <p>
                    {project.description}
                    <Molinillo className="ml-2 inline-block h-[0.7em] w-[0.7em] align-baseline" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="rounded-full border border-light px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.09em] text-light">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                {project.url && !project.urlDisabled && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 justify-self-start rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] font-mono text-[13px] font-semibold uppercase tracking-[0.09em] text-light transition-colors hover:border-light md:justify-self-end"
                  >
                    {project.category === "WebApp" ? "Ver webapp" : "Ver website"}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                )}
                {project.url && project.urlDisabled && (
                  <span className="inline-flex items-center gap-2 justify-self-end pt-1 text-[10px] font-mono uppercase tracking-[0.09em] text-light">
                    Acceso privado <span aria-hidden="true">🔒</span>
                  </span>
                )}
              </div>
            </ProjectAccordion>
            {project.about && (
              <ProjectAccordion
                id="context"
                title="El punto de partida"
                isOpen={openDetail === "context"}
                onToggle={() => setOpenDetail(openDetail === "context" ? null : "context")}
              >
                <p>{project.about}</p>
              </ProjectAccordion>
            )}
            {project.work && project.work.length > 0 && (
              <ProjectAccordion
                id="work"
                title="Qué hicimos"
                isOpen={openDetail === "work"}
                onToggle={() => setOpenDetail(openDetail === "work" ? null : "work")}
              >
                <ol className="space-y-4">
                  {project.work.map((item, index) => (
                    <li key={index} className="flex items-baseline gap-4">
                      <span className="shrink-0 font-mono text-[11px] text-light">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </ProjectAccordion>
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="bg-dark pb-10 md:pb-20">
        <div className="container mx-auto px-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="w-full overflow-hidden rounded-sm"
                >
                  <img
                    src={src}
                    alt={`${project.title} — imagen ${index + 1}`}
                    className="w-full h-auto block cursor-pointer active:opacity-90 transition-opacity"
                    onClick={() => openSlider(index)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-video bg-[#1a1a1a] relative overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-light/13 text-9xl font-bold">
                  0{project.id}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile Image Slider */}
      <AnimatePresence>
        {sliderOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/80"
              onClick={closeSlider}
            />

            {/* Close button */}
            <button
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-light bg-[#ffffff10] rounded-full cursor-pointer"
              onClick={closeSlider}
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Slider content */}
            <div
              className="relative z-10 flex flex-col items-center gap-3"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex items-center gap-3">
                <button
                  className={`shrink-0 w-10 h-10 flex items-center justify-center text-light bg-[#ffffff10] rounded-full cursor-pointer ${sliderIndex === 0 ? "invisible" : ""}`}
                  onClick={prev}
                  aria-label="Anterior"
                >
                  ←
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={sliderIndex}
                    src={images[sliderIndex]}
                    alt={`${project.title} — imagen ${sliderIndex + 1}`}
                    className="block max-h-[80vh] max-w-[calc(100vw-8rem)] w-auto h-auto rounded-sm"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                <button
                  className={`shrink-0 w-10 h-10 flex items-center justify-center text-light bg-[#ffffff10] rounded-full cursor-pointer ${sliderIndex === images.length - 1 ? "invisible" : ""}`}
                  onClick={next}
                  aria-label="Siguiente"
                >
                  →
                </button>
              </div>

              {/* Counter */}
              <p className="text-center text-light text-xs font-mono tracking-widest">
                {sliderIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {project.results.length > 0 && <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <h2 className="text-[13px] font-medium text-light mb-6 tracking-widest font-mono">
              RESULTADOS
            </h2>
            <p
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontFamily: "var(--font-heading)",
                lineHeight: "1.05",
                letterSpacing: "-0.04em",
              }}
            >
              Impacto medible en el negocio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-light/13 p-8 text-left md:text-center"
              >
                <p
                  className="font-bold text-[#ffffff] mb-2"
                  style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
                >
                  {result.value}
                </p>
                <p className="text-[13px] font-medium text-light uppercase tracking-widest font-mono">
                  {result.metric}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}

    </>
  );
}

function ProjectAccordion({
  id,
  title,
  isOpen,
  onToggle,
  children,
  contentClassName = "max-w-4xl",
}: {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="border-t border-light/13">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`project-${id}-content`}
        className="group flex w-full items-center gap-4 py-5 text-left md:py-6"
      >
        <span className="flex-1 font-heading text-[18px] font-bold tracking-[-0.025em] text-light md:text-[22px]">
          {title}
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 md:h-10 md:w-10 ${isOpen ? "border-light bg-light text-dark" : "border-light/30 text-light group-hover:border-light"}`}>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`project-${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`text-body space-y-4 pb-6 text-light/67 md:pb-8 ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
