import React from 'react';
import { LeadFormData } from '../types';

interface ThanksScreenProps {
  leadData: LeadFormData | null;
  onOpenPdf: () => void;
  onGoHome: () => void;
}

export const ThanksScreen: React.FC<ThanksScreenProps> = ({
  leadData,
  onOpenPdf,
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
          無料相談のお申し込みありがとうございます！
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6">
          担当コンサルタントより、ご入力いただいたメールアドレス（<strong className="text-slate-900">{email}</strong>）宛てに相談日程のご案内をお送りいたします。
        </p>

        {/* Diagnosis sheet preview, to review before the consultation */}
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
                  ご相談前に、診断結果・想定削減コスト・移行ロードマップをご確認いただけます
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
