// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'ChatBar',
//         short_name: 'ChatBar',
//         description: 'Chat interativo por QR Code em bares e restaurantes!',
//         theme_color: '#111827',
//         background_color: '#111827',
//         display: 'standalone',
//         start_url: '/',
//         icons: [
//           {
//             src: '/pwa-icon-192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: '/pwa-icon-512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'firebase-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60 * 24, // 1 dia
//               },
//               networkTimeoutSeconds: 10,
//             }
//           }
//         ]
//       }
//     })
//   ]
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'ChatBar',
        short_name: 'ChatBar',
        description: 'Chat interativo por QR Code em bares e restaurantes!',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true, // permite acesso pela rede local
    port: 5173  // ou outra porta se preferir
  }
});
