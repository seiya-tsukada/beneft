import React from 'react';

interface FooterProps {
  onGoHome: () => void;
  onRequestProposal: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onGoHome,
  onRequestProposal,
  onOpenPrivacy
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
            B
          </div>
          <span className="font-extrabold text-slate-200 text-sm tracking-tight">BeneFT</span>
          <span className="text-slate-500">| 福利厚生最適化診断ナビ</span>
        </div>
        <div className="flex flex-wrap gap-4 text-slate-400 text-[11px]">
          <button 
            type="button"
            className="hover:text-slate-200 transition cursor-pointer" 
            onClick={onOpenPrivacy}
          >
            プライバシーポリシー
          </button>
          <button 
            type="button"
            className="hover:text-slate-200 transition cursor-pointer" 
            onClick={onGoHome}
          >
            診断トップへ
          </button>
          <button 
            type="button"
            className="hover:text-slate-200 transition cursor-pointer" 
            onClick={onRequestProposal}
          >
            提案シートダウンロード
          </button>
        </div>
        <p className="text-[11px] text-slate-500">© 2026 BeneFT All Rights Reserved.</p>
      </div>
    </footer>
  );
};
