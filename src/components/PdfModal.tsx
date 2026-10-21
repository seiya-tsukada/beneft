import React from 'react';
import { MIGRATION_STEPS } from '../data/content';
import { DiagnosisReport, SimulationResult, LeadFormData } from '../types';
import { formatJapaneseDate } from '../utils/format';
import { CloseButton, Modal } from './ui/Modal';

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
  const companyHeader = leadData?.company 
    ? `${leadData.company}（${leadData.name || ''} 様）専用提案資料` 
    : '貴社向けカスタマイズ資料';

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="bg-slate-900/70"
      className="max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
    >
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
          <CloseButton onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 text-lg" />
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
            <div>発行日: {formatJapaneseDate()}</div>
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
                {simulation.utilizationProjected}%（約{simulation.utilizationMultiplier}倍）
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
            {MIGRATION_STEPS.map((step, idx) => (
              <div key={step.title} className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">STEP {idx + 1}</span>
                <div>
                  <strong className="text-slate-900">{step.title}</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
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
    </Modal>
  );
};
