// Email delivery through Resend (https://resend.com).
// Without RESEND_API_KEY (local development only) messages are logged to the server console instead.
import { Resend } from 'resend';

export interface MailMessage {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailSender {
  send(message: MailMessage): Promise<{ id: string }>;
}

export const createResendSender = (apiKey: string): MailSender => {
  const resend = new Resend(apiKey);
  return {
    async send(message) {
      const { data, error } = await resend.emails.send({
        from: message.from,
        // Always a single recipient, passed as an array so the address is never split or reparsed
        to: [message.to],
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html
      });
      // Only the error name and message: never the API key or the recipient
      if (error || !data) throw new Error(`Resend: ${error?.name ?? 'unknown_error'}: ${error?.message ?? 'no data'}`);
      return { id: data.id };
    }
  };
};

// Prints the message instead of sending it, so `npm run dev` works without a Resend account
export const createConsoleSender = (): MailSender => ({
  async send(message) {
    const id = `console_${Date.now().toString(36)}`;
    console.info(
      `[mail:console] RESEND_API_KEY not set; not sent (${id})\n` +
        `  from: ${message.from}\n  to: ${message.to}\n  replyTo: ${message.replyTo ?? '-'}\n  subject: ${message.subject}\n` +
        message.text.replace(/^/gm, '  | ')
    );
    return { id };
  }
});

export const createMailSender = (apiKey: string | undefined): MailSender =>
  apiKey ? createResendSender(apiKey) : createConsoleSender();
