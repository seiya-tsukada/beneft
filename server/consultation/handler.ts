// POST /api/consultation: validates the request and sends the two consultation emails.
// Kept free of any server framework so both Vercel (api/consultation.ts) and the Vite dev server can call it.
import type { MailSender } from '../mail/resend.js';
import { renderStaffNotification } from './templates/staffNotification.js';
import { renderUserConfirmation } from './templates/userConfirmation.js';
import type { ConsultationRequest, ConsultationResponse } from './types.js';

export interface MailConfig {
  // Sender shown to recipients; the domain must be verified in Resend
  from: string;
  // Where the sales-team notification goes
  staffTo: string;
  resendApiKey?: string;
}

export const getMailConfig = (env: Record<string, string | undefined> = process.env): MailConfig => ({
  from: env.MAIL_FROM || 'BeneFT <noreply@example.com>',
  staffTo: env.CONSULTATION_NOTIFY_TO || 'sales@example.com',
  resendApiKey: env.RESEND_API_KEY
});

export interface HandlerResult {
  status: number;
  body: ConsultationResponse;
}

const MAX_LENGTH = 200;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Single-line text: required, bounded, and no line breaks (they end up in subjects)
const isLine = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '' && value.length <= MAX_LENGTH && !/[\r\n]/.test(value);

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export const parseConsultationRequest = (input: unknown): ConsultationRequest | null => {
  if (!isRecord(input) || !isRecord(input.lead) || !isRecord(input.diagnosis)) return null;
  const { lead, diagnosis } = input;

  if (!isLine(lead.company) || !isLine(lead.name) || !isLine(lead.position)) return null;
  if (!isLine(lead.email) || !EMAIL_PATTERN.test(lead.email)) return null;
  if (!isLine(diagnosis.headline) || !isLine(diagnosis.planTitle) || !isLine(diagnosis.formattedSavings)) return null;
  if (typeof diagnosis.employeeCount !== 'number' || !Number.isFinite(diagnosis.employeeCount)) return null;
  if (!Array.isArray(diagnosis.answers) || diagnosis.answers.length > 10) return null;
  if (!diagnosis.answers.every((a) => isRecord(a) && isLine(a.question) && isLine(a.answer))) return null;

  return {
    lead: {
      company: lead.company.trim(),
      name: lead.name.trim(),
      email: lead.email.trim(),
      position: lead.position.trim()
    },
    diagnosis: {
      answers: diagnosis.answers.map((a) => ({ question: String(a.question).trim(), answer: String(a.answer).trim() })),
      headline: diagnosis.headline.trim(),
      planTitle: diagnosis.planTitle.trim(),
      employeeCount: diagnosis.employeeCount,
      formattedSavings: diagnosis.formattedSavings.trim()
    }
  };
};

export const handleConsultation = async (input: unknown, sender: MailSender, config: MailConfig): Promise<HandlerResult> => {
  const request = parseConsultationRequest(input);
  if (!request) {
    return { status: 400, body: { ok: false, error: 'invalid_request' } };
  }

  // The sales notice is the one that matters; fail the request if it cannot be sent
  try {
    const staff = renderStaffNotification(request);
    await sender.send({ from: config.from, to: config.staffTo, replyTo: request.lead.email, ...staff });
  } catch (err) {
    console.error('[consultation] failed to send the staff notification', err);
    return { status: 502, body: { ok: false, error: 'mail_failed' } };
  }

  // The auto-reply is best effort: the team already has the request
  try {
    const confirmation = renderUserConfirmation(request);
    await sender.send({ from: config.from, to: request.lead.email, ...confirmation });
  } catch (err) {
    console.error('[consultation] failed to send the confirmation to the applicant', err);
  }

  return { status: 200, body: { ok: true } };
};
