import { createFileRoute } from "@tanstack/react-router";
import { SEOHead } from "@/components/seo/SEOHead";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Intro } from "@/components/sections/intro";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { PageCTA } from "@/components/sections/page-cta";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <SEOHead
        title="MAZZMKT | Estrategia & Creatividad"
        description="Agencia de marketing digital. Diseñamos marcas que se entienden, se sienten y responden. Estrategia, creatividad e inteligencia artificial."
      />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <Projects />
      <PageCTA />
    </>
  );
}
