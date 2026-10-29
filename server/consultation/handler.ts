// POST /api/consultation: validates the request and sends the two consultation emails.
// Kept free of any server framework so both Vercel (api/consultation.ts) and the Vite dev server can call it.
import { EMPLOYEE_COUNT, POSITIONS } from '../../src/data/content.js';
import { createMailSender, MailSender } from '../mail/resend.js';
import { renderStaffNotification } from './templates/staffNotification.js';
import { renderUserConfirmation } from './templates/userConfirmation.js';
import type { ConsultationRequest, ConsultationResponse } from './types.js';

export interface MailConfig {
  // Sender shown to recipients, e.g. "BeneFT <info@example.com>"; the domain must be verified in Resend
  from: string;
  // Where the team notification goes; the sender's address unless CONSULTATION_NOTIFY_TO is set
  staffTo: string;
  // Unset only in local development, where emails are logged instead of sent
  resendApiKey?: string;
}

export interface HandlerResult {
  status: number;
  body: ConsultationResponse;
}

const MAX_LENGTH = 200;
const MAX_BODY_BYTES = 16 * 1024;
// Conservative on purpose: no quotes, commas, spaces or angle brackets, so one field is always one recipient
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const DEV_FROM = 'BeneFT <noreply@example.com>';

const isEmail = (value: string) => value.length <= 254 && EMAIL_PATTERN.test(value);

// "Name <addr@example.com>" or a bare address -> the address
const addressOf = (mailbox: string) => mailbox.match(/<([^<>]+)>\s*$/)?.[1].trim() ?? mailbox.trim();

// Returns null when a variable is missing or malformed, so the API refuses instead of sending from or to the wrong place
export const getMailConfig = (env: Record<string, string | undefined> = process.env): MailConfig | null => {
  const resendApiKey = env.RESEND_API_KEY?.trim() || undefined;
  // Deployed on Vercel (VERCEL=1): never fall back to the console logger and silently drop requests
  if (!resendApiKey && env.VERCEL) return null;

  const from = env.MAIL_FROM?.trim() || (resendApiKey ? '' : DEV_FROM);
  if (!from || /[\r\n]/.test(from) || !isEmail(addressOf(from))) return null;

  const staffTo = env.CONSULTATION_NOTIFY_TO?.trim() || addressOf(from);
  if (!isEmail(staffTo)) return null;

  return { from, staffTo, resendApiKey };
};

// Single-line text: required, bounded, and no control characters (line breaks would end up in subjects)
const isLine = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '' && value.length <= MAX_LENGTH && !/[\u0000-\u001f\u007f]/.test(value);

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export const parseConsultationRequest = (input: unknown): ConsultationRequest | null => {
  if (!isRecord(input) || !isRecord(input.lead) || !isRecord(input.diagnosis)) return null;
  const { lead, diagnosis } = input;

  if (!isLine(lead.company) || !isLine(lead.name)) return null;
  if (!isLine(lead.email) || !isEmail(lead.email.trim())) return null;
  if (typeof lead.position !== 'string' || !POSITIONS.includes(lead.position)) return null;
  if (!isLine(diagnosis.headline) || !isLine(diagnosis.planTitle) || !isLine(diagnosis.formattedSavings)) return null;
  const { employeeCount } = diagnosis;
  if (!Number.isInteger(employeeCount) || (employeeCount as number) < EMPLOYEE_COUNT.min || (employeeCount as number) > EMPLOYEE_COUNT.max) {
    return null;
  }
  if (!Array.isArray(diagnosis.answers) || diagnosis.answers.length > 10) return null;
  if (!diagnosis.answers.every((a) => isRecord(a) && isLine(a.question) && isLine(a.answer))) return null;

  return {
    lead: {
      company: lead.company.trim(),
      name: lead.name.trim(),
      email: lead.email.trim(),
      position: lead.position
    },
    diagnosis: {
      answers: diagnosis.answers.map((a) => ({ question: String(a.question).trim(), answer: String(a.answer).trim() })),
      headline: diagnosis.headline.trim(),
      planTitle: diagnosis.planTitle.trim(),
      employeeCount: employeeCount as number,
      formattedSavings: diagnosis.formattedSavings.trim()
    }
  };
};

export interface RequestMeta {
  method: string;
  contentType?: string | null;
  origin?: string | null;
  host?: string | null;
  contentLength?: string | null;
}

// Checks done before the body is read. Requiring JSON forces a CORS preflight, and the Origin check stops
// other sites from making visitors' browsers submit the form (and send mail to arbitrary addresses).
export const checkRequestMeta = ({ method, contentType, origin, host, contentLength }: RequestMeta): HandlerResult | null => {
  if (method !== 'POST') return { status: 405, body: { ok: false, error: 'method_not_allowed' } };
  if (!contentType?.toLowerCase().startsWith('application/json')) {
    return { status: 415, body: { ok: false, error: 'unsupported_media_type' } };
  }
  if (origin) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      // treated as a mismatch below
    }
    if (!host || originHost !== host) return { status: 403, body: { ok: false, error: 'forbidden' } };
  }
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { status: 413, body: { ok: false, error: 'payload_too_large' } };
  }
  return null;
};

// Parses the raw body with the same size limit, for runtimes that do not send Content-Length
export const parseBody = (raw: string): { input: unknown } | HandlerResult => {
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return { status: 413, body: { ok: false, error: 'payload_too_large' } };
  try {
    return { input: JSON.parse(raw) };
  } catch {
    return { status: 400, body: { ok: false, error: 'invalid_json' } };
  }
};

export const handleConsultation = async (input: unknown, sender: MailSender, config: MailConfig): Promise<HandlerResult> => {
  const request = parseConsultationRequest(input);
  if (!request) {
    return { status: 400, body: { ok: false, error: 'invalid_request' } };
  }

  // The team notice is the one that matters; fail the request if it cannot be sent
  try {
    const staff = renderStaffNotification(request);
    await sender.send({ from: config.from, to: config.staffTo, replyTo: request.lead.email, ...staff });
  } catch (err) {
    console.error('[consultation] failed to send the staff notification:', err instanceof Error ? err.message : err);
    return { status: 502, body: { ok: false, error: 'mail_failed' } };
  }

  // The auto-reply is best effort: the team already has the request
  try {
    const confirmation = renderUserConfirmation(request);
    await sender.send({ from: config.from, to: request.lead.email, ...confirmation });
  } catch (err) {
    console.error('[consultation] failed to send the confirmation to the applicant:', err instanceof Error ? err.message : err);
  }

  return { status: 200, body: { ok: true } };
};

// Entry point for both runtimes: reads the mail settings from the environment, then handles the parsed body
export const handleConsultationWithEnv = async (input: unknown, env: Record<string, string | undefined>): Promise<HandlerResult> => {
  const config = getMailConfig(env);
  if (!config) {
    console.error('[consultation] mail is not configured: check RESEND_API_KEY, MAIL_FROM and CONSULTATION_NOTIFY_TO');
    return { status: 500, body: { ok: false, error: 'mail_not_configured' } };
  }
  return handleConsultation(input, createMailSender(config.resendApiKey), config);
};
