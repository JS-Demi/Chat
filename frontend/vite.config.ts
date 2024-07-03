import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            app: '/src/app',
            pages: '/src/pages',
            features: '/src/features',
            widgets: '/src/widgets',
            entities: '/src/entities',
            shared: '/src/shared',
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
        // rollupOptions: {
        //     output: {
        //         manualChunks(id) {
        //             if (id.includes('node_modules')) {
        //                 return id
        //                     .toString()
        //                     .split('node_modules/')[1]
        //                     .split('/')[0]
        //                     .toString()
        //             }
        //         },
        //     },
        // },
    },
    server: {
        port: 3001,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:5001/',
                changeOrigin: true,
                secure: false,
            },
            '/socket.io/': {
                target: 'http://localhost:5001/',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
})
