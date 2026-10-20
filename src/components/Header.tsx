import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
  onRequestProposal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, onRequestProposal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={onGoHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onGoHome(); }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center text-white font-black text-xl shadow-sm tracking-tight group-hover:scale-105 transition-transform">
            <span>B</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 tracking-tight text-xl">BeneFT</span>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
                福利厚生最適化ナビ
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">企業の福利厚生最適化・リプレイス支援</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <i className="fa-regular fa-clock text-blue-600 mr-1.5"></i>
            <span>所要時間：約3分 / 完全無料</span>
          </div>
          <button 
            type="button"
            onClick={onRequestProposal}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <i className="fa-solid fa-file-lines"></i>
            <span>提案シート請求</span>
          </button>
        </div>
      </div>
    </header>
  );
};
