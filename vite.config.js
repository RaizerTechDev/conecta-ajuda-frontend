import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Força o Vite a verificar mudanças nos arquivos continuamente
    },
    host: true, // Permite que você acesse pelo IP da sua rede (celular, etc)
    port: 5173,
  }
})
