import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "貴社の課題と従業員プロファイルを照合しています...",
    "パッケージ型（リロクラブ等）とのギャップ数値を算出中...",
    "「BeneFT」による最適な次世代プランを構成しています..."
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setMsgIndex(1), 450);
    const timer2 = setTimeout(() => setMsgIndex(2), 950);
    const timer3 = setTimeout(() => onComplete(), 1450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <section className="fade-enter py-20 px-4 text-center max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12">
        <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <i className="fa-solid fa-microchip text-blue-600 text-2xl"></i>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">診断データを解析中...</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 h-6 transition-all">
          {messages[msgIndex]}
        </p>

        {/* Progress Steps Check */}
        <div className="space-y-2.5 text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${msgIndex >= 0 ? 'fa-check text-emerald-500' : 'fa-spinner text-blue-500 animate-spin'}`}></i>
            <span>現状のパッケージ型（リロクラブ等）ギャップ分析</span>
          </div>
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${msgIndex >= 1 ? 'fa-check text-emerald-500' : 'fa-circle-notch text-slate-300'}`}></i>
            <span>就業形態・従業員層に応じた推奨プラン選定</span>
          </div>
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${msgIndex >= 2 ? 'fa-spinner text-blue-500 animate-spin' : 'fa-circle-notch text-slate-300'}`}></i>
            <span>年間想定削減コスト＆利用率シミュレーション構築</span>
          </div>
        </div>
      </div>
    </section>
  );
};
