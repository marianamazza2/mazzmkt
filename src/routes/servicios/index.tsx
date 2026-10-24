import { useState } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { MarkedText } from "@/components/ui/underline-mark";
import { TransitionLink } from "@/components/transition/transition-link";
import { ProductSpotlight } from "@/components/product/product-spotlight";
import { serviceGroups } from "@/data/services";
import type { ServiceGroup } from "@/types";

export const Route = createFileRoute("/servicios/")({
  component: ServiciosPage,
});

// Catálogo completo, contado como el recorrido del cliente: marca → web → automatización.
// Cada área es un acordeón: se ve la cabecera (etiqueta y verbo) y, al abrirla, su introducción y sus cards.
function ServiciosPage() {
  const { hash } = useLocation();
  const [open, setOpen] = useState<Set<ServiceGroup["id"]>>(
    () => new Set(serviceGroups.filter((g) => g.id === hash).map((g) => g.id))
  );

  // Si se llega con un ancla (#programamos, desde la home o el hero), ese bloque se abre
  const [lastHash, setLastHash] = useState(hash);
  if (hash !== lastHash) {
    setLastHash(hash);
    const group = serviceGroups.find((g) => g.id === hash);
    if (group && !open.has(group.id)) setOpen(new Set(open).add(group.id));
  }

  const toggle = (id: ServiceGroup["id"]) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <SEOHead
        title="Servicios | MAZZMKT"
        description="Branding, webs, web apps, e-commerce, automatización e IA. Diseñamos, programamos y automatizamos tu negocio digital con código real."
      />

      <PageHero
        crumbs={[{ label: "Servicios" }]}
        title="Lo que hacemos"
        subtitle={
          <>
            Diseñamos, programamos y automatizamos tu negocio digital. Te acompañamos de punta a punta:{" "}
            <br className="hidden md:inline" />
            desde crear tu marca hasta automatizar tus procesos, todo a medida, con código real e inteligencia artificial.
          </>
        }
        actions={
          <nav aria-label="Áreas de servicio" className="flex flex-wrap gap-x-8 gap-y-3">
            {serviceGroups.map((group, i) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                onClick={() => setOpen((prev) => new Set(prev).add(group.id))}
                className="inline-flex items-center gap-2 font-mono text-[13px] font-medium uppercase text-light/60 transition-colors hover:text-light"
                style={{ letterSpacing: "0.13em" }}
              >
                <span>{String(i + 1).padStart(2, "0")} /</span>
                {group.verb}
              </a>
            ))}
          </nav>
        }
      />

      <div className="bg-dark pb-10 md:pb-16">
        <div className="container mx-auto px-5 md:px-6">
          {serviceGroups.map((group, i) => {
            const isOpen = open.has(group.id);
            const panelId = `${group.id}-servicios`;

            return (
              <section key={group.id} id={group.id} className="scroll-mt-20 border-t border-light/13 first:border-t-0 last:border-b">
                {/* Abierto, la cabecera recoge su margen inferior para que la introducción quede pegada al verbo
                    (sin márgenes negativos: el panel recorta lo que sobresale) */}
                <div
                  onClick={() => toggle(group.id)}
                  className={`group flex cursor-pointer items-start justify-between gap-6 pt-10 md:pt-16 transition-[padding] duration-300 ${
                    isOpen ? "pb-6" : "pb-10 md:pb-16"
                  }`}
                >
                  <SectionHeading
                    number={String(i + 1).padStart(2, "0")}
                    label={group.title}
                    title={group.verb}
                    className="flex-1"
                    brightLabel
                  />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${isOpen ? "Cerrar" : "Ver"} servicios de ${group.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(group.id);
                    }}
                    className={`mt-8 md:mt-14 flex h-11 w-11 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-light bg-light text-dark"
                        : "border-light/30 text-light group-hover:border-light"
                    }`}
                  >
                    {/* Mismo círculo que las filas de la home; la flecha mira abajo (abrir) o arriba (cerrar) */}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pb-16">
                        <div className="mb-8 md:mb-12">
                          <MarkedText text={group.intro} className="text-body text-[#a1a1a1]" />
                        </div>
                        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {group.items.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} />
                          ))}
                        </div>
                        <div className="mt-8 flex justify-start md:mt-10 md:justify-end">
                          <TransitionLink
                            to="/contacto"
                            search={{ service: group.title }}
                            className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-4 md:px-8 py-[15px] font-mono text-[13px] font-semibold uppercase text-light transition-colors hover:border-light"
                            style={{ letterSpacing: "0.09em" }}
                          >
                            HABLEMOS DE TU PROYECTO
                            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                          </TransitionLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}

          {/* Nuestro producto, siempre visible y aparte de los servicios a medida */}
          <div className="mt-10 md:mt-16">
            <ProductSpotlight detailed wide />
          </div>
        </div>
      </div>
    </>
  );
}
