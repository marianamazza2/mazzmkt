import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import { projectImagesPlugin } from './src/plugins/vite-plugin-project-images'
import { webpPlugin } from './src/plugins/vite-plugin-webp'

// En local, /api/auditor ejecuta la misma función que Vercel (api/auditor.ts)
function apiAuditorDev(): Plugin {
  return {
    name: 'api-auditor-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/auditor', async (req, res) => {
        const { GET } = await server.ssrLoadModule('/api/auditor.ts')
        const response: Response = await GET(new Request(`http://localhost${req.originalUrl}`, { headers: { 'x-forwarded-for': '127.0.0.1' } }))
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

export default defineConfig({
  plugins: [
    webpPlugin(),
    projectImagesPlugin(),
    TanStackRouterVite({ routesDirectory: './src/routes' }),
    react(),
    tailwindcss(),
    apiAuditorDev(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
