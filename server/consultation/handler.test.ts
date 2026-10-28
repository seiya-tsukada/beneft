import { describe, expect, it, vi } from 'vitest';
import type { MailMessage, MailSender } from '../mail/resend';
import { handleConsultation, MailConfig } from './handler';

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

    for (const input of [null, {}, noCompany, badEmail, newline]) {
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
