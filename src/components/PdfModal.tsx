import React from 'react';
import { DiagnosisReport, SimulationResult, LeadFormData } from '../types';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DiagnosisReport;
  simulation: SimulationResult;
  employeeCount: number;
  leadData: LeadFormData | null;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  report,
  simulation,
  employeeCount,
  leadData
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const companyHeader = leadData?.company 
    ? `${leadData.company}（${leadData.name || ''} 様）専用提案資料` 
    : '貴社向けカスタマイズ資料';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-file-pdf text-red-500 text-lg"></i>
            <span className="font-bold text-slate-900 text-sm">BeneFT 最適化提案シート（PDFプレビュー）</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => window.print()} 
              className="text-xs bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-print"></i> 印刷 / PDF保存
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-700 p-1.5 text-lg cursor-pointer"
              aria-label="閉じる"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Modal Body (Printable Sheet) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm bg-white" id="printable-area">
          {/* Sheet Header */}
          <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Confidential Proposal</div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">福利厚生サービス 最適化・リプレイス提案書</h2>
              <p className="text-xs text-slate-500 mt-1">{companyHeader}</p>
            </div>
            <div className="text-right text-[11px] text-slate-400">
              <div>発行日: {formattedDate}</div>
              <div className="font-bold text-blue-700">提供: 次世代福利厚生 BeneFT</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i className="fa-solid fa-triangle-exclamation text-amber-500"></i> 現状課題のサマリー
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {report.headline}。{report.bodyText}
            </p>
          </div>

          {/* Simulation Comparison */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              改善シミュレーション概要（対象：{employeeCount}名）
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[11px] text-emerald-800 font-medium">年間コスト削減額</span>
                <div className="text-lg font-black text-emerald-600 font-mono mt-1">
                  {simulation.formattedSavings}
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-[11px] text-blue-800 font-medium">予測利用率</span>
                <div className="text-lg font-black text-blue-600 font-mono mt-1">
                  {simulation.utilizationProjected}%（約5.7倍）
                </div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="text-[11px] text-purple-800 font-medium">管理工数削減</span>
                <div className="text-lg font-black text-purple-600 font-mono mt-1">
                  約 {simulation.adminHours}時間/年
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Migration Roadmap */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">リプレイス移行ステップ（標準2〜3ヶ月）</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">STEP 1</span>
                <div>
                  <strong className="text-slate-900">現行契約の確認・解約予告通知</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">リロクラブ等の年間自動更新月を確認し、解約期日の1〜3ヶ月前に通知書を送付。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">STEP 2</span>
                <div>
                  <strong className="text-slate-900">「BeneFT」ポイント設計・付与ルール策定</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">月次または年次の付与ポイント額、利用可能カテゴリ（健康・自己啓発・日用品・リモート等）を決定。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">STEP 3</span>
                <div>
                  <strong className="text-slate-900">社員向けキックオフ＆アプリ配布</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">スマホアプリ・WEBの招待コード配布で、導入初日から全従業員が利用開始可能。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button 
            type="button"
            onClick={onClose} 
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs transition cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
