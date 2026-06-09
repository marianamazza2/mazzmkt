# Plan: soporte multilenguaje ES / EN

## Lo que tenemos
- Vite + React 19 + TanStack Router
- Todo el texto esta hardcodeado en componentes y archivos de data (`projects.ts`, `services.ts`, `navigation.ts`)
- Rutas en español: `/sobre-mi`, `/servicios`, `/proyectos`, `/contacto`

---

## Paso a paso

**1. Instalar `react-i18next` + `i18next`**
El estandar de la industria para React. Dos paquetes, liviano, con soporte TypeScript excelente.

**2. Crear archivos de traduccion**
Dos JSONs: `src/locales/es.json` y `src/locales/en.json` con todas las claves de texto.
```
src/locales/
  es.json
  en.json
```

**3. Configurar i18next**
Un archivo `src/i18n.ts` que carga los JSONs, detecta el idioma guardado en `localStorage`, y define ES como fallback.

**4. Traducir los archivos de data**
`projects.ts`, `services.ts`, y `navigation.ts` tendran campos en ambos idiomas, o se moveran las strings a los JSONs.

**5. Reemplazar texto en todos los componentes**
Cada texto hardcodeado pasa a usar el hook `useTranslation()`:
```tsx
const { t } = useTranslation()
// antes: "Hola, soy Mariana"
// despues: {t("hero.title")}
```

**6. Selector de idioma en el Header**
Para solo 2 idiomas, lo mas moderno hoy no es un dropdown sino un **toggle simple**: `ES | EN` o un switch. Limpio, ocupa poco espacio, sin friction.

**7. Persistencia**
El idioma elegido se guarda en `localStorage` para que al volver al sitio se recuerde la preferencia.

---

## Lo que NO cambiaria (por simplicidad)
- Las **rutas** quedan igual en español (`/sobre-mi`, `/proyectos`, etc.) -- cambiarian solo los contenidos. Hacer rutas por idioma (`/en/about`, `/es/sobre-mi`) es mucho mas complejo y para un portfolio no aporta tanto SEO real.

---

## Volumen de trabajo estimado
- ~6-8 archivos de componentes a actualizar
- ~3 archivos de data
- ~2 archivos nuevos (config i18n + 2 JSONs de traducciones)
