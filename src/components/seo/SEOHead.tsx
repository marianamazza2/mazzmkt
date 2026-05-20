import { Helmet } from "react-helmet-async";

const SITE_URL = "https://mazzmkt.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
}

export function SEOHead({ title, description, image }: SEOHeadProps) {
  const canonical = typeof window !== "undefined" ? window.location.href : SITE_URL;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
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
    </Helmet>
  );
}
