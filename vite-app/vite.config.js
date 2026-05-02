import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-icon.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'ГИПЕР_ПРОТОКОЛ',
        short_name: 'ГИПЕР',
        description: 'Твоя жизнь. Сыграна. 84-дневная RPG-кампания по гипертрофии.',
        lang: 'ru',
        start_url: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0F0B1A',
        theme_color: '#0F0B1A',
        icons: [
          { src: './icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: './icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: './icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
