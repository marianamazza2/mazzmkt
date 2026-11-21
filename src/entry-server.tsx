import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { createAppRouter } from "./router";
import { projects } from "./data/projects";

// Rutas que se generan como HTML al compilar
export const routes = [
  "/",
  "/servicios",
  "/proyectos",
  ...projects.map((p) => `/proyectos/${p.slug}`),
  "/agentes-ia",
  "/auditor",
  "/sobre-mi",
  "/contacto",
  "/faqs",
  "/privacidad",
  "/aviso-legal",
  "/cookies",
  "/404",
];

export async function render(url: string) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [url] }));
  await router.load();

  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  );

  const h = helmetContext.helmet;
  const head = h
    ? [h.title, h.meta, h.link, h.script].map((part) => part.toString()).join("\n    ")
    : "";

  return { html, head };
}
