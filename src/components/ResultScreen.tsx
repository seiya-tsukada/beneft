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

  return (
    <section className="fade-enter py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Top Success Alert */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <i className="fa-solid fa-check"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-900">診断が完了しました！</p>
            <p className="text-[12px] text-emerald-700">貴社の回答データに基づき、「BeneFT」導入による最適化レポートと改善プランを作成しました。</p>
          </div>
        </div>
        <button 
          type="button"
          onClick={onRestartQuiz} 
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition shadow-2xs whitespace-nowrap cursor-pointer hover:bg-slate-50"
        >
          <i className="fa-solid fa-rotate-left mr-1"></i> もう一度診断する
        </button>
      </div>

      {/* 1. Current State Analysis Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded-md border border-red-200">
              現状の課題判定
            </span>
            <span className="text-xs text-slate-500">回答に基づく客観分析</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">{formattedDate}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
          {report.headline}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {report.bodyText}
        </p>

        {/* Pain Point Breakdown Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          {report.painPoints.map((p, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-1">
                <i className={`${p.icon} ${p.color} text-sm`}></i>
                <strong className="text-slate-800">{p.title}</strong>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Recommended Replacement Plan Card (BeneFT) */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full mb-3">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>貴社に最適なリプレイス推奨プラン</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          {report.planTitle}
        </h3>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed mb-6">
          {report.planConcept}
        </p>

        {/* Plan Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {report.features.map((f, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4">
              <div className="text-xl mb-2"><i className={f.icon}></i></div>
              <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Comparison with Relo Club / Package Models */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 mb-8">
        <div className="text-center sm:text-left mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Service Comparison</span>
          <h3 className="text-lg sm:text-2xl font-black text-slate-900 mt-1">
            従来のパッケージ型（リロクラブ等）と「BeneFT」の比較
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            なぜ「BeneFT」へのリプレイスによって利用率向上とコスト削減が同時に実現できるのか？
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 w-1/4 font-semibold">比較項目</th>
                <th className="py-3 px-4 w-[37.5%] font-semibold text-slate-500 bg-slate-50 rounded-t-lg">
                  従来のパッケージ型（リロクラブ等）
                </th>
                <th className="py-3 px-4 w-[37.5%] font-bold text-blue-700 bg-blue-50/80 rounded-t-lg border-x border-t border-blue-200">
                  <i className="fa-solid fa-crown text-amber-500 mr-1"></i> 推奨プラン「BeneFT」
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  社員の利用率
                </td>
                <td className="py-3.5 px-4 bg-slate-50 text-slate-600">
                  <span className="text-red-500 font-bold">12%〜18%</span>（一部の社員のみ）
                </td>
                <td className="py-3.5 px-4 bg-blue-50/40 font-bold text-emerald-600 border-x border-blue-200">
                  <i className="fa-solid fa-arrow-trend-up text-emerald-500 mr-1"></i> 82%〜89%（全社員が日常利用）
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  コスト構造
                </td>
                <td className="py-3.5 px-4 bg-slate-50 text-slate-600">
                  全員分の月額固定費（未利用分も掛け捨て）
                </td>
                <td className="py-3.5 px-4 bg-blue-50/40 font-bold text-blue-900 border-x border-blue-200">
                  低額基本料 ＋ <span className="text-emerald-600 font-bold">実利用ポイント精算（無駄ゼロ）</span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  利用可能シーン
                </td>
                <td className="py-3.5 px-4 bg-slate-50 text-slate-600">
                  宿泊施設・映画・提携レジャー施設中心
                </td>
                <td className="py-3.5 px-4 bg-blue-50/40 text-slate-800 border-x border-blue-200">
                  <span className="font-bold text-blue-900">日常使い（カフェ・コンビニ・Uber・書籍・フィットネス）</span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  リモート・若手対応
                </td>
                <td className="py-3.5 px-4 bg-slate-50 text-slate-600">
                  都心・特定施設限定で利用しづらい
                </td>
                <td className="py-3.5 px-4 bg-blue-50/40 text-slate-800 border-x border-blue-200">
                  <span className="font-bold text-emerald-600">スマホ完結・全国どこでも即時利用可能</span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  総務・管理者の工数
                </td>
                <td className="py-3.5 px-4 bg-slate-50 text-slate-600">
                  会報誌配布、紙のクーポン管理、問い合わせ対応
                </td>
                <td className="py-3.5 px-4 bg-blue-50/40 font-semibold text-slate-800 border-x border-b border-blue-200 rounded-b-lg">
                  BeneFTクラウド管理画面で自動集計・工数90%削減
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Interactive Simulation Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 mb-1">
              <i className="fa-solid fa-calculator"></i>
              <span>リアルタイム効果試算</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              貴社の想定削減コスト＆利用率アップ試算
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              従業員数を変更すると、年間試算がリアルタイムに更新されます
            </p>
          </div>

          {/* Employee Counter Slider Control */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0 w-full sm:w-80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">従業員数（シミュレーション対象）</span>
              <span className="text-base font-extrabold text-blue-600 font-mono">{employeeCount}名</span>
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
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 mb-2.5">
              <span>10名</span>
              <span>500名</span>
              <span>1,000名</span>
            </div>
            {/* Quick Preset Chips */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold mr-1">簡単設定:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onEmployeeCountChange(preset)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded transition cursor-pointer ${
                    employeeCount === preset
                      ? 'bg-blue-600 border border-blue-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {preset}名
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Metric Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Metric 1: Annual Cost Savings */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 text-center sm:text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800">年間想定削減・適正化コスト</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center text-xs">
                <i className="fa-solid fa-yen-sign"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight">
              {simulation.formattedSavings}
            </div>
            <p className="text-[11px] text-emerald-700/80 mt-1.5 font-medium">
              ※ 掛け捨て固定費の削減とBeneFT実利用精算への移行による効果
            </p>
          </div>

          {/* Metric 2: Utilization Boost */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center sm:text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800">従業員利用率の見込み</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-700 flex items-center justify-center text-xs">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono tracking-tight">
              {simulation.utilizationCurrent}% → {simulation.utilizationProjected}%
            </div>
            <p className="text-[11px] text-blue-700/80 mt-1.5 font-medium">
              約 5.7倍 の活性化見込み
            </p>
          </div>

          {/* Metric 3: Admin Hours Saved */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5 text-center sm:text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-800">総務・担当者の年間削減工数</span>
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-700 flex items-center justify-center text-xs">
                <i className="fa-solid fa-business-time"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-700 font-mono tracking-tight">
              年間 約 {simulation.adminHours} 時間
            </div>
            <p className="text-[11px] text-purple-700/80 mt-1.5 font-medium">
              BeneFTクラウドで自動申請・問い合わせを大幅削減
            </p>
          </div>
        </div>
      </div>

      {/* 5. LEAD CAPTURE FORM / CTA */}
      <div id="lead-form-section" className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700 relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <i className="fa-solid fa-file-pdf"></i>
              <span>貴社専用のレポートを即時発行</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              自社向け「BeneFT 最適化提案シート（PDF）」をダウンロード
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              診断結果を踏まえた詳細シミュレーション、他社リプレイス事例集、乗り換え手順書（PDF）を無料でお届けします。
            </p>
          </div>

          {/* The Lead Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-300 mb-1">
                  会社名 <span className="text-emerald-400 font-bold">*必須</span>
                </label>
                <input 
                  type="text" 
                  id="lead-company" 
                  required 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="例: 株式会社サンプル" 
                  className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                />
              </div>

              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-300 mb-1">
                  ご担当者名 <span className="text-emerald-400 font-bold">*必須</span>
                </label>
                <input 
                  type="text" 
                  id="lead-name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: 山田 太郎" 
                  className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-300 mb-1">
                  ビジネスメールアドレス <span className="text-emerald-400 font-bold">*必須</span>
                </label>
                <input 
                  type="email" 
                  id="lead-email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="例: yamada@example.co.jp" 
                  className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                />
              </div>

              <div>
                <label htmlFor="lead-position" className="block text-xs font-semibold text-slate-300 mb-1">
                  部署・役職
                </label>
                <select 
                  id="lead-position" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                >
                  <option value="総務・人事責任者">総務・人事責任者</option>
                  <option value="総務・人事担当者">総務・人事担当者</option>
                  <option value="経営者・役員">経営者・役員</option>
                  <option value="経営企画・管理部門">経営企画・管理部門</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            </div>

            {/* Pre-populated info summary */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-check-circle text-emerald-400"></i>
                試算対象規模：<strong className="text-white">{employeeCount}名</strong>
              </span>
              <span className="text-[11px] text-slate-400">診断データがレポートに自動反映されます</span>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="lead-privacy" 
                required 
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="lead-privacy" className="text-xs text-slate-400 cursor-pointer">
                <button
                  type="button"
                  onClick={onOpenPrivacy} 
                  className="text-emerald-400 underline hover:text-emerald-300 cursor-pointer"
                >
                  個人情報の取扱い方針
                </button>
                に同意して送信する
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    <span>レポート生成・送信中...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>提案シート（PDF）を受け取る（無料）</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-4">
              <span><i className="fa-solid fa-lock text-slate-500 mr-1"></i> SSL暗号化通信</span>
              <span><i className="fa-solid fa-shield-halved text-slate-500 mr-1"></i> 迷惑メール・強引な営業は一切行いません</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
