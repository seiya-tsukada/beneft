import { describe, expect, it, vi } from 'vitest';
import type { MailMessage, MailSender } from '../mail/resend';
import { checkRequestMeta, getMailConfig, handleConsultation, MailConfig, parseBody } from './handler';

const config: MailConfig = { from: 'BeneFT <noreply@example.com>', staffTo: 'sales@example.com' };

const validRequest = () => ({
  lead: { company: 'A社', name: '山田 太郎', email: 'yamada@example.com', position: 'その他' },
  diagnosis: {
    answers: [{ question: '現在の福利厚生の導入状況・課題は？', answer: '利用率が低い' }],
    headline: '利用率低迷の典型パターンです',
    planTitle: 'BeneFT フレックス',
    employeeCount: 100,
    formattedSavings: '約120万円'
  }
});

const recordingSender = () => {
  const sent: MailMessage[] = [];
  const sender: MailSender = { send: vi.fn(async (m: MailMessage) => (sent.push(m), { id: 'test' })) };
  return { sender, sent };
};

describe('handleConsultation', () => {
  it('sends the staff notice and the applicant confirmation', async () => {
    const { sender, sent } = recordingSender();
    const result = await handleConsultation(validRequest(), sender, config);

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(sent.map((m) => m.to)).toEqual(['sales@example.com', 'yamada@example.com']);
    expect(sent[0].replyTo).toBe('yamada@example.com');
    expect(sent[0].subject).toContain('A社 山田 太郎 様');
    expect(sent[1].text).toContain('約120万円');
  });

  it('rejects missing fields, bad emails and line breaks', async () => {
    const { sender } = recordingSender();
    const noCompany = validRequest();
    noCompany.lead.company = ' ';
    const badEmail = validRequest();
    badEmail.lead.email = 'not-an-email';
    const newline = validRequest();
    newline.lead.name = '山田\nBcc: x@example.com';
    const twoRecipients = validRequest();
    twoRecipients.lead.email = 'a@example.com,b@example.com';
    const unknownPosition = validRequest();
    unknownPosition.lead.position = '任意の文字列';
    const hugeCount = validRequest();
    hugeCount.diagnosis.employeeCount = 1e9;

    for (const input of [null, {}, noCompany, badEmail, newline, twoRecipients, unknownPosition, hugeCount]) {
      expect((await handleConsultation(input, sender, config)).status).toBe(400);
    }
    expect(sender.send).not.toHaveBeenCalled();
  });

  it('escapes user input in the HTML body', async () => {
    const { sender, sent } = recordingSender();
    const input = validRequest();
    input.lead.company = '<script>alert(1)</script>';
    await handleConsultation(input, sender, config);

    expect(sent[0].html).not.toContain('<script>');
    expect(sent[0].html).toContain('&lt;script&gt;');
  });

  it('fails when the staff notice cannot be sent, but not the confirmation', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failFirst: MailSender = { send: vi.fn().mockRejectedValueOnce(new Error('down')) };
    expect((await handleConsultation(validRequest(), failFirst, config)).status).toBe(502);

    const failSecond: MailSender = {
      send: vi.fn().mockResolvedValueOnce({ id: '1' }).mockRejectedValueOnce(new Error('down'))
    };
    expect((await handleConsultation(validRequest(), failSecond, config)).status).toBe(200);
    error.mockRestore();
  });
});

describe('getMailConfig', () => {
  it('sends the team notice to the sender address unless overridden', () => {
    const env = { RESEND_API_KEY: 're_test', MAIL_FROM: 'BeneFT <info@example.com>' };
    expect(getMailConfig(env)).toEqual({ from: 'BeneFT <info@example.com>', staffTo: 'info@example.com', resendApiKey: 're_test' });
    expect(getMailConfig({ ...env, CONSULTATION_NOTIFY_TO: 'sales@example.com' })?.staffTo).toBe('sales@example.com');
  });

  it('refuses missing or malformed settings', () => {
    expect(getMailConfig({ RESEND_API_KEY: 're_test' })).toBeNull();
    expect(getMailConfig({ RESEND_API_KEY: 're_test', MAIL_FROM: 'not-an-address' })).toBeNull();
    expect(getMailConfig({ RESEND_API_KEY: 're_test', MAIL_FROM: 'a@example.com', CONSULTATION_NOTIFY_TO: 'x' })).toBeNull();
    // On Vercel the API key is required, so requests are never silently logged instead of sent
    expect(getMailConfig({ VERCEL: '1', MAIL_FROM: 'a@example.com' })).toBeNull();
  });

  it('falls back to the console sender locally', () => {
    expect(getMailConfig({})).toEqual({ from: 'BeneFT <noreply@example.com>', staffTo: 'noreply@example.com', resendApiKey: undefined });
  });
});

describe('checkRequestMeta', () => {
  const ok = { method: 'POST', contentType: 'application/json', origin: 'https://beneft.example', host: 'beneft.example' };

  it('accepts a same-origin JSON POST', () => {
    expect(checkRequestMeta(ok)).toBeNull();
    expect(checkRequestMeta({ ...ok, origin: null })).toBeNull();
  });

  it('rejects other methods, content types, origins and large bodies', () => {
    expect(checkRequestMeta({ ...ok, method: 'GET' })?.status).toBe(405);
    expect(checkRequestMeta({ ...ok, contentType: 'text/plain' })?.status).toBe(415);
    expect(checkRequestMeta({ ...ok, origin: 'https://evil.example' })?.status).toBe(403);
    expect(checkRequestMeta({ ...ok, origin: 'null' })?.status).toBe(403);
    expect(checkRequestMeta({ ...ok, contentLength: '100000' })?.status).toBe(413);
  });
});

describe('parseBody', () => {
  it('parses JSON and rejects invalid or oversized bodies', () => {
    expect(parseBody('{"a":1}')).toEqual({ input: { a: 1 } });
    expect(parseBody('{')).toMatchObject({ status: 400 });
    expect(parseBody(`"${'x'.repeat(20000)}"`)).toMatchObject({ status: 413 });
  });
});
