import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: 'src/frontend',
    publicDir: '/src/frontend/public',
    build: {
        outDir: '../../dist',
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Your backend server address
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
