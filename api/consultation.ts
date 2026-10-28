// Vercel Function for POST /api/consultation. The logic lives in server/consultation/handler.ts.
import { getMailConfig, handleConsultation } from '../server/consultation/handler.js';
import { createResendSender } from '../server/mail/resend.js';

export async function POST(request: Request): Promise<Response> {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const config = getMailConfig();
  const { status, body } = await handleConsultation(input, createResendSender(config.resendApiKey), config);
  return Response.json(body, { status });
}
