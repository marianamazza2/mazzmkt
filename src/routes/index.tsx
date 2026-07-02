import { createFileRoute } from "@tanstack/react-router";
import { SEOHead } from "@/components/seo/SEOHead";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Intro } from "@/components/sections/intro";
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
        description="Digital Studio en Barcelona. Webs con código real, branding, web apps, automatización e IA. Proyectos a medida en días, no en meses."
        jsonLd={homeSchema}
      />
      <Hero />
      <Marquee />
      <HowWeWork />
      <AiAgents />
      <Intro />
      <Services />
      <Projects />
    </>
  );
}
