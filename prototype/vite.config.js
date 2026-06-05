import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'fonts/*.woff2'],
      manifest: {
        name: 'AXEL',
        short_name: 'AXEL',
        description: 'Free offline-first maths for SA children',
        theme_color: '#1A6BB5',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2}'],
      },
    }),
  ],
});
