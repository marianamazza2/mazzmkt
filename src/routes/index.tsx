import { createFileRoute } from "@tanstack/react-router";
import { SEOHead } from "@/components/seo/SEOHead";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { AiAgents } from "@/components/sections/ai-agents";
import { Projects } from "@/components/sections/projects";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mazzmkt.com/#website",
  "url": "https://mazzmkt.com",
  "name": "MAZZMKT | Digital Studio Barcelona",
  "publisher": {
    "@type": "Organization",
    "name": "MAZZMKT",
    "url": "https://mazzmkt.com",
  },
};

function HomePage() {
  return (
    <>
      <SEOHead
        title="MAZZMKT | Digital Studio Barcelona"
        description="Digital Studio en Barcelona. Diseñamos webs, creamos marcas y automatizamos procesos con código real e IA. Soluciones digitales adaptadas a lo que tu negocio necesita."
        jsonLd={homeSchema}
      />
      <Hero />
      {/* 01 Lo que hacemos · 02 Proyectos · 03 Nuestro producto */}
      <Services />
      <Projects />
      <AiAgents />
    </>
  );
}
