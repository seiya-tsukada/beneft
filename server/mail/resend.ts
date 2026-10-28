// Email delivery through Resend (https://resend.com).
// STUB: nothing is sent yet; messages are only logged to the server console.

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

// TODO: replace the stub once Resend is set up:
//   1. npm install resend
//   2. set RESEND_API_KEY and verify the sending domain of MAIL_FROM in Resend
//   3. implement send() as:
//        const resend = new Resend(apiKey);
//        const { data, error } = await resend.emails.send({
//          from: message.from, to: message.to, replyTo: message.replyTo,
//          subject: message.subject, text: message.text, html: message.html
//        });
//        if (error) throw new Error(error.message);
//        return { id: data.id };
export const createResendSender = (apiKey: string | undefined): MailSender => ({
  async send(message) {
    const id = `stub_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    console.info(
      `[mail:stub] ${apiKey ? 'RESEND_API_KEY is set but sending is stubbed' : 'RESEND_API_KEY not set'}; would send ${id}\n` +
        `  from: ${message.from}\n  to: ${message.to}\n  replyTo: ${message.replyTo ?? '-'}\n  subject: ${message.subject}\n` +
        message.text.replace(/^/gm, '  | ')
    );
    return { id };
  }
});
