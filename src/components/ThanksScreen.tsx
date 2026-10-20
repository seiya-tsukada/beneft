import React from 'react';
import { LeadFormData } from '../types';

interface ThanksScreenProps {
  leadData: LeadFormData | null;
  onOpenPdf: () => void;
  onOpenConsultation: () => void;
  onGoHome: () => void;
}

export const ThanksScreen: React.FC<ThanksScreenProps> = ({
  leadData,
  onOpenPdf,
  onOpenConsultation,
  onGoHome
}) => {
  const companyName = leadData?.company || '貴社';
  const email = leadData?.email || 'ご登録アドレス';

  return (
    <section className="fade-enter py-12 sm:py-16 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>

        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
          送信完了
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          診断レポートのご請求ありがとうございます！
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6">
          ご入力いただいたメールアドレス（<strong className="text-slate-900">{email}</strong>）宛てに、BeneFT最適化提案シート（PDF）のダウンロードURLをお送りいたしました。
        </p>

        {/* Immediate PDF Preview / Download Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0 text-xl">
                <i className="fa-solid fa-file-pdf"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {companyName}様向け 福利厚生最適化・リプレイス提案シート（BeneFT）.pdf
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  診断回答データ・想定削減コストシミュレーション・移行ロードマップ同梱
                </p>
              </div>
            </div>

            <button 
              type="button"
              onClick={onOpenPdf}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <i className="fa-solid fa-eye"></i>
              <span>今すぐシートを閲覧する</span>
            </button>
          </div>
        </div>

        {/* Next Action Card / Consultant consultation */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 mb-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">無料特典</span>
              <span className="text-xs font-bold text-blue-900">専任コンサルタントによる15分オンライン相談</span>
            </div>
            <p className="text-xs text-slate-600">
              「リロクラブの解約タイミングは？」「従業員へのアナウンス方法は？」など、具体的なリプレイス実務を個別にご案内可能です。
            </p>
          </div>
          <button 
            type="button"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2.5 rounded-lg transition shrink-0 cursor-pointer shadow-2xs"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>相談枠を確認する</span>
          </button>
        </div>

        <button 
          type="button"
          onClick={onGoHome} 
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left mr-1"></i> トップページへ戻る
        </button>
      </div>
    </section>
  );
};
