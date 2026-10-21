import { readdirSync, rmSync, statSync } from "fs";
import { join, extname } from "path";
import sharp from "sharp";
import type { Plugin, ViteDevServer } from "vite";

const SOURCE_EXTS = [".jpg", ".jpeg", ".png", ".tif", ".tiff", ".avif"];
const MAX_WIDTH = 2400;
const QUALITY = 80;

function isSource(file: string) {
  return SOURCE_EXTS.includes(extname(file).toLowerCase());
}

function findSources(dir: string): string[] {
  const result: string[] = [];
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) result.push(...findSources(full));
      else if (isSource(entry.name)) result.push(full);
    }
  } catch {
    // carpeta no existe aún
  }
  return result;
}

// Espera a que el archivo termine de copiarse (tamaño estable)
async function waitForStableFile(file: string) {
  let last = -1;
  for (let i = 0; i < 20; i++) {
    const size = statSync(file).size;
    if (size > 0 && size === last) return;
    last = size;
    await new Promise((r) => setTimeout(r, 250));
  }
}

async function convertToWebp(file: string) {
  const out = file.slice(0, -extname(file).length) + ".webp";
  const before = statSync(file).size;
  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  rmSync(file, { force: true });
  const after = statSync(out).size;
  const kb = (n: number) => `${Math.round(n / 1024)}KB`;
  console.log(`[webp] ${file} → ${out} (${kb(before)} → ${kb(after)})`);
}

export async function optimizeImages(dir: string) {
  for (const file of findSources(dir)) {
    try {
      await convertToWebp(file);
    } catch (err) {
      console.error(`[webp] Error convirtiendo ${file}:`, err);
    }
  }
}

export function webpPlugin(): Plugin {
  const imagesDir = "public/images";

  return {
    name: "vite-plugin-webp",

    async buildStart() {
      await optimizeImages(imagesDir);
    },

    configureServer(server: ViteDevServer) {
      server.watcher.add(imagesDir);
      server.watcher.on("add", async (file) => {
        if (!file.includes("public/images") || !isSource(file)) return;
        try {
          await waitForStableFile(file);
          await convertToWebp(file);
        } catch (err) {
          console.error(`[webp] Error convirtiendo ${file}:`, err);
        }
      });
    },
  };
}
