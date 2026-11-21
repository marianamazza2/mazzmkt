// Genera un HTML por ruta a partir del build de cliente (dist) y el de servidor (dist-ssr).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, routes } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

// Shell vacío para las rutas que no se prerenderizan (se montan en el navegador)
writeFileSync(join(dist, "_shell.html"), template);

// Sin el título y la descripción genéricos: cada página trae los suyos
const base = template
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta name="description"[^>]*>/, "");

for (const route of routes) {
  const rendered = await render(route);
  // React añade al principio las precargas de imágenes; van en <head>, no dentro de #root,
  // o la hidratación no coincide con el HTML.
  const preloads = rendered.html.match(/^(<link [^>]*\/>)+/)?.[0] ?? "";
  const html = rendered.html.slice(preloads.length);
  const head = [rendered.head, preloads].filter(Boolean).join("\n    ");
  const page = base
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = route === "/" ? join(dist, "index.html") : join(dist, `${route.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`prerender ${route} → ${file.replace(dist, "dist")}`);
}

rmSync(ssrDir, { recursive: true, force: true });
