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
      <section id="proyectos" className="bg-dark pt-10 pb-7 md:pt-16 md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

    </>
  );
}
