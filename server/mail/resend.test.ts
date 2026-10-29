import { beforeEach, describe, expect, it, vi } from 'vitest';

const send = vi.fn();
vi.mock('resend', () => ({ Resend: vi.fn(() => ({ emails: { send } })) }));

const { createResendSender } = await import('./resend');

const message = { from: 'BeneFT <info@example.com>', to: 'yamada@example.com', subject: 's', text: 't', html: '<p>h</p>' };

describe('createResendSender', () => {
  beforeEach(() => send.mockReset());

  it('sends one message to a single recipient', async () => {
    send.mockResolvedValue({ data: { id: 'email_1' }, error: null });
    await expect(createResendSender('re_test').send(message)).resolves.toEqual({ id: 'email_1' });
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ from: message.from, to: ['yamada@example.com'] }));
  });

  it('throws when Resend reports an error', async () => {
    send.mockResolvedValue({ data: null, error: { name: 'validation_error', message: 'bad from' } });
    await expect(createResendSender('re_test').send(message)).rejects.toThrow('validation_error');
  });
});
