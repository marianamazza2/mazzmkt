# Chatbot IA — Plan de Implementacion

## Concepto

Reemplazar el `WhatsAppButton` actual por un widget de chat flotante alimentado por Claude API. El chatbot responde preguntas usando las FAQs, servicios y tono de marca de MAZZMKT. Cuando no puede resolver → CTA directo a WhatsApp.

**Por que:** La agencia vende AI y desarrollo con IA — tener un chatbot propio es la demo en vivo de la propuesta de valor.

---

## Arquitectura

```
Usuario → ChatWidget (React) → /api/chat (serverless) → Claude API
                                                              ↓
                                                    System prompt con:
                                                    - 14 FAQs
                                                    - Servicios
                                                    - Tono MAZZMKT
                                                    - Fallback a WhatsApp
```

---

## Archivos a crear / modificar

| Archivo | Accion | Descripcion |
|---|---|---|
| `api/chat.ts` | Crear | Endpoint serverless (Vercel/Netlify) |
| `src/components/ui/chat-widget.tsx` | Crear | Widget flotante completo |
| `src/routes/__root.tsx` | Modificar | Reemplazar `<WhatsAppButton />` por `<ChatWidget />` |
| `src/components/ui/whatsapp-button.tsx` | Eliminar | Ya no se usa como standalone |

---

## Paso 1 — Elegir hosting

El endpoint `/api/chat` funciona diferente segun donde este desplegada la web:

- **Vercel** → crear `api/chat.ts` en la raiz del proyecto
- **Netlify** → crear `netlify/functions/chat.ts`
- **Otro** → definir alternativa

**Pendiente: confirmar hosting antes de implementar.**

---

## Paso 2 — Obtener API Key de Claude

1. Ir a [console.anthropic.com](https://console.anthropic.com)
2. Crear API Key
3. Agregar como variable de entorno: `ANTHROPIC_API_KEY`
4. En Vercel: Settings → Environment Variables
5. En Netlify: Site Settings → Environment Variables

---

## Paso 3 — Endpoint `/api/chat`

```typescript
// api/chat.ts (Vercel)
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sos el asistente de MAZZMKT, una agencia de diseño web, branding y marketing digital basada en Barcelona.

Tu rol: responder preguntas de potenciales clientes de forma directa, sin rodeos y con el tono de la agencia (honesto, claro, sin vender humo).

SERVICIOS:
- Diseño y Desarrollo Web (codigo a medida: Next.js, React, TypeScript, Tailwind)
- Branding completo (logo, identidad visual, guidelines)
- Publicidad digital (Meta Ads, Google Ads, TikTok Ads)
- SEO tecnico y de contenido
- Gestion de Redes Sociales
- Estrategia con IA

FAQS CLAVE:
[insertar las 14 FAQs de src/routes/faqs.tsx]

REGLAS:
- Responde en español, tuteando al usuario
- Maximo 3 oraciones por respuesta
- Si preguntan precio exacto o algo muy especifico → invita a agendar una llamada o contactar por WhatsApp
- Si no sabes la respuesta → decilo y deriva a WhatsApp
- No inventes servicios ni precios que no esten en el contexto

CONTACTO (usar como fallback):
- WhatsApp: +34 123 456 789 (actualizar con numero real)
- Email: hola@mazzmkt.com
`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001", // rapido y barato para chat
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages,
  });

  res.json({ content: response.content[0].text });
}
```

---

## Paso 4 — ChatWidget UI

Estilo: consistente con la estetica del site (dark `#141414` / light `#f1ede1`, sin border-radius exagerado, tipografia DM Sans).

**Comportamiento:**
- Boton flotante `bottom-6 right-6 z-50` (mismo lugar que WhatsApp actual)
- Click → abre panel de chat (300px ancho, animado con Framer Motion)
- Header del panel con nombre + badge "IA"
- Area de mensajes con scroll
- Input + boton enviar
- Primer mensaje automatico: "Hola! Soy el asistente de MAZZMKT. ¿En que te puedo ayudar?"
- Cuando el bot deriva a WhatsApp → boton inline que abre wa.me

**Dependencias necesarias:**
```bash
npm install @anthropic-ai/sdk
```

---

## Paso 5 — Variables de entorno

```env
# .env.local (no commitear)
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Notas

- Modelo recomendado: `claude-haiku-4-5-20251001` — rapido, barato, suficiente para FAQ chat
- Costo estimado: ~$0.001 por conversacion (muy bajo)
- El numero de WhatsApp en `whatsapp-button.tsx` es placeholder: `5491112345678` — actualizar con el real antes de lanzar
- Considerar rate limiting en el endpoint para evitar abuso
