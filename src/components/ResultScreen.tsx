import React from 'react';
import { COMPARISON_ROWS, EMPLOYEE_COUNT, EMPLOYEE_PRESETS } from '../data/content';
import { DiagnosisReport, SimulationResult, LeadFormData } from '../types';
import { formatJapaneseDate } from '../utils/format';
import { LeadForm } from './result/LeadForm';
import { SectionHeading } from './result/SectionHeading';

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

const cardClass = 'bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6';

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
          <span>{formatJapaneseDate()}</span>
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
                <i className={p.icon}></i>
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
                <i className={f.icon}></i>
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
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={row.item} className="border-t border-slate-100">
                  <td className="py-3.5 pr-4 font-bold text-slate-800 text-xs sm:text-sm">{row.item}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.current}</td>
                  <td
                    className={`py-3.5 px-4 bg-blue-50 font-semibold text-slate-900 ${
                      idx === COMPARISON_ROWS.length - 1 ? 'rounded-b-lg' : ''
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
            min={EMPLOYEE_COUNT.min}
            max={EMPLOYEE_COUNT.max}
            step={EMPLOYEE_COUNT.step}
            value={employeeCount}
            onChange={(e) => onEmployeeCountChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {EMPLOYEE_PRESETS.map((preset) => (
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
            <p className="text-[11px] text-slate-500 mt-1.5">約{simulation.utilizationMultiplier}倍の活性化を見込み</p>
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
      <LeadForm onSubmitLead={onSubmitLead} onOpenPrivacy={onOpenPrivacy} isSubmitting={isSubmitting} />
    </section>
  );
};
