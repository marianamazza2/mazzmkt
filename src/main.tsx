import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { createAppRouter } from "./router";
import "./styles/globals.css";

const router = createAppRouter();
const rootElement = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);

// Las páginas prerenderizadas ya traen el HTML: se carga la ruta y se hidrata.
// Las rutas sin HTML previo (fallback) se montan desde cero.
if (rootElement.hasChildNodes()) {
  // Con `ssr` marcado, el router pinta el mismo árbol que en el prerender
  // (sin el Suspense de cliente) y no repite la carga al montar.
  router.ssr = { manifest: undefined };
  router.load().then(() => ReactDOM.hydrateRoot(rootElement, app));
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
