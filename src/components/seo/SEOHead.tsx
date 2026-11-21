import { Helmet } from "react-helmet-async";
import { useRouterState } from "@tanstack/react-router";

const SITE_URL = "https://www.mazzmkt.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.webp`;

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({ title, description, image, noindex, jsonLd }: SEOHeadProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Siempre con www y sin parámetros ni barra final, igual en el servidor y en el navegador
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="MAZZMKT" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
