import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 4000,
    proxy: {
      '/login': 'http://localhost:5555',
      '/signup': 'http://localhost:5555',
      '/set_role': 'http://localhost:5555',
      // Add other backend endpoints as needed
    }
  },
})
