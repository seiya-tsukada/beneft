import { DiagnosticAnswers, LeadFormData, ScreenType } from '../types';
import { isAnswered } from '../utils/answers';

// The loading screen has no URL of its own and stays on /quiz
export const SCREEN_PATHS: Partial<Record<ScreenType, string>> = {
  hero: '/',
  quiz: '/quiz',
  result: '/result',
  thanks: '/thanks'
};

// Map a URL to a screen, falling back when the data that screen needs is missing
export const resolveScreen = (path: string, answers: DiagnosticAnswers, leadData: LeadFormData | null): ScreenType => {
  if (path === '/quiz') return 'quiz';
  if (path === '/thanks' && leadData) return 'thanks';
  if ((path === '/result' || path === '/thanks') && isAnswered(answers)) return 'result';
  return 'hero';
};

// Point the address bar at the screen's URL, if it has one and isn't there already
export const syncUrl = (screen: ScreenType, mode: 'push' | 'replace') => {
  const path = SCREEN_PATHS[screen];
  if (!path || path === window.location.pathname) return;
  if (mode === 'push') {
    window.history.pushState(null, '', path);
  } else {
    window.history.replaceState(null, '', path);
  }
};
