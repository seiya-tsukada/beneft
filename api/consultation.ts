// Vercel Function for POST /api/consultation. The logic lives in server/consultation/handler.ts.
import { checkRequestMeta, handleConsultationWithEnv, HandlerResult, parseBody } from '../server/consultation/handler.js';

const reply = ({ status, body }: HandlerResult) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request): Promise<Response> {
  const rejected = checkRequestMeta({
    method: request.method,
    contentType: request.headers.get('content-type'),
    origin: request.headers.get('origin'),
    host: request.headers.get('host'),
    contentLength: request.headers.get('content-length')
  });
  if (rejected) return reply(rejected);

  const parsed = parseBody(await request.text());
  if (!('input' in parsed)) return reply(parsed);

  return reply(await handleConsultationWithEnv(parsed.input, process.env));
}
