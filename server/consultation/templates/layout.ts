// Shared pieces for the consultation email templates

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

export const SERVICE_NAME = 'BeneFT';
export const COMPANY_NAME = '株式会社アシタモハレ';

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Rows of label / value pairs; values are escaped here
export const renderTable = (rows: [string, string][]) => `
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
${rows
  .map(
    ([label, value]) => `  <tr>
    <th align="left" style="border:1px solid #e2e8f0;background:#f8fafc;width:35%;">${escapeHtml(label)}</th>
    <td style="border:1px solid #e2e8f0;">${escapeHtml(value)}</td>
  </tr>`
  )
  .join('\n')}
</table>`;

export const renderTextTable = (rows: [string, string][]) => rows.map(([label, value]) => `${label}：${value}`).join('\n');

// Wraps already-escaped body HTML in the common frame and footer
export const renderLayout = (bodyHtml: string) => `<!doctype html>
<html lang="ja">
<body style="margin:0;padding:24px;background:#f8fafc;font-family:'Hiragino Sans','Noto Sans JP',sans-serif;color:#1e293b;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;line-height:1.7;">
${bodyHtml}
<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px;">
<p style="font-size:12px;color:#64748b;margin:0;">${SERVICE_NAME} 福利厚生最適化診断ナビ<br>運営：${COMPANY_NAME}</p>
</div>
</body>
</html>`;

export const TEXT_FOOTER = `――――――――――――――――
${SERVICE_NAME} 福利厚生最適化診断ナビ
運営：${COMPANY_NAME}`;
