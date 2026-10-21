import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// AI Studio sets DISABLE_HMR=true to stop reloads and file watching while its agent edits files
const disableHmr = process.env.DISABLE_HMR === 'true';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: !disableHmr,
    watch: disableHmr ? null : {}
  }
});
