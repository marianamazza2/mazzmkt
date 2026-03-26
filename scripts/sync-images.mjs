// Escanea public/images/projects/ y genera src/data/project-images.generated.ts
// Se ejecuta automáticamente con predev y prebuild.

import { readdirSync, writeFileSync } from "fs";
import { join, extname } from "path";

const projectsDir = "public/images/projects";
const outputFile = "src/data/project-images.generated.ts";
const IMAGE_EXTS = [".webp", ".jpg", ".jpeg", ".png", ".avif"];

const folders = readdirSync(projectsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const result = {};

for (const slug of folders) {
  const files = readdirSync(join(projectsDir, slug))
    .filter(
      (f) =>
        IMAGE_EXTS.includes(extname(f).toLowerCase()) && f !== "cover.webp"
    )
    .sort()
    .map((f) => `/images/projects/${slug}/${f}`);

  result[slug] = files;
}

const content = `// AUTO-GENERADO — no editar manualmente. Ejecutar: node scripts/sync-images.mjs
export const projectImages: Record<string, string[]> = ${JSON.stringify(result, null, 2)};
`;

writeFileSync(outputFile, content);
console.log("✓ project-images.generated.ts actualizado");
