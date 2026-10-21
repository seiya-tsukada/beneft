import React, { useState } from 'react';
import { DiagnosisReport, SimulationResult, LeadFormData } from '../types';

interface ResultScreenProps {
  report: DiagnosisReport;
  simulation: SimulationResult;
  employeeCount: number;
  onEmployeeCountChange: (count: number) => void;
  onRestartQuiz: () => void;
  onSubmitLead: (data: LeadFormData) => void;
  onOpenPrivacy: () => void;
  isSubmitting: boolean;
}

// Icons from the report carry colors tuned for the old dark cards; strip them so one accent color applies
const stripColor = (icon: string) => icon.replace(/\btext-\S+/g, '').trim();

const inputClass =
  'w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition';

const RequiredTag = () => (
  <span className="ml-1.5 text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded">必須</span>
);

const SectionHeading: React.FC<{ index: string; label: string; title: string; note?: string }> = ({
  index,
  label,
  title,
  note
}) => (
  <div className="mb-6">
    <p className="text-xs font-bold text-blue-600 tracking-wider mb-1.5">
      {index} <span className="mx-1 text-slate-300">|</span> {label}
    </p>
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 [word-break:auto-phrase]">{title}</h3>
    {note && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{note}</p>}
  </div>
);

export const ResultScreen: React.FC<ResultScreenProps> = ({
  report,
  simulation,
  employeeCount,
  onEmployeeCountChange,
  onRestartQuiz,
  onSubmitLead,
  onOpenPrivacy,
  isSubmitting
}) => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('総務・人事責任者');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim() || !email.trim()) {
      alert('必須項目をすべてご入力ください。');
      return;
    }
    if (!privacyAgreed) {
      alert('個人情報の取扱い方針にご同意の上、送信してください。');
      return;
    }

    onSubmitLead({
      company: company.trim(),
      name: name.trim(),
      email: email.trim(),
      position
    });
  };

  const today = new Date();
  const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  const presets = [30, 50, 100, 300, 500];

  const comparisonRows = [
    { item: '社員の利用率', current: '12〜18%（一部の社員のみ）', beneft: '82〜89%（全社員が日常利用）' },
    { item: 'コスト構造', current: '全員分の月額固定費（未利用分も発生）', beneft: '低額の基本料＋実利用分のみ精算' },
    { item: '利用シーン', current: '宿泊・映画・提携レジャー施設が中心', beneft: 'カフェ・コンビニ・書籍・フィットネスなど日常使い' },
    { item: 'リモート・若手対応', current: '都市部・特定施設に限られ使いづらい', beneft: 'スマホ完結で全国どこでも利用可能' },
    { item: '管理者の工数', current: '会報誌配布・クーポン管理・問い合わせ対応', beneft: '管理画面で自動集計、工数を約90%削減' }
  ];

  const cardClass = 'bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6';

  return (
    <section className="fade-enter py-10 sm:py-14 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Completion Header */}
      <div className="text-center mb-10 [word-break:auto-phrase]">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 text-xl shadow-md">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">診断が完了しました</h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2">
          ご回答をもとに、貴社に最適な福利厚生プランをご提案します。
        </p>
        <div className="flex items-center justify-center gap-3 mt-4 text-xs text-slate-400">
          <span>{formattedDate}</span>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={onRestartQuiz}
            className="text-slate-500 hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            もう一度診断する
          </button>
        </div>
      </div>

      {/* 1. Current State Analysis */}
      <div className={cardClass}>
        <SectionHeading index="01" label="現状の課題" title={report.headline} />
        <p className="text-sm text-slate-600 leading-relaxed mb-6">{report.bodyText}</p>

        <ul className="divide-y divide-slate-100 border-y border-slate-100">
          {report.painPoints.map((p, idx) => (
            <li key={idx} className="flex items-start gap-4 py-4">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 text-sm">
                <i className={stripColor(p.icon)}></i>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{p.title}</p>
                <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Recommended Plan */}
      <div className={cardClass}>
        <SectionHeading index="02" label="おすすめのプラン" title={report.planTitle} note={report.planConcept} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {report.features.map((f, idx) => (
            <div key={idx} className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
              <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center mb-3 text-sm shadow-2xs">
                <i className={stripColor(f.icon)}></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Comparison */}
      <div className={cardClass}>
        <SectionHeading
          index="03"
          label="サービス比較"
          title="従来のパッケージ型との違い"
          note="利用率の向上とコスト削減を同時に実現できる理由"
        />

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="py-3 pr-4 font-semibold w-[24%]"></th>
                <th className="py-3 px-4 font-semibold w-[38%]">従来のパッケージ型</th>
                <th className="py-3 px-4 font-bold text-blue-700 bg-blue-50 rounded-t-lg w-[38%]">BeneFT</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={row.item} className="border-t border-slate-100">
                  <td className="py-3.5 pr-4 font-bold text-slate-800 text-xs sm:text-sm">{row.item}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.current}</td>
                  <td
                    className={`py-3.5 px-4 bg-blue-50 font-semibold text-slate-900 ${
                      idx === comparisonRows.length - 1 ? 'rounded-b-lg' : ''
                    }`}
                  >
                    <i className="fa-solid fa-check text-blue-600 mr-1.5 text-xs"></i>
                    {row.beneft}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Simulation */}
      <div className={cardClass}>
        <SectionHeading
          index="04"
          label="効果シミュレーション"
          title="導入効果の試算"
          note="従業員数を変更すると、試算結果がすぐに更新されます。"
        />

        <div className="rounded-xl border border-slate-200 p-4 sm:p-5 mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-sm font-bold text-slate-700">従業員数</span>
            <span className="text-2xl font-bold text-blue-600 tabular-nums">
              {employeeCount.toLocaleString()}
              <span className="text-sm text-slate-500 font-semibold ml-0.5">名</span>
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={employeeCount}
            onChange={(e) => onEmployeeCountChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onEmployeeCountChange(preset)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                  employeeCount === preset
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {preset}名
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-blue-600 text-white p-5">
            <p className="text-xs font-semibold text-blue-100">年間の削減見込み</p>
            <p className="text-2xl font-bold mt-2 tabular-nums tracking-tight">{simulation.formattedSavings}</p>
            <p className="text-[11px] text-blue-100 mt-1.5">固定費から実利用精算への移行効果</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-xs font-semibold text-slate-500">従業員の利用率</p>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums tracking-tight">
              {simulation.utilizationCurrent}% <span className="text-slate-400 text-lg">→</span> {simulation.utilizationProjected}%
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5">約5.7倍の活性化を見込み</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-xs font-semibold text-slate-500">管理工数の削減</p>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums tracking-tight">
              年間 約{simulation.adminHours}
              <span className="text-sm font-semibold ml-0.5">時間</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5">申請・問い合わせ対応を自動化</p>
          </div>
        </div>
      </div>

      {/* 5. Lead Capture Form */}
      <div id="lead-form-section" className="bg-white rounded-2xl border-2 border-blue-600 shadow-lg p-6 sm:p-10 mt-10">
        <div className="text-center mb-8 [word-break:auto-phrase]">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            診断レポートを無料で受け取る
          </h3>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            <span className="sm:block">詳細な試算結果・他社の乗り換え事例・移行手順を</span>
            <span className="sm:block">まとめた提案シート（PDF）をお送りします。</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
          <div>
            <label htmlFor="lead-company" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
              会社名<RequiredTag />
            </label>
            <input
              type="text"
              id="lead-company"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="例：株式会社サンプル"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="lead-name" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
              お名前<RequiredTag />
            </label>
            <input
              type="text"
              id="lead-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：山田 太郎"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="lead-email" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
              メールアドレス<RequiredTag />
            </label>
            <input
              type="email"
              id="lead-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例：yamada@example.co.jp"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1.5">提案シートの送付先になります。会社のメールアドレスをご入力ください。</p>
          </div>

          <div>
            <label htmlFor="lead-position" className="block text-sm font-bold text-slate-700 mb-1.5">
              部署・役職
            </label>
            <select
              id="lead-position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={inputClass}
            >
              <option value="総務・人事責任者">総務・人事責任者</option>
              <option value="総務・人事担当者">総務・人事担当者</option>
              <option value="経営者・役員">経営者・役員</option>
              <option value="経営企画・管理部門">経営企画・管理部門</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <input
              type="checkbox"
              id="lead-privacy"
              required
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="lead-privacy" className="text-sm text-slate-600 cursor-pointer">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-blue-600 underline underline-offset-2 hover:text-blue-700 cursor-pointer"
              >
                個人情報の取扱い
              </button>
              に同意する
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>送信中...</span>
              </>
            ) : (
              <span>無料でレポートを受け取る</span>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span><i className="fa-solid fa-lock mr-1"></i>SSL暗号化通信</span>
            <span>しつこい営業連絡は行いません</span>
          </p>
        </form>
      </div>
    </section>
  );
};
