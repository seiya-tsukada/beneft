import React, { useEffect, useRef, useState } from 'react';
import { LOADING_STEPS } from '../data/content';

interface LoadingScreenProps {
  onComplete: () => void;
}

// When each step's message appears, and when the screen hands off to the result (ms)
const STEP_DELAYS = [0, 450, 950];
const COMPLETE_DELAY = 1450;

const stepIcon = (index: number, current: number) => {
  if (index > current) return 'fa-circle-notch text-slate-300';
  // The step in progress at the end keeps spinning until the result appears
  return index === LOADING_STEPS.length - 1 ? 'fa-spinner text-blue-500 animate-spin' : 'fa-check text-emerald-500';
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  // Keep the latest callback without restarting the timers when the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const timers = STEP_DELAYS.slice(1).map((delay, i) => setTimeout(() => setMsgIndex(i + 1), delay));
    timers.push(setTimeout(() => onCompleteRef.current(), COMPLETE_DELAY));
    return () => timers.forEach(clearTimeout);
  }, []);

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
          {LOADING_STEPS[msgIndex].message}
        </p>

        {/* Progress Steps Check */}
        <div className="space-y-2.5 text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
          {LOADING_STEPS.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-2">
              <i className={`fa-solid ${stepIcon(idx, msgIndex)}`}></i>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
