import React from 'react';
import { HERO_FEATURES, HERO_PAIN_POINTS, HERO_STATS } from '../data/content';

interface HeroScreenProps {
  onStartQuiz: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ onStartQuiz }) => {
  return (
    <section className="fade-enter py-8 sm:py-14 px-4 sm:px-6 max-w-5xl mx-auto [word-break:auto-phrase]">
      <div className="text-center mb-6">
        <h1 className="font-black text-slate-900 tracking-tight">
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
            {HERO_PAIN_POINTS.map((item) => (
              <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <i className={`${item.icon} text-sm`}></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <p className="text-[12px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
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
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <i className={stat.icon}></i>
              <span className="text-slate-300">{stat.label}</span>
              <span className="font-extrabold text-white text-base">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
        {HERO_FEATURES.map((item) => (
          <div key={item.title} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center mb-3`}>
              <i className={`${item.icon} text-lg`}></i>
            </div>
            <h2 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
