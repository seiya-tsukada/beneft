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
      if (req.method !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });

      let input: unknown;
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        return reply(400, { ok: false, error: 'invalid_json' });
      }

      // Loaded per request so edits to the handler and templates apply without a restart
      const { getMailConfig, handleConsultation } = await server.ssrLoadModule('/server/consultation/handler.ts');
      const { createResendSender } = await server.ssrLoadModule('/server/mail/resend.ts');
      const config = getMailConfig({ ...process.env, ...loadEnv(server.config.mode, process.cwd(), '') });
      const { status, body } = await handleConsultation(input, createResendSender(config.resendApiKey), config);
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
