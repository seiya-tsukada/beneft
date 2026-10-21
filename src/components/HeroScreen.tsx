import React from 'react';

interface HeroScreenProps {
  onStartQuiz: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ onStartQuiz }) => {
  return (
    <section className="fade-enter py-8 sm:py-14 px-4 sm:px-6 max-w-5xl mx-auto [word-break:auto-phrase]">
      {/* Target Audience Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-3 shadow-2xs">
          <i className="fa-solid fa-arrows-rotate text-emerald-600"></i>
          <span>パッケージ型（リロクラブ等）の見直し・リプレイス検討企業向け</span>
        </div>
        <h1 className="font-black text-slate-900 tracking-tight">
          <span className="block text-lg sm:text-2xl md:text-3xl text-slate-700 mb-2 sm:mb-3">
            たった3問・3分でわかる
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl leading-snug">
            <span className="inline-block">自社に最適な</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">福利厚生サービス診断</span>
          </span>
        </h1>
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
          <span className="sm:block">利用率の低迷や割高な固定費など、貴社の福利厚生の課題を可視化。</span>
          <span className="sm:block">「BeneFT」による最適プランと削減可能コストを即時シミュレーションします。</span>
        </p>
      </div>

      {/* Main Action Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-12">
        <div className="p-6 sm:p-10 text-center bg-gradient-to-b from-white via-white to-slate-50">
          
          {/* Key Pain points callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 text-left">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-chart-line-down text-sm"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">利用率の低迷</p>
                <p className="text-[12px] text-slate-500 mt-0.5">提携施設が遠く、一部社員しか使っていない</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-coins text-sm"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">費用対効果の不透明さ</p>
                <p className="text-[12px] text-slate-500 mt-0.5">使われないのに全社員分の固定費が発生</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <i className="fa-solid fa-laptop-house text-sm"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">在宅・多様性の不一致</p>
                <p className="text-[12px] text-slate-500 mt-0.5">在宅勤務や若手社員の日常に還元されない</p>
              </div>
            </div>
          </div>

          {/* CTA Start Button */}
          <button 
            type="button"
            onClick={onStartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base sm:text-lg px-8 py-4 sm:px-12 sm:py-4.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <i className="fa-solid fa-bolt-lightning text-yellow-300"></i>
            <span>無料で診断をスタートする（全3問）</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <p className="text-xs text-slate-500 mt-3 flex flex-wrap items-center justify-center gap-4">
            <span><i className="fa-solid fa-check text-emerald-500 mr-1"></i> 登録不要で診断結果を即時閲覧可能</span>
            <span><i className="fa-solid fa-shield-halved text-blue-500 mr-1"></i> B2B福利厚生データ準拠</span>
          </p>
        </div>

        {/* Social Proof Stats Banner */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-around gap-4 text-center text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-building text-blue-400"></i>
            <span className="text-slate-300">診断実績</span>
            <span className="font-extrabold text-white text-base">4,200社突破</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-face-smile text-emerald-400"></i>
            <span className="text-slate-300">見直し後 満足度</span>
            <span className="font-extrabold text-white text-base">94.8%</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-piggy-bank text-amber-400"></i>
            <span className="text-slate-300">平均コスト削減率</span>
            <span className="font-extrabold text-white text-base">最大 42%</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <i className="fa-solid fa-clipboard-check text-lg"></i>
          </div>
          <h2 className="font-bold text-slate-900 text-sm mb-1">1. 現状の課題を客観分析</h2>
          <p className="text-xs text-slate-600 leading-relaxed">固定費負担や社員の利用率ギャップなど、見過ごされがちな福利厚生の課題を明確化。</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <i className="fa-solid fa-sliders text-lg"></i>
          </div>
          <h2 className="font-bold text-slate-900 text-sm mb-1">2. 最適なリプレイス案を提示</h2>
          <p className="text-xs text-slate-600 leading-relaxed">ポイント型、実利用精算など、貴社の就業形態に最適な次世代モデル「BeneFT」を提案。</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <i className="fa-solid fa-calculator text-lg"></i>
          </div>
          <h2 className="font-bold text-slate-900 text-sm mb-1">3. 削減額＆利用率を即時算出</h2>
          <p className="text-xs text-slate-600 leading-relaxed">従業員数を指定するだけで、年間の想定削減コストや利用率向上インパクトをリアルタイム算出。</p>
        </div>
      </div>
    </section>
  );
};
