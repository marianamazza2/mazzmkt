import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/seo/SEOHead";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Intro } from "@/components/sections/intro";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mazzmkt.com/#website",
  "url": "https://mazzmkt.com",
  "name": "MAZZMKT | Estrategia & Creatividad",
  "publisher": {
    "@type": "Organization",
    "name": "MAZZMKT",
    "url": "https://mazzmkt.com",
  },
};

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <SEOHead
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        jsonLd={homeSchema}
      />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <Projects />
    </>
  );
}
