import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['cookie-icon.svg'],

      manifest: {
        name: 'Cookie Tin Puzzle',
        short_name: 'Cookie Tin',

        description: '絵本のようなクッキー缶パズル',

        theme_color: '#f7edda',
        background_color: '#f7edda',

        display: 'standalone',
        start_url: '/',

        icons: [
          {
            src: '/cookie-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
