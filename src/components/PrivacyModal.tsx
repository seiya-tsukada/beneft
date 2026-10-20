import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">個人情報の取扱い方針</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="閉じる"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="py-4 text-xs text-slate-600 space-y-3 leading-relaxed max-h-60 overflow-y-auto">
          <p>1. 収集した企業名、担当者名、連絡先情報は、「BeneFT」福利厚生診断結果レポートの送付および関連する最適化提案のご連絡のみに利用いたします。</p>
          <p>2. 法令に基づく場合を除き、ご本人の同意なく第三者への提供は行いません。</p>
          <p>3. 入力情報はSSL暗号化通信により安全に保護されております。</p>
        </div>
        <div className="pt-3 border-t border-slate-100 text-right">
          <button 
            type="button"
            onClick={onClose} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
