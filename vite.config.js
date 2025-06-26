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
            type: 'image/png',
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0', // ou '0.0.0.0' para acesso externo
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: ['.ngrok-free.app', 'localhost', '127.0.0.1'],
  },
});




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
//       }
//     })
//   ],
//   server: {
//     host:'0.0.0.0', // permite acesso pela rede local
//     port: 5173,  // ou outra porta se preferir
//     strictPort: true, // garante que a porta será sempre 5173
//   cors: true // garante que requisições externas não sejam bloqueadas
//   }
// });
