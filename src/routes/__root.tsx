import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { TransitionProvider } from "@/components/transition/transition-context";
import { PageTransition } from "@/components/transition/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageCTA } from "@/components/sections/page-cta";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { CookieBanner } from "@/components/ui/cookie-banner";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MAZZMKT",
  alternateName: "MazzMkt",
  url: "https://mazzmkt.com",
  logo: "https://mazzmkt.com/favicon.png",
  description: "Agencia de marketing digital. Diseñamos marcas que se entienden, se sienten y responden.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  areaServed: "ES",
  serviceType: [
    "Marketing Digital",
    "Desarrollo Web",
    "Branding Digital",
    "Growth Marketing",
    "Marketing con Inteligencia Artificial",
  ],
  sameAs: [
    "https://instagram.com/mazzmkt",
    "https://linkedin.com/company/mazzmkt",
  ],
};

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hidePageCTA = pathname === "/agentes-ia";

  return (
    <HelmetProvider>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <SmoothScroll>
        <TransitionProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          {!hidePageCTA && <PageCTA />}
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <PageTransition />
        </TransitionProvider>
      </SmoothScroll>
    </HelmetProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
