import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, Plugin } from 'vite';

// AI Studio sets DISABLE_HMR=true to stop reloads and file watching while its agent edits files
const disableHmr = process.env.DISABLE_HMR === 'true';

// Serves POST /api/consultation during `npm run dev`; on Vercel, api/consultation.ts handles it instead
const consultationApi = (): Plugin => ({
  name: 'consultation-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/consultation', async (req, res) => {
      const reply = (status: number, body: unknown) => {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      };
      // Loaded per request so edits to the handler and templates apply without a restart
      const handler = await server.ssrLoadModule('/server/consultation/handler.ts');
      const header = (name: string) => [req.headers[name]].flat()[0] ?? null;
      const rejected = handler.checkRequestMeta({
        method: req.method,
        contentType: header('content-type'),
        origin: header('origin'),
        host: header('host'),
        contentLength: header('content-length')
      });
      if (rejected) return reply(rejected.status, rejected.body);

      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const parsed = handler.parseBody(Buffer.concat(chunks).toString('utf8'));
      if (!('input' in parsed)) return reply(parsed.status, parsed.body);

      const env = { ...process.env, ...loadEnv(server.config.mode, process.cwd(), '') };
      const { status, body } = await handler.handleConsultationWithEnv(parsed.input, env);
      reply(status, body);
    });
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), consultationApi()],
  server: {
    hmr: !disableHmr,
    watch: disableHmr ? null : {}
  }
});
