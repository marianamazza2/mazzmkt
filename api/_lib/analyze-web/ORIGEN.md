# Origen de esta carpeta

Copia sin cambios del módulo `analyze-web` del repo `mazzmkt-leads` (agente A3).

- Repo: `~/Documents/mazzmkt/mazzmkt-leads`, rama `main`.
- Commit: `0f91d6c` (Add lead engine part 1: web analyzer, fixtures and prospects migration).
- Archivos: `src/analyze-web.ts`, `src/web/` y `src/sectores/`.
- Dependencias, con las mismas versiones: `parse5@8.1.0`, `undici@8.12.3` e `ipaddr.js@2.5.0`.

No se edita aquí. Las reglas se cambian y se prueban en `mazzmkt-leads`; después se vuelve a copiar la carpeta entera y se actualiza el commit de arriba:

```bash
L=~/Documents/mazzmkt/mazzmkt-leads
rm -rf api/_lib/analyze-web/web api/_lib/analyze-web/sectores
cp $L/src/analyze-web.ts api/_lib/analyze-web/
cp -R $L/src/web $L/src/sectores api/_lib/analyze-web/
```

La carpeta empieza por `_` para que Vercel no la publique como función.
