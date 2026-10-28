// Notice to the sales team that a consultation request came in. Edit the wording here.
import type { ConsultationRequest } from '../types.js';
import { renderLayout, renderTable, renderTextTable, RenderedEmail, SERVICE_NAME, TEXT_FOOTER } from './layout.js';

export const renderStaffNotification = ({ lead, diagnosis }: ConsultationRequest): RenderedEmail => {
  const subject = `【${SERVICE_NAME}】無料相談の申し込み：${lead.company} ${lead.name} 様`;

  const leadRows: [string, string][] = [
    ['会社名', lead.company],
    ['お名前', lead.name],
    ['メールアドレス', lead.email],
    ['部署・役職', lead.position]
  ];
  const answerRows: [string, string][] = diagnosis.answers.map(({ question, answer }) => [question, answer]);
  const resultRows: [string, string][] = [
    ['診断結果', diagnosis.headline],
    ['おすすめのプラン', diagnosis.planTitle],
    ['従業員数（試算）', `${diagnosis.employeeCount.toLocaleString()} 名`],
    ['年間の削減見込み', diagnosis.formattedSavings]
  ];

  const text = `無料相談の申し込みがありました。2営業日以内に日程のご案内を送ってください。
（このメールに返信すると申込者宛てになります）

■ 申込者
${renderTextTable(leadRows)}

■ 診断の回答
${renderTextTable(answerRows)}

■ 診断結果
${renderTextTable(resultRows)}

${TEXT_FOOTER}`;

  const html = renderLayout(`
<p>無料相談の申し込みがありました。2営業日以内に日程のご案内を送ってください。<br>
<span style="font-size:12px;color:#64748b;">（このメールに返信すると申込者宛てになります）</span></p>
<h3 style="font-size:15px;margin:24px 0 8px;">申込者</h3>
${renderTable(leadRows)}
<h3 style="font-size:15px;margin:24px 0 8px;">診断の回答</h3>
${renderTable(answerRows)}
<h3 style="font-size:15px;margin:24px 0 8px;">診断結果</h3>
${renderTable(resultRows)}`);

  return { subject, text, html };
};
