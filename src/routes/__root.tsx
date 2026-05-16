import { createRootRoute, Outlet } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { TransitionProvider } from "@/components/transition/transition-context";
import { PageTransition } from "@/components/transition/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageCTA } from "@/components/sections/page-cta";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export const Route = createRootRoute({
  component: () => (
    <HelmetProvider>
      <SmoothScroll>
        <TransitionProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <PageCTA />
          <Footer />
          <WhatsAppButton />
          <PageTransition />
        </TransitionProvider>
      </SmoothScroll>
    </HelmetProvider>
  ),
});
