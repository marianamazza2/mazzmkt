declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const GA_ID = "G-HHGW5C4PSN";
const CLARITY_ID = "wtm7mpy3hg";

export function loadGA4() {
  if (document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // GA4 requires Arguments objects in dataLayer, not plain arrays
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

export function loadClarity() {
  if (document.getElementById("clarity-script")) return;

  window.clarity = window.clarity || function (...args) {
    (window.clarity.q = window.clarity.q || []).push(args);
  };

  const script = document.createElement("script");
  script.id = "clarity-script";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

export function loadAnalytics() {
  loadGA4();
  loadClarity();
}
