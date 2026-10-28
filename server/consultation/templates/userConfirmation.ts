// Auto-reply to the person who applied. Edit the wording here.
import type { ConsultationRequest } from '../types.js';
import { escapeHtml, renderLayout, renderTable, renderTextTable, RenderedEmail, SERVICE_NAME, TEXT_FOOTER } from './layout.js';

export const renderUserConfirmation = ({ lead, diagnosis }: ConsultationRequest): RenderedEmail => {
  const subject = `【${SERVICE_NAME}】無料相談のお申し込みを受け付けました`;

  const applicationRows: [string, string][] = [
    ['会社名', lead.company],
    ['お名前', lead.name],
    ['メールアドレス', lead.email],
    ['部署・役職', lead.position]
  ];
  const diagnosisRows: [string, string][] = [
    ['診断結果', diagnosis.headline],
    ['おすすめのプラン', diagnosis.planTitle],
    ['年間の削減見込み', `${diagnosis.formattedSavings}（従業員 ${diagnosis.employeeCount.toLocaleString()} 名で試算）`]
  ];

  const text = `${lead.company}
${lead.name} 様

この度は「${SERVICE_NAME}」の無料相談にお申し込みいただき、誠にありがとうございます。
以下の内容で受け付けいたしました。

■ お申し込み内容
${renderTextTable(applicationRows)}

■ 診断結果のサマリー
${renderTextTable(diagnosisRows)}

担当コンサルタントより、2営業日以内に相談日程のご案内をお送りいたします。
今しばらくお待ちください。

※本メールは送信専用アドレスからお送りしています。
※お心当たりのない場合は、お手数ですが本メールを破棄してください。

${TEXT_FOOTER}`;

  const html = renderLayout(`
<p>${escapeHtml(lead.company)}<br>${escapeHtml(lead.name)} 様</p>
<p>この度は「${SERVICE_NAME}」の無料相談にお申し込みいただき、誠にありがとうございます。<br>以下の内容で受け付けいたしました。</p>
<h3 style="font-size:15px;margin:24px 0 8px;">お申し込み内容</h3>
${renderTable(applicationRows)}
<h3 style="font-size:15px;margin:24px 0 8px;">診断結果のサマリー</h3>
${renderTable(diagnosisRows)}
<p style="margin-top:24px;">担当コンサルタントより、2営業日以内に相談日程のご案内をお送りいたします。<br>今しばらくお待ちください。</p>
<p style="font-size:12px;color:#64748b;">※本メールは送信専用アドレスからお送りしています。<br>※お心当たりのない場合は、お手数ですが本メールを破棄してください。</p>`);

  return { subject, text, html };
};
