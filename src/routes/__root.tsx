import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
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
  alternateName: ["MazzMkt", "MazzMkt | Soluciones digitales"],
  url: "https://www.mazzmkt.com",
  logo: "https://www.mazzmkt.com/favicon.png",
  description: "Soluciones digitales en Barcelona: diseño web, branding y desarrollo a medida. Diseñamos marcas y webs con código propio, y automatizamos procesos con IA.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  areaServed: {
    "@type": "City",
    name: "Barcelona",
  },
  serviceType: [
    "Diseño y desarrollo web a medida",
    "Landing pages",
    "Branding e identidad de marca",
    "Gestión de Google Ads y Meta Ads",
    "Aplicaciones web a medida",
    "Automatización de procesos",
    "Recepcionista IA",
  ],
  sameAs: [
    "https://instagram.com/mazzmkt",
    "https://linkedin.com/company/mazzmkt",
    // Ficha de Google (Perfil de Empresa)
    "https://www.google.com/maps?cid=12119492444743001724",
  ],
};

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hidePageCTA = pathname === "/agentes-ia" || pathname === "/auditor";

  return (
    <>
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
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
