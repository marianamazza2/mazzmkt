import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import { projectImagesPlugin } from './src/plugins/vite-plugin-project-images'
import { webpPlugin } from './src/plugins/vite-plugin-webp'

export default defineConfig({
  plugins: [
    webpPlugin(),
    projectImagesPlugin(),
    TanStackRouterVite({ routesDirectory: './src/routes' }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
