import { createFileRoute, notFound } from "@tanstack/react-router";
import { TransitionLink } from "@/components/transition/transition-link";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { projects } from "@/data/projects";
import { useState, useRef, useEffect, useCallback } from "react";

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
          className="text-[#f1ede1aa] hover:text-[#f1ede1] transition-colors"
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
  const touchStartX = useRef(0);
  const images = project.images ?? [];

  const openSlider = (index: number) => {
    if (window.innerWidth < 768) {
      setSliderIndex(index);
      setSliderOpen(true);
    }
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

      {/* Hero */}
      <section className="bg-dark pt-24 pb-8 md:pt-32 md:pb-20">
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
              className="text-[11px] md:text-sm font-medium text-[#f1ede1cc] mb-8 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#f1ede1]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <TransitionLink to="/proyectos" className="inline-flex items-center min-h-[44px] opacity-50 hover:opacity-80 transition-opacity">PROYECTOS</TransitionLink>
              <span className="opacity-30">/</span>
              <span className="uppercase">{project.category}</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff] mb-6"
              style={{
                fontSize: "var(--font-cta)",
                lineHeight: "var(--lh-cta)",
                fontWeight: 700,
              }}
            >
              {project.title}
            </h1>
          </motion.div>
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
                    className="w-full h-auto block md:cursor-auto cursor-pointer active:opacity-90 transition-opacity"
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
                <span className="text-[#f1ede120] text-9xl font-bold">
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
            className="fixed inset-0 z-50 flex items-center justify-center md:hidden"
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

            {/* Slider content */}
            <div
              className="relative w-full z-10 px-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={sliderIndex}
                  src={images[sliderIndex]}
                  alt={`${project.title} — imagen ${sliderIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {/* Counter */}
              <p className="text-center text-[#f1ede180] text-xs mt-3 font-geist tracking-widest">
                {sliderIndex + 1} / {images.length}
              </p>
            </div>

            {/* Close button */}
            <button
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-[#f1ede1] bg-[#ffffff10] rounded-full"
              onClick={closeSlider}
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Prev / Next */}
            {sliderIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#f1ede1] bg-[#ffffff10] rounded-full"
                onClick={prev}
                aria-label="Anterior"
              >
                ←
              </button>
            )}
            {sliderIndex < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#f1ede1] bg-[#ffffff10] rounded-full"
                onClick={next}
                aria-label="Siguiente"
              >
                →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details */}
      <section className="bg-light py-14 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left: Info + Work */}
            <div className="lg:col-span-2 space-y-14">
              {/* Info del Proyecto */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-medium text-[#141414aa] mb-4 uppercase tracking-widest font-geist">
                  Info del Proyecto
                </h2>
                <p className="text-xl text-[#141414] leading-relaxed">
                  {project.about ?? project.description}
                </p>
              </motion.div>

              {/* Qué hicimos */}
              {project.work && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-sm font-medium text-[#141414aa] mb-4 uppercase tracking-widest font-geist">
                    Qué hicimos
                  </h2>
                  <ul className="space-y-4">
                    {project.work.map((item, i) => (
                      <li key={i} className="flex gap-4 text-lg text-[#141414] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#141414] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right: Services + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-sm font-medium text-[#141414aa] mb-4 uppercase tracking-widest">
                Servicios
              </h2>
              <ul className="space-y-2 mb-8">
                {project.services.map((service) => (
                  <li key={service} className="text-lg text-[#141414]">
                    {service}
                  </li>
                ))}
              </ul>
              {project.url && (
                project.urlDisabled ? (
                  <span className="inline-flex items-center gap-3 bg-[#141414]/40 text-[#f1ede1]/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide cursor-not-allowed select-none">
                    Acceso privado
                    <span>🔒</span>
                  </span>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#141414] text-[#f1ede1] px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:bg-[#2a2a2a] transition-colors"
                  >
                    {project.category === "WebApp" ? "Ver webapp" : "Ver website"}
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </a>
                )
              )}
            </motion.div>
          </div>
        </div>
      </section>

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
            <h2 className="text-sm font-medium text-[#f1ede1aa] mb-6 tracking-widest font-geist">
              RESULTADOS
            </h2>
            <p
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: "1.2",
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
                className="border border-[#f1ede120] p-8 text-left md:text-center"
              >
                <p
                  className="font-bold text-[#ffffff] mb-2"
                  style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
                >
                  {result.value}
                </p>
                <p className="text-sm font-medium text-[#f1ede1aa] uppercase tracking-widest font-geist">
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
