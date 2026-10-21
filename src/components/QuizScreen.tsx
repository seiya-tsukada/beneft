import React, { useEffect, useRef, useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { DiagnosticAnswers } from '../types';
import { getAnswer } from '../utils/answers';

// How long the picked card stays highlighted before moving on (ms)
const ADVANCE_DELAY = 320;

interface QuizScreenProps {
  currentStep: number;
  answers: DiagnosticAnswers;
  onSelectChoice: (questionId: number, key: string) => void;
  onPrev: () => void;
  onGoHome: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  currentStep,
  answers,
  onSelectChoice,
  onPrev,
  onGoHome
}) => {
  const currentQuestion = QUESTIONS[currentStep] || QUESTIONS[0];
  const [justSelectedKey, setJustSelectedKey] = useState<string | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const currentAnswerKey = getAnswer(answers, currentQuestion.id);

  const remaining = QUESTIONS.length - currentQuestion.step;
  const progressPercent = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleCardClick = (choiceKey: string) => {
    // Ignore further clicks while the previous pick is still advancing; a ref sees
    // a pending pick even when two clicks land before React re-renders
    if (advanceTimer.current) return;
    setJustSelectedKey(choiceKey);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = undefined;
      onSelectChoice(currentQuestion.id, choiceKey);
      setJustSelectedKey(null);
    }, ADVANCE_DELAY);
  };

  return (
    <section className="fade-enter py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Progress Bar & Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {currentStep === 0 ? (
            <button 
              type="button"
              onClick={onGoHome} 
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>トップへ</span>
            </button>
          ) : (
            <button 
              type="button"
              onClick={onPrev} 
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>前へ戻る</span>
            </button>
          )}

          <span 
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              remaining > 0 
                ? 'text-blue-600 bg-blue-50 border-blue-200' 
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}
          >
            {remaining > 0 ? `あと ${remaining} 問で完了` : '最終設問'}
          </span>

          <span className="text-xs font-bold text-slate-500">
            STEP {currentQuestion.step} / {QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card Frame */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
        {/* Category Pill & Question Title */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md mb-2 inline-block">
            {currentQuestion.category}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
            {currentQuestion.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Choices Grid */}
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
          {currentQuestion.choices.map((choice) => {
            const isSelected = (justSelectedKey === choice.key) || (!justSelectedKey && currentAnswerKey === choice.key);

            return (
              <div
                key={choice.key}
                onClick={() => handleCardClick(choice.key)}
                className={`cursor-pointer p-4 sm:p-5 rounded-xl border bg-white card-hover-effect flex items-start gap-4 transition-all ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500 shadow-md' 
                    : 'border-slate-200 hover:border-blue-300'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(choice.key); }}
              >
                <div className={`w-10 h-10 rounded-xl ${choice.iconBg} flex items-center justify-center shrink-0 text-base shadow-2xs`}>
                  <i className={choice.icon}></i>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-bold text-slate-800">{choice.label}</h4>
                    <div 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ml-2 transition-colors ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-500 text-white' 
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      <i className={`fa-solid fa-check transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}></i>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{choice.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Help Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <i className="fa-regular fa-lightbulb text-amber-500"></i>
            直感でお選びいただいて問題ありません
          </span>
          <span className="text-[11px] font-mono text-slate-500">1クリックで自動進行</span>
        </div>
      </div>
    </section>
  );
};
