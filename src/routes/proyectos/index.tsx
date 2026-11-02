import { createFileRoute } from "@tanstack/react-router";
import { SEOHead } from "@/components/seo/SEOHead";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";

export const Route = createFileRoute("/proyectos/")({
  component: ProyectosPage,
});

function ProyectosPage() {
  return (
    <>
      <SEOHead
        title="Proyectos | MAZZMKT"
        description="Webs, marcas, web apps y automatizaciones creadas desde cero con código real e IA. Proyectos reales con tiempos de entrega en días."
      />

      <PageHero
        heading="crumbs"
        crumbs={[{ label: "Proyectos" }]}
        title={<>Nuestro<br />trabajo</>}
        subtitle="Cada proyecto es una historia de transformación digital. Diseño, tecnología de vanguardia y resultados."
      />

      {/* Projects Section */}
      {/* El titular de esta página ocupa una línea más que el de /servicios: restamos esa línea al espacio
          superior para que los filtros empiecen a la misma altura que "01 / Marca y contenido" */}
      <section id="proyectos" className="bg-dark pt-10 pb-7 md:pt-[max(16px,calc(150px-0.92*var(--font-display)))] md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

    </>
  );
}
