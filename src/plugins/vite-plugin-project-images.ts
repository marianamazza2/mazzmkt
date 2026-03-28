import { readdirSync } from "fs";
import { join, extname } from "path";
import type { Plugin, ViteDevServer } from "vite";

const IMAGE_EXTS = [".webp", ".jpg", ".jpeg", ".png", ".avif"];
const VIRTUAL_ID = "virtual:project-images";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

function buildImageMap(projectsDir: string): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  try {
    const folders = readdirSync(projectsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of folders) {
      const files = readdirSync(join(projectsDir, slug))
        .filter(
          (f) =>
            IMAGE_EXTS.includes(extname(f).toLowerCase()) &&
            f !== "cover.webp"
        )
        .sort()
        .map((f) => `/images/projects/${slug}/${f}`);
      result[slug] = files;
    }
  } catch {
    // carpeta no existe aún
  }
  return result;
}

export function projectImagesPlugin(): Plugin {
  const projectsDir = "public/images/projects";

  return {
    name: "vite-plugin-project-images",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id !== RESOLVED_ID) return;
      const map = buildImageMap(projectsDir);
      return `export const projectImages = ${JSON.stringify(map)};`;
    },

    configureServer(server: ViteDevServer) {
      server.watcher.add(projectsDir);
      server.watcher.on("all", (_event, file) => {
        if (!file.includes("images/projects")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
